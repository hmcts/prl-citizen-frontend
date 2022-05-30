import {PERSONAL_DETAILS,CONTACT_DETAILS } from '../../../../steps/urls';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';

import {
  summaryList,
} from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    name: 'Name',
    dateOfBirth: 'Date of birth',
    placeOfBirth: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    phoneNumber: 'Phone number',
    email: 'Email',
  },
  errors: {
    
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(enContent, userCase, urls),
    ],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your details (Welsh)',
  title: 'Read the information to make sure it is correct, and add any missing details (Welsh)',
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
  },
  keys: {
    name: 'Name (in Welsh)',
    dateOfBirth: 'Date of birth (in Welsh)',
    placeOfBirth: 'Place of birth (in Welsh)',
    address: 'Address (in Welsh)',
    addressHistory: 'Address history (in Welsh)',
    phoneNumber: 'Phone number (in Welsh)',
    email: 'Email (in Welsh)',
  },
  errors: {

  },
};

const urls = {
  name: PERSONAL_DETAILS,
  dateOfBirth: PERSONAL_DETAILS,
  placeOfBirth: PERSONAL_DETAILS,
  address: 'Address URL',
  addressHistory: 'Address history URL',  
  phoneNumber: CONTACT_DETAILS,
  email: CONTACT_DETAILS,
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(cyContent, userCase, urls),
    ],
  };
};

export const form: FormContent = {
  fields: {
  
  },
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
