/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default */

import { AxiosError } from 'axios';
import config from 'config';
import { Application } from 'express';
import toBoolean from 'to-boolean';
import { LoggerInstance } from 'winston';

import { AppRequest } from '../../app/controller/AppRequest';
import { getFeatureToggle } from '../../app/utils/featureToggles';
import { Step } from '../../steps/constants';

import { RAController, ReasonableAdjustementsController } from './controller';
import { RANavigationController, ReasonableAdjustementsNavigationController } from './navigationController';
import { RARoute, ReasonableAdjustmentsRoute } from './route';
import { RASequence, ReasonableAdjustementsSequence } from './sequence';
import { RAUtility, ReasonableAdjustementsUtility } from './util';

class ReasonableAdjustmentsProvider {
  private isEnabled = false;
  private logger: LoggerInstance | Record<string, never> = {};
  //private correlationId: string | null = null;
  //private urlBeforeRedirection = '';
  private sequence: ReasonableAdjustementsSequence;
  private route: ReasonableAdjustmentsRoute;
  controller: ReasonableAdjustementsController;
  utils: ReasonableAdjustementsUtility;
  navigationController: ReasonableAdjustementsNavigationController;

  constructor() {
    this.controller = RAController;
    this.sequence = RASequence;
    this.utils = RAUtility;
    this.route = RARoute;
    this.navigationController = RANavigationController;
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

    if (this.isEnabled) {
      await this.createSession(appRequest);
      return Promise.resolve();
    }

    return Promise.resolve();
  }

  log(type: string, errorMsg: string | AxiosError): void {
    if (this.logger && this.logger?.[type]) {
      this.logger[type](errorMsg);
    }
  }

  resetData(req: AppRequest): Promise<void> {
    return new Promise(resolve => {
      delete req.session?.applicationSettings?.reasonableAdjustments;
      delete req.session?.userCase?.ra_existingFlags;
      delete req.session?.userCase?.ra_languageReqAndSpecialArrangements;
      req.session.save(resolve);
    });
  }

  async destroy(req: AppRequest): Promise<void> {
    await this.resetData(req);
  }
}

export const RAProvider = new ReasonableAdjustmentsProvider();
