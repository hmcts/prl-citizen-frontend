import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';

import { PaymentHelper } from './paymentHelper';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentHandler = async (req: AppRequest, res: Response) => {
  const PaymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
  res.json({ msg: PaymentHelperTranspiler });
};
