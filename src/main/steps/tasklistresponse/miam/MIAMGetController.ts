import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { MIAM_START } from '../../../steps/urls';
import { mapDataInSession } from '../utils';
export class MIAMGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const citizenUser = req.session.user;
      const caseId = req.params?.caseId;
      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');

      req.session.userCase = await client.retrieveByCaseId(caseId, citizenUser);
      mapDataInSession(req.session.userCase, citizenUser.id);
      req.session.save(() => res.redirect(MIAM_START));
    } catch (err) {
      throw new Error('MIAMGetController - Case Data could not be retrieved.');
    }
  }
}
