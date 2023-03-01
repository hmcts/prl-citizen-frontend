/* eslint-disable @typescript-eslint/no-unused-vars */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Case } from '../../../app/case/case';
import { Applicant, Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { APPLICANT_TASKLIST_CONTACT_EMAIL, APPLICANT_TASKLIST_CONTACT_POST } from '../../../steps/urls';

import { setContactPreferences } from './ContactPreferencesMapper';
// import { APPLICANT_TASKLIST_CONTACT_PREFERENCES } from '../../../steps/urls';

@autobind
export class ContactPreferencesPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async c100Respondent(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        Object.assign(respondent.value, setContactPreferences(respondent.value, req));
      }
    });
  }

  public async c100Applicant(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
      // console.log('idamId ->', applicant?.value?.user?.idamId)
      // console.log('user.id ->', req.session?.user.id)
      if (applicant?.value?.user?.idamId === req.session?.user.id) {
        Object.assign(applicant.value, setContactPreferences(applicant.value, req));
      }
    });
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    // console.log('body ->', req.body.applicantPreferredContact);
    const caseReference = req.session.userCase.id;
    // console.log('loggedInCitizen >> ', loggedInCitizen);

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    // console.log('caseDataFromCos >--------=>>> ', caseDataFromCos);

    Object.assign(req.session.userCase, caseDataFromCos);
    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        this.c100Respondent(req);
      } else {
        this.c100Applicant(req);
      }
    }

    const caseData = toApiFormat(req?.session?.userCase);
    // console.log('caseData ->', caseData)
    caseData.id = caseReference;

    const accessCode = req.session.userCase.caseInvites?.filter(
      userInvited => userInvited.value.invitedUserId === req.session.user.id
    )[0]?.value.accessCode;
    const updatedCaseDataFromCos = await client.updateCase(
      loggedInCitizen,
      caseReference,
      caseData,
      'linkCitizenAccount',
      accessCode
    );

    Object.assign(req.session.userCase, updatedCaseDataFromCos);
    req.session.userCase.applicantPreferredContact = updatedCaseDataFromCos.applicants![0].value!.contactPreferences;
    console.log('updatedCaseData ->', updatedCaseDataFromCos);
    console.log('updatedCaseData value->', updatedCaseDataFromCos.applicants![0].value!);

    console.log('req.session.userCase after assigning 0->', req.session.userCase);
    console.log('value ->', req!.session!.userCase!.applicants![0].value);
    // console.log("req.session.userCase after assigning applicantPreferredContact =>", req.session.userCase.applicantPreferredContact)

    const redirectUrl = setRedirectUrl(req);
    req.session.save(() => res.redirect(redirectUrl));
  }
}

function setRedirectUrl(req: AppRequest<Partial<Case>>) {
  let redirectUrl = '';

  if (req.url.includes('applicant')) {
    if (req.body.applicantPreferredContact === 'post') {
      redirectUrl = APPLICANT_TASKLIST_CONTACT_POST;
    } else {
      redirectUrl = APPLICANT_TASKLIST_CONTACT_EMAIL;
    }
  }
  return redirectUrl;
}
