// import { CosApiClient } from '../../app/case/CosApiClient';
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../app/form/Form';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL } from '../../steps/urls';
// import { toApiFormat } from '../../app/case/to-api-format';

@autobind
export class CaseActivationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      // const loggedInCitizen = req.session.user;
      // const caseReference = req.session.userCase.id;
      // const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

      // const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
      // Object.assign(req.session.userCase, caseDataFromCos);

      // const caseData = toApiFormat(req?.session?.userCase);

      // caseData.id = caseReference;

      // const updatedCaseDataFromCos = await client.updateCase(
      //   loggedInCitizen,
      //   caseReference,
      //   caseData,
      //   'linkCitizenAccount'
      // );
      // Object.assign(req.session.userCase, updatedCaseDataFromCos);

      let redirectUrl;

      if (req.session.userCase.caseTypeOfApplication === 'C100') {
        if (req.url.includes('respondent')) {
          redirectUrl = RESPONDENT_TASK_LIST_URL;
        } else {
          redirectUrl = APPLICANT_TASK_LIST_URL;
        }
      } else {
        if (req.url.includes('respondent')) {
          redirectUrl = RESPONDENT_TASK_LIST_URL;
        } else {
          redirectUrl = APPLICANT_TASK_LIST_URL;
        }
      }
      req.session.save(() => res.redirect(redirectUrl));
    } catch (err) {
      throw new Error('CaseActivationPostController - Case could not be updated.');
    }
  }
}
