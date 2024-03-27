/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../steps/urls';
import { generateContent as checkAnswersGenerateContent } from '../../../common/confirm-contact-details/checkanswers/content';

import { CaseType, PartyType } from './../../../../app/case/definition';

console.info('** FOR SONAR **');

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    citizenUserFullName: 'Name',
    citizenUserDateOfBirth: 'Date of birth',
    citizenUserPlaceOfBirth: 'Place of birth',
    address: 'Home Address',
    postalAddress: 'Postal Address',
    addressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    citizenUserSafeToCall: 'When it is safe to call you',
  },
  errors: {},
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content) as Record<string, any>;
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  checkAnswersContent.link = '/applicant/keep-details-private/details_known';

  return {
    ...checkAnswersContent,
    breadcrumb:
      request.originalUrl.includes(PartyType.APPLICANT) && caseData.caseTypeOfApplication === CaseType.C100
        ? {
            id: 'caseView',
            href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData.id }),
          }
        : null,
  };
};
