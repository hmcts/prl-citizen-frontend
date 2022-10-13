import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Applicant, Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { RESPONDENT_DETAILS_KNOWN } from '../../urls';

import { getKeepYourDetailsPrivate } from './KeepYourDetailsPrivateMapper';

export class KeepDetailsPrivateGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
          if (
            respondent?.value?.user?.idamId === req.session?.user.id &&
            respondent?.value?.response &&
            respondent?.value?.response?.keepDetailsPrivate &&
            respondent?.value?.response?.keepDetailsPrivate?.confidentiality
          ) {
            Object.assign(req.session.userCase, getKeepYourDetailsPrivate(respondent.value, req));
          }
        });
      } else {
        req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
          if (
            applicant?.value?.user?.idamId === req.session?.user.id &&
            applicant?.value?.response &&
            applicant?.value?.response?.keepDetailsPrivate &&
            applicant?.value?.response?.keepDetailsPrivate?.confidentiality
          ) {
            Object.assign(req.session.userCase, getKeepYourDetailsPrivate(applicant.value, req));
          }
        });
      }
    } else {
      if (req.url.includes('respondent')) {
        if (
          req.session.userCase?.respondentsFL401?.user.idamId === req.session?.user.id &&
          req.session.userCase?.respondentsFL401?.response &&
          req.session.userCase?.respondentsFL401?.response?.keepDetailsPrivate &&
          req.session.userCase?.respondentsFL401?.response?.keepDetailsPrivate?.confidentiality
        ) {
          Object.assign(req.session.userCase, getKeepYourDetailsPrivate(req.session.userCase.respondentsFL401, req));
        }
      } else {
        if (
          req.session.userCase?.applicantsFL401?.user.idamId === req.session?.user.id &&
          req.session.userCase?.applicantsFL401?.response &&
          req.session.userCase?.applicantsFL401?.response?.keepDetailsPrivate &&
          req.session.userCase?.applicantsFL401?.response?.keepDetailsPrivate?.confidentiality
        ) {
          Object.assign(req.session.userCase, getKeepYourDetailsPrivate(req.session.userCase.applicantsFL401, req));
        }
      }
    }
    req.session.save(() => res.redirect(RESPONDENT_DETAILS_KNOWN));
  }
}
