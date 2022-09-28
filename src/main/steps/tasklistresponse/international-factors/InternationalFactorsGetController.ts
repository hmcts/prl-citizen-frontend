import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS } from '../../../steps/constants';
import { INTERNATIONAL_FACTORS_START } from '../../urls';
export class InternationalFactorsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      await super.getCaseDataFromCCDAndMapFields(
        req,
        res,
        RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS,
        INTERNATIONAL_FACTORS_START
      );
    } catch (err) {
      throw new Error('InternationalFactorsGetController - Case Data could not be retrieved.');
    }
  }
}
