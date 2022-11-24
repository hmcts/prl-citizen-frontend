import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100_CASE_EVENT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PaymentHandler } from '../../../modules/payments/paymentController';
import { C100_CHECK_YOUR_ANSWER, C100_CONFIRMATIONPAGE } from '../../../steps/urls';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      if (req.body.saveAndComeLater) {
        this.saveAndComeLater(req, res, req.session.userCase);
      } else {
        //Submit case in case of help with fees is opted in else initiate payment
        if (req.session.userCase.helpWithFeesReferenceNumber) {
          await req.locals.C100Api.updateCase(
            req.session.userCase!.caseId!,
            req.session.userCase,
            req.originalUrl,
            C100_CASE_EVENT.CASE_SUBMIT
          );

          //redirect to help with fees confirmation page
          res.redirect(C100_CONFIRMATIONPAGE);
        } else {
          //Initiate payment for case and then submit case if success
          PaymentHandler(req, res);
        }
      }
    } catch (e) {
      req.locals.logger.error('Error happened in pay & submit case', e);
      res.redirect(C100_CHECK_YOUR_ANSWER);
    }
  }
}
