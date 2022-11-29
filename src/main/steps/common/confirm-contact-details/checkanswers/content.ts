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
    citizenUserAddressText: 'Address',
    citizenUserAddressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.citizenUserDateOfBirth;
  if (typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  if (!userCase.citizenUserAddressPostcode) {
    urls.citizenUserAddressText = 'address/lookup';
  } else {
    urls.citizenUserAddressText = 'addressdetails';
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
    citizenUserAddressText: 'Address',
    citizenUserAddressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
  errors: {},
};

const urls = {
  citizenUserFullName: 'personaldetails',
  citizenUserDateOfBirthText: 'personaldetails',
  citizenUserPlaceOfBirthText: 'personaldetails',
  citizenUserAddressText: 'addressdetails',
  citizenUserAddressHistory: 'addresshistory',
  citizenUserPhoneNumberText: 'contactdetails',
  citizenUserEmailAddressText: 'contactdetails',
  citizenUserSafeToCall: 'contactdetails',
};
const fieldType = {
  citizenUserFullName: 'String',
  citizenUserDateOfBirthText: 'String',
  citizenUserPlaceOfBirthText: 'String',
  citizenUserAddressText: 'String',
  citizenUserAddressHistory: 'String',
  citizenUserPhoneNumberText: 'String',
  citizenUserEmailAddressText: 'String',
  citizenUserSafeToCall: 'String',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.citizenUserDateOfBirth;
  if (dob !== null && dob !== undefined && typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  if (!userCase.citizenUserAddressPostcode) {
    urls.citizenUserAddressText = 'address/lookup';
  } else {
    urls.citizenUserAddressText = 'addressdetails';
  }
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
