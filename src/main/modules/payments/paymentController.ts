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
  try {
    const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
    const { Authorization, ServiceAuthorization, returnUrL, caseId, applicantCaseName, hwfRefNumber } =
      paymentHelperTranspiler;
    const paymentApiEndpoint = config.get('services.cos.url');
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
    if (hwfRefNumber && response?.serviceRequestReference) {
      //help with fess, submit case without payment
      submitCase(
        req,
        res,
        req.session.userCase!.caseId!,
        req.session.userCase,
        req.originalUrl,
        C100_CASE_EVENT.CASE_SUBMIT_WITH_HWF
      );
    } else if (response?.serviceRequestReference && response?.payment_reference && response?.status === SUCCESS) {
      //previous payment is success, retry submit case with 'citizen-case-submit' & reidrect confirmation page
      submitCase(
        req,
        res,
        req.session.userCase!.caseId!,
        req.session.userCase,
        req.originalUrl,
        C100_CASE_EVENT.CASE_SUBMIT
      );
    } else if (response['next_url']) {
      //redirect to gov pay for making payment
      res.redirect(response['next_url']);
    } else {
      //redirect to check your answers with error
      populateError(req, res, 'Error in create service request/payment reference');
    }
  } catch (e) {
    req.locals.logger.error(e);
    populateError(req, res, 'Error in create service request/payment reference');
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
        config.get('services.cos.url') +
        `/fees-and-payment-apis/retrievePaymentStatus/${req.session.userCase?.paymentDetails?.['payment_reference']}/${caseId}`;
      const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
      const { Authorization, ServiceAuthorization } = paymentHelperTranspiler;
      const checkPayment = await new CheckPaymentStatusApi(PaymentURL, Authorization, ServiceAuthorization)
        .PaymentStatusInstance()
        .get('');
      const paymentStatus = checkPayment['data']['status'];
      if (paymentStatus && paymentStatus === SUCCESS) {
        req.session.userCase.paymentSuccessDetails = checkPayment['data'];
        //Invoke update case with 'citizen-case-submit' event & reidrect confirmation page
        submitCase(
          req,
          res,
          req.session.userCase!.caseId!,
          req.session.userCase,
          req.originalUrl,
          C100_CASE_EVENT.CASE_SUBMIT
        );
      } else {
        populateError(req, res, 'Error in retreive payment status');
      }
    } catch (error) {
      req.locals.logger.error(error);
      populateError(req, res, 'Error in retreive payment status');
    }
  }
};

export async function submitCase(
  req: AppRequest,
  res: Response,
  caseId: string,
  caseData: Partial<Case>,
  returnUrl: string,
  caseEvent: C100_CASE_EVENT
): Promise<void> {
  try {
    req.session.paymentError = false;
    const updatedCase = await req.locals.C100Api.updateCase(caseId, caseData, returnUrl, caseEvent);
    //update final document in session for download on confirmation
    req.session.userCase.finalDocument = updatedCase.data?.draftOrderDoc;
    //save & redirect to confirmation page
    req.session.save(() => {
      res.redirect(C100_CONFIRMATIONPAGE);
    });
  } catch (e) {
    req.locals.logger.error(e);
    populateError(req, res, 'Error in submit case');
  }
}

const populateError = (req: AppRequest, res: Response, errorMsg: string) => {
  req.locals.logger.error(errorMsg);
  req.session.paymentError = true;
  req.session.save(() => {
    res.redirect(C100_CHECK_YOUR_ANSWER);
  });
};
