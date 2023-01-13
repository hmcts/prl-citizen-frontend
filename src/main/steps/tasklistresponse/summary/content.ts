import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import { fromApiDate } from '../../../app/case/from-api-format';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';
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
  CONSENT_TO_APPLICATION,
  DETAILS_KNOWN,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_PERSONAL_DETAILS,
  START_ALTERNATIVE,
} from '../../../steps/urls';
import { summaryList } from '../../common/summary/utils';
import { PastAndCurrentProceedings } from '../proceedings/mainUtils';

const consentFieldType = {
  doYouConsent: 'String',
  applicationReceivedDate: 'Date',
  courtPermission: 'String',
  courtOrderDetails: 'String',
};

const applicationDetailsfieldTypeMiam = {
  miamStart: 'String',
  miamWillingness: 'String',
  miamNotWillingExplnation: 'String',
};

const keepYourDetailsfieldType = {
  detailsKnown: 'String',
  startAlternative: 'String',
  address: 'String',
  email: 'String',
  phoneNumber: 'String',
};

const confirmYourDetailsfieldType = {
  citizenUserFullName: 'String',
  citizenUserDateOfBirthText: 'String',
  citizenUserPlaceOfBirthText: 'String',
  citizenUserAddressText: 'String',
  citizenUserAddressHistory: 'String',
  citizenUserPhoneNumberText: 'String',
  citizenUserEmailAddressText: 'String',
  applicant1SafeToCall: 'String',
};

const supportYouNeedFieldType = {
  respondentAttendingToCourt: 'String',
  respondentHearingDetails: 'String',
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

const inetnationlFactorFieldType = {
  start: 'String',
  iFactorsStartProvideDetails: 'String',
  parents: 'String',
  iFactorsParentsProvideDetails: 'String',
  jurisdiction: 'String',
  iFactorsJurisdictionProvideDetails: 'String',
  request: 'String',
  iFactorsRequestProvideDetails: 'String',
};

const safetyConcernsfieldType = {
  proceedingsStart: 'String',
};

const additionalInformationfieldType = {
  proceedingsStart: 'String',
};

export const enConsentContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  title2: '',
  sectionTitles: {
    title: 'Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
    courtOrderDetails: 'Details',
  },
  dependencies: {},
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

export const enKeepYourDetailsContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  title2: '',
  sectionTitles: {
    title: 'Keeping your details private',
  },
  keys: {
    detailsKnown: 'Do the other people named in this application (the applicants) know any of your contact details?',
    startAlternative:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
    address: 'Address',
    email: 'Email',
    phoneNumber: 'Phone Number',
  },
  dependencies: {},
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

export const enContentMiam = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  title2: '',
  sectionTitles: {
    title: 'Application details: Mediation (MIAM)',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM?',
  },
  dependencies: {},
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

export const enConfirmYourDetailsContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  title2: '',
  sectionTitles: {
    title: 'Confirm or edit your contact details',
  },
  keys: {
    citizenUserFullName: 'Name',
    citizenUserDateOfBirthText: 'Date of birth',
    citizenUserPlaceOfBirthText: 'Place of birth',
    citizenUserAddressText: 'Address',
    postalAddress: 'Postal Address',
    citizenUserAddressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    applicant1SafeToCall: 'When it is safe to call you (optional)',
  },
  dependencies: {},
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

export const enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: '',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  Yes: 'Yes',
  No: 'No ',
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
    courtOrderProtection: 'Have you had a court order made for your protection?',
    optitle: 'Provide details of court cases you or the children have been involved in',
    emergencyProtectionOrderLabel: 'Emergency Protection Order',
    childArrangementOrderLabel: 'Child Arrangements Order',
    supervisionOrderLabel: 'Supervision Order',
    careOrderLabel: 'Care Order',
    childAbductionOrderLabel: 'Child Abduction Order',
    contactOrderForDivorceLabel:
      'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership',
    contactOrderForAdoptionLabel:
      'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order',
    childMaintenanceOrderLabel: 'Child Maintenance Order',
    financialOrderLabel: 'Financial Order',
    nonMolestationOrderLabel: 'Non-molestation Order',
    occupationOrderLabel: 'Occupation Order',
    forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order',
    restrainingOrderLabel: 'Restraining Order',
    otherInjuctionOrderLabel: 'Other Injunction Order',
    undertakingOrderLabel: 'Undertaking Order',
    otherOrderLabel: 'Other Order',
    courtIssuedLabel: 'Which court issued the order? (optional)',
    caseNumberLabel: 'Case number (optional)',
    caseNumberHint: 'For example, BS19F99999',
    orderDateLabel: 'What date was it made? (optional)',
    orderEndDateLabel: 'What date did it end? (optional)',
    orderDateHint: 'For example, 31 3 2015',
    isCurrentOrderLabel: 'Is this a current order? (optional)',
    copyOfOrderLabel: 'Do you have a copy of the order? (optional)',
    addOrderLabel: 'Add another order',
    onlyContinue: 'Continue',
  },
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

