import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { C100_CONFIRMATIONPAGE, DASHBOARD_URL } from '../../steps/urls';

import { CheckPaymentStatusApi, PaymentTaskResolver } from './paymentApi';
import { PaymentHelper } from './paymentHelper';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentHandler = async (req: AppRequest, res: Response) => {
  const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
  const { Authorization, ServiceAuthorization, returnUrL, caseId, applicantCaseName } = paymentHelperTranspiler;
  const paymentApiEndpoint = config.get('payments.url');
  const createPaymentEndpoint = '/fees-and-payment-apis/create-payment';
  const baseURL = paymentApiEndpoint + createPaymentEndpoint;

  const paymentCreator = new PaymentTaskResolver(
    baseURL,
    Authorization,
    ServiceAuthorization,
    caseId,
    returnUrL,
    applicantCaseName
  );
  const response = await paymentCreator.getPaymentCredentails();
  req.session.userCase.paymentDetails = response;
  res.redirect(response['next_url']);
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
          res.redirect(C100_CONFIRMATIONPAGE);
          break;
        default:
          req.session.paymentError = true;
          req.session.save(() => {
            res.redirect(DASHBOARD_URL);
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
};
