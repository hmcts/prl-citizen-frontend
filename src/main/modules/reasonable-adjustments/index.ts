/* eslint-disable @typescript-eslint/no-explicit-any */
import https from 'https';

import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import { Application, Response } from 'express';
import Negotiator from 'negotiator';
import toBoolean from 'to-boolean';
import { v4 as uuid } from 'uuid';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import { Language } from '../../steps/common/common.content';
import { Step } from '../../steps/constants';
import { LanguageToggle } from '../i18n';

import { RAController, ReasonableAdjustementsController } from './controller';
import { RACommonComponentUserAction, RAData, RARequestPayload } from './definitions';
import { RANavigationController, ReasonableAdjustementsNavigationController } from './navigationController';
import { RARoute, ReasonableAdjustmentsRoute } from './route';
import { RASequence, ReasonableAdjustementsSequence } from './sequence';
import { RAService, ReasonableAdjustmentsService } from './service';
import { RAUtility, ReasonableAdjustementsUtility } from './util';

class ReasonableAdjustmentsProvider {
  private isEnabled = false;
  private appBaseUrl = '';
  private client: AxiosInstance | null = null;
  private logger: LoggerInstance | Record<string, never> = {};
  //private correlationId: string | null = null;
  //private urlBeforeRedirection = '';
  private sequence: ReasonableAdjustementsSequence;
  private route: ReasonableAdjustmentsRoute;
  service: ReasonableAdjustmentsService;
  controller: ReasonableAdjustementsController;
  utils: ReasonableAdjustementsUtility;
  navigationController: ReasonableAdjustementsNavigationController;

  constructor() {
    this.service = RAService;
    this.controller = RAController;
    this.sequence = RASequence;
    this.utils = RAUtility;
    this.route = RARoute;
    this.navigationController = RANavigationController;
  }

  private canProcessRequest(): boolean {
    return !!(this.isEnabled && this.client);
  }

  private createAndSaveCorrelationId(req: AppRequest): Promise<void> {
    return new Promise(resolve => {
      (async () => {
        await this.resetCorrelationId(req);
        await this.createSession(req);
        req.session.applicationSettings!.reasonableAdjustments.correlationId = uuid();
        return req.session.save(resolve);
      })();
    });
  }

  private getCorrelationId(req: AppRequest): string | null {
    return req.session?.applicationSettings?.reasonableAdjustments?.correlationId;
  }

  private resetCorrelationId(req: AppRequest): Promise<void> {
    return new Promise(resolve => {
      if (req.session?.applicationSettings?.reasonableAdjustments?.hasOwnProperty('correlationId')) {
        req.session.applicationSettings.reasonableAdjustments.correlationId = null;
        return req.session.save(resolve);
      } else {
        resolve();
      }
    });
  }

  private resetLanguagePrefData(req: AppRequest): Promise<void> {
    return new Promise(resolve => {
      if (req.session?.userCase?.ra_languageReqAndSpecialArrangements) {
        delete req.session.userCase.ra_languageReqAndSpecialArrangements;
        return req.session.save(resolve);
      } else {
        resolve();
      }
    });
  }

  private createSession(req: AppRequest): Promise<void> {
    return new Promise(resolve => {
      if (req.session?.applicationSettings?.reasonableAdjustments) {
        resolve();
      } else {
        req.session.applicationSettings = {
          ...req.session.applicationSettings,
          reasonableAdjustments: {
            correlationId: null,
            urlBeforeRedirection: '',
          },
        };

        return req.session.save(resolve);
      }
    });
  }

  async enable(app: Application): Promise<void> {
    this.isEnabled = await this.isComponentEnabled();
    if (this.isEnabled) {
      this.route.enable(app);
    }
  }

  APIClient(): AxiosInstance | null {
    return this.client;
  }

  getAppBaseUrl(): string {
    return this.appBaseUrl;
  }

  /*async recordPageNavigation(req: AppRequest, done: () => void) {
    const url = req.originalUrl;
    if (url.includes(C100_URL) && this.route.routes.length && !this.route.routes.includes(url)) {
      await this.createSession(req);
      req.session.applicationSettings!.reasonableAdjustments.urlBeforeRedirection = url;
      req.session.save(() => {
        done();
      });
    } else {
      done();
    }
  }*/

  async isComponentEnabled(): Promise<boolean> {
    const isEnabled =
      getFeatureToggle()?.isRAComponentEnabled() ?? toBoolean(config.get<boolean>('featureToggles.enableRAComponent'));
    return isEnabled;
  }

  async getSequence(): Promise<Step[] | []> {
    const isEnabled = await this.isComponentEnabled();
    const sequence = this.sequence.getSequence();

    if (!isEnabled) {
      sequence.splice(-5);
    }

    return sequence;
  }

  async init(appRequest: AppRequest): Promise<void> {
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

      await this.createSession(appRequest);
      return Promise.resolve();
    }

    return Promise.resolve();
  }

  async launch(
    data: RARequestPayload['existingFlags'],
    language: Language,
    req: AppRequest,
    res: Response
  ): Promise<void> {
    if (this.canProcessRequest()) {
      await this.createAndSaveCorrelationId(req);
      await this.resetLanguagePrefData(req);
      //this.correlationId = uuid();
      try {
        const response = await this.service.getCommonComponentUrl(this.getCorrelationId(req)!, data, language);

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

  trySettlingRequest(req: AppRequest, correlationId: string, action: RAData['action']): Promise<any> {
    return new Promise((resolve, reject) => {
      const _correlationId = this.getCorrelationId(req);
      console.info('**** correlationId ****', _correlationId);

      (async () => {
        await this.resetCorrelationId(req);
        await this.resetLanguagePrefData(req);

        if (_correlationId === correlationId) {
          if (action === RACommonComponentUserAction.SUBMIT) {
            resolve(action);
          } else {
            reject(new Error('user-cancelled'));
          }
        } else {
          const errorMsg = 'RA - cannot process data as correlationId does not match';
          this.log('error', errorMsg);
          reject(new Error(errorMsg));
        }
      })();
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

  resetData(req: AppRequest): Promise<void> {
    console.info('**** RA-resetData ****');
    return new Promise(resolve => {
      delete req.session?.applicationSettings?.reasonableAdjustments;
      delete req.session?.userCase?.ra_existingFlags;
      delete req.session?.userCase?.ra_languageReqAndSpecialArrangements;
      req.session.save(resolve);
    });
  }

  async destroy(req: AppRequest): Promise<void> {
    console.info('**** RA-destroy ****');
    this.appBaseUrl = '';
    this.client = null;
    await this.resetData(req);
  }
}

export const RAProvider = new ReasonableAdjustmentsProvider();
