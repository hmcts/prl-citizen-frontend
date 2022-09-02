import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';

import {
  ApplicantSummaryList,
  ChildernDetails,
  InternationalElement,
  TypeOfOrder,
  WithoutNoticeHearing,
} from './utils';

export const enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your Answers',
  change: 'change',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Accept and continue',
  sectionTitles: {
    AdvisingCourt: "6. What you're asking the court to decide",
    WithoutNoticeHearing: '7. Hearing details',
    ChildernDetails: "8. Childen's details",
    InternationalElement: '11. International elements',
  },
  keys: {
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    'user-role': 'Are you named as the applicant on the application form you are submitting? ',
    fullName: 'Subject’s name',
    dateOfBirth: 'Subject’s DoB',
    address: 'Address',
    recievingEmail: 'Who should receive emails about the application',
    namedPersonEmail: 'Email address of the person named on the application',
    namedPersonMob: 'Enter your mobile phone number',
    namedPersonTel: 'Enter your home phone number',
    uploadDocuments: 'List of forms uploaded (Application form)',
    additionalDocuments: 'List of Documents uploaded (supporting documents)',
  },
};
const cyContent: typeof enContent = {
  serviceName: 'Check your answers - welsh ',
  section: '',
  title: 'Check your Answers -welsh',
  change: 'change - welsh',
  topWarning: 'Your answers will be shared with the other people in this case. - welsh',
  makingSure: 'Please review your answers before you finish your application.- welsh',
  continue: 'Accept and continue - welsh',
  sectionTitles: {
    AdvisingCourt: "6. What you're asking the court to decide - welsh",
    WithoutNoticeHearing: '7. Hearing details - welsh',
    ChildernDetails: "8. Childen's details - welsh",
    InternationalElement: '11. International elements - welsh',
  },
  keys: {
    phoneNumber: 'Phone number -welsh',
    emailAddress: 'Contact number of the person named on the application - welsh',
    'user-role': 'Are you named as the applicant on the application form you are submitting? - welsh ',
    fullName: 'Subject’s name - welsh',
    dateOfBirth: 'Subject’s DoB welsh',
    address: 'Address - welsh',
    recievingEmail: 'Who should receive emails about the application - welsh',
    namedPersonEmail: 'Email address of the person named on the application -welsh',
    namedPersonMob: 'Enter your mobile phone number - welsh',
    namedPersonTel: 'Enter your home phone number - welsh',
    uploadDocuments: 'List of forms uploaded (Application form) - welsh',
    additionalDocuments: 'List of Documents uploaded (supporting documents) - welsh',
  },
};

const en = (content: any) => {
  const userCase = content.userCase!;

  return {
    ...enContent,
    language: content.language,
    sections: [
      TypeOfOrder(enContent, userCase),
      WithoutNoticeHearing(enContent, userCase),
      ChildernDetails(enContent, userCase),
      InternationalElement(enContent, userCase),
      ApplicantSummaryList(enContent, userCase),
    ],
  };
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;

  return {
    ...cyContent,
    language: content.language,
    sections: [
      TypeOfOrder(cyContent, userCase),
      WithoutNoticeHearing(cyContent, userCase),
      ChildernDetails(cyContent, userCase),
      InternationalElement(cyContent, userCase),
      ApplicantSummaryList(cyContent, userCase),
    ],
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
