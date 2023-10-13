import path from 'path';

import { Application } from 'express';

import { GetController } from '../../app/controller/GetController';
import { generateContent as confirmationContent } from '../../steps/common/reasonable-adjustements/confirmation/content';
import { generateContent as guidanceContent } from '../../steps/common/reasonable-adjustements/guidance/content';
import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
} from '../../steps/urls';

import { RAProvider } from './index';

class ReasonableAdjustmentsRoute {
  private templateRoot: string;

  constructor() {
    this.templateRoot = path.join(__dirname, '../../steps/common/reasonable-adjustements');
  }

  enable(app: Application) {
    const { errorHandler } = app.locals;

    app.get(
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
      errorHandler(new GetController(`${this.templateRoot}/guidance/template`, guidanceContent).get)
    );

    app.get(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH, errorHandler(RAProvider.controller.launch));

    app.get(
      applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL, { baseUrl: '' }),
      errorHandler(RAProvider.controller.fetchData)
    );

    app.get(
      REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
      errorHandler(new GetController(`${this.templateRoot}/confirmation/template`, confirmationContent).get)
    );
  }
}

export const RARoute = new ReasonableAdjustmentsRoute();