export const enSupportYouNeedContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  sectionTitles: {
    title: 'Support you need during your case',
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
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

export const enInternationalContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  title2: 'International element',
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
  sectionTitles: {
    title: 'Addititonal Information: International element',
  },
  keys: {
    start: 'Do the children live outside of England or Wales?',
    iFactorsStartProvideDetails: 'Provide details',
    parents: "Do the childrens' parents or anyone significant to the children live outside of England or Wales?",
    iFactorsParentsProvideDetails: 'Provide details',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    iFactorsJurisdictionProvideDetails: 'Provide details',
    request: 'Has another country asked (or been asked) for information or help for the children?',
    iFactorsRequestProvideDetails: 'Provide details',
  },
  dependencies: {
    iFactorsStartProvideDetails: {
      dependantOn: 'start',
      value: 'Yes',
      display: true,
    },
    iFactorsParentsProvideDetails: {
      dependantOn: 'parents',
      value: 'Yes',
      display: true,
    },
    iFactorsJurisdictionProvideDetails: {
      dependantOn: 'jurisdiction',
      value: 'Yes',
      display: true,
    },
    iFactorsRequestProvideDetails: {
      dependantOn: 'request',
      value: 'Yes',
      display: true,
    },
  },
};

const en = (content: CommonContent) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  populateSummaryData(content.userCase, content.userIdamId);
  const userCase = content.userCase!;

  // updateContent(enContent, userCase, urls);
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(
        enConsentContent,
        userCase,
        urls,
        enConsentContent.sectionTitles.title,
        consentFieldType,
        content.language
      ),
      summaryList(
        enKeepYourDetailsContent,
        userCase,
        urls,
        enKeepYourDetailsContent.sectionTitles.title,
        keepYourDetailsfieldType,
        content.language
      ),

      summaryList(
        enConfirmYourDetailsContent,
        userCase,
        urls,
        enConfirmYourDetailsContent.sectionTitles.title,
        confirmYourDetailsfieldType,
        content.language
      ),
      summaryList(
        enContentMiam,
        userCase,
        urls,
        enContentMiam.sectionTitles.title,
        applicationDetailsfieldTypeMiam,
        content.language
      ),
      PastAndCurrentProceedings(enContent, userCase),
      summaryList(
        enSupportYouNeedContent,
        userCase,
        urls,
        enSupportYouNeedContent.sectionTitles.title,
        supportYouNeedFieldType,
        content.language
      ),
      summaryList(
        enInternationalContent,
        userCase,
        urls,
        enInternationalContent.sectionTitles.title,
        inetnationlFactorFieldType,
        content.language
      ),
    ],
  };
};

