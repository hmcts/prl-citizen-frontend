import { CaseWithId } from '../../../../../main/app/case/case';
import { ApplicantReasonableAdjustments } from '../../../../../main/app/case/definition';
import { TranslationFn } from '../../../../../main/app/controller/GetController';
import { FormContent } from '../../../../../main/app/form/Form';
import { CommonContent } from '../../../../../main/steps/common/common.content';
import { summaryList } from '../../../../../main/steps/common/support-you-need-during-case/summary/utils';
import {
  NO_I_DO_NOT_NEED_OF_SUPPORT_AT_THIS_TIME,
  NO_NEED_OF_SUPPORT,
  NO_NEED_OF_SUPPORT_AT_THIS_TIME,
} from '../../../../../main/steps/constants';
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
} from '../../../../../main/steps/urls';

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
  safetyArrangements: SAFETY_ARRANGEMENTS,
  safetyArrangementsDetails: SAFETY_ARRANGEMENTS,
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

function filterApplicantSelectedUrls(userCase: Partial<CaseWithId>) {
  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { docsSupport: DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: DOCUMENTS_SUPPORT });

    Object.assign(enContent.keys, { docsSupport: 'I need documents in an alternative format' });
    Object.assign(enContent.keys, { otherDetails: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { helpCommunication: COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: COMMUNICATION_HELP });

    Object.assign(enContent.keys, { helpCommunication: 'I need help communicating and understanding' });
    Object.assign(enContent.keys, { describeOtherNeed: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, { courtHearing: COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: COURT_HEARING_SUPPORT });

    Object.assign(enContent.keys, { courtHearing: 'I would need to bring support with me to a court hearing' });
    Object.assign(enContent.keys, { communicationSupportOther: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, { courtComfort: COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: COURT_HEARING_COMFORT });

    Object.assign(enContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { otherProvideDetails: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, { travellingToCourt: TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: TRAVELLING_TO_COURT });

    Object.assign(enContent.keys, { travellingToCourt: 'I need help travelling to, or moving around court buildings' });
    Object.assign(enContent.keys, { travellingOtherDetails: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.UNABLE_TO_TAKE_COURT_PROCEEDINGS)) {
    Object.assign(urls, { unableForCourtProceedings: UNABLE_TO_TAKE_COURT_PROCEEDINGS });
    Object.assign(urls, { courtProceedingProvideDetails: UNABLE_TO_TAKE_COURT_PROCEEDINGS });

    Object.assign(enContent.keys, {
      unableForCourtProceedings: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { courtProceedingProvideDetails: 'Provie details' });
  }

  if (userCase.reasonableAdjustments?.includes(ApplicantReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    //delete all fields //
    deleteLanguageRequirementsFields(userCase);
    deleteDocsSupportFields(userCase);
    deleteHelpCommunicationFields(userCase);
    deleteCourtHearingFields(userCase);
    deleteCourtComfortFields(userCase);
    deleteTravellingToCourtFields(userCase);
    deleteUnableForCourtProceedingsFields(userCase);
    deleteSafetyArrangementsFields(userCase);
  }

  if (userCase.languageRequirements?.includes(NO_NEED_OF_SUPPORT)) {
    deleteLanguageRequirementsFields(userCase);
  }

  if (userCase.docsSupport?.includes(NO_I_DO_NOT_NEED_OF_SUPPORT_AT_THIS_TIME)) {
    deleteDocsSupportFields(userCase);
  }

  if (userCase.helpCommunication?.includes(NO_NEED_OF_SUPPORT_AT_THIS_TIME)) {
    deleteHelpCommunicationFields(userCase);
  }

  if (userCase.courtHearing?.includes(NO_NEED_OF_SUPPORT_AT_THIS_TIME)) {
    deleteCourtHearingFields(userCase);
  }

  if (userCase.courtComfort?.includes(NO_NEED_OF_SUPPORT_AT_THIS_TIME)) {
    deleteCourtComfortFields(userCase);
  }

  if (userCase.travellingToCourt?.includes(NO_NEED_OF_SUPPORT_AT_THIS_TIME)) {
    deleteTravellingToCourtFields(userCase);
  }

  if (userCase.unableForCourtProceedings?.includes('No')) {
    deleteUnableForCourtProceedingsFields(userCase);
  }

  if (userCase.safetyArrangements?.includes(NO_NEED_OF_SUPPORT_AT_THIS_TIME)) {
    deleteSafetyArrangementsFields(userCase);
  }
}

function deleteSafetyArrangementsFields(userCase: Partial<CaseWithId>) {
  userCase.safetyArrangementsDetails = '';
}

function deleteUnableForCourtProceedingsFields(userCase: Partial<CaseWithId>) {
  userCase.courtProceedingProvideDetails = '';

  delete urls['unableForCourtProceedings'];
  delete urls['courtProceedingProvideDetails'];

  delete enContent.keys['unableForCourtProceedings'];
  delete enContent.keys['courtProceedingProvideDetails'];
}

function deleteTravellingToCourtFields(userCase: Partial<CaseWithId>) {
  userCase.travellingOtherDetails = '';

  delete urls['travellingToCourt'];
  delete urls['travellingOtherDetails'];

  delete enContent.keys['travellingToCourt'];
  delete enContent.keys['travellingOtherDetails'];
}

function deleteCourtComfortFields(userCase: Partial<CaseWithId>) {
  userCase.otherProvideDetails = '';

  delete urls['courtComfort'];
  delete urls['otherProvideDetails'];

  delete enContent.keys['courtComfort'];
  delete enContent.keys['otherProvideDetails'];
}

function deleteCourtHearingFields(userCase: Partial<CaseWithId>) {
  userCase.communicationSupportOther = '';

  delete urls['courtHearing'];
  delete urls['communicationSupportOther'];

  delete enContent.keys['coucourtHearingrtComfort'];
  delete enContent.keys['communicationSupportOther'];
}

function deleteHelpCommunicationFields(userCase: Partial<CaseWithId>) {
  userCase.describeOtherNeed = '';

  delete urls['helpCommunication'];
  delete urls['describeOtherNeed'];

  delete enContent.keys['helpCommunication'];
  delete enContent.keys['describeOtherNeed'];
}

function deleteLanguageRequirementsFields(userCase: Partial<CaseWithId>) {
  userCase.languageDetails = '';
}

function deleteDocsSupportFields(userCase: Partial<CaseWithId>) {
  userCase.otherDetails = '';

  delete urls['docsSupport'];
  delete urls['otherDetails'];

  delete enContent.keys['docsSupport'];
  delete enContent.keys['otherDetails'];
}
