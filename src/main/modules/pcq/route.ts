import { Application } from 'express';

import { stepsWithContent } from '../../steps/';
import PayAndSubmitPostController from '../../steps/c100-rebuild/check-your-answers/PayAndSubmitPostController';
import { applyParms } from '../../steps/common/url-parser';
import ResponseSummaryConfirmationPostController from '../../steps/tasklistresponse/summary/postController';
import { PCQ_CALLBACK_URL } from '../../steps/urls';

export class PcqRoute {
  public routes: string[];

  constructor() {
    this.routes = [PCQ_CALLBACK_URL];
  }

  enable(app: Application): void {
    const { errorHandler } = app.locals;
    const steps = [...stepsWithContent];

    for (const step of steps) {
      if (step.form) {
        app.get(
          applyParms(PCQ_CALLBACK_URL, { context: 'c100-rebuild' }),
          errorHandler(new PayAndSubmitPostController(step.form.fields).handlePayment)
        );
        app.get(
          applyParms(PCQ_CALLBACK_URL, { context: 'c7-response' }),
          errorHandler(new ResponseSummaryConfirmationPostController(step.form.fields).submitC7Response)
        );
      }
    }
  }
}

export const PCQRoute = new PcqRoute();
