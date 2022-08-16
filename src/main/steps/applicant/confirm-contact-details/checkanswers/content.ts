/* eslint-disable @typescript-eslint/no-unused-vars */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { generateContent as checkAnswersGenerateContent } from '../../../common/confirm-contact-details/checkanswers/content';

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    applicant1FullName: 'Name',
    applicant1DateOfBirth: 'Date of birth',
    applicant1PlaceOfBirth: 'Place of birth',
    address: 'Home Address',
    postalAddress: 'Postal Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
    applicant1SafeToCall: 'When it is safe to call you',
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
  };
};
