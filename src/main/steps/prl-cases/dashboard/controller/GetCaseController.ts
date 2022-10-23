import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { APPLICANT_TASK_LIST_URL } from '../../../urls';
import { generateContent } from '../content';

export class GetCaseController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
  public async getCase(req: AppRequest, res: Response): Promise<void> {
    if (req.params?.caseId && req.session?.userCaseList) {
      req.session?.userCaseList.forEach((element: CaseWithId) => {
        if (element?.id.toString() === req.params?.caseId) {
          req.session.userCase = element;
        }
      });
    }
    if (req.params?.caseId) {
      const loggedInCitizen = req.session.user;
      const caseReference = req.params?.caseId;

      const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
      req.session.userCase = caseDataFromCos;
    }
    req.session.save(() => res.redirect(APPLICANT_TASK_LIST_URL));
  }
}
