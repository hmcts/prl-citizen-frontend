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
    whatAreYouAsking: 'What are you asking the court to do?',
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing?',
    askingNoHearing: 'Are you asking for a without notice hearing?',
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    fullName: 'Full name',
    dateOfBirth: 'Date of birth',
    gender: 'Gender',
    address: 'Address',
    ordersAppliedFor: 'Orders applied for',
    isDecisionTaken:
      'State everyone who has parental responsibility for child 2 and how they have parental responsibility',
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
    whatAreYouAsking: 'What are you asking the court to do? - welsh',
    wantingCourtToDo: 'Describe what you want the court to do regarding the children in this application - welsh',
    qualifyForUrgentHearing: 'Does your situation qualify for an urgent first hearing? - welsh',
    askingNoHearing: 'Are you asking for a without notice hearing? - welsh',
    phoneNumber: 'Phone number -welsh',
    emailAddress: 'Contact number of the person named on the application - welsh',
    fullName: 'Full name - welsh',
    dateOfBirth: 'Date of birth - welsh',
    gender: 'Gender - welsh',
    address: 'Address - welsh',
    ordersAppliedFor: 'Orders applied for - welsh',
    isDecisionTaken:
      'State everyone who has parental responsibility for child 2 and how they have parental responsibility - welsh',
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
