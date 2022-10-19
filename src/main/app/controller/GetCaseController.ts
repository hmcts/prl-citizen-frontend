import { Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL } from '../../steps/urls';
import { CosApiClient } from '../case/CosApiClient';

import { AppRequest } from './AppRequest';

export class GetCaseController {
  //constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async getApplicantCase(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase = await this.assignUserCase(req);
    req.session.save(() => res.redirect(APPLICANT_TASK_LIST_URL));
  }

  public async getRespondentCase(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase = await this.assignUserCase(req);
    req.session.save(() => res.redirect(RESPONDENT_TASK_LIST_URL));
  }

  private async assignUserCase(req: AppRequest): Promise<CaseWithId> {
    if (req.params?.caseId) {
      const caseworkerUser = req.session.user;
      const caseReference = req.params?.caseId;
      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      req.session.userCase = caseDataFromCos;
    }
    return req.session.userCase;
  }
}
