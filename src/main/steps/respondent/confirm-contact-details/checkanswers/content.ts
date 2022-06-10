import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { getFormattedDate, summaryList } from '../../../common/summary/utils';
import {
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_PERSONAL_DETAILS,
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
    applicant1PlaceOfBirthText: 'Place of birth',
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
    applicant1PlaceOfBirthText: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
  },
  errors: {},
};

const urls = {
  applicant1FullName: RESPONDENT_PERSONAL_DETAILS,
  applicant1DateOfBirth: RESPONDENT_PERSONAL_DETAILS,
  applicant1PlaceOfBirthText: RESPONDENT_PERSONAL_DETAILS,
  address: RESPONDENT_ADDRESS_DETAILS,
  addressHistory: RESPONDENT_ADDRESS_HISTORY,
  applicant1PhoneNumber: RESPONDENT_CONTACT_DETAILS,
  applicant1EmailAddress: RESPONDENT_CONTACT_DETAILS,
};
const fieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirth: 'Date',
  applicant1PlaceOfBirthText: 'String',
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
