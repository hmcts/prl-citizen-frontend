import { TranslationFn } from '../../../../../main/app/controller/GetController';
import { FormContent } from '../../../../../main/app/form/Form';
import { CommonContent } from '../../../../../main/steps/common/common.content';
import { summaryList } from '../../../../../main/steps/common/summary/utils';
import {
  CA_DA_ATTENDING_THE_COURT,
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_LANGUAGE_REQUIREMENTS,
  CA_DA_REASONABLE_ADJUSTMENTS,
  CA_DA_SPECIAL_ARRANGEMENTS,
  CA_DA_TRAVELLING_TO_COURT,
} from '../../../../steps/urls';

const fieldType = {
  respondentAttendingToCourt: 'String',
  noHearingDetails: 'String',
  respondentLangRequirements: 'String',
  respondentLangDetails: 'String',
  respondentSpecialArrangements: 'String',
  respondentSpecialArrangementsDetails: 'String',
  respondentReasonableAdjustments: 'String',
  respondentDocsSupport: 'String',
  respondentDocsDetails: 'String',
  respondentLargePrintDetails: 'String',
  respondentOtherDetails: 'String',
  respondentHelpCommunication: 'String',
  respondentSignLanguageDetails: 'String',
  respondentDescribeOtherNeed: 'String',
  respondentCourtHearing: 'String',
  respondentSupportWorkerDetails: 'String',
  respondentFamilyDetails: 'String',
  respondentTherapyDetails: 'String',
  respondentCommSupportOther: 'String',
  respondentCourtComfort: 'String',
  respondentLightingDetails: 'String',
  respondentOtherProvideDetails: 'String',
  respondentTravellingToCourt: 'String',
  respondentParkingDetails: 'String',
  respondentDifferentChairDetails: 'String',
  respondentTravellingOtherDetails: 'String',
};

