import { summaryList } from '../../../../../main/steps/common/support-you-need-during-case/summary/utils';
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
    respondentAttendingToCourt: 'Would you be able to take part in hearings by video and phone?',
    respondentHearingDetails: 'Please provide the details',
    respondentLangRequirements: 'Do you have any language requirements?',
    respondentLangDetails: 'Please provide language details',
    respondentSpecialArrangements: 'Do you or the children need special safety arrangements at court?',
    respondentSpecialArrangementsDetails: 'Please describe your need in detail',
    respondentReasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    //respondentDocsSupport: 'I need documents in an alternative format',
    //respondentDocsDetails: 'Please provide the docs details',
    //respondentLargePrintDetails: 'Please provide the large print details',
    //respondentOtherDetails: 'Please provide the other details',
    //respondentHelpCommunication: 'I need help communicating and understanding',
    //respondentSignLanguageDetails: 'Please provide sign language details',
    //respondentDescribeOtherNeed: 'Please provide the details',
    // respondentCourtHearing: 'I would need to bring support with me to a court hearing',
    // respondentSupportWorkerDetails: 'Please provide support worker details',
    // respondentFamilyDetails: 'Please provide family member details',
    // respondentTherapyDetails: 'Please provide therapy animal details',
    // respondentCommSupportOther: 'Please provide the details',
    // respondentCourtComfort: 'I need something to make me feel comfortable during a court hearing',
    // respondentLightingDetails: 'Please describe appropriate lighting details',
    // respondentOtherProvideDetails: 'Please describe your need in detail',
    // respondentTravellingToCourt: 'I need help travelling to, or moving around court buildings',
    // respondentParkingDetails: 'Please describe parking space details',
    // respondentDifferentChairDetails: 'Please describe different chair details',
    // respondentTravellingOtherDetails: 'Please describe your need in detail',
  },
  dependencies: {
    respondentHearingDetails: {
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
  console.log('userCase========>' + JSON.stringify(userCase));
  console.log('urls========>' + JSON.stringify(urls));
  filterSelectedUrls(userCase);
  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, urls, enContent.sectionTitles.aboutYou)],
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
    respondentHearingDetails: 'Please provide the details',
    respondentLangRequirements: 'Do you have any language requirements?',
    respondentLangDetails: 'Please provide language details',
    respondentSpecialArrangements: 'Do you or the children need special safety arrangements at court?',
    respondentSpecialArrangementsDetails: 'Please describe your need in detail',
    respondentReasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    //respondentDocsSupport: 'I need documents in an alternative format',
    //respondentDocsDetails: 'Please provide the docs details',
    //respondentLargePrintDetails: 'Please provide the large print details',
    //respondentOtherDetails: 'Please provide the other details',
    //respondentHelpCommunication: 'I need help communicating and understanding',
    //respondentSignLanguageDetails: 'Please provide sign language details',
    //respondentDescribeOtherNeed: 'Please provide the details',
    // respondentCourtHearing: 'I would need to bring support with me to a court hearing',
    // respondentSupportWorkerDetails: 'Please provide support worker details',
    // respondentFamilyDetails: 'Please provide family member details',
    // respondentTherapyDetails: 'Please provide therapy animal details',
    // respondentCommSupportOther: 'Please provide the details',
    // respondentCourtComfort: 'I need something to make me feel comfortable during a court hearing',
    // respondentLightingDetails: 'Please describe appropriate lighting details',
    // respondentOtherProvideDetails: 'Please describe your need in detail',
    // respondentTravellingToCourt: 'I need help travelling to, or moving around court buildings',
    // respondentParkingDetails: 'Please describe parking space details',
    // respondentDifferentChairDetails: 'Please describe different chair details',
    // respondentTravellingOtherDetails: 'Please describe your need in detail',
  },
  dependencies: {
    respondentHearingDetails: {
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
  respondentHearingDetails: CA_DA_ATTENDING_THE_COURT,
  respondentLangRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  respondentLangDetails: CA_DA_LANGUAGE_REQUIREMENTS,
  respondentSpecialArrangements: CA_DA_SPECIAL_ARRANGEMENTS,
  respondentSpecialArrangementsDetails: CA_DA_SPECIAL_ARRANGEMENTS,
  respondentReasonableAdjustments: CA_DA_REASONABLE_ADJUSTMENTS,
  //respondentDocsSupport: CA_DA_DOCUMENTS_SUPPORT,
  //respondentDocsDetails: CA_DA_DOCUMENTS_SUPPORT,
  //respondentLargePrintDetails: CA_DA_DOCUMENTS_SUPPORT,
  //respondentOtherDetails: CA_DA_DOCUMENTS_SUPPORT,
  //respondentHelpCommunication: CA_DA_COMMUNICATION_HELP,
  //respondentSignLanguageDetails: CA_DA_COMMUNICATION_HELP,
  //respondentDescribeOtherNeed: CA_DA_COMMUNICATION_HELP,
  // respondentCourtHearing: CA_DA_COURT_HEARING_SUPPORT,
  // respondentSupportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT,
  // respondentFamilyDetails: CA_DA_COURT_HEARING_SUPPORT,
  // respondentTherapyDetails: CA_DA_COURT_HEARING_SUPPORT,
  // respondentCommSupportOther: CA_DA_COURT_HEARING_SUPPORT,
  // respondentCourtComfort: CA_DA_COURT_HEARING_COMFORT,
  // respondentLightingDetails: CA_DA_COURT_HEARING_COMFORT,
  // respondentOtherProvideDetails: CA_DA_COURT_HEARING_COMFORT,
  // respondentTravellingToCourt: CA_DA_TRAVELLING_TO_COURT,
  // respondentParkingDetails: CA_DA_TRAVELLING_TO_COURT,
  // respondentDifferentChairDetails: CA_DA_TRAVELLING_TO_COURT,
  // respondentTravellingOtherDetails: CA_DA_TRAVELLING_TO_COURT,
};

const cy: typeof en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userCase = content.userCase!;
  console.log('urls=========>' + urls);
  console.log('userCase=========>' + JSON.stringify(userCase));
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
function filterSelectedUrls(userCase: Partial<CaseWithId>) {
  if (userCase.respondentReasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { respondentDocsSupport: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { respondentDocsDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { respondentLargePrintDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { respondentOtherDetails: CA_DA_DOCUMENTS_SUPPORT });

    Object.assign(enContent.keys, { respondentDocsSupport: 'I need documents in an alternative format' });
    Object.assign(enContent.keys, { respondentDocsDetails: 'Please provide the docs details' });
    Object.assign(enContent.keys, { respondentLargePrintDetails: 'Please provide the large print details' });
    Object.assign(enContent.keys, { respondentOtherDetails: 'Please provide the other details' });
  }

  if (userCase.respondentReasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { respondentHelpCommunication: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { respondentSignLanguageDetails: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { respondentDescribeOtherNeed: CA_DA_COMMUNICATION_HELP });

    Object.assign(enContent.keys, { respondentHelpCommunication: 'I need help communicating and understanding' });
    Object.assign(enContent.keys, { respondentSignLanguageDetails: 'Please provide sign language details' });
    Object.assign(enContent.keys, { respondentDescribeOtherNeed: 'Please provide the details' });
  }

  if (userCase.respondentReasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, { respondentCourtHearing: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { respondentSupportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { respondentFamilyDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { respondentTherapyDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { respondentCommSupportOther: CA_DA_COURT_HEARING_SUPPORT });

    Object.assign(enContent.keys, {
      respondentCourtHearing: 'I would need to bring support with me to a court hearing',
    });
    Object.assign(enContent.keys, { respondentSupportWorkerDetails: 'Please provide support worker details' });
    Object.assign(enContent.keys, { respondentFamilyDetails: 'Please provide family member details' });
    Object.assign(enContent.keys, { respondentTherapyDetails: 'Please provide therapy animal details' });
    Object.assign(enContent.keys, { respondentCommSupportOther: 'Please provide the details' });
  }

  if (userCase.respondentReasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, { respondentCourtComfort: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { respondentLightingDetails: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { respondentOtherProvideDetails: CA_DA_COURT_HEARING_COMFORT });

    Object.assign(enContent.keys, {
      respondentCourtComfort: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { respondentLightingDetails: 'Please describe appropriate lighting details' });
    Object.assign(enContent.keys, { respondentOtherProvideDetails: 'Please describe your need in detail' });
  }

  if (userCase.respondentReasonableAdjustments?.includes(ReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, { respondentTravellingToCourt: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { respondentParkingDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { respondentDifferentChairDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { respondentTravellingOtherDetails: CA_DA_TRAVELLING_TO_COURT });

    Object.assign(enContent.keys, {
      respondentTravellingToCourt: 'I need help travelling to, or moving around court buildings',
    });
    Object.assign(enContent.keys, { respondentParkingDetails: 'Please describe parking space details' });
    Object.assign(enContent.keys, { respondentDifferentChairDetails: 'Please describe different chair details' });
    Object.assign(enContent.keys, { respondentTravellingOtherDetails: 'Please describe your need in detail' });
  }

  if (userCase.respondentDocsSupport?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteDocumentSupportFields();
  }
  if (userCase.respondentHelpCommunication?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteCommunicationHelpFields();
  }
  if (userCase.respondentCourtHearing?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteCourtHearingFields();
  }
  if (userCase.respondentCourtComfort?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteCourtComfortFields();
  }
  if (userCase.respondentTravellingToCourt?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteTravellingToCourtFields();
  }

  if (!userCase?.respondentAttendingToCourt?.includes('no hearings')) {
    userCase.respondentHearingDetails = '';
  }

  if (userCase?.respondentLangRequirements?.includes('No, I do not have any language requirements at this time')) {
    userCase.respondentLangDetails = '';
  }

  if (!userCase?.respondentSpecialArrangements?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    userCase.respondentSpecialArrangementsDetails = '';
  }

  if (userCase.respondentReasonableAdjustments?.includes(ReasonableAdjustments.NO_NEED_OF_SUPPORT)) {
    deleteDocumentSupportFields();
    deleteCommunicationHelpFields();
    deleteCourtHearingFields();
    deleteCourtComfortFields();
    deleteTravellingToCourtFields();
  }
}
function deleteTravellingToCourtFields() {
  delete urls['respondentTravellingToCourt'];
  delete urls['respondentParkingDetails'];
  delete urls['respondentDifferentChairDetails'];
  delete urls['respondentTravellingOtherDetails'];

  delete enContent.keys['respondentTravellingToCourt'];
  delete enContent.keys['respondentParkingDetails'];
  delete enContent.keys['respondentDifferentChairDetails'];
  delete enContent.keys['respondentTravellingOtherDetails'];
}

function deleteCourtComfortFields() {
  delete urls['respondentCourtComfort'];
  delete urls['respondentLightingDetails'];
  delete urls['respondentOtherProvideDetails'];

  delete enContent.keys['respondentCourtComfort'];
  delete enContent.keys['respondentLightingDetails'];
  delete enContent.keys['respondentOtherProvideDetails'];
}

function deleteCourtHearingFields() {
  delete urls['respondentCourtHearing'];
  delete urls['respondentSupportWorkerDetails'];
  delete urls['respondentFamilyDetails'];
  delete urls['respondentTherapyDetails'];
  delete urls['respondentCommSupportOther'];

  delete enContent.keys['respondentCourtHearing'];
  delete enContent.keys['respondentSupportWorkerDetails'];
  delete enContent.keys['respondentFamilyDetails'];
  delete enContent.keys['respondentTherapyDetails'];
  delete enContent.keys['respondentCommSupportOther'];
}

function deleteCommunicationHelpFields() {
  delete urls['respondentHelpCommunication'];
  delete urls['respondentSignLanguageDetails'];
  delete urls['respondentSignLanguageDetails'];

  delete enContent.keys['respondentHelpCommunication'];
  delete enContent.keys['respondentSignLanguageDetails'];
  delete enContent.keys['respondentSignLanguageDetails'];
}

function deleteDocumentSupportFields() {
  delete urls['respondentDocsSupport'];
  delete urls['respondentDocsDetails'];
  delete urls['respondentLargePrintDetails'];
  delete urls['respondentOtherDetails'];

  delete enContent.keys['respondentDocsSupport'];
  delete enContent.keys['respondentDocsDetails'];
  delete enContent.keys['respondentLargePrintDetails'];
  delete enContent.keys['respondentOtherDetails'];
}
