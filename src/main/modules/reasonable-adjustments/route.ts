import path from 'path';

import { Application } from 'express';

import { GetController } from '../../app/controller/GetController';
import { generateContent as confirmationContent } from '../../steps/common/reasonable-adjustments/confirmation/content';
import { generateContent as guidanceContent } from '../../steps/common/reasonable-adjustments/guidance/content';
import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_BACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
} from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustmentsRoute {
  private templateRoot: string;
  public routes: string[];

  constructor() {
    this.routes = [
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
      REASONABLE_ADJUSTMENTS_BACK_URL,
    ];
    this.templateRoot = path.join(__dirname, '../../steps/common/reasonable-adjustments');
  }

  enable(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(
      this.routes[0],
      errorHandler(new GetController(`${this.templateRoot}/guidance/template`, guidanceContent).get)
    );

    app.get(this.routes[1], errorHandler(RAProvider.controller.launch));

    app.get(applyParms(this.routes[2], { appBaseUrl: '' }), errorHandler(RAProvider.controller.fetchData));

    app.get(
      this.routes[3],
      errorHandler(new GetController(`${this.templateRoot}/confirmation/template`, confirmationContent).get)
    );

    app.get(this.routes[4], errorHandler(RAProvider.controller.handleBackNavigation));
  }
}

export const RARoute = new ReasonableAdjustmentsRoute();
