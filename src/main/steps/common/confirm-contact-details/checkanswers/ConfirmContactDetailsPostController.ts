import autobind from 'autobind-decorator';
import type { Response } from 'express';

//import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Applicant, Respondent } from '../../../../app/case/definition';
import { toApiFormat } from '../../../../app/case/to-api-format';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL } from '../../../../steps/urls';

import { setContactDetails } from './ContactDetailsMapper';

@autobind
export class ConfirmContactDetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.session.userCase.id;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);
    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
          if (respondent?.value?.user?.idamId === req.session?.user.id) {
            Object.assign(respondent.value, setContactDetails(respondent.value, req));
          }
        });
      } else {
        req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
          if (applicant?.value?.user?.idamId === req.session?.user.id) {
            Object.assign(applicant.value, setContactDetails(applicant.value, req));
          }
        });
      }
    } else {
      if (req.url.includes('respondent')) {
        if (req.session.userCase?.respondentsFL401?.user?.idamId === req.session?.user.id) {
          Object.assign(
            req.session.userCase.respondentsFL401,
            setContactDetails(req.session.userCase.respondentsFL401, req)
          );
        }
      } else {
        if (req.session.userCase?.applicantsFL401?.user?.idamId === req.session?.user.id) {
          Object.assign(
            req.session.userCase.applicantsFL401,
            setContactDetails(req.session.userCase.applicantsFL401, req)
          );
        }
      }
    }

    const caseData = toApiFormat(req?.session?.userCase);
    caseData.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(
      loggedInCitizen,
      caseReference as string,
      caseData,
      'citizen-internal-case-update'
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    let redirectUrl;

    if (req.url.includes('respondent')) {
      redirectUrl = RESPONDENT_TASK_LIST_URL;
    } else {
      redirectUrl = APPLICANT_TASK_LIST_URL;
    }

    req.session.save(() => res.redirect(redirectUrl));
  }
}
