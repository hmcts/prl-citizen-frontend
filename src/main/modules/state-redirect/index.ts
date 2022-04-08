import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';

//import { ApplyingWith, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
/* import {
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PageLink,
  TASK_LIST_URL,
} from '../../steps/urls'; */

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    dayjs.extend(customParseFormat);

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        return next();
      })
    );
  }
}
