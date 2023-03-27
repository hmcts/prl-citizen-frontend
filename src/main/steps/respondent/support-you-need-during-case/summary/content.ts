import { summaryList } from '../../../../../main/steps/common/support-you-need-during-case/summary/utils';
import { NO_HEARINGS, NO_NEED_OF_SUPPORT } from '../../../../../main/steps/constants';
import { CaseWithId } from '../../../../app/case/case';
import { ReasonableAdjustments } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
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
import { CommonContent } from '../../../common/common.content';

export const enContent = {
  section: 'Check your answers ',
  title: 'Your hearing needs and requirments',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    hearingDetails: 'Please provide the details',
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Please provide language details',
    safetyArrangements: 'Do you or the children need special safety arrangements at court?',
    safetyArrangementsDetails: 'Please describe your need in detail',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  },
  dependencies: {
    hearingDetails: {
      dependentOn: 'attendingToCourt',
      value: 'no hearings',
      display: true,
    },
    languageDetails: {
      dependentOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    safetyArrangementsDetails: {
      dependentOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
    docsDetails: {
      dependentOn: 'docsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    largePrintDetails: {
      dependentOn: 'docsSupport',
      value: 'Large print documents',
      display: true,
    },
    otherDetails: {
      dependentOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeSignLanguageDetails: {
      dependentOn: 'helpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    describeOtherNeed: {
      dependentOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    supportWorkerDetails: {
      dependentOn: 'courtHearing',
      value: 'support worker or carer',
      display: true,
    },
    familyProviderDetails: {
      dependentOn: 'courtHearing',
      value: 'friend or family member',
      display: true,
    },
    therapyDetails: {
      dependentOn: 'courtHearing',
      value: 'animal',
      display: true,
    },
    communicationSupportOther: {
      dependentOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    lightingProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    otherProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'Other',
      display: true,
    },
    parkingDetails: {
      dependentOn: 'travellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    differentChairDetails: {
      dependentOn: 'travellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    travellingOtherDetails: {
      dependentOn: 'travellingToCourt',
      value: 'Other',
      display: true,
    },
  },
  errors: {},
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  filterSelectedUrls(userCase);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, 'en', enContent.sectionTitles.aboutYou)],
  };
};

const cyContent: typeof enContent = {
  section: 'Gwirio eich atebion',
  title: 'Eich anghenion a gofynion o ran clywed',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
  },
  keys: {
    attendingToCourt: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
    hearingDetails: 'Please provide the details',
    languageRequirements: 'A oes gennych chi unrhyw ofynion ieithyddol?',
    languageDetails: 'Please provide language details',
    safetyArrangements: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
    safetyArrangementsDetails: 'Please describe your need in detail',
    reasonableAdjustments:
      'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
  },
  dependencies: {
    hearingDetails: {
      dependentOn: 'attendingToCourt',
      value: 'no hearings',
      display: true,
    },
    languageDetails: {
      dependentOn: 'languageRequirements',
      value: 'I need an interpreter in a certain language',
      display: true,
    },
    safetyArrangementsDetails: {
      dependentOn: 'safetyArrangements',
      value: 'other',
      display: true,
    },
    docsDetails: {
      dependentOn: 'docsSupport',
      value: 'Documents in colour print',
      display: true,
    },
    largePrintDetails: {
      dependentOn: 'docsSupport',
      value: 'Large print documents',
      display: true,
    },
    otherDetails: {
      dependentOn: 'docsSupport',
      value: 'other',
      display: true,
    },
    describeSignLanguageDetails: {
      dependentOn: 'helpCommunication',
      value: 'sign language interpreter',
      display: true,
    },
    describeOtherNeed: {
      dependentOn: 'helpCommunication',
      value: 'Other',
      display: true,
    },
    supportWorkerDetails: {
      dependentOn: 'courtHearing',
      value: 'support worker or carer',
      display: true,
    },
    familyProviderDetails: {
      dependentOn: 'courtHearing',
      value: 'friend or family member',
      display: true,
    },
    therapyDetails: {
      dependentOn: 'courtHearing',
      value: 'animal',
      display: true,
    },
    communicationSupportOther: {
      dependentOn: 'courtHearing',
      value: 'other',
      display: true,
    },
    lightingProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'appropriate lighting',
      display: true,
    },
    otherProvideDetails: {
      dependentOn: 'courtComfort',
      value: 'Other',
      display: true,
    },
    parkingDetails: {
      dependentOn: 'travellingToCourt',
      value: 'parking space close to the venue',
      display: true,
    },
    differentChairDetails: {
      dependentOn: 'travellingToCourt',
      value: 'a different type of chair',
      display: true,
    },
    travellingOtherDetails: {
      dependentOn: 'travellingToCourt',
      value: 'Other',
      display: true,
    },
  },
  errors: {},
};

const urls = {
  attendingToCourt: CA_DA_ATTENDING_THE_COURT,
  hearingDetails: CA_DA_ATTENDING_THE_COURT,
  languageRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  languageDetails: CA_DA_LANGUAGE_REQUIREMENTS,
  safetyArrangements: CA_DA_SPECIAL_ARRANGEMENTS,
  safetyArrangementsDetails: CA_DA_SPECIAL_ARRANGEMENTS,
  reasonableAdjustments: CA_DA_REASONABLE_ADJUSTMENTS,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;

  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, urls, 'cy', enContent.sectionTitles.aboutYou)],
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

