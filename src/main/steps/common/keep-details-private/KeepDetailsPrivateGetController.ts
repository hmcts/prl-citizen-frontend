import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Case } from '../../../app/case/case';
import { Applicant, Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { APPLICANT_DETAILS_KNOWN, RESPONDENT_DETAILS_KNOWN } from '../../urls';

import { mapKeepYourDetailsPrivate } from './KeepYourDetailsPrivateMapper';

export class KeepDetailsPrivateGetController {
  public static async c100Respondent(req: AppRequest): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.keepDetailsPrivate &&
        respondent?.value?.response?.keepDetailsPrivate?.confidentiality
      ) {
        Object.assign(req.session.userCase, mapKeepYourDetailsPrivate(respondent.value));
      }
    });
  }

  public static async c100Applicant(req: AppRequest): Promise<void> {
    req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
      if (
        applicant?.value?.user?.idamId === req.session?.user.id &&
        applicant?.value?.response &&
        applicant?.value?.response?.keepDetailsPrivate &&
        applicant?.value?.response?.keepDetailsPrivate?.confidentiality
      ) {
        Object.assign(req.session.userCase, mapKeepYourDetailsPrivate(applicant.value));
      }
    });
  }

  public static async FL401Respondent(req: AppRequest): Promise<void> {
    if (
      req.session.userCase?.respondentsFL401?.user.idamId === req.session?.user.id &&
      req.session.userCase?.respondentsFL401?.response &&
      req.session.userCase?.respondentsFL401?.response?.keepDetailsPrivate &&
      req.session.userCase?.respondentsFL401?.response?.keepDetailsPrivate?.confidentiality
    ) {
      Object.assign(req.session.userCase, mapKeepYourDetailsPrivate(req.session.userCase.respondentsFL401));
    }
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        KeepDetailsPrivateGetController.c100Respondent(req);
      } else {
        KeepDetailsPrivateGetController.c100Applicant(req);
      }
    } else {
      if (req.url.includes('respondent')) {
        KeepDetailsPrivateGetController.FL401Respondent(req);
      } else {
        if (
          req.session.userCase?.applicantsFL401?.user.idamId === req.session?.user.id &&
          req.session.userCase?.applicantsFL401?.response &&
          req.session.userCase?.applicantsFL401?.response?.keepDetailsPrivate &&
          req.session.userCase?.applicantsFL401?.response?.keepDetailsPrivate?.confidentiality
        ) {
          Object.assign(req.session.userCase, mapKeepYourDetailsPrivate(req.session.userCase.applicantsFL401));
        }
      }
    }

    const redirectUrl = setRedirectUrl(req);
    req.session.save(() => res.redirect(redirectUrl));
  }
}
function setRedirectUrl(req: AppRequest<Partial<Case>>) {
  let redirectUrl = '';

  if (req.url.includes('respondent')) {
    redirectUrl = RESPONDENT_DETAILS_KNOWN;
  } else {
    redirectUrl = APPLICANT_DETAILS_KNOWN;
  }
  return redirectUrl;
}
