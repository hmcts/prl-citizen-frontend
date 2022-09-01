
import { Response } from 'express';
import {AppRequest} from '../../app/controller/AppRequest'


export const PaymentHandler = (req: AppRequest, res: Response) : any => {
        res.json({msg: 'gateway is delivered'})
}