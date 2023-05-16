import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { getFormattedDate, summaryList } from '../../../common/summary/utils';

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  contactdetailpriv:
    'if you do not want to share your contact details with the other person in the case,update the section',
  contactdetailprivlinktext: 'keeping your contact details private',
  link: '',
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
  completeSection: 'Complete this section',
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
    sections: [summaryList(enContent, userCase, urls, '', content.language)],
  };
};

export const cyContent: typeof enContent = {
  section: 'Gwiriwch eich manylion cyswllt',
  title: 'Read the information to make sure it is correct, and add any missing details (Welsh)',
  contactdetailpriv:
    'Os nad ydych eisiau rhannu eich manylion cyswllt gyda’r unigolyn arall yn yr achos, diweddarwch yr adran',
  contactdetailprivlinktext: 'Cadw eich manylion cyswllt yn breifat',
  link: '',
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
  },
  keys: {
    citizenUserFullName: 'Enw',
    citizenUserDateOfBirthText: 'Dyddiad geni',
    citizenUserPlaceOfBirthText: 'Lleoliad geni',
    citizenUserAddressText: 'Cyfeiriad',
    citizenUserAddressHistory: 'Hanes cyfeiriad',
    citizenUserPhoneNumberText: 'Rhif ffôn',
    citizenUserEmailAddressText: 'Cyfeiriad e-bost',
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
  completeSection: 'Complete this section (welsh)',
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
    sections: [summaryList(cyContent, userCase, urls, '', content.language)],
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
  translations.link = content.byApplicant
    ? '/applicant/keep-details-private/details_known'
    : '/respondent/keep-details-private/details_known';
  return {
    ...translations,
    form,
  };
};
