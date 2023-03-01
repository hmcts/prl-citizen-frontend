/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Case } from '../../../app/case/case';
import { Applicant, Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { APPLICANT_TASKLIST_CONTACT_PREFERENCES } from '../../../steps/urls';

import { getContactPreferences } from './ContactPreferencesMapper';

export class ContactPreferencesGetController extends GetController {
  public static async c100Respondent(req: AppRequest): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.applicantPreferredContact
      ) {
        Object.assign(req.session.userCase, getContactPreferences(respondent.value, req));
      }
    });
  }

  public static async c100Applicant(req: AppRequest): Promise<void> {
    req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
      if (
        applicant?.value?.user?.idamId === req.session?.user.id &&
        applicant?.value?.response &&
        applicant?.value?.contactPreferences
      ) {
        // console.log('getcontractpref =>', getContactPreferences(applicant.value, req));
        Object.assign(req.session.userCase, getContactPreferences(applicant.value, req));
        // console.log("user case after objectassign =>", req.session.userCase);
      }
    });
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    console.log('caseDataFromCos getController->', caseDataFromCos);
    Object.assign(req.session.userCase, caseDataFromCos);

    console.log('req.session.userCase from getController ->', req.session.userCase);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        ContactPreferencesGetController.c100Respondent(req);
      } else {
        ContactPreferencesGetController.c100Applicant(req);
      }
    }

    const redirectUrl = setRedirectUrl(req);
    req.session.save(() => res.redirect(redirectUrl));
  }
}

function setRedirectUrl(req: AppRequest<Partial<Case>>) {
  let redirectUrl = '';

  if (req.url.includes('applicant')) {
    redirectUrl = APPLICANT_TASKLIST_CONTACT_PREFERENCES;
  }
  return redirectUrl;
}
