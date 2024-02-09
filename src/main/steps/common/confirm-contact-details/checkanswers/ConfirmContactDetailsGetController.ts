import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Case } from '../../../../app/case/case';
import {
  Applicant,
  CONFIDENTIAL_DETAILS,
  CaseType,
  Respondent,
  SessionLanguage,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { APPLICANT_CHECK_ANSWERS, RESPONDENT_CHECK_ANSWERS } from '../../../../steps/urls';

import { mapConfirmContactDetails } from './ContactDetailsMapper';
import { cyContent, enContent } from './content';

@autobind
export class ConfirmContactDetailsGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.session.userCase.id;
    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');
    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);
    if (req.session.userCase.caseTypeOfApplication === CaseType.C100) {
      if (req.url.includes('respondent')) {
        req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
          if (respondent?.value?.user?.idamId === req.session?.user.id) {
            Object.assign(req.session.userCase, mapConfirmContactDetails(respondent.value));
          }
        });
      } else {
        req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
          if (applicant?.value?.user?.idamId === req.session?.user.id) {
            Object.assign(req.session.userCase, mapConfirmContactDetails(applicant.value));
          }
        });
      }
    } else {
      req.url.includes('respondent')
        ? Object.assign(req.session.userCase, mapConfirmContactDetails(req.session.userCase.respondentsFL401!))
        : Object.assign(req.session.userCase, mapConfirmContactDetails(req.session.userCase.applicantsFL401!));
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
  'citizenUserDateOfBirthText',
  'citizenUserAddressHistory',
];

function setRedirectUrl(req: AppRequest<Partial<Case>>) {
  let redirectUrl = '';

  if (req.url.includes('respondent')) {
    redirectUrl = RESPONDENT_CHECK_ANSWERS;
  } else {
    if (req.session.userCase.caseTypeOfApplication === CaseType.C100) {
      redirectUrl = APPLICANT_CHECK_ANSWERS + '?byApplicant=applicant';
    } else {
      redirectUrl = APPLICANT_CHECK_ANSWERS;
    }
  }
  return redirectUrl;
}

export const validateDataCompletion = (req: AppRequest<Partial<Case>>): void => {
  for (const key in req.session.userCase) {
    if (fieldsArray.includes(key)) {
      const value = req.session.userCase[`${key}`];
      if (
        value === null ||
        (typeof value === 'string' &&
          (value === null || value === undefined || value.trim() === '' || value === 'Invalid Date'))
      ) {
        req.session.userCase[`${key}`] =
          req.session.lang === 'cy'
            ? '<span class="govuk-error-message">' + cyContent.completeSection + '</span>'
            : '<span class="govuk-error-message">' + enContent.completeSection + '</span>';
      }
    }
  }
};

const privateFieldsMap = new Map<string, string>([
  ['email', 'citizenUserEmailAddressText'],
  ['phoneNumber', 'citizenUserPhoneNumberText'],
  ['address', 'citizenUserAddressText'],
]);

export const getConfidentialData = (req: AppRequest<Partial<Case>>): void => {
  for (const [key, value] of privateFieldsMap) {
    if (!req.session.userCase[`${value}`].includes('span')) {
      req.session.lang === SessionLanguage.WELSH
        ? prepareHtml(req, key, value, SessionLanguage.WELSH)
        : prepareHtml(req, key, value, SessionLanguage.ENGLISH);
    }
  }
};
const prepareHtml = (req: AppRequest<Partial<Case>>, key: string, value: string, language: string) => {
  if (
    req.session.userCase?.detailsKnown &&
    req.session.userCase?.startAlternative &&
    req.session.userCase.contactDetailsPrivate?.length !== 0
  ) {
    if (req.session.userCase?.contactDetailsPrivate?.includes(key)) {
      req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">' +
          (language === SessionLanguage.WELSH ? CONFIDENTIAL_DETAILS.PRIVATE_CY : CONFIDENTIAL_DETAILS.PRIVATE) +
          '</span>'
      );
    } else {
      req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">' +
          (language === SessionLanguage.WELSH ? CONFIDENTIAL_DETAILS.PUBLIC_CY : CONFIDENTIAL_DETAILS.PUBLIC) +
          '</span>'
      );
    }
  } else {
    req.session.userCase[`${value}`] = req.session.userCase[`${value}`]?.concat(
      '<br/><span class="govuk-hint govuk-!-margin-top-1">' +
        (language === SessionLanguage.WELSH ? CONFIDENTIAL_DETAILS.PUBLIC_CY : CONFIDENTIAL_DETAILS.PUBLIC) +
        '</span>'
    );
  }
};
