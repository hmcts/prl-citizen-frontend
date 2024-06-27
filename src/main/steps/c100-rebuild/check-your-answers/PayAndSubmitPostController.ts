import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PaymentHandler } from '../../../modules/payments/paymentController';
import { PCQProvider } from '../../../modules/pcq';
import { PCQController } from '../../../modules/pcq/controller';
import { C100_CHECK_YOUR_ANSWER } from '../../../steps/urls';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      req.session.paymentError = { hasError: false, errorContext: null };
      if (req.body.saveAndComeLater) {
        this.saveAndComeLater(req, res, req.session.userCase);
      } else {
        const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
        const form = new Form(fields);
        const { ...formData } = form.getParsedBody(req.body);
        req.session.errors = form.getErrors(formData);
        if (req.session.errors && req.session.errors.length) {
          return super.redirect(req, res, C100_CHECK_YOUR_ANSWER);
        }

        /** Invoke Pcq questionnaire
         * */
        if (!PCQProvider.getPcqId(req) && (await PCQProvider.isComponentEnabled())) {
          PCQController.launch(req, res, PCQProvider.getReturnUrl(req, PartyType.APPLICANT, 'c100-rebuild'));
        } else {
          this.handlePayment(req, res);
        }
      }
    } catch (e) {
      req.locals.logger.error('Error happened in application submission', e);
      req.session.save(() => {
        res.redirect(C100_CHECK_YOUR_ANSWER);
      });
    }
  }

  public async handlePayment(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    /** Invoke create payment
     * 1. Create only service request for case with help with fees opted
     * 2. Create service request & payment request ref in case of pay & submit
     * */
    PaymentHandler(req, res);
  }
}
