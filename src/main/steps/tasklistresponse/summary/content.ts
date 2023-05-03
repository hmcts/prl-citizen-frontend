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
  DETAILS_KNOWN_RESPONDENT,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  LEGAL_REPRESENTATION_START,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_PERSONAL_DETAILS,
  START_ALTERNATIVE_RESPONDENT,
} from '../../../steps/urls';
import { summaryList } from '../../common/summary/utils';

const applicationDetailsfieldType = {
  proceedingsStart: 'String',
  proceedingsStartOrder: 'String',
  emergencyOrderOptions: 'YesOrNo',
  'emergencyOrder.caseNoDetails': 'String',
  'emergencyOrder.orderDateDetails': 'Date',
  'emergencyOrder.orderTimeDetails': 'String',
  'emergencyOrder.currentOrderDetails': 'YesOrNo',
  'emergencyOrder.issueOrderDetails': 'String',
  supervisionOrderOption: 'YesOrNo',
  'supervisionOrder.caseNoDetails': 'String',
  'supervisionOrder.orderDateDetails': 'Date',
  'supervisionOrder.orderTimeDetails': 'String',
  'supervisionOrder.currentOrderDetails': 'YesOrNo',
  'supervisionOrder.issueOrderDetails': 'String',
  careOrderOptions: 'YesOrNo',
  'careOrder.caseNoDetails': 'String',
  'careOrder.orderDateDetails': 'Date',
  'careOrder.orderTimeDetails': 'String',
  'careOrder.currentOrderDetails': 'YesOrNo',
  'careOrder.issueOrderDetails': 'String',
  childAbductionOrderOption: 'YesOrNo',
  'childAbductionOrder.caseNoDetails': 'String',
  'childAbductionOrder.orderDateDetails': 'Date',
  'childAbductionOrder.orderTimeDetails': 'String',
  'childAbductionOrder.currentOrderDetails': 'YesOrNo',
  'childAbductionOrder.issueOrderDetails': 'String',
  caOrderOption: 'YesOrNo',
  'caOrder.caseNoDetails': 'String',
  'caOrder.orderDateDetails': 'Date',
  'caOrder.orderTimeDetails': 'String',
  'caOrder.currentOrderDetails': 'YesOrNo',
  'caOrder.issueOrderDetails': 'String',
  financialOrderOption: 'YesOrNo',
  'financialOrder.caseNoDetails': 'String',
  'financialOrder.orderDateDetails': 'Date',
  'financialOrder.orderTimeDetails': 'String',
  'financialOrder.currentOrderDetails': 'YesOrNo',
  'financialOrder.issueOrderDetails': 'String',
  nonmolestationOrderOption: 'YesOrNo',
  'nonmolestationOrder.caseNoDetails': 'String',
  'nonmolestationOrder.orderDateDetails': 'Date',
  'nonmolestationOrder.orderTimeDetails': 'String',
  'nonmolestationOrder.currentOrderDetails': 'YesOrNo',
  'nonmolestationOrder.issueOrderDetails': 'String',
  occupationalOrderOptions: 'YesOrNo',
  'occupationOrder.caseNoDetails': 'String',
  'occupationOrder.orderDateDetails': 'Date',
  'occupationOrder.orderTimeDetails': 'String',
  'occupationOrder.currentOrderDetails': 'YesOrNo',
  'occupationOrder.issueOrderDetails': 'String',
  marraigeOrderOptions: 'YesOrNo',
  'marraigeOrder.caseNoDetails': 'String',
  'marraigeOrder.orderDateDetails': 'Date',
  'marraigeOrder.orderTimeDetails': 'String',
  'marraigeOrder.currentOrderDetails': 'YesOrNo',
  'marraigeOrder.issueOrderDetails': 'String',
  restrainingOrderOptions: 'YesOrNo',
  'restrainingOrder.caseNoDetails': 'String',
  'restrainingOrder.orderDateDetails': 'Date',
  'restrainingOrder.orderTimeDetails': 'String',
  'restrainingOrder.currentOrderDetails': 'YesOrNo',
  'restrainingOrder.issueOrderDetails': 'String',
  injuctiveOrderOptions: 'YesOrNo',
  'injuctiveOrder.caseNoDetails': 'String',
  'injuctiveOrder.orderDateDetails': 'Date',
  'injuctiveOrder.orderTimeDetails': 'String',
  'injuctiveOrder.currentOrderDetails': 'YesOrNo',
  'injuctiveOrder.issueOrderDetails': 'String',
  underTakingOrderOptions: 'YesOrNo',
  'underTakingOrder.caseNoDetails': 'String',
  'underTakingOrder.orderDateDetails': 'Date',
  'underTakingOrder.orderTimeDetails': 'String',
  'underTakingOrder.currentOrderDetails': 'YesOrNo',
  'underTakingOrder.issueOrderDetails': 'String',
};

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
};

