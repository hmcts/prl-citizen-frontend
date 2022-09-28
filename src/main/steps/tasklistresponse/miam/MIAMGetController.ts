import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { RESPONSE_MIAM_ELEMENTS } from '../../../steps/constants';
import { MIAM_START } from '../../urls';
export class MIAMGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      await super.getCaseDataFromCCDAndMapFields(req, res, RESPONSE_MIAM_ELEMENTS, MIAM_START);
    } catch (err) {
      throw new Error('MIAMGetController - Case Data could not be retrieved.');
    }
  }
}
