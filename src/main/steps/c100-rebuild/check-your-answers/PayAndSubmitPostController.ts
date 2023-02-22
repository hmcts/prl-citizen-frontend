import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100_CASE_EVENT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
//import { PaymentHandler } from '../../../modules/payments/paymentController';
import { C100_CHECK_YOUR_ANSWER, C100_CONFIRMATIONPAGE } from '../../../steps/urls';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      req.session.paymentError = false;
      if (req.body.saveAndComeLater) {
        this.saveAndComeLater(req, res, req.session.userCase);
      } else {
        const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
        const form = new Form(fields);
        const { ...formData } = form.getParsedBody(req.body);
        req.session.errors = form.getErrors(formData);
        if (req.session.errors && req.session.errors.length) {
          return super.redirect(req, res, C100_CHECK_YOUR_ANSWER);
        }

        /** Invoke create payment
         * 1. Create only service request for case with help with fees opted
         * 2. Create service request & payment request ref in case of pay & submit
         * */
        /** COMMENTED OUT FOR CASE PROGRESSION TESTING - DO NOT MERGE TO MASTER */
        //PaymentHandler(req, res);

        /** SUBMITTING CASE WITHOUT PAYMENT - TEST FOR CASE PROGRESSION */
        const updatedCase = await req.locals.C100Api.updateCase(
          req.session.userCase!.caseId!,
          req.session.userCase,
          req.originalUrl,
          C100_CASE_EVENT.CASE_SUBMIT
        );
        //update final document in session for download on confirmation
        req.session.userCase.finalDocument = updatedCase.data?.draftOrderDoc;
        //save & redirect to confirmation page
        req.session.save(() => {
          res.redirect(C100_CONFIRMATIONPAGE);
        });
        /** SUBMITTING CASE WITHOUT PAYMENT - TEST FOR CASE PROGRESSION */
      }
    } catch (e) {
      req.session.paymentError = true;
      req.locals.logger.error('Error happened in pay & submit case', e);
      res.redirect(C100_CHECK_YOUR_ANSWER);
    }
  }
}
