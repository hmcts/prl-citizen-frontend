import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';

import { CITIZEN_UPDATE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { CHECK_ANSWERS } from '../../urls';

import { createToken } from './createToken';

const logger = Logger.getLogger('PCQGetController');

@autobind
export default class PCQGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const tokenKey: string = config.get('services.equalityAndDiversity.tokenKey');
    const url = config.get('services.equalityAndDiversity.url');
    const pcqEnabled = config.get('services.equalityAndDiversity.pcqEnabled');
    logger.info(`PCQEnabled : ${pcqEnabled}`);
    if (pcqEnabled && pcqEnabled === 'true' && !req.session.userCase.pcqId && tokenKey && url) {
      const path: string = config.get('services.equalityAndDiversity.path');
      const health = `${url}/health`;
      try {
        const response: AxiosResponse<StatusResponse> = await axios.get(health);

        if (response.data.status && response.data.status === 'UP') {
          req.session.userCase.pcqId = uuid();
          logger.info(`PCQ service: ${health} is UP, PCQ ID: ${req.session.userCase.pcqId}, pcqEnabled: ${pcqEnabled}`);
        } else {
          logger.error('PCQ service response.data: ' + response.data);
          logger.error(`PCQ service: ${health} is down, pcqEnabled: ${pcqEnabled}`);
          return res.redirect(CHECK_ANSWERS);
        }
      } catch (err) {
        logger.error(`Could not connect to PCQ service: ${health}, pcqEnabled: ${pcqEnabled}`, err.message);
        return res.redirect(CHECK_ANSWERS);
      }
      const protocol = req.app.locals.developmentMode ? 'http://' : '';
      const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';

      const params = {
        serviceId: 'prl_ca',
        actor: 'APPLICANT',
        pcqId: req.session.userCase.pcqId,
        partyId: req.session.user.email,
        returnUrl: `${protocol}${res.locals.host}${port}${CHECK_ANSWERS}`,
        language: req.session.lang || 'en',
        ccdCaseId: req.session.userCase.id,
      };

      logger.info(`PCQ service return URL: ${params.returnUrl}`);

      params['token'] = createToken(params, tokenKey);
      params.partyId = encodeURIComponent(params.partyId);

      try {
        req.session.userCase = await req.locals.api.triggerEvent(
          req.session.userCase.id,
          { pcqId: req.session.userCase.pcqId },
          CITIZEN_UPDATE
        );
      } catch (err) {
        req.locals.logger.error(`Error updating PCQ ID for Applicant, pcqEnabled: ${pcqEnabled}`, err);
        return res.redirect(CHECK_ANSWERS);
      }
      const qs = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

      req.session.save(err => {
        if (err) {
          req.locals.logger.error('Error', err);
          throw err;
        }
        logger.info(`PCQ service redirect URL: ${url}${path}?${qs}, pcqEnabled: ${pcqEnabled} completed successfully.`);
        res.redirect(`${url}${path}?${qs}`);
      });
    } else {
      logger.info(
        `User already attempted for PCQ ID or pcqEnabled is not enabled:${req.session.userCase.pcqId} , pcqEnabled: ${pcqEnabled}`
      );
      res.redirect(CHECK_ANSWERS);
    }
  }
}

export interface StatusResponse {
  status: 'UP' | 'DOWN' | undefined;
}
