import { Application } from 'express';

import { FormFieldsFn } from '../../../main/app/form/Form';
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

    app.get(
      applyParms(PCQ_CALLBACK_URL, { context: 'c100-rebuild' }),
      errorHandler(new PayAndSubmitPostController({} as FormFieldsFn).handlePayment)
    );
    app.get(
      applyParms(PCQ_CALLBACK_URL, { context: 'c7-response' }),
      errorHandler(new ResponseSummaryConfirmationPostController({} as FormFieldsFn).submitC7Response)
    );
  }
}

export const PCQRoute = new PcqRoute();
