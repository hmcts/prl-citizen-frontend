/* eslint-disable @typescript-eslint/no-unused-vars */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { summaryList } from '../../../common/summary/utils';
import {
  APPLICANT_ADDRESS_HISTORY,
  APPLICANT_CONTACT_DETAILS,
  APPLICANT_FIND_ADDRESS,
  APPLICANT_PERSONAL_DETAILS,
  APPLICANT_POSTAL_ADDRESS_DETAILS,
} from '../../../urls';

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

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  // const dob = 'userCase.applicant1DateOfBirth';
  //getFormattedDate(dob);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, '', fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your details (Welsh)',
  title: 'Read the information to make sure it is correct, and add any missing details (Welsh)',
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
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

const urls = {
  applicant1FullName: APPLICANT_PERSONAL_DETAILS,
  applicant1DateOfBirth: APPLICANT_PERSONAL_DETAILS,
  applicant1PlaceOfBirth: APPLICANT_PERSONAL_DETAILS,
  address: APPLICANT_FIND_ADDRESS,
  addressHistory: APPLICANT_ADDRESS_HISTORY,
  postalAddress: APPLICANT_POSTAL_ADDRESS_DETAILS,
  applicant1PhoneNumber: APPLICANT_CONTACT_DETAILS,
  applicant1EmailAddress: APPLICANT_CONTACT_DETAILS,
  applicant1SafeToCall: APPLICANT_CONTACT_DETAILS,
};
const fieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirth: 'Date',
  applicant1PlaceOfBirth: 'String',
  address: 'String',
  postalAddress: 'String',
  addressHistory: 'String',
  applicant1PhoneNumber: 'String',
  applicant1EmailAddress: 'String',
  applicant1SafeToCall: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, '', fieldType, content.language)],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
