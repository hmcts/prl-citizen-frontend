import { CaseWithId } from '../../../../../main/app/case/case';
import { TranslationFn } from '../../../../../main/app/controller/GetController';
import { FormContent } from '../../../../../main/app/form/Form';
import { CommonContent } from '../../../../../main/steps/common/common.content';
import { summaryList } from '../../../../../main/steps/common/support-you-need-during-case/summary/utils';
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
import { typeofcaseuser } from '../../../common/typeofcaseuser';
export const enContent = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  pagetitle: '',
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
    courtHearing: 'I need to bring support with me to a court hearing',
    communicationSupportOther: 'Describe what you need',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    otherProvideDetails: 'Describe what you need',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    travellingOtherDetails: 'Describe what you need',
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
  pagetitle: '',
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
    courtHearing: 'I need to bring support with me to a court hearing',
    communicationSupportOther: 'Describe what you need',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    otherProvideDetails: 'Describe what you need',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    travellingOtherDetails: 'Describe what you need',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, true);
  return {
    ...translations,
    form,
  };
};

function filterApplicantSelectedUrls(userCase: Partial<CaseWithId>) {
  if (userCase.reasonableAdjustments?.includes('docsformat')) {
    Object.assign(urls, { docsSupport: DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: DOCUMENTS_SUPPORT });

    Object.assign(enContent.keys, { docsSupport: 'I need documents in an alternative format' });
    Object.assign(enContent.keys, { otherDetails: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes('commhelp')) {
    Object.assign(urls, { helpCommunication: COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: COMMUNICATION_HELP });

    Object.assign(enContent.keys, { helpCommunication: 'I need help communicating and understanding' });
    Object.assign(enContent.keys, { describeOtherNeed: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes('hearingsupport')) {
    Object.assign(urls, { courtHearing: COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: COURT_HEARING_SUPPORT });

    Object.assign(enContent.keys, { courtHearing: 'I would need to bring support with me to a court hearing' });
    Object.assign(enContent.keys, { communicationSupportOther: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes('hearingcomfort')) {
    Object.assign(urls, { courtComfort: COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: COURT_HEARING_COMFORT });

    Object.assign(enContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { otherProvideDetails: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes('travellinghelp')) {
    Object.assign(urls, { travellingToCourt: TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: TRAVELLING_TO_COURT });

    Object.assign(enContent.keys, { travellingToCourt: 'I need help travelling to, or moving around court buildings' });
    Object.assign(enContent.keys, { travellingOtherDetails: 'Describe what you need' });
  }

  if (userCase.reasonableAdjustments?.includes('unabletotakecourtproceedings')) {
    Object.assign(urls, { unableForCourtProceedings: UNABLE_TO_TAKE_COURT_PROCEEDINGS });
    Object.assign(urls, { courtProceedingProvideDetails: UNABLE_TO_TAKE_COURT_PROCEEDINGS });

    Object.assign(enContent.keys, {
      unableForCourtProceedings: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { courtProceedingProvideDetails: 'Provie details' });
  }

  if (userCase.reasonableAdjustments?.includes('nosupport')) {
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

  if (userCase.languageRequirements?.includes('nointerpreter')) {
    deleteLanguageRequirementsFields(userCase);
  }

  if (userCase.docsSupport?.includes('nosupport')) {
    deleteDocsSupportFields(userCase);
  }

  if (userCase.helpCommunication?.includes('nosupport')) {
    deleteHelpCommunicationFields(userCase);
  }

  if (userCase.courtHearing?.includes('nosupport')) {
    deleteCourtHearingFields(userCase);
  }

  if (userCase.courtComfort?.includes('nosupport')) {
    deleteCourtComfortFields(userCase);
  }

  if (userCase.travellingToCourt?.includes('nosupport')) {
    deleteTravellingToCourtFields(userCase);
  }

  if (userCase.unableForCourtProceedings?.includes('No')) {
    deleteUnableForCourtProceedingsFields(userCase);
  }

  if (userCase.safetyArrangements?.includes('nosupport')) {
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
