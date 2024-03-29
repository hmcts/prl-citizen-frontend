import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CaseType, PartyType } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../app/form/Form';
import {
  APPLICANT_TASK_LIST_URL,
  C100_APPLICANT_TASKLIST,
  RESPONDENT_TASK_LIST_URL,
  TASKLIST_RESPONDENT,
} from '../../steps/urls';

import { getCasePartyType } from './dashboard/utils';

@autobind
export class CaseActivationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      let redirectUrl;
      const partyType = getCasePartyType(req.session.userCase, req.session.user.id);

      if (partyType === PartyType.APPLICANT) {
        if (req.session.userCase.caseTypeOfApplication === CaseType.C100) {
          redirectUrl = C100_APPLICANT_TASKLIST;
        } else {
          redirectUrl = APPLICANT_TASK_LIST_URL;
        }
      } else {
        redirectUrl =
          req.session.userCase.caseTypeOfApplication === CaseType.C100 ? TASKLIST_RESPONDENT : RESPONDENT_TASK_LIST_URL;
      }
      req.session.save(() => res.redirect(redirectUrl));
    } catch (err) {
      throw new Error('CaseActivationPostController - Case could not be updated.');
    }
  }
}
