import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { getFormattedDate, summaryList } from '../../../common/summary/utils';
//import { ADDRESS_DETAILS, ADDRESS_HISTORY, CONTACT_DETAILS, PERSONAL_DETAILS } from '../../../urls';

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
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  getFormattedDate(dob);
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
};
const fieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirthText: 'Date',
  applicant1PlaceOfBirthText: 'String',
  address: 'String',
  addressHistory: 'String',
  applicant1PhoneNumber: 'String',
  applicant1EmailAddress: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  getFormattedDate(dob);
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
// function getNewUrls(urls: any, userflag: any) {
//   let key: keyof typeof urls;
//   for (key in urls) {
//     let value = urls[key];
//     urls[key] = userflag+value;
//   }
// }
