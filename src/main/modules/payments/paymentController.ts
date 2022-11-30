import config from 'config';
import { Response } from 'express';

import { Case } from '../../app/case/case';
import { C100_CASE_EVENT } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { C100_CHECK_YOUR_ANSWER, C100_CONFIRMATIONPAGE } from '../../steps/urls';

import { CheckPaymentStatusApi, PaymentTaskResolver } from './paymentApi';
import { PaymentHelper } from './paymentHelper';
const SUCCESS = 'Success';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentHandler = async (req: AppRequest, res: Response) => {
  const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
  const { Authorization, ServiceAuthorization, returnUrL, caseId, applicantCaseName, hwfRefNumber } =
    paymentHelperTranspiler;
  const paymentApiEndpoint = config.get('payments.url');
  const createPaymentEndpoint = '/fees-and-payment-apis/create-payment';
  const baseURL = paymentApiEndpoint + createPaymentEndpoint;

  const paymentCreator = new PaymentTaskResolver(
    baseURL,
    Authorization,
    ServiceAuthorization,
    caseId,
    returnUrL,
    applicantCaseName as string,
    hwfRefNumber as string
  );
  const response = await paymentCreator.getPaymentCredentails();
  req.session.userCase.paymentDetails = response;
  //if previous payment is success then invoke submit case else redirect gov.uk
  //if help with fees opted then submit case & redirect to confirmation page
  if (hwfRefNumber || SUCCESS === response?.status) {
    await submitCase(
      req,
      res,
      req.session.userCase!.caseId!,
      req.session.userCase,
      req.originalUrl,
      C100_CASE_EVENT.CASE_SUBMIT
    );
  } else {
    res.redirect(response['next_url']);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentValidationHandler = async (req: AppRequest, res: Response) => {
  if (!req.params.hasOwnProperty('status') && !req.params.hasOwnProperty('paymentId')) {
    res.status(500);
  } else {
    try {
      const { caseId } = req.session.userCase;
      const PaymentURL =
        config.get('payments.url') +
        `/fees-and-payment-apis/retrievePaymentStatus/${req.session.userCase?.paymentDetails?.['payment_reference']}/${caseId}`;
      const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
      const { Authorization, ServiceAuthorization } = paymentHelperTranspiler;
      const checkPayment = await new CheckPaymentStatusApi(PaymentURL, Authorization, ServiceAuthorization)
        .PaymentStatusInstance()
        .get('');
      const paymentStatus = checkPayment['data']['status'];
      switch (paymentStatus) {
        case 'Success':
          req.session.userCase.paymentSuccessDetails = checkPayment['data'];
          //Invoke update case with 'citizen-case-submit' event & reidrect confirmation page
          await submitCase(
            req,
            res,
            req.session.userCase!.caseId!,
            req.session.userCase,
            req.originalUrl,
            C100_CASE_EVENT.CASE_SUBMIT
          );
          break;
        default:
          req.session.paymentError = true;
          req.session.save(() => {
            res.redirect(C100_CHECK_YOUR_ANSWER);
          });
      }
    } catch (error) {
      req.locals.logger.error(error);
      res.status(500);
    }
  }
};

async function submitCase(
  req: AppRequest,
  res: Response,
  caseId: string,
  caseData: Partial<Case>,
  returnUrl: string,
  caseEvent: C100_CASE_EVENT
): Promise<void> {
  try {
    const updatedCase = await req.locals.C100Api.updateCase(caseId, caseData, returnUrl, caseEvent);
    //update final document in session for download on confirmation
    req.session.userCase.finalDocument = updatedCase?.finalDocument;
    //save & redirect to confirmation page
    req.session.save(() => {
      res.redirect(C100_CONFIRMATIONPAGE);
    });
  } catch (e) {
    req.locals.logger.error('Error in submit case ', e);
    req.session.paymentError = true;
    req.session.save(() => {
      res.redirect(C100_CHECK_YOUR_ANSWER);
    });
  }
}
