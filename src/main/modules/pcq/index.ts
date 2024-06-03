/* eslint-disable @typescript-eslint/no-explicit-any */

import crypto from 'crypto';

import { AxiosError } from 'axios';
import config from 'config';
import { Application, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { LoggerInstance } from 'winston';

import { AppRequest } from '../../app/controller/AppRequest';

import { PCQController, PcqController } from './controller';
import { PcqParameters } from './definitions';
import { PCQRoute, PcqRoute } from './routes';
import { PCQService, PcqService } from './service';

export class PcqProvider {
  private isEnabled = false;
  private logger: LoggerInstance | Record<string, never> = {};

  private algorithm = 'aes-256-gcm';
  private bufferSize = 16;
  private iv = Buffer.alloc(this.bufferSize, 0); // Initialization vector.
  private keyLen = 32;
  private route: PcqRoute;
  service: PcqService;
  controller: PcqController;

  constructor() {
    this.service = PCQService;
    this.controller = PCQController;
    this.route = PCQRoute;
  }

  private savePcqId(req: AppRequest, pcqId: string): Promise<void> {
    return new Promise(resolve => {
      (async () => {
        await this.resetPcqId(req);
        if (req.session.applicationSettings) {
          req.session.applicationSettings.pcqId = pcqId;
        } else {
          req.session.applicationSettings = {
            pcqId,
          };
        }
        return req.session.save(resolve);
      })();
    });
  }

  getPcqId(req: AppRequest): string | null {
    return req.session?.applicationSettings?.pcqId;
  }

  private resetPcqId(req: AppRequest): Promise<void> {
    return new Promise(resolve => {
      if (req.session?.applicationSettings?.pcqId) {
        req.session.applicationSettings.pcqId = null;
        return req.session.save(resolve);
      } else {
        resolve();
      }
    });
  }

  async enable(app: Application): Promise<void> {
    this.isEnabled = await this.isComponentEnabled();
    if (this.isEnabled) {
      this.route.enable(app);
    }
  }

  async isComponentEnabled(): Promise<boolean> {
    const pcqEnabled = config.get('services.equalityAndDiversity.pcqEnabled');
    const isEnabled = pcqEnabled ? pcqEnabled === 'true' : false;
    return new Promise(resolve => {
      resolve(isEnabled);
    });
  }

  async init(appRequest: AppRequest): Promise<void> {
    this.logger = appRequest.locals.logger;
    return Promise.resolve();
  }

  log(type: string, errorMsg: string | AxiosError): void {
    if (this.logger && this.logger?.[type]) {
      this.logger[type](errorMsg);
    }
  }

  createToken(params: PcqParameters, tokenKey: string): string {
    const key = crypto.scryptSync(tokenKey, 'salt', this.keyLen);

    // Convert all params to string before encrypting
    Object.keys(params).forEach(p => {
      params[p] = String(params[p]);
    });
    const strParams = JSON.stringify(params);
    const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);

    let encrypted = '';
    encrypted = cipher.update(strParams, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  async buildRequestParams(req: AppRequest, returnUrl: string): Promise<PcqParameters> {
    const pcqId = uuid();
    const caseData = req.session.userCase;
    const tokenKey: string = config.get('services.equalityAndDiversity.tokenKey');
    let partyType = 'respondent';
    if (req.url.includes('c100-rebuild')) {
      partyType = 'applicant';
    }
    const params = {
      serviceId: caseData.caseTypeOfApplication === 'C100' ? 'prl_ca' : 'prl_da',
      actor: partyType.toLocaleUpperCase(),
      pcqId,
      partyId: req.session.user.email,
      returnUrl,
      language: req.session.lang || 'en',
      ccdCaseId: caseData.id ?? caseData.caseId,
    };
    params['token'] = this.createToken(params, tokenKey);
    if (partyType === 'applicant') {
      req.session.userCase.applicantPcqId = pcqId;
    }
    this.savePcqId(req, pcqId);
    return params;
  }

  async getPcqServiceUrl(url: string, path: string, req: AppRequest, returnUrl: string): Promise<string> {
    const params = await this.buildRequestParams(req, returnUrl);
    const qs = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${url}${path}?${qs}`;
  }

  async launchPcqService(req: AppRequest, res: Response, url: string): Promise<void> {
    try {
      req.session.save(err => {
        if (err) {
          req.locals.logger.error('Error', err);
          throw err;
        }
        return res.redirect(url);
      });
    } catch (err) {
      PCQProvider.log('error', err);
    }
  }
}

export const PCQProvider = new PcqProvider();
