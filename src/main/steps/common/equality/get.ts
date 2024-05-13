import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';

import { PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../../tasklistresponse/utils';
import { C100_CHECK_YOUR_ANSWER, PageLink, RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT } from '../../urls';

import { createToken } from './createToken';

const logger = Logger.getLogger('PCQGetController');

@autobind
export default class PCQGetController {
  public async get(req: AppRequest, res: Response, returnUrl: string): Promise<void> {
    const { userCase, user } = req.session;
    let partyType;
    let partyDetails;
    if (req.url.includes('c100-rebuild')) {
      partyType = 'applicant';
      partyDetails = userCase.appl_allApplicants;
    } else {
      partyType = 'respondent';
      partyDetails = getPartyDetails(userCase, user.id);
    }
    const redirectUrl = getRedirectUrl(partyType);
    if (!partyDetails?.user?.pcqId) {
      const tokenKey: string = config.get('services.equalityAndDiversity.tokenKey');
      const url = config.get('services.equalityAndDiversity.url');
      const pcqEnabled = config.get('services.equalityAndDiversity.pcqEnabled');
      logger.info(`PCQEnabled : ${pcqEnabled}`);
      if (pcqEnabled && pcqEnabled === true && tokenKey && url) {
        const health = `${url}/health`;
        let pcqId;
        try {
          const response: AxiosResponse<StatusResponse> = await axios.get(health);

          if (response.data.status && response.data.status === 'UP') {
            pcqId = uuid();
            logger.info(`PCQ service: ${health} is UP, PCQ ID: ${pcqId}, pcqEnabled: ${pcqEnabled}`);
          } else {
            logger.error('PCQ service response.data: ' + response.data);
            logger.error(`PCQ service: ${health} is down, pcqEnabled: ${pcqEnabled}`);
            return res.redirect(redirectUrl);
          }
        } catch (err) {
          logger.error(`Could not connect to PCQ service: ${health}, pcqEnabled: ${pcqEnabled}`, err.message);
          return res.redirect(redirectUrl);
        }
        const params = {
          serviceId: userCase.caseTypeOfApplication === 'C100' ? 'prl_ca' : 'prl_da',
          actor: partyType.toLocaleUpperCase(),
          pcqId,
          partyId: user.email,
          returnUrl,
          language: req.session.lang || 'en',
          ccdCaseId: userCase.id,
        };
        params['token'] = createToken(params, tokenKey);
        params.partyId = encodeURIComponent(params.partyId);
        logger.info('*** Params : ' + JSON.stringify(params));
        logger.info(`PCQ service return URL: ${params.returnUrl}`);
        if (partyType === 'respondent') {
          req.session.userCase.respondentPcqId = pcqId;
        }
        const qs = Object.keys(params)
          .map(key => `${key}=${params[key]}`)
          .join('&');
        req.session.save(err => {
          if (err) {
            req.locals.logger.error('Error', err);
            throw err;
          }
          const path: string = config.get('services.equalityAndDiversity.path');
          logger.info(
            `PCQ service redirect URL: ${url}${path}?${qs}, pcqEnabled: ${pcqEnabled} completed successfully.`
          );
          return res.redirect(`${url}${path}?${qs}`);
        });
      } else {
        logger.info(
          `User already attempted for PCQ ID or pcqEnabled is not enabled:${partyDetails?.user.pcqId} , pcqEnabled: ${pcqEnabled}`
        );
        res.redirect(redirectUrl);
        return;
      }
    } else {
      return res.redirect(redirectUrl);
    }
  }
}

const getRedirectUrl = (partyType: PartyType): PageLink => {
  let redirectUrl = C100_CHECK_YOUR_ANSWER;
  if (partyType === PartyType.RESPONDENT) {
    redirectUrl = RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT;
  }
  return redirectUrl;
};

export interface StatusResponse {
  status: 'UP' | 'DOWN' | undefined;
}
