import { Response } from 'express';

import { getSystemUser } from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { APPLICANT_TASK_LIST_URL } from '../../../urls';
import { generateContent } from '../content';

export class GetCaseController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
  public async getCase(req: AppRequest, res: Response): Promise<void> {
    if (req.params?.caseId) {
      const caseworkerUser = await getSystemUser();
      const caseReference = req.params?.caseId;

      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      req.session.userCase = caseDataFromCos;
    }
    req.session.save(() => res.redirect(APPLICANT_TASK_LIST_URL));
  }
}