const cyContent: typeof enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: '',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  Yes: 'Yes',
  No: 'No ',
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
    courtOrderProtection: 'Have you had a court order made for your protection?',
    optitle: 'Provide details of court cases you or the children have been involved in',
    emergencyProtectionOrderLabel: 'Emergency Protection Order',
    childArrangementOrderLabel: 'Child Arrangements Order',
    supervisionOrderLabel: 'Supervision Order',
    careOrderLabel: 'Care Order',
    childAbductionOrderLabel: 'Child Abduction Order',
    contactOrderForDivorceLabel:
      'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership',
    contactOrderForAdoptionLabel:
      'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order',
    childMaintenanceOrderLabel: 'Child Maintenance Order',
    financialOrderLabel: 'Financial Order',
    nonMolestationOrderLabel: 'Non-molestation Order',
    occupationOrderLabel: 'Occupation Order',
    forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order',
    restrainingOrderLabel: 'Restraining Order',
    otherInjuctionOrderLabel: 'Other Injunction Order',
    undertakingOrderLabel: 'Undertaking Order',
    otherOrderLabel: 'Other Order',
    courtIssuedLabel: 'Which court issued the order? (optional)',
    caseNumberLabel: 'Case number (optional)',
    caseNumberHint: 'For example, BS19F99999',
    orderDateLabel: 'What date was it made? (optional)',
    orderEndDateLabel: 'What date did it end? (optional)',
    orderDateHint: 'For example, 31 3 2015',
    isCurrentOrderLabel: 'Is this a current order? (optional)',
    copyOfOrderLabel: 'Do you have a copy of the order? (optional)',
    addOrderLabel: 'Add another order',
    onlyContinue: 'Continue',
  },
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  continue: 'Submit your response',
};

const urls = {
  doYouConsent: CONSENT_TO_APPLICATION,
  applicationReceivedDate: CONSENT_TO_APPLICATION,
  courtPermission: CONSENT_TO_APPLICATION,
  proceedingsStart: PROCEEDINGS_START,
  proceedingsStartOrder: PROCEEDINGS_START,
  emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  supervisionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  careOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  childAbductionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  caOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  financialOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  nonmolestationOrderOption: PROCEEDINGS_COURT_PROCEEDINGS,
  occupationalOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  marraigeOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  restrainingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  injuctiveOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  underTakingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  respondentAttendingToCourt: CA_DA_ATTENDING_THE_COURT,
  respondentHearingDetails: CA_DA_ATTENDING_THE_COURT,
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
  respondentLightingDetails: CA_DA_COURT_HEARING_COMFORT,
  respondentOtherProvideDetails: CA_DA_COURT_HEARING_COMFORT,
  respondentTravellingToCourt: CA_DA_TRAVELLING_TO_COURT,
  respondentParkingDetails: CA_DA_TRAVELLING_TO_COURT,
  respondentDifferentChairDetails: CA_DA_TRAVELLING_TO_COURT,
  respondentTravellingOtherDetails: CA_DA_TRAVELLING_TO_COURT,
  citizenUserFullName: RESPONDENT_PERSONAL_DETAILS,
  citizenUserDateOfBirthText: RESPONDENT_PERSONAL_DETAILS,
  citizenUserPlaceOfBirthText: RESPONDENT_PERSONAL_DETAILS,
  citizenUserAddressText: RESPONDENT_ADDRESS_DETAILS,
  postalAddress: RESPONDENT_ADDRESS_DETAILS,
  citizenUserAddressHistory: RESPONDENT_ADDRESS_HISTORY,
  citizenUserPhoneNumberText: RESPONDENT_CONTACT_DETAILS,
  citizenUserEmailAddressText: RESPONDENT_CONTACT_DETAILS,
  start: INTERNATIONAL_FACTORS_START,
  parents: INTERNATIONAL_FACTORS_PARENTS,
  jurisdiction: INTERNATIONAL_FACTORS_JURISDICTION,
  request: INTERNATIONAL_FACTORS_REQUEST,
  detailsKnown: DETAILS_KNOWN,
  startAlternative: START_ALTERNATIVE,
  miamWillingness: MIAM_ATTEND_WILLINGNESS,
  miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS,
  miamStart: MIAM_START,
};

export const cyConsentContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you finish your application.',
  title2: '',
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
  sectionTitles: {
    title: 'Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
    courtOrderDetails: 'Details',
  },
  dependencies: {},
  continue: 'Submit your response',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(
        cyConsentContent,
        userCase,
        urls,
        cyConsentContent.sectionTitles.title,
        consentFieldType,
        content.language
      ),
      summaryList(
        enKeepYourDetailsContent,
        userCase,
        urls,
        enKeepYourDetailsContent.sectionTitles.title,
        keepYourDetailsfieldType,
        content.language
      ),
      summaryList(
        enConfirmYourDetailsContent,
        userCase,
        urls,
        enConfirmYourDetailsContent.sectionTitles.title,
        confirmYourDetailsfieldType,
        content.language
      ),
      PastAndCurrentProceedings(enContent, userCase),
      summaryList(
        enContent,
        userCase,
        urls,
        enSupportYouNeedContent.sectionTitles.title,
        safetyConcernsfieldType,
        content.language
      ),
      summaryList(
        enContent,
        userCase,
        urls,
        enSupportYouNeedContent.sectionTitles.title,
        additionalInformationfieldType,
        content.language
      ),
    ],
  };
};

