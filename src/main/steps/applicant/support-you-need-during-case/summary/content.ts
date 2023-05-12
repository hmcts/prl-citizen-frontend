import { CaseWithId } from '../../../../../main/app/case/case';
import { TranslationFn } from '../../../../../main/app/controller/GetController';
import { FormContent } from '../../../../../main/app/form/Form';
import { CommonContent } from '../../../../../main/steps/common/common.content';
import { summaryList } from '../../../../../main/steps/common/support-you-need-during-case/summary/utils';
import {
  CA_DA_ATTENDING_THE_COURT,
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DOCUMENTS_SUPPORT,
  LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS,
  SAFETY_ARRANGEMENTS,
  TRAVELLING_TO_COURT,
} from '../../../../../main/steps/urls';
import { LANGUAGE_INTERPRETER, NO_HEARINGS, NO_INTERPRETER, NO_SUPPORT, OTHER } from '../../../../steps/constants';

export const enContent = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    hearingDetails: 'Please provide the details',
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Give details of the language you require (including dialect, if applicable)',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
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

  filterApplicantSelectedUrls(userCase);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, 'en', enContent.sectionTitles.aboutYou)],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers -welsh',
  title: 'Your hearing needs and requirements -welsh',
  sectionTitles: {
    aboutYou: 'About you -welsh',
  },

  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone? -welsh',
    hearingDetails: 'Please provide the details -welsh',
    languageRequirements: 'Do you have any language requirements? -welsh',
    languageDetails: 'Give details of the language you require (including dialect, if applicable) -welsh',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case? -welsh',
    safetyArrangements: 'Do you or the children need special safety arrangements at court? -welsh',
    safetyArrangementsDetails: 'Describe what you need -welsh',
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
  attendingToCourt: CA_DA_ATTENDING_THE_COURT,
  hearingDetails: CA_DA_ATTENDING_THE_COURT,
  languageRequirements: LANGUAGE_REQUIREMENTS,
  languageDetails: LANGUAGE_REQUIREMENTS,
  reasonableAdjustments: REASONABLE_ADJUSTMENTS,
  safetyArrangements: SAFETY_ARRANGEMENTS,
  safetyArrangementsDetails: SAFETY_ARRANGEMENTS,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'cy', cyContent.sectionTitles.aboutYou)],
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

