import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { APPLICANT_TASK_LIST_URL } from '../../../steps/urls';

export class GetCaseController {
  public async getCase(req: AppRequest, res: Response): Promise<void> {
    if (req.params?.caseId && req.session?.userCaseList) {
      req.session?.userCaseList.forEach((element: CaseWithId) => {
        if (element?.id.toString() === req.params?.caseId) {
          req.session.userCase = element;
        }
      });
    }
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
