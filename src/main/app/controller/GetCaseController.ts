import { Response } from 'express';

import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL } from '../../steps/urls';
import { CaseWithId } from '../case/case';

import { AppRequest } from './AppRequest';

export class GetCaseController {
  //constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async getCase(req: AppRequest, res: Response): Promise<void> {
    if (req.params?.caseId && req.session?.userCaseList) {
      req.session?.userCaseList.forEach((element: CaseWithId) => {
        if (element?.id.toString() === req.params?.caseId) {
          req.session.userCase = element;
        }
      });
    }
    let url = 'APPLICANT_TASK_LIST_URL';

    if (req.originalUrl.includes('applicant')) {
      url = APPLICANT_TASK_LIST_URL;
    } else if (req.originalUrl.includes('respondent')) {
      url = RESPONDENT_TASK_LIST_URL;
    }
    req.session.save(() => res.redirect(url));
  }
}
