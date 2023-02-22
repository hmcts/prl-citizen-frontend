/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Applicant, Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

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
        applicant?.value?.response?.applicantPreferredContact
      ) {
        Object.assign(req.session.userCase, getContactPreferences(applicant.value, req));
      }
    });
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    console.log('loggedInCitizen ->', loggedInCitizen);
    console.log('req.params =>', req.params);
    const caseReference = req.params?.caseId;
    console.log('caseReference -> ->', caseReference);

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    console.log('caseDataFromCos =++++===> ', caseDataFromCos);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        ContactPreferencesGetController.c100Respondent(req);
      } else {
        ContactPreferencesGetController.c100Applicant(req);
      }
    } else {
      if (
        req.session.userCase?.applicantsFL401?.user.idamId === req.session?.user.id &&
        req.session.userCase?.applicantsFL401?.response &&
        req.session.userCase?.applicantsFL401?.response?.applicantPreferredContact
      ) {
        Object.assign(req.session.userCase, getContactPreferences(req.session.userCase.applicantsFL401, req));
      }
    }
  }
}
