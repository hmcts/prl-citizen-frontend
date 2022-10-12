import { Response } from 'express';

import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { CosApiClient } from '../case/CosApiClient';

import { AppRequest } from './AppRequest';

export class GetCaseController {
  //constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

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
