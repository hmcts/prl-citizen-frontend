import { TranslationFn } from '../../../../../main/app/controller/GetController';
import { FormContent } from '../../../../../main/app/form/Form';
import { CommonContent } from '../../../../../main/steps/common/common.content';
import { summaryList } from '../../../../../main/steps/common/summary/utils';
import {
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DOCUMENTS_SUPPORT,
  LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS,
  SAFETY_ARRANGEMENTS,
  TRAVELLING_TO_COURT,
  UNABLE_TO_TAKE_COURT_PROCEEDINGS,
} from '../../../../steps/urls';

const fieldType = {
  languageRequirements: 'String',
  languageDetails: 'String',
  reasonableAdjustments: 'String',
  docsSupport: 'String',
  otherDetails: 'String',
  helpCommunication: 'String',
  describeOtherNeed: 'String',
  courtHearing: 'String',
  communicationSupportOther: 'String',
  courtComfort: 'String',
  otherProvideDetails: 'String',
  travellingToCourt: 'String',
  travellingOtherDetails: 'String',
  unableForCourtProceedings: 'String',
  courtProceedingProvideDetails: 'String',
  safetyArrangements: 'String',
  safetyArrangementsDetails: 'String',
};

export const enContent = {
  section: ' ',
  title: 'Check your answers',
  title2: 'Your hearing needs and requirements',
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
    sections: [summaryList(cyContent, userCase, urls, enContent.sectionTitles.aboutYou, fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: ' ',
  title: 'Check your answers',
  title2: 'Your hearing needs and requirements',
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
  languageRequirements: LANGUAGE_REQUIREMENTS,
  languageDetails: LANGUAGE_REQUIREMENTS,
  reasonableAdjustments: REASONABLE_ADJUSTMENTS,
  docsSupport: DOCUMENTS_SUPPORT,
  otherDetails: DOCUMENTS_SUPPORT,
  helpCommunication: COMMUNICATION_HELP,
  describeOtherNeed: COMMUNICATION_HELP,
  courtHearing: COURT_HEARING_SUPPORT,
  communicationSupportOther: COURT_HEARING_SUPPORT,
  courtComfort: COURT_HEARING_COMFORT,
  otherProvideDetails: COURT_HEARING_COMFORT,
  travellingToCourt: TRAVELLING_TO_COURT,
  travellingOtherDetails: TRAVELLING_TO_COURT,
  unableForCourtProceedings: UNABLE_TO_TAKE_COURT_PROCEEDINGS,
  courtProceedingProvideDetails: UNABLE_TO_TAKE_COURT_PROCEEDINGS,
  safetyArrangements: SAFETY_ARRANGEMENTS,
  safetyArrangementsDetails: SAFETY_ARRANGEMENTS,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, cyContent.sectionTitles.aboutYou, fieldType, content.language)],
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