const confirmYourDetailsfieldType = {
  citizenUserFullName: 'String',
  citizenUserDateOfBirthText: 'String',
  citizenUserPlaceOfBirthText: 'String',
  citizenUserAddressText: 'String',
  citizenUserAddressHistory: 'String',
  citizenUserPhoneNumberText: 'String',
  citizenUserEmailAddressText: 'String',
  citizenUserSafeToCall: 'String',
};

const legalRepresantationFieldType = {
  legalRepresentation: 'String',
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

export const enlegalRepresntationContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: '',
  sectionTitles: {
    title: '1. Legal representation',
  },
  keys: {
    legalRepresentation: 'Will you be using a legal representative to respond to the application?',
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

export const enConsentContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: '',
  sectionTitles: {
    title: '2. Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Does the applicant need permission from the court before making applications?',
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
  title: 'Please review your answers before you complete your response.',
  title2: 'Keeping your details private',
  sectionTitles: {
    title: 'Keeping your details private',
  },
  keys: {
    detailsKnown: 'Do the other people named in this application (the applicants) know any of your contact details?',
    startAlternative:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
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
  title: 'Please review your answers before you complete your response.',
  title2: 'Mediation (MIAM)',
  sectionTitles: {
    title: 'Mediation (MIAM)',
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
  title: 'Please review your answers before you complete your response.',
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
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
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
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: 'Current or previous court cases',
  sectionTitles: {
    title: 'Application details: Current or previous proceeding',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
    emergencyOrderOptions: 'Emergency Protection Order',
    'emergencyOrder.caseNoDetails': 'Case number',
    'emergencyOrder.orderDateDetails': 'What date was it made',
    'emergencyOrder.orderTimeDetails': 'How long was the order for?',
    'emergencyOrder.currentOrderDetails': 'Is this a current order?',
    'emergencyOrder.issueOrderDetails': 'Which court issued this order?',
    supervisionOrderOption: 'Supervision Order',
    'supervisionOrder.caseNoDetails': 'Case number',
    'supervisionOrder.orderDateDetails': 'What date was it made',
    'supervisionOrder.orderTimeDetails': 'How long was the order for?',
    'supervisionOrder.currentOrderDetails': 'Is this a current order?',
    'supervisionOrder.issueOrderDetails': 'Which court issued this order?',
    careOrderOptions: 'Care Order',
    'careOrder.caseNoDetails': 'Case number',
    'careOrder.orderDateDetails': 'What date was it made',
    'careOrder.orderTimeDetails': 'How long was the order for?',
    'careOrder.currentOrderDetails': 'Is this a current order?',
    'careOrder.issueOrderDetails': 'Which court issued this order?',
    childAbductionOrderOption: 'Child Abduction',
    'childAbductionOrder.caseNoDetails': 'Case number',
    'childAbductionOrder.orderDateDetails': 'What date was it made',
    'childAbductionOrder.orderTimeDetails': 'How long was the order for?',
    'childAbductionOrder.currentOrderDetails': 'Is this a current order?',
    'childAbductionOrder.issueOrderDetails': 'Which court issued this order?',
    caOrderOption: 'Child Arrangements Order',
    'caOrder.caseNoDetails': 'Case number',
    'caOrder.orderDateDetails': 'What date was it made',
    'caOrder.orderTimeDetails': 'How long was the order for?',
    'caOrder.currentOrderDetails': 'Is this a current order?',
    'caOrder.issueOrderDetails': 'Which court issued this order?',
    financialOrderOption: 'Financial Order under Schedule 1 of the Children Act 1989',
    'financialOrder.caseNoDetails': 'Case number',
    'financialOrder.orderDateDetails': 'What date was it made',
    'financialOrder.orderTimeDetails': 'How long was the order for?',
    'financialOrder.currentOrderDetails': 'Is this a current order?',
    'financialOrder.issueOrderDetails': 'Which court issued this order?',
    nonmolestationOrderOption: 'Non-molestation Order',
    'nonmolestationOrder.caseNoDetails': 'Case number',
    'nonmolestationOrder.orderDateDetails': 'What date was it made',
    'nonmolestationOrder.orderTimeDetails': 'How long was the order for?',
    'nonmolestationOrder.currentOrderDetails': 'Is this a current order?',
    'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?',
    occupationalOrderOptions: 'Occupation Order',
    'occupationOrder.caseNoDetails': 'Case number',
    'occupationOrder.orderDateDetails': 'What date was it made',
    'occupationOrder.orderTimeDetails': 'How long was the order for?',
    'occupationOrder.currentOrderDetails': 'Is this a current order?',
    'occupationOrder.issueOrderDetails': 'Which court issued this order?',
    marraigeOrderOptions: 'Forced Marriage Protection Order',
    'marraigeOrder.caseNoDetails': 'Case number',
    'marraigeOrder.orderDateDetails': 'What date was it made',
    'marraigeOrder.orderTimeDetails': 'How long was the order for?',
    'marraigeOrder.currentOrderDetails': 'Is this a current order?',
    'marraigeOrder.issueOrderDetails': 'Which court issued this order?',
    restrainingOrderOptions: 'Restraining Order',
    'restrainingOrder.caseNoDetails': 'Case number',
    'restrainingOrder.orderDateDetails': 'What date was it made',
    'restrainingOrder.orderTimeDetails': 'How long was the order for?',
    'restrainingOrder.currentOrderDetails': 'Is this a current order?',
    'restrainingOrder.issueOrderDetails': 'Which court issued this order?',
    injuctiveOrderOptions: 'Other Injunctive Order',
    'injuctiveOrder.caseNoDetails': 'Case number',
    'injuctiveOrder.orderDateDetails': 'What date was it made',
    'injuctiveOrder.orderTimeDetails': 'How long was the order for?',
    'injuctiveOrder.currentOrderDetails': 'Is this a current order?',
    'injuctiveOrder.issueOrderDetails': 'Which court issued this order?',
    underTakingOrderOptions: 'Undertaking in Place of an Order',
    'underTakingOrder.caseNoDetails': 'Case number',
    'underTakingOrder.orderDateDetails': 'What date was it made',
    'underTakingOrder.orderTimeDetails': 'How long was the order for?',
    'underTakingOrder.currentOrderDetails': 'Is this a current order?',
    'underTakingOrder.issueOrderDetails': 'Which court issued this order?',
  },
  dependencies: {
    'emergencyOrder.caseNoDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderDateDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderTimeDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.currentOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.issueOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderDateDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderTimeDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.currentOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.issueOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderDateDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderTimeDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.currentOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.issueOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.caseNoDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderDateDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderTimeDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.currentOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.issueOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.caseNoDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderDateDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderTimeDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.currentOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.issueOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.caseNoDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderDateDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderTimeDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.currentOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.issueOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.caseNoDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderDateDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderTimeDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.currentOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.issueOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.caseNoDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderDateDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderTimeDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.currentOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.issueOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.caseNoDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderDateDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderTimeDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.currentOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.issueOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.caseNoDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderDateDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderTimeDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.currentOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.issueOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.caseNoDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderDateDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderTimeDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.currentOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.issueOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.caseNoDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderDateDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderTimeDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.currentOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.issueOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
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
  warning1: 'Warning',
  yourResponse: 'Your response will be shared with the other people in this case.',
};

export const enSupportYouNeedContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  sectionTitles: {
    title: 'Support you need during your case',
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
    docsSupport: 'I need documents in an alternative format',
    docsDetails: 'Please provide the docs details',
    largePrintDetails: 'Please provide the large print details',
    otherDetails: 'Please provide the other details',
    helpCommunication: 'I need help communicating and understanding',
    describeSignLanguageDetails: 'Please provide sign language details',
    describeOtherNeed: 'Please provide the details',
    courtHearing: 'I would need to bring support with me to a court hearing',
    supportWorkerDetails: 'Please provide support worker details',
    familyProviderDetails: 'Please provide family member details',
    therapyDetails: 'Please provide therapy animal details',
    communicationSupportOther: 'Please provide the details',
    courtComfort: 'I need something to make me feel comfortable during a court hearing',
    lightingProvideDetails: 'Please describe appropriate lighting details',
    otherProvideDetails: 'Please describe your need in detail',
    travellingToCourt: 'I need help travelling to, or moving around court buildings',
    parkingDetails: 'Please describe parking space details',
    differentChairDetails: 'Please describe different chair details',
    travellingOtherDetails: 'Please describe your need in detail',
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
  title: 'Please review your answers before you complete your response.',
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
    title: '5. International element',
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

export const enDummyContent = {
  sectionTitles: {
    title2: '3. Your details',
    title3: '4. Application details',
  },
  keys: {},
  dependencies: {},
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
        enlegalRepresntationContent,
        userCase,
        urls,
        enlegalRepresntationContent.sectionTitles.title,
        legalRepresantationFieldType,
        content.language
      ),
      summaryList(
        enConsentContent,
        userCase,
        urls,
        enConsentContent.sectionTitles.title,
        consentFieldType,
        content.language
      ),
      summaryList(enDummyContent, userCase, '', enDummyContent.sectionTitles.title2, '', content.language),
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
      summaryList(enDummyContent, userCase, '', enDummyContent.sectionTitles.title3, '', content.language),
      summaryList(
        enContentMiam,
        userCase,
        urls,
        enContentMiam.sectionTitles.title,
        applicationDetailsfieldTypeMiam,
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
  section: 'Gwirio eich atebion',
  title: 'Please review your answers before you complete your response. -welsh',
  title2: 'Current or previous court cases -welsh',
  sectionTitles: {
    title: '4. Manylion y cais',
  },
  statementOfTruth: 'Statement of truth -welsh',
  warning: 'Warning -welsh',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth. -welsh',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration -welsh',
    },
  },
  keys: {
    proceedingsStart: "Ydy'r plant wedi bod yn rhan o achos llys?",
    proceedingsStartOrder: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
    emergencyOrderOptions: 'Gorchymyn Diogelu Brys',
    'emergencyOrder.caseNoDetails': 'Case number',
    'emergencyOrder.orderDateDetails': 'What date was it made',
    'emergencyOrder.orderTimeDetails': 'How long was the order for?',
    'emergencyOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'emergencyOrder.issueOrderDetails': 'Which court issued this order?',
    supervisionOrderOption: 'Gorchymyn Goruchwylio',
    'supervisionOrder.caseNoDetails': 'Case number',
    'supervisionOrder.orderDateDetails': 'What date was it made',
    'supervisionOrder.orderTimeDetails': 'How long was the order for?',
    'supervisionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'supervisionOrder.issueOrderDetails': 'Which court issued this order?',
    careOrderOptions: 'Gorchymyn Gofal',
    'careOrder.caseNoDetails': 'Case number',
    'careOrder.orderDateDetails': 'What date was it made',
    'careOrder.orderTimeDetails': 'How long was the order for?',
    'careOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'careOrder.issueOrderDetails': 'Which court issued this order?',
    childAbductionOrderOption: 'Herwgydio Plant',
    'childAbductionOrder.caseNoDetails': 'Case number',
    'childAbductionOrder.orderDateDetails': 'What date was it made',
    'childAbductionOrder.orderTimeDetails': 'How long was the order for?',
    'childAbductionOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'childAbductionOrder.issueOrderDetails': 'Which court issued this order?',
    caOrderOption: 'Child Arrangements Order',
    'caOrder.caseNoDetails': 'Case number',
    'caOrder.orderDateDetails': 'What date was it made',
    'caOrder.orderTimeDetails': 'How long was the order for?',
    'caOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'caOrder.issueOrderDetails': 'Which court issued this order?',
    financialOrderOption: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
    'financialOrder.caseNoDetails': 'Case number',
    'financialOrder.orderDateDetails': 'What date was it made',
    'financialOrder.orderTimeDetails': 'How long was the order for?',
    'financialOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'financialOrder.issueOrderDetails': 'Which court issued this order?',
    nonmolestationOrderOption: 'Gorchymyn Rhag Molestu',
    'nonmolestationOrder.caseNoDetails': 'Case number',
    'nonmolestationOrder.orderDateDetails': 'What date was it made',
    'nonmolestationOrder.orderTimeDetails': 'How long was the order for?',
    'nonmolestationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?',
    occupationalOrderOptions: 'Gorchymyn Anheddu',
    'occupationOrder.caseNoDetails': 'Case number',
    'occupationOrder.orderDateDetails': 'What date was it made',
    'occupationOrder.orderTimeDetails': 'How long was the order for?',
    'occupationOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'occupationOrder.issueOrderDetails': 'Which court issued this order?',
    marraigeOrderOptions: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
    'marraigeOrder.caseNoDetails': 'Case number',
    'marraigeOrder.orderDateDetails': 'What date was it made',
    'marraigeOrder.orderTimeDetails': 'How long was the order for?',
    'marraigeOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'marraigeOrder.issueOrderDetails': 'Which court issued this order?',
    restrainingOrderOptions: 'Gorchymyn Atal',
    'restrainingOrder.caseNoDetails': 'Case number',
    'restrainingOrder.orderDateDetails': 'What date was it made',
    'restrainingOrder.orderTimeDetails': 'How long was the order for?',
    'restrainingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'restrainingOrder.issueOrderDetails': 'Which court issued this order?',
    injuctiveOrderOptions: 'Other Injunctive Order',
    'injuctiveOrder.caseNoDetails': 'Case number',
    'injuctiveOrder.orderDateDetails': 'What date was it made',
    'injuctiveOrder.orderTimeDetails': 'How long was the order for?',
    'injuctiveOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'injuctiveOrder.issueOrderDetails': 'Which court issued this order?',
    underTakingOrderOptions: 'Ymgymeriad yn lle gorchymyn',
    'underTakingOrder.caseNoDetails': 'Case number',
    'underTakingOrder.orderDateDetails': 'What date was it made',
    'underTakingOrder.orderTimeDetails': 'How long was the order for?',
    'underTakingOrder.currentOrderDetails': 'Ai gorchymyn cyfredol yw hwn?',
    'underTakingOrder.issueOrderDetails': 'Which court issued this order?',
  },
  dependencies: {
    'emergencyOrder.caseNoDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderDateDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.orderTimeDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.currentOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'emergencyOrder.issueOrderDetails': {
      dependantOn: 'emergencyOrderOptions',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderDateDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.orderTimeDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.currentOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'supervisionOrder.issueOrderDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.caseNoDetails': {
      dependantOn: 'supervisionOrderOption',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderDateDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.orderTimeDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.currentOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'careOrder.issueOrderDetails': {
      dependantOn: 'careOrderOptions',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.caseNoDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderDateDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.orderTimeDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.currentOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'childAbductionOrder.issueOrderDetails': {
      dependantOn: 'childAbductionOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.caseNoDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderDateDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.orderTimeDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.currentOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'caOrder.issueOrderDetails': {
      dependantOn: 'caOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.caseNoDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderDateDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.orderTimeDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.currentOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'financialOrder.issueOrderDetails': {
      dependantOn: 'financialOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.caseNoDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderDateDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.orderTimeDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.currentOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'nonmolestationOrder.issueOrderDetails': {
      dependantOn: 'nonmolestationOrderOption',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.caseNoDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderDateDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.orderTimeDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.currentOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'occupationOrder.issueOrderDetails': {
      dependantOn: 'occupationalOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.caseNoDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderDateDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.orderTimeDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.currentOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'marraigeOrder.issueOrderDetails': {
      dependantOn: 'marraigeOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.caseNoDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderDateDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.orderTimeDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.currentOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'restrainingOrder.issueOrderDetails': {
      dependantOn: 'restrainingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.caseNoDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderDateDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.orderTimeDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.currentOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'injuctiveOrder.issueOrderDetails': {
      dependantOn: 'injuctiveOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.caseNoDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderDateDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.orderTimeDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.currentOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
    'underTakingOrder.issueOrderDetails': {
      dependantOn: 'underTakingOrderOptions',
      value: 'Yes',
      display: true,
    },
  },
  continue: 'Submit your response',
  warning1: 'Warning -welsh',
  yourResponse: 'Your response will be shared with the other people in this case. -welsh',
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
  attendingToCourt: CA_DA_ATTENDING_THE_COURT,
  hearingDetails: CA_DA_ATTENDING_THE_COURT,
  languageRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  languageDetails: CA_DA_LANGUAGE_REQUIREMENTS,
  safetyArrangements: CA_DA_SPECIAL_ARRANGEMENTS,
  safetyArrangementsDetails: CA_DA_SPECIAL_ARRANGEMENTS,
  reasonableAdjustments: CA_DA_REASONABLE_ADJUSTMENTS,
  docsSupport: CA_DA_DOCUMENTS_SUPPORT,
  docsDetails: CA_DA_DOCUMENTS_SUPPORT,
  largePrintDetails: CA_DA_DOCUMENTS_SUPPORT,
  otherDetails: CA_DA_DOCUMENTS_SUPPORT,
  helpCommunication: CA_DA_COMMUNICATION_HELP,
  describeSignLanguageDetails: CA_DA_COMMUNICATION_HELP,
  describeOtherNeed: CA_DA_COMMUNICATION_HELP,
  courtHearing: CA_DA_COURT_HEARING_SUPPORT,
  supportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT,
  familyProviderDetails: CA_DA_COURT_HEARING_SUPPORT,
  therapyDetails: CA_DA_COURT_HEARING_SUPPORT,
  communicationSupportOther: CA_DA_COURT_HEARING_SUPPORT,
  courtComfort: CA_DA_COURT_HEARING_COMFORT,
  lightingProvideDetails: CA_DA_COURT_HEARING_COMFORT,
  otherProvideDetails: CA_DA_COURT_HEARING_COMFORT,
  travellingToCourt: CA_DA_TRAVELLING_TO_COURT,
  parkingDetails: CA_DA_TRAVELLING_TO_COURT,
  differentChairDetails: CA_DA_TRAVELLING_TO_COURT,
  travellingOtherDetails: CA_DA_TRAVELLING_TO_COURT,
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
  detailsKnown: DETAILS_KNOWN_RESPONDENT,
  startAlternative: START_ALTERNATIVE_RESPONDENT,
  miamWillingness: MIAM_ATTEND_WILLINGNESS,
  miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS,
  miamStart: MIAM_START,
  legalRepresentation: LEGAL_REPRESENTATION_START,
};

export const cyConsentContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response. -welsh',
  title2: '',
  statementOfTruth: 'Statement of truth -welsh',
  warning: 'Warning -welsh',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth. -welsh',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration -welsh',
    },
  },
  sectionTitles: {
    consentToTheApplication: 'Consent to the application -welsh',
  },
  keys: {
    doYouConsent: 'Do you consent to the application? -welsh',
    applicationReceivedDate: 'When did you receive the application? -welsh',
    courtPermission: 'Does the applicant need permission from the court before making applications? -welsh',
    courtOrderDetails: 'Details',
  },
  dependencies: {},
  continue: 'Submit your response -welsh',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(
        enlegalRepresntationContent,
        userCase,
        urls,
        enlegalRepresntationContent.sectionTitles.title,
        legalRepresantationFieldType,
        content.language
      ),
      summaryList(cyConsentContent, userCase, urls, enContent.sectionTitles.title, consentFieldType, content.language),
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
        enContent,
        userCase,
        urls,
        enContent.sectionTitles.title,
        applicationDetailsfieldType,
        content.language
      ),
      summaryList(enContent, userCase, urls, enContent.sectionTitles.title, safetyConcernsfieldType, content.language),
      summaryList(
        enContent,
        userCase,
        urls,
        enContent.sectionTitles.title,
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
