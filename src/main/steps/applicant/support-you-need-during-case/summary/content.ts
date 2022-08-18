import { TranslationFn } from '../../../../../main/app/controller/GetController';
import { FormContent } from '../../../../../main/app/form/Form';
import { summaryList } from '../../../../../main/steps/applicant/support-you-need-during-case/summary/utils';
import { CommonContent } from '../../../../../main/steps/common/common.content';

export const enContent = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Give details of the language you require (including dialect, if applicable)',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    docsSupport: 'I need documents in an alternative format',
    otherDetails: 'Describe what you need',
    helpCommunication: 'I need help communicating and understanding',
    describeOtherNeed: 'Describe what you need',
    courtHearing: 'I would need to bring support with me to a court hearing',
    communicationSupportOther: 'Describe what you need',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    otherProvideDetails: 'Describe what you need',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    travellingOtherDetails: 'Describe what you need',
    unableForCourtProceedings: 'I need something to make me feel comfortable during a court hearing',
    courtProceedingProvideDetails: 'Provie details',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Describe what you need',
  },
  dependencies: {
    languageDetails: {
      dependantOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    otherDetails: {
      dependantOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeOtherNeed: {
      dependantOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    communicationSupportOther: {
      dependantOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    otherProvideDetails: {
      dependantOn: 'courtComfort',
      value: 'other',
      display: true,
    },
    travellingOtherDetails: {
      dependantOn: 'unableForCourtProceedings',
      value: 'Yes',
      display: true,
    },
    safetyArrangementsDetails: {
      dependantOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
  },
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, enContent.sectionTitles.aboutYou)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Give details of the language you require (including dialect, if applicable)',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    docsSupport: 'I need documents in an alternative format',
    otherDetails: 'Describe what you need',
    helpCommunication: 'I need help communicating and understanding',
    describeOtherNeed: 'Describe what you need',
    courtHearing: 'I would need to bring support with me to a court hearing',
    communicationSupportOther: 'Describe what you need',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    otherProvideDetails: 'Describe what you need',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    travellingOtherDetails: 'Describe what you need',
    unableForCourtProceedings: 'I need something to make me feel comfortable during a court hearing',
    courtProceedingProvideDetails: 'Provie details',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Describe what you need',
  },
  dependencies: {
    languageDetails: {
      dependantOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    otherDetails: {
      dependantOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeOtherNeed: {
      dependantOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    communicationSupportOther: {
      dependantOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    otherProvideDetails: {
      dependantOn: 'courtComfort',
      value: 'other',
      display: true,
    },
    travellingOtherDetails: {
      dependantOn: 'unableForCourtProceedings',
      value: 'Yes',
      display: true,
    },
    safetyArrangementsDetails: {
      dependantOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
  },
  errors: {},
};

const urls = {
  languageRequirements: 'language-requirements',
  languageDetails: 'language-requirements',
  reasonableAdjustments: 'reasonable-adjustments',
  docsSupport: 'documents-support',
  otherDetails: 'documents-support',
  helpCommunication: 'communication-help',
  describeOtherNeed: 'communication-help',
  courtHearing: 'court-hearing-support',
  communicationSupportOther: 'court-hearing-support',
  courtComfort: 'court-hearing-comfort',
  otherProvideDetails: 'court-hearing-comfort',
  travellingToCourt: 'travelling-to-court',
  travellingOtherDetails: 'travelling-to-court',
  unableForCourtProceedings: 'unable-to-take-court-proceedings',
  courtProceedingProvideDetails: 'unable-to-take-court-proceedings',
  safetyArrangements: 'safety-arrangements',
  safetyArrangementsDetails: 'safety-arrangements',
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, enContent.sectionTitles.aboutYou)],
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
