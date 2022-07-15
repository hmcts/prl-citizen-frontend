import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { getFormattedDate, summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    applicant1FullName: 'Name',
    applicant1DateOfBirthText: 'Date of birth',
    applicant1PlaceOfBirthText: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
    applicant1SafeToCall: 'When it is safe to call you (optional)',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  if (typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  const citizenRole = userCase.citizenRole;
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, '', fieldType, content.language, citizenRole)],
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
    applicant1DateOfBirthText: 'Date of birth',
    applicant1PlaceOfBirthText: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
    applicant1SafeToCall: 'When it is safe to call you (optional)',
  },
  errors: {},
};

const urls = {
  applicant1FullName: '_PERSONAL_DETAILS',
  applicant1DateOfBirthText: '_PERSONAL_DETAILS',
  applicant1PlaceOfBirthText: '_PERSONAL_DETAILS',
  address: '_ADDRESS_DETAILS',
  addressHistory: '_ADDRESS_HISTORY',
  applicant1PhoneNumber: '_CONTACT_DETAILS',
  applicant1EmailAddress: '_CONTACT_DETAILS',
  applicant1SafeToCall: '_CONTACT_DETAILS',
};
const fieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirthText: 'String',
  applicant1PlaceOfBirthText: 'String',
  address: 'String',
  addressHistory: 'String',
  applicant1PhoneNumber: 'String',
  applicant1EmailAddress: 'String',
  applicant1SafeToCall: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  if (dob !== null && dob !== undefined && typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  //userCase.applicant1DateOfBirthText = getFormattedDate(userCase.applicant1DateOfBirth);
  //console.log("userCase.applicant1DateOfBirthText====>"+userCase.applicant1DateOfBirthText);
  const citizenRole = userCase.citizenRole;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, '', fieldType, content.language, citizenRole)],
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
