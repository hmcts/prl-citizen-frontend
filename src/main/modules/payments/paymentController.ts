import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';

import { PaymentTaskResolver } from './paymentApi';
import { PaymentHelper } from './paymentHelper';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentHandler = async (req: AppRequest, res: Response) => {
  const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
  const { Authorization, ServiceAuthorization, returnUrL, caseId, applicantCaseName } = paymentHelperTranspiler;

  const paymentApiEndpoint = config.get('payments.url');
  const createPaymentEndpoint = '/fees-and-payment-apis/create-payment';
  const baseURL = paymentApiEndpoint + createPaymentEndpoint;

  console.log({ baseURL });

  const paymentCreator = new PaymentTaskResolver(
    baseURL,
    Authorization,
    ServiceAuthorization,
    caseId,
    returnUrL,
    applicantCaseName
  );
  paymentCreator.getPaymentCredentails();
  res.json({ msg: paymentHelperTranspiler, data: paymentCreator.getPaymentCredentails() });
};