function filterApplicantSelectedUrls(userCase: Partial<CaseWithId>) {
  if (userCase.reasonableAdjustments?.includes('docsformat')) {
    Object.assign(urls, { docsSupport: DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: DOCUMENTS_SUPPORT });

    Object.assign(enContent.keys, {
      docsSupport: 'I need documents in an alternative format',
      otherDetails: 'Describe what you need',
    });
    Object.assign(cyContent.keys, {
      docsSupport: 'I need documents in an alternative format - welsh',
      otherDetails: 'Describe what you need - welsh',
    });
  }

  if (userCase.reasonableAdjustments?.includes('commhelp')) {
    Object.assign(urls, { helpCommunication: COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: COMMUNICATION_HELP });

    Object.assign(enContent.keys, {
      helpCommunication: 'I need help communicating and understanding',
      describeOtherNeed: 'Describe what you need',
    });
    Object.assign(cyContent.keys, {
      helpCommunication: 'I need help communicating and understanding - welsh',
      describeOtherNeed: 'Describe what you need - welsh',
    });
  }

  if (userCase.reasonableAdjustments?.includes('hearingsupport')) {
    Object.assign(urls, { courtHearing: COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: COURT_HEARING_SUPPORT });

    Object.assign(enContent.keys, {
      courtHearing: 'I would need to bring support with me to a court hearing',
      communicationSupportOther: 'Describe what you need',
    });
    Object.assign(cyContent.keys, {
      courtHearing: 'I would need to bring support with me to a court hearing - welsh',
      communicationSupportOther: 'Describe what you need - welsh',
    });
  }

  if (userCase.reasonableAdjustments?.includes('hearingcomfort')) {
    Object.assign(urls, { courtComfort: COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: COURT_HEARING_COMFORT });

    Object.assign(enContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing',
      otherProvideDetails: 'Describe what you need',
    });
    Object.assign(cyContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing - welsh',
      otherProvideDetails: 'Describe what you need - welsh',
    });
  }

  if (userCase.reasonableAdjustments?.includes('travellinghelp')) {
    Object.assign(urls, { travellingToCourt: TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: TRAVELLING_TO_COURT });

    Object.assign(enContent.keys, {
      travellingToCourt: 'I need help travelling to, or moving around court buildings',
      travellingOtherDetails: 'Describe what you need',
    });
    Object.assign(cyContent.keys, {
      travellingToCourt: 'I need help travelling to, or moving around court buildings - welsh',
      travellingOtherDetails: 'Describe what you need - welsh',
    });
  }
  if (!userCase?.attendingToCourt?.includes(NO_HEARINGS)) {
    userCase.hearingDetails = '';
  }

  if (!userCase?.languageRequirements?.includes(LANGUAGE_INTERPRETER)) {
    userCase.languageDetails = '';
  }
  if (!userCase?.safetyArrangements?.includes(OTHER)) {
    userCase.safetyArrangementsDetails = '';
  }

  if (userCase.reasonableAdjustments?.includes(NO_SUPPORT)) {
    //delete all fields //
    deleteLanguageRequirementsFields(userCase);
    deleteDocsSupportFields(userCase);
    deleteHelpCommunicationFields(userCase);
    deleteCourtHearingFields(userCase);
    deleteCourtComfortFields(userCase);
    deleteTravellingToCourtFields(userCase);
    deleteSafetyArrangementsFields(userCase);
  }

  if (userCase.languageRequirements?.includes(NO_INTERPRETER)) {
    deleteLanguageRequirementsFields(userCase);
  }

  if (userCase.docsSupport?.includes(NO_SUPPORT)) {
    deleteDocsSupportFields(userCase);
  }

  if (userCase.helpCommunication?.includes(NO_SUPPORT)) {
    deleteHelpCommunicationFields(userCase);
  }

  if (userCase.courtHearing?.includes(NO_SUPPORT)) {
    deleteCourtHearingFields(userCase);
  }

  if (userCase.courtComfort?.includes(NO_SUPPORT)) {
    deleteCourtComfortFields(userCase);
  }

  if (userCase.travellingToCourt?.includes(NO_SUPPORT)) {
    deleteTravellingToCourtFields(userCase);
  }

  if (userCase.safetyArrangements?.includes(NO_SUPPORT)) {
    deleteSafetyArrangementsFields(userCase);
  }
}

function deleteSafetyArrangementsFields(userCase: Partial<CaseWithId>) {
  userCase.safetyArrangementsDetails = '';
}

function deleteTravellingToCourtFields(userCase: Partial<CaseWithId>) {
  userCase.travellingOtherDetails = '';

  delete urls['travellingToCourt'];
  delete urls['travellingOtherDetails'];
}

function deleteCourtComfortFields(userCase: Partial<CaseWithId>) {
  userCase.otherProvideDetails = '';

  delete urls['courtComfort'];
  delete urls['otherProvideDetails'];
}

function deleteCourtHearingFields(userCase: Partial<CaseWithId>) {
  userCase.communicationSupportOther = '';

  delete urls['courtHearing'];
  delete urls['communicationSupportOther'];
}

function deleteHelpCommunicationFields(userCase: Partial<CaseWithId>) {
  userCase.describeOtherNeed = '';

  delete urls['helpCommunication'];
  delete urls['describeOtherNeed'];
}

function deleteLanguageRequirementsFields(userCase: Partial<CaseWithId>) {
  userCase.languageDetails = '';
}

function deleteDocsSupportFields(userCase: Partial<CaseWithId>) {
  userCase.otherDetails = '';

  delete urls['docsSupport'];
  delete urls['otherDetails'];
}