export const form: FormContent = {
  fields: () => {
    const checkboxes: { id: string; value: string }[] = [];

    checkboxes.push({
      id: 'sot',
      value: 'StatementOfTruth',
    });

    return {
      declarationCheck: {
        type: 'checkboxes',
        values: [
          {
            name: 'declarationCheck',
            label: l => l.declaration,
            value: 'declaration',
          },
        ],
        validator: atLeastOneFieldIsChecked,
      },
      consentConfirm: {
        type: 'label',
        classes: 'govuk-label',
        label: l => l.consent,
        labelSize: 'm',
      },
    };
  },
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
function populateSummaryData(
  userCase: Partial<import('../../../app/case/case').CaseWithId> | undefined,
  userIdamId: string | undefined
) {
  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (userIdamId === respondent.value.user.idamId) {
      /* Keep detais private */
      userCase.detailsKnown = respondent.value.response.keepDetailsPrivate?.otherPeopleKnowYourContactDetails;
      userCase.startAlternative = respondent.value.response.keepDetailsPrivate?.confidentiality;
      userCase.contactDetailsPrivate = respondent.value.response.keepDetailsPrivate?.confidentialityList;
      /** consent to application */
      if (respondent?.value?.response?.consent?.consentToTheApplication === YesOrNo.NO) {
        userCase.doYouConsent = YesOrNo.NO;
        userCase.reasonForNotConsenting = respondent?.value?.response?.consent.noConsentReason;
      } else {
        userCase.doYouConsent = YesOrNo.YES;
        userCase.reasonForNotConsenting = '';
      }
      if (respondent?.value?.response?.consent?.permissionFromCourt === YesOrNo.NO) {
        userCase.courtPermission = YesOrNo.NO;
        userCase.courtOrderDetails = '';
      } else {
        userCase.courtPermission = YesOrNo.YES;
        userCase.courtOrderDetails = respondent?.value?.response?.consent?.courtOrderDetails;
      }
      userCase.applicationReceivedDate = fromApiDate(respondent?.value?.response?.consent?.applicationReceivedDate);

      /** Miam */
      if (respondent?.value?.response?.miam?.attendedMiam === YesOrNo.YES) {
        userCase.miamStart = YesOrNo.YES;
        userCase.miamWillingness = YesOrNo.NO;
        userCase.miamNotWillingExplnation = '';
      } else if (respondent?.value?.response?.miam?.attendedMiam === YesOrNo.NO) {
        if (respondent?.value?.response?.miam?.willingToAttendMiam === YesOrNo.YES) {
          userCase.miamStart = YesOrNo.NO;
          userCase.miamWillingness = YesOrNo.YES;
          userCase.miamNotWillingExplnation = '';
        } else if (respondent?.value?.response?.miam?.willingToAttendMiam === YesOrNo.NO) {
          userCase.miamStart = YesOrNo.NO;
          userCase.miamWillingness = YesOrNo.NO;
          userCase.miamNotWillingExplnation = respondent?.value?.response?.miam?.reasonNotAttendingMiam;
        }
      }

      /** International Elements */

      if (respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.NO) {
        userCase.start = YesOrNo.NO;
        userCase.iFactorsStartProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.YES) {
        userCase.start = YesOrNo.YES;
        userCase.iFactorsStartProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWlDetails;
      }
      if (respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO) {
        userCase.parents = YesOrNo.NO;
        userCase.iFactorsParentsProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES) {
        userCase.parents = YesOrNo.YES;
        userCase.iFactorsParentsProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWlDetails;
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.NO) {
        userCase.jurisdiction = YesOrNo.NO;
        userCase.iFactorsJurisdictionProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.YES) {
        userCase.jurisdiction = YesOrNo.YES;
        userCase.iFactorsJurisdictionProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWlDetails;
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformation === YesOrNo.NO) {
        userCase.request = YesOrNo.NO;
        userCase.iFactorsRequestProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformation === YesOrNo.YES) {
        userCase.request = YesOrNo.YES;
        userCase.iFactorsRequestProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformationDetaails;
      }

      /** Confirm your details*/
      if (respondent?.value?.firstName) {
        userCase.citizenUserFirstNames = respondent?.value?.firstName;
      }
      if (respondent?.value?.lastName) {
        userCase.citizenUserLastNames = respondent?.value?.lastName;
      }
      if (!userCase.citizenUserFirstNames || !userCase.citizenUserLastNames) {
        userCase.citizenUserFullName = '';
      } else {
        userCase.citizenUserFullName = userCase.citizenUserFirstNames + ' ' + userCase.citizenUserLastNames;
      }
      if (respondent?.value?.placeOfBirth) {
        userCase.citizenUserPlaceOfBirth = respondent?.value?.placeOfBirth;
      }
      if (respondent?.value?.dateOfBirth) {
        userCase.citizenUserDateOfBirth = fromApiDate(respondent?.value?.dateOfBirth);
      }
      if (respondent?.value?.phoneNumber) {
        userCase.citizenUserPhoneNumber = respondent?.value?.phoneNumber;
      }
      if (respondent?.value?.email) {
        userCase.citizenUserEmailAddress = respondent?.value?.email;
      }

      if (!userCase.citizenUserPlaceOfBirth) {
        userCase.citizenUserPlaceOfBirthText = '';
      } else {
        userCase.citizenUserPlaceOfBirthText = userCase.citizenUserPlaceOfBirth;
      }
      if (!userCase.citizenUserDateOfBirth) {
        userCase.citizenUserDateOfBirthText = '';
      } else {
        userCase.citizenUserDateOfBirthText = getFormattedDate(userCase.citizenUserDateOfBirth);
      }
      if (!userCase.citizenUserPhoneNumber) {
        userCase.citizenUserPhoneNumberText = '';
      } else {
        userCase.citizenUserPhoneNumberText = userCase.citizenUserPhoneNumber;
      }
      if (!userCase.citizenUserEmailAddress) {
        userCase.citizenUserEmailAddressText = '';
      } else {
        userCase.citizenUserEmailAddressText = userCase.citizenUserEmailAddress;
      }

      if (respondent?.value.address) {
        if (respondent?.value.address.AddressLine1) {
          userCase.citizenUserAddress1 = respondent?.value.address.AddressLine1;
        }
        if (respondent?.value.address.AddressLine2) {
          userCase.citizenUserAddress2 = respondent?.value.address.AddressLine2;
        }
        if (respondent?.value.address.PostTown) {
          userCase.citizenUserAddressTown = respondent?.value.address.PostTown;
        }
        if (respondent?.value.address.County) {
          userCase.citizenUserAddressCounty = respondent?.value.address.County;
        }
        if (respondent?.value.address.PostCode) {
          userCase.citizenUserAddressPostcode = respondent?.value.address.PostCode;
        }
      }
      if (respondent?.value.addressLivedLessThan5YearsDetails) {
        userCase.citizenUserAddressHistory = respondent?.value.addressLivedLessThan5YearsDetails;
      }

      if (!userCase.citizenUserAddress1 && !userCase.citizenUserAddressTown && !userCase.citizenUserAddressPostcode) {
        userCase.citizenUserAddressText = '';
      } else {
        userCase.citizenUserAddressText = userCase.citizenUserAddress1 + ' ';
        if (userCase.citizenUserAddress2) {
          userCase.citizenUserAddressText = userCase.citizenUserAddressText + userCase.citizenUserAddress2 + ' ';
        }
        if (userCase.citizenUserAddressTown) {
          userCase.citizenUserAddressText = userCase.citizenUserAddressText + userCase.citizenUserAddressTown + ' ';
        }
        if (userCase.citizenUserAddressPostcode) {
          userCase.citizenUserAddressText = userCase.citizenUserAddressText + userCase.citizenUserAddressPostcode;
        }
      }
      if (YesOrNo.YES === userCase.isAtAddressLessThan5Years) {
        userCase.citizenUserAddressHistory = '';
      }
    }
  });
}