function filterSelectedUrls(userCase: Partial<CaseWithId>) {
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { docsSupport: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { docsDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { largePrintDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: CA_DA_DOCUMENTS_SUPPORT });

    Object.assign(enContent.keys, { docsSupport: 'I need documents in an alternative format' });
    Object.assign(enContent.keys, { docsDetails: 'Please provide the docs details' });
    Object.assign(enContent.keys, { largePrintDetails: 'Please provide the large print details' });
    Object.assign(enContent.keys, { otherDetails: 'Please provide the other details' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { helpCommunication: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { describeSignLanguageDetails: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: CA_DA_COMMUNICATION_HELP });

    Object.assign(enContent.keys, { helpCommunication: 'I need help communicating and understanding' });
    Object.assign(enContent.keys, { describeSignLanguageDetails: 'Please provide sign language details' });
    Object.assign(enContent.keys, { describeOtherNeed: 'Please provide the details' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, { courtHearing: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { supportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { familyProviderDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { therapyDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: CA_DA_COURT_HEARING_SUPPORT });

    Object.assign(enContent.keys, {
      courtHearing: 'I would need to bring support with me to a court hearing',
    });
    Object.assign(enContent.keys, { supportWorkerDetails: 'Please provide support worker details' });
    Object.assign(enContent.keys, { familyProviderDetails: 'Please provide family member details' });
    Object.assign(enContent.keys, { therapyDetails: 'Please provide therapy animal details' });
    Object.assign(enContent.keys, { communicationSupportOther: 'Please provide the details' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, { courtComfort: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { lightingProvideDetails: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: CA_DA_COURT_HEARING_COMFORT });

    Object.assign(enContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { lightingProvideDetails: 'Please describe appropriate lighting details' });
    Object.assign(enContent.keys, { otherProvideDetails: 'Please describe your need in detail' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, { travellingToCourt: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { parkingDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { differentChairDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: CA_DA_TRAVELLING_TO_COURT });

    Object.assign(enContent.keys, {
      travellingToCourt: 'I need help travelling to, or moving around court buildings',
    });
    Object.assign(enContent.keys, { parkingDetails: 'Please describe parking space details' });
    Object.assign(enContent.keys, { differentChairDetails: 'Please describe different chair details' });
    Object.assign(enContent.keys, { travellingOtherDetails: 'Please describe your need in detail' });
  }

  if (userCase.docsSupport?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteDocumentSupportFields();
  }
  if (userCase.helpCommunication?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteCommunicationHelpFields();
  }
  if (userCase.courtHearing?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteCourtHearingFields();
  }
  if (userCase.courtComfort?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteCourtComfortFields();
  }
  if (userCase.travellingToCourt?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteTravellingToCourtFields();
  }

  if (!userCase?.attendingToCourt?.includes(NO_HEARINGS)) {
    userCase.hearingDetails = '';
  }

  if (userCase?.languageRequirements?.includes(NO_NEED_OF_SUPPORT)) {
    userCase.languageDetails = '';
  }

  if (!userCase?.safetyArrangements?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    userCase.safetyArrangementsDetails = '';
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteDocumentSupportFields();
    deleteCommunicationHelpFields();
    deleteCourtHearingFields();
    deleteCourtComfortFields();
    deleteTravellingToCourtFields();
  }
}
function deleteTravellingToCourtFields() {
  delete urls['travellingToCourt'];
  delete urls['parkingDetails'];
  delete urls['differentChairDetails'];
  delete urls['travellingOtherDetails'];

  delete enContent.keys['travellingToCourt'];
  delete enContent.keys['parkingDetails'];
  delete enContent.keys['differentChairDetails'];
  delete enContent.keys['travellingOtherDetails'];
}

function deleteCourtComfortFields() {
  delete urls['courtComfort'];
  delete urls['lightingProvideDetails'];
  delete urls['otherProvideDetails'];

  delete enContent.keys['courtComfort'];
  delete enContent.keys['lightingProvideDetails'];
  delete enContent.keys['otherProvideDetails'];
}

function deleteCourtHearingFields() {
  delete urls['courtHearing'];
  delete urls['supportWorkerDetails'];
  delete urls['familyProviderDetails'];
  delete urls['therapyDetails'];
  delete urls['communicationSupportOther'];

  delete enContent.keys['courtHearing'];
  delete enContent.keys['supportWorkerDetails'];
  delete enContent.keys['familyProviderDetails'];
  delete enContent.keys['therapyDetails'];
  delete enContent.keys['communicationSupportOther'];
}

function deleteCommunicationHelpFields() {
  delete urls['helpCommunication'];
  delete urls['describeSignLanguageDetails'];
  delete urls['describeSignLanguageDetails'];

  delete enContent.keys['helpCommunication'];
  delete enContent.keys['describeSignLanguageDetails'];
  delete enContent.keys['describeSignLanguageDetails'];
}

function deleteDocumentSupportFields() {
  delete urls['docsSupport'];
  delete urls['docsDetails'];
  delete urls['largePrintDetails'];
  delete urls['otherDetails'];

  delete enContent.keys['docsSupport'];
  delete enContent.keys['docsDetails'];
  delete enContent.keys['largePrintDetails'];
  delete enContent.keys['otherDetails'];
}
