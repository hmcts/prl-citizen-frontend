import https from 'https';

import Axios, { AxiosInstance } from 'axios';
import config from 'config';
import { Application, Response } from 'express';
import toBoolean from 'to-boolean';
import { v4 as uuid } from 'uuid';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { CommonComponentUserAction } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import { Language } from '../../steps/common/common.content';

import { RAData, RARequestPayload } from './interface';
import { RARoute } from './route';
import { RAService, ReasonableAdjustmentsService } from './service';

class ReasonableAdjustmentsProvider {
  private isEnabled = false;
  private appBaseUrl = '';
  private client: AxiosInstance | null = null;
  private logger: LoggerInstance | Record<string, never> = {};
  private correlationId: string | null = null;
  service: ReasonableAdjustmentsService;

  constructor() {
    this.service = RAService;
  }

  async enable(app: Application): Promise<void> {
    const isEnabled =
      (await getFeatureToggle()?.isRAComponentEnabled()) ??
      toBoolean(config.get<boolean>('featureToggles.enableRAComponent'));
    this.isEnabled = isEnabled;
    if (isEnabled) {
      RARoute.enable(app);
    }
  }

  APIClient() {
    return this.client;
  }

  getAppBaseUrl() {
    return this.appBaseUrl;
  }

  canProcessRequest() {
    return this.isEnabled && this.client;
  }

  init(appRequest: AppRequest): void {
    this.logger = appRequest.locals.logger;

    if (this.isEnabled && !this.client) {
      this.appBaseUrl = `${appRequest.protocol}://${appRequest.get('host')}`;
      this.client = Axios.create({
        baseURL: config.get('services.reasonableAdjustments.url'),
        headers: {
          'idam-token': `Bearer ${appRequest.session.user.accessToken}`,
          'service-token': getServiceAuthToken(),
          Accept: 'application/json',
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
    }
  }

  async launch(data: RARequestPayload['existingFlags'], language: Language, res: Response): Promise<void> {
    this.resetData();

    if (this.canProcessRequest()) {
      this.correlationId = uuid();
      try {
        const response = await this.service.getCommonComponentUrl(this.correlationId, data, language);

        if (response.url) {
          return res.redirect(response.url);
        } else {
          const errorMsg = 'RA - cannot proceess request';
          this.log('error', errorMsg);
          throw new Error(errorMsg);
        }
      } catch (error) {
        const errorMsg = error?.response?.data ? JSON.stringify(error.response.data) : error.message;
        this.log('info', error?.message);
        this.log('error', errorMsg);
        throw new Error(errorMsg);
      }
    } else {
      const errorMsg = 'RA - cannot proceess request';
      this.log('error', errorMsg);
      throw new Error(errorMsg);
    }
  }

  trySettlingRequest(correlationId: string, action: RAData['action']): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.correlationId === correlationId) {
        if (action === CommonComponentUserAction.SUBMIT) {
          resolve();
        } else {
          reject(new Error('RA - user cancelled operation'));
        }
      } else {
        const errorMsg = 'RA - cannot process data as correlationId does not match';
        this.log('error', errorMsg);
        reject(new Error(errorMsg));
      }
    });
  }

  log(type: string, errorMsg: string) {
    if (this.logger && this.logger?.[type]) {
      this.logger[type](errorMsg);
    }
  }

  private resetData() {
    this.correlationId = null;
  }

  destroy() {
    this.resetData();
    this.appBaseUrl = '';
    this.client = null;
  }
}

export const RAProvider = new ReasonableAdjustmentsProvider();