export const enContent = {
  section: 'Check your answers ',
  title: 'Your hearing needs and requirments',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    respondentAttendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    noHearingDetails: 'Please provide the details',
    respondentLangRequirements: 'Do you have any language requirements?',
    respondentLangDetails: 'Please provide language details',
    respondentSpecialArrangements: 'Do you or the children need special safety arrangements at court?',
    respondentSpecialArrangementsDetails: 'Please describe your need in detail',
    respondentReasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    respondentDocsSupport: 'I need documents in an alternative format',
    respondentDocsDetails: 'Please provide the docs details',
    respondentLargePrintDetails: 'Please provide the large print details',
    respondentOtherDetails: 'Please provide the other details',
    respondentHelpCommunication: 'I need help communicating and understanding',
    respondentSignLanguageDetails: 'Please provide sign language details',
    respondentDescribeOtherNeed: 'Please provide the details',
    respondentCourtHearing: 'I would need to bring support with me to a court hearing',
    respondentSupportWorkerDetails: 'Please provide support worker details',
    respondentFamilyDetails: 'Please provide family member details',
    respondentTherapyDetails: 'Please provide therapy animal details',
    respondentCommSupportOther: 'Please provide the details',
    respondentCourtComfort: 'I need something to make me feel comfortable during a court hearing',
    respondentLightingDetails: 'Please describe appropriate lighting details',
    respondentOtherProvideDetails: 'Please describe your need in detail',
    respondentTravellingToCourt: 'I need help travelling to, or moving around court buildings',
    respondentParkingDetails: 'Please describe parking space details',
    respondentDifferentChairDetails: 'Please describe different chair details',
    respondentTravellingOtherDetails: 'Please describe your need in detail',
  },
  dependencies: {
    noHearingDetails: {
      dependentOn: 'respondentAttendingToCourt',
      value: 'no hearings',
      display: true,
    },
    respondentLangDetails: {
      dependentOn: 'respondentLangRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    respondentSpecialArrangementsDetails: {
      dependentOn: 'respondentSpecialArrangements',
      value: 'other',
      display: true,
    },
    respondentDocsDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    respondentLargePrintDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Large print documents',
      display: true,
    },
    respondentOtherDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'other',
      display: true,
    },
    respondentSignLanguageDetails: {
      dependentOn: 'respondentHelpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    respondentDescribeOtherNeed: {
      dependentOn: 'respondentHelpCommunication',
      value: 'Other',
      display: true,
    },
    respondentSupportWorkerDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'support worker or carer',
      display: true,
    },
    respondentFamilyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'friend or family member',
      display: true,
    },
    respondentTherapyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'animal',
      display: true,
    },
    respondentCommSupportOther: {
      dependentOn: 'respondentCourtHearing',
      value: 'other',
      display: true,
    },
    respondentLightingDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    respondentOtherProvideDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'Other',
      display: true,
    },
    respondentParkingDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    respondentDifferentChairDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    respondentTravellingOtherDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'Other',
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
    sections: [summaryList(cyContent, userCase, urls, 'aboutYou', fieldType, content.language)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers ',
  title: 'Your hearing needs and requirments',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    respondentAttendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    noHearingDetails: 'Please provide the details',
    respondentLangRequirements: 'Do you have any language requirements?',
    respondentLangDetails: 'Please provide language details',
    respondentSpecialArrangements: 'Do you or the children need special safety arrangements at court?',
    respondentSpecialArrangementsDetails: 'Please describe your need in detail',
    respondentReasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    respondentDocsSupport: 'I need documents in an alternative format',
    respondentDocsDetails: 'Please provide the docs details',
    respondentLargePrintDetails: 'Please provide the large print details',
    respondentOtherDetails: 'Please provide the other details',
    respondentHelpCommunication: 'I need help communicating and understanding',
    respondentSignLanguageDetails: 'Please provide sign language details',
    respondentDescribeOtherNeed: 'Please provide the details',
    respondentCourtHearing: 'I would need to bring support with me to a court hearing',
    respondentSupportWorkerDetails: 'Please provide support worker details',
    respondentFamilyDetails: 'Please provide family member details',
    respondentTherapyDetails: 'Please provide therapy animal details',
    respondentCommSupportOther: 'Please provide the details',
    respondentCourtComfort: 'I need something to make me feel comfortable during a court hearing',
    respondentLightingDetails: 'Please describe appropriate lighting details',
    respondentOtherProvideDetails: 'Please describe your need in detail',
    respondentTravellingToCourt: 'I need help travelling to, or moving around court buildings',
    respondentParkingDetails: 'Please describe parking space details',
    respondentDifferentChairDetails: 'Please describe different chair details',
    respondentTravellingOtherDetails: 'Please describe your need in detail',
  },
  dependencies: {
    noHearingDetails: {
      dependentOn: 'respondentAttendingToCourt',
      value: 'no hearings',
      display: true,
    },
    respondentLangDetails: {
      dependentOn: 'respondentLangRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    respondentSpecialArrangementsDetails: {
      dependentOn: 'respondentSpecialArrangements',
      value: 'other',
      display: true,
    },
    respondentDocsDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    respondentLargePrintDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'Large print documents',
      display: true,
    },
    respondentOtherDetails: {
      dependentOn: 'respondentDocsSupport',
      value: 'other',
      display: true,
    },
    respondentSignLanguageDetails: {
      dependentOn: 'respondentHelpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    respondentDescribeOtherNeed: {
      dependentOn: 'respondentHelpCommunication',
      value: 'Other',
      display: true,
    },
    respondentSupportWorkerDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'support worker or carer',
      display: true,
    },
    respondentFamilyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'friend or family member',
      display: true,
    },
    respondentTherapyDetails: {
      dependentOn: 'respondentCourtHearing',
      value: 'animal',
      display: true,
    },
    respondentCommSupportOther: {
      dependentOn: 'respondentCourtHearing',
      value: 'other',
      display: true,
    },
    respondentLightingDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    respondentOtherProvideDetails: {
      dependentOn: 'respondentCourtComfort',
      value: 'Other',
      display: true,
    },
    respondentParkingDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    respondentDifferentChairDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    respondentTravellingOtherDetails: {
      dependentOn: 'respondentTravellingToCourt',
      value: 'Other',
      display: true,
    },
  },
  errors: {},
};

const urls = {
  respondentAttendingToCourt: CA_DA_ATTENDING_THE_COURT,
  noHearingDetails: CA_DA_ATTENDING_THE_COURT,
  respondentLangRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  respondentLangDetails: CA_DA_LANGUAGE_REQUIREMENTS,
  respondentSpecialArrangements: CA_DA_SPECIAL_ARRANGEMENTS,
  respondentSpecialArrangementsDetails: CA_DA_SPECIAL_ARRANGEMENTS,
  respondentReasonableAdjustments: CA_DA_REASONABLE_ADJUSTMENTS,
  respondentDocsSupport: CA_DA_DOCUMENTS_SUPPORT,
  respondentDocsDetails: CA_DA_DOCUMENTS_SUPPORT,
  respondentLargePrintDetails: CA_DA_DOCUMENTS_SUPPORT,
  respondentOtherDetails: CA_DA_DOCUMENTS_SUPPORT,
  respondentHelpCommunication: CA_DA_COMMUNICATION_HELP,
  respondentSignLanguageDetails: CA_DA_COMMUNICATION_HELP,
  respondentDescribeOtherNeed: CA_DA_COMMUNICATION_HELP,
  respondentCourtHearing: CA_DA_COURT_HEARING_SUPPORT,
  respondentSupportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT,
  respondentFamilyDetails: CA_DA_COURT_HEARING_SUPPORT,
  respondentTherapyDetails: CA_DA_COURT_HEARING_SUPPORT,
  respondentCommSupportOther: CA_DA_COURT_HEARING_SUPPORT,
  respondentCourtComfort: CA_DA_COURT_HEARING_COMFORT,
  respondentTravellingOtherDetails: CA_DA_TRAVELLING_TO_COURT,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'aboutYou', fieldType, content.language)],
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
