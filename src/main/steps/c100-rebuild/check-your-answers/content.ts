import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';

import {
  ApplicantSummaryList,
  ChildernDetails,
  ChildernDetailsAdditional,
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
  Yes: 'Yes',
  No: 'No - welsh',
  sectionTitles: {
    AdvisingCourt: "6. What you're asking the court to decide",
    WithoutNoticeHearing: '7. Hearing details',
    ChildernDetails: "8. Childen's details",
    InternationalElement: '11. International elements',
    additionationDetailsAboutChildern: 'Additional details about the children',
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
    socialServiceLink: 'Are any of the children known to social services?',
    subjectToChildProtection: 'Are any of the children the subject of a child protection plan?',
    haveOtherChildern: "Do you or the respondents have other children who aren't part of this application?",
    liveOutSideUk: "Are the children's lives mainly based outside of England and Wales?",
    basedOutSideEnglandOrWales:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
    anotherPersonSameOrder:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    otherCountryRequestInfo: 'Has another country asked (or been asked) for information or help for the children?',
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
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  sectionTitles: {
    AdvisingCourt: "6. What you're asking the court to decide - welsh",
    WithoutNoticeHearing: '7. Hearing details - welsh',
    ChildernDetails: "8. Childen's details - welsh",
    InternationalElement: '11. International elements - welsh',
    additionationDetailsAboutChildern: 'Additional details about the children - welsh',
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
    socialServiceLink: 'Are any of the children known to social services? - welsh',
    subjectToChildProtection: 'Are any of the children the subject of a child protection plan? - welsh',
    haveOtherChildern: "Do you or the respondents have other children who aren't part of this application? - welsh",
    liveOutSideUk: "Are the children's lives mainly based outside of England and Wales?",
    basedOutSideEnglandOrWales:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales? - welsh",
    anotherPersonSameOrder:
      'Could another person in the application apply for a similar order in a country outside England or Wales? - welsh',
    otherCountryRequestInfo:
      'Has another country asked (or been asked) for information or help for the children? - welsh',
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
      ChildernDetailsAdditional(enContent, userCase),
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
