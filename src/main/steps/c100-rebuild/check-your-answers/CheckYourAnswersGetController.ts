import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../app/case/case';
import { PaymentErrorContext, PaymentStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class CheckYourAnswersGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    //Clear hwfRefNumber if not opted
    if (req.session.userCase.hwf_needHelpWithFees === YesOrNo.NO) {
      req.session.userCase.helpWithFeesReferenceNumber = undefined;
      req.session.save();
    }
    try {
      await req.locals.C100Api.saveC100DraftApplication(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        req.session.userCase?.caseId as string,
        req.session.userCase,
        req.originalUrl
      );

      //clear payment error
      setTimeout(() => {
        req.session.paymentError = { hasError: false, errorContext: null };
        req.session.save();
      }, 1000);
      super.get(req, res);
    } catch (error) {
      req.locals.logger.error('error in update case', error);

      if (req.session.paymentError.hasError === false) {
        req.session.paymentError =
          req.session.userCase.paymentSuccessDetails?.status === PaymentStatus.SUCCESS
            ? { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED }
            : { hasError: true, errorContext: PaymentErrorContext.DEFAULT_PAYMENT_ERROR };
        req.session.save(() => {
          super.get(req, res);
        });
      } else {
        super.get(req, res);
      }
    }
  }
}
