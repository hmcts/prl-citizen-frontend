
import { Response } from 'express';
import {AppRequest} from '../../app/controller/AppRequest'
import {PaymentHelper} from './paymentHelper'

export const PaymentHandler = async (req: AppRequest, res: Response) => {
        let PaymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
        res.json({msg: PaymentHelperTranspiler})
}