import https from 'https';

import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import { Application, Response } from 'express';
import Negotiator from 'negotiator';
import toBoolean from 'to-boolean';
import { v4 as uuid } from 'uuid';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { CommonComponentUserAction } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import { Language } from '../../steps/common/common.content';
import { Step } from '../../steps/constants';
import { LanguageToggle } from '../i18n';

import { RAController, ReasonableAdjustementsController } from './controller';
import { RAData, RARequestPayload } from './interface';
import { RARoute } from './route';
import { RASequence, ReasonableAdjustementsSequence } from './sequence';
import { RAService, ReasonableAdjustmentsService } from './service';

class ReasonableAdjustmentsProvider {
  private isEnabled = false;
  private appBaseUrl = '';
  private client: AxiosInstance | null = null;
  private logger: LoggerInstance | Record<string, never> = {};
  private correlationId: string | null = null;
  service: ReasonableAdjustmentsService;
  controller: ReasonableAdjustementsController;
  private sequence: ReasonableAdjustementsSequence;

  constructor() {
    this.service = RAService;
    this.controller = RAController;
    this.sequence = RASequence;
  }

  async enable(app: Application): Promise<void> {
    this.isEnabled = await this.isComponentEnabled();
    if (this.isEnabled) {
      RARoute.enable(app);
    }
  }

  APIClient(): AxiosInstance | null {
    return this.client;
  }

  getAppBaseUrl(): string {
    return this.appBaseUrl;
  }

  async isComponentEnabled(): Promise<boolean> {
    const isEnabled =
      getFeatureToggle()?.isRAComponentEnabled() ?? toBoolean(config.get<boolean>('featureToggles.enableRAComponent'));
    return isEnabled;
  }

  async getSequence(): Promise<Step[] | []> {
    const isEnabled = await this.isComponentEnabled();

    return isEnabled ? this.sequence.getSequence() : [];
  }

  canProcessRequest(): boolean {
    return !!(this.isEnabled && this.client);
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
      console.info('**** this.correlationId ****', this.correlationId);
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

  getPreferredLanguage(req: AppRequest): string {
    // User selected language
    const requestedLanguage = req.query['lng'] as string;
    if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }

    // Saved session language
    if (req.session?.lang) {
      return req.session.lang;
    }

    // Browsers default language
    const negotiator = new Negotiator(req);
    return negotiator.language(LanguageToggle.supportedLanguages) || 'en';
  }

  log(type: string, errorMsg: string | AxiosError): void {
    if (this.logger && this.logger?.[type]) {
      this.logger[type](errorMsg);
    }
  }

  private resetData(): void {
    console.info('**** RA-resetData ****');
    this.correlationId = null;
  }

  destroy(): void {
    console.info('**** RA-destroy ****');
    this.resetData();
    this.appBaseUrl = '';
    this.client = null;
  }
}

export const RAProvider = new ReasonableAdjustmentsProvider();
