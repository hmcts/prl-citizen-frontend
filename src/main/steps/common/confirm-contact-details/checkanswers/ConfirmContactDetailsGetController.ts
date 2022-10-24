import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Case } from '../../../../app/case/case';
import { Applicant, CONFIDENTIAL_DETAILS, Respondent } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { APPLICANT_CHECK_ANSWERS, RESPONDENT_CHECK_ANSWERS } from '../../../../steps/urls';

import { getContactDetails } from './ContactDetailsMapper';

@autobind
export class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.session.userCase.id;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
          if (respondent?.value?.user?.idamId === req.session?.user.id) {
            Object.assign(req.session.userCase, getContactDetails(respondent.value, req));
          }
        });
      } else {
        req.session.userCase?.respondents?.forEach((applicant: Applicant) => {
          if (applicant?.value?.user?.idamId === req.session?.user.id) {
            Object.assign(req.session.userCase, getContactDetails(applicant.value, req));
          }
        });
      }
    } else {
      if (req.url.includes('respondent')) {
        Object.assign(req.session.userCase, getContactDetails(req.session.userCase.respondentsFL401!, req));
      } else {
        Object.assign(req.session.userCase, getContactDetails(req.session.userCase.applicantsFL401!, req));
      }
    }

    const redirectUrl = setRedirectUrl(req);

    req.session.save(() => res.redirect(redirectUrl));
  }
}

const fieldsArray: string[] = [
  'citizenUserFullName',
  'citizenUserPlaceOfBirthText',
  'citizenUserAddressText',
  'citizenUserPhoneNumberText',
  'citizenUserEmailAddressText',
  'applicant1SafeToCall',
  'citizenUserDateOfBirthText',
];

function setRedirectUrl(req: AppRequest<Partial<Case>>) {
  let redirectUrl = '';

  if (req.url.includes('respondent')) {
    redirectUrl = RESPONDENT_CHECK_ANSWERS;
  } else {
    redirectUrl = APPLICANT_CHECK_ANSWERS;
  }
  return redirectUrl;
}

export const validateDataCompletion = (req: AppRequest<Partial<Case>>): void => {
  for (const key in req.session.userCase) {
    if (fieldsArray.includes(key)) {
      const value = req.session.userCase[`${key}`];
      if (typeof value === 'string' && (value === null || value === undefined || value.trim() === '')) {
        req.session.userCase[`${key}`] = '<span class="govuk-error-message">Complete this section</span>';
      }
    }
  }
};

const privateFieldsMap = new Map<string, string>([
  ['email', 'citizenUserEmailAddressText'],
  ['phoneNumber', 'citizenUserPhoneNumberText'],
]);

export const getConfidentialData = (req: AppRequest<Partial<Case>>): void => {
  for (const [key, value] of privateFieldsMap) {
    if (!req.session.userCase[`${value}`].includes('span')) {
      if (req.session.userCase?.detailsKnown && req.session.userCase?.startAlternative) {
        if (req.session.userCase.contactDetailsPrivate?.length !== 0) {
          if (req.session.userCase?.contactDetailsPrivate?.includes(key)) {
            req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
              '<br/><span class="govuk-hint govuk-!-margin-top-1">' + CONFIDENTIAL_DETAILS.PRIVATE + '</span>'
            );
          } else {
            req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
              '<br/><span class="govuk-hint govuk-!-margin-top-1">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
            );
          }
        }
      } else {
        req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
          '<br/><span class="govuk-hint govuk-!-margin-top-1">' + CONFIDENTIAL_DETAILS.PUBLIC + '</span>'
        );
      }
    }
  }
};
