import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PaymentErrorContext } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PaymentHandler } from '../../../modules/payments/paymentController';
import { C100_CHECK_YOUR_ANSWER } from '../../../steps/urls';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      /** Invoke create payment
       * 1. Create only service request for case with help with fees opted
       * 2. Create service request & payment request ref in case of pay & submit
       * */
      PaymentHandler(req, res);
    } catch (e) {
      req.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.DEFAULT_PAYMENT_ERROR };
      req.locals.logger.error('Error happened in pay & submit case', e);
      req.session.save(() => {
        res.redirect(C100_CHECK_YOUR_ANSWER);
      });
    }
  }
}
