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
  },
  errors: {},
  confirmContactDetailsCheckAnswersUrl: 'Yes',
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  if (typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, '', fieldType, content.language)],
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
  confirmContactDetailsCheckAnswersUrl: 'Yes',
};

const urls = {
  applicant1FullName: 'personaldetails',
  applicant1DateOfBirthText: 'personaldetails',
  applicant1PlaceOfBirthText: 'personaldetails',
  address: 'addressdetails',
  addressHistory: 'addresshistory',
  applicant1PhoneNumber: 'contactdetails',
  applicant1EmailAddress: 'contactdetails',
};
const fieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirthText: 'String',
  applicant1PlaceOfBirthText: 'String',
  address: 'String',
  addressHistory: 'String',
  applicant1PhoneNumber: 'String',
  applicant1EmailAddress: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.applicant1DateOfBirth;
  if (dob !== null && dob !== undefined && typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  //userCase.applicant1DateOfBirthText = getFormattedDate(userCase.applicant1DateOfBirth);
  //console.log("userCase.applicant1DateOfBirthText====>"+userCase.applicant1DateOfBirthText);
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
