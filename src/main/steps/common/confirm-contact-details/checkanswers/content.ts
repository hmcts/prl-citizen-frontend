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
    citizenUserFullName: 'Name',
    citizenUserDateOfBirthText: 'Date of birth',
    citizenUserPlaceOfBirthText: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    citizenUserPhoneNumber: 'Phone number',
    citizenUserEmailAddress: 'Email',
    applicant1SafeToCall: 'When it is safe to call you (optional)',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.citizenUserDateOfBirth;
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
    citizenUserFullName: 'Name',
    citizenUserDateOfBirthText: 'Date of birth',
    citizenUserPlaceOfBirthText: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    citizenUserPhoneNumber: 'Phone number',
    citizenUserEmailAddress: 'Email',
    applicant1SafeToCall: 'When it is safe to call you (optional)',
  },
  errors: {},
};

const urls = {
  citizenUserFullName: 'personaldetails',
  citizenUserDateOfBirthText: 'personaldetails',
  citizenUserPlaceOfBirthText: 'personaldetails',
  address: 'addressdetails',
  addressHistory: 'addresshistory',
  citizenUserPhoneNumber: 'contactdetails',
  citizenUserEmailAddress: 'contactdetails',
  applicant1SafeToCall: 'contactdetails',
};
const fieldType = {
  citizenUserFullName: 'String',
  citizenUserDateOfBirthText: 'String',
  citizenUserPlaceOfBirthText: 'String',
  address: 'String',
  addressHistory: 'String',
  citizenUserPhoneNumber: 'String',
  citizenUserEmailAddress: 'String',
  applicant1SafeToCall: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.citizenUserDateOfBirth;
  if (dob !== null && dob !== undefined && typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  //userCase.citizenUserDateOfBirthText = getFormattedDate(userCase.citizenUserDateOfBirth);
  //console.log("userCase.citizenUserDateOfBirthText====>"+userCase.citizenUserDateOfBirthText);
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
