import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PaymentHandler } from '../../../modules/payments/paymentController';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    /** Invoke create payment
     * 1. Create only service request for case with help with fees opted
     * 2. Create service request & payment request ref in case of pay & submit
     * */
    PaymentHandler(req, res);
  }
}
