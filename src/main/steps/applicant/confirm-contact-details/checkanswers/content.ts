/* eslint-disable @typescript-eslint/no-unused-vars */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { generateContent as checkAnswersGenerateContent } from '../../../common/confirm-contact-details/checkanswers/content';
import { typeofcaseuser } from '../../../common/typeofcaseuser';

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
  const checkAnswersContent = checkAnswersGenerateContent(content);
  return {
    ...checkAnswersContent,
    pagetitle: typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, true),
  };
};
