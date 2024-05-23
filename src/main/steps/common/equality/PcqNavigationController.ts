import crypto from 'crypto';

import { Logger } from '@hmcts/nodejs-logging';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';

import { PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../../tasklistresponse/utils';
import { C100_CHECK_YOUR_ANSWER_REDIRECT, PageLink, RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT } from '../../urls';

import { PcqParameters, StatusResponse } from './definitions';

const algorithm = 'aes-256-gcm';
const bufferSize = 16;
const iv = Buffer.alloc(bufferSize, 0); // Initialization vector.
const keyLen = 32;
const logger = Logger.getLogger('PCQGetController');

export default class PCQGetController {
  public async get(req: AppRequest, res: Response, returnUrl: string): Promise<void> {
    const { userCase, user } = req.session;
    let partyType;
    let partyDetails;
    let pcqExists;
    if (req.url.includes('c100-rebuild')) {
      partyType = 'applicant';
      partyDetails = userCase.appl_allApplicants;
      pcqExists = userCase.applicantPcqId ? true : undefined;
    } else {
      partyType = 'respondent';
      partyDetails = getPartyDetails(userCase, user.id);
      pcqExists = partyDetails?.user?.pcqId ? true : undefined;
    }
    const redirectUrl = getRedirectUrl(partyType);
    if (!pcqExists) {
      const tokenKey: string = config.get('services.equalityAndDiversity.tokenKey');
      const url = config.get('services.equalityAndDiversity.url');
      const pcqEnabled = config.get('services.equalityAndDiversity.pcqEnabled');
      logger.info(`PCQEnabled : ${pcqEnabled}`);
      if (pcqEnabled && pcqEnabled === 'true' && tokenKey && url) {
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
          ccdCaseId: userCase.id ?? userCase.caseId,
        };
        params['token'] = createToken(params, tokenKey);
        logger.info('*** Params : ' + JSON.stringify(params));
        logger.info('*** Token Key ' + tokenKey);
        logger.info(`PCQ service return URL: ${params.returnUrl}`);
        if (partyType === 'respondent') {
          req.session.userCase.respondentPcqId = pcqId;
        } else {
          req.session.userCase.applicantPcqId = pcqId;
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
        logger.info(`User already attempted for PCQ with ID :${partyDetails?.user.pcqId} , pcqEnabled: ${pcqEnabled}`);
        return res.redirect(redirectUrl);
      }
    } else {
      return res.redirect(redirectUrl);
    }
  }
}

const getRedirectUrl = (partyType: PartyType): PageLink => {
  let redirectUrl = C100_CHECK_YOUR_ANSWER_REDIRECT;
  if (partyType === PartyType.RESPONDENT) {
    redirectUrl = RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT;
  }
  return redirectUrl;
};

export const createToken = (params: PcqParameters, tokenKey: string): string => {
  const key = crypto.scryptSync(tokenKey, 'salt', keyLen);

  // Convert all params to string before encrypting
  Object.keys(params).forEach(p => {
    params[p] = String(params[p]);
  });
  const strParams = JSON.stringify(params);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = '';
  encrypted = cipher.update(strParams, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};
