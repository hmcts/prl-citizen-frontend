//import path from 'path';

import { Application } from 'express';

import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_BACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
} from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustmentsRoute {
  public routes: string[];

  constructor() {
    this.routes = [
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
      REASONABLE_ADJUSTMENTS_BACK_URL,
    ];
  }

  enable(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(this.routes[0], errorHandler(RAProvider.controller.launch));
    app.get(applyParms(this.routes[1], { baseUrl: '' }), errorHandler(RAProvider.controller.fetchData));
    app.get(this.routes[2], errorHandler(RAProvider.controller.handleBackNavigation));
  }
}

export const RARoute = new ReasonableAdjustmentsRoute();
