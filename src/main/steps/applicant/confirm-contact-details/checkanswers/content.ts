import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { APPLICANT_ADDRESS_DETAILS, APPLICANT_ADDRESS_HISTORY, APPLICANT_CONTACT_DETAILS, APPLICANT_PERSONAL_DETAILS } from '../../../urls';
import { getFormattedDate, summaryList } from '../../../common/summary/utils';

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
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  getFormattedDate(dob);
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
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
  },
  errors: {},
};

const urls = {
  applicant1FullName: APPLICANT_PERSONAL_DETAILS,
  applicant1DateOfBirth: APPLICANT_PERSONAL_DETAILS,
  applicant1PlaceOfBirth: APPLICANT_PERSONAL_DETAILS,
  address: APPLICANT_ADDRESS_DETAILS,
  addressHistory: APPLICANT_ADDRESS_HISTORY,
  applicant1PhoneNumber: APPLICANT_CONTACT_DETAILS,
  applicant1EmailAddress: APPLICANT_CONTACT_DETAILS,
};
const fieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirth: 'Date',
  applicant1PlaceOfBirth: 'String',
  address: 'String',
  addressHistory: 'String',
  applicant1PhoneNumber: 'String',
  applicant1EmailAddress: 'String',
};

const cy: typeof en = (content: CommonContent) => {
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
