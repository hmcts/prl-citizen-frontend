import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import { ADDRESS_DETAILS, ADDRESS_HISTORY, CA_DA_ATTENDING_THE_COURT, CA_DA_COMMUNICATION_HELP, CA_DA_COURT_HEARING_COMFORT, CA_DA_COURT_HEARING_SUPPORT, CA_DA_DOCUMENTS_SUPPORT, CA_DA_LANGUAGE_REQUIREMENTS, CA_DA_REASONABLE_ADJUSTMENTS, CA_DA_SPECIAL_ARRANGEMENTS, CA_DA_TRAVELLING_TO_COURT, CONSENT_TO_APPLICATION, CONTACT_DETAILS, DETAILS_KNOWN, INTERNATIONAL_FACTORS_JURISDICTION, INTERNATIONAL_FACTORS_PARENTS, INTERNATIONAL_FACTORS_REQUEST, INTERNATIONAL_FACTORS_START, PERSONAL_DETAILS, PROCEEDINGS_COURT_PROCEEDINGS, PROCEEDINGS_START, START_ALTERNATIVE } from '../../../steps/urls';
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
};

const keepYourDetailsfieldType = {
  detailsKnown: 'String',
  startAlternative: 'String',
};


const confirmYourDetailsfieldType = {
  applicant1FullName: 'String',
  applicant1DateOfBirthText: 'String',
  applicant1PlaceOfBirthText: 'String',
  address: 'String',
  addressHistory: 'String',
  applicant1PhoneNumber: 'String',
  applicant1EmailAddress: 'String',
  applicant1SafeToCall: 'String',
};

const supportYouNeedFieldType = {

  respondentAttendingToCourt: 'String',
  respondentHearingDetails: 'String',
  respondentLangRequirements: 'String',
  respondentLangDetails: 'String',
  respondentSpecialArrangements: 'String',
  respondentSpecialArrangementsDetails: 'String',
  respondentReasonableAdjustments:
    'String',
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
  jurisdiction:
    'String',
  iFactorsJurisdictionProvideDetails: 'String',
  request: 'String',
  iFactorsRequestProvideDetails: 'String',
};


const safetyConcernsfieldType = {
  proceedingsStart: 'String',
};

const additionalInformationfieldType= {
  proceedingsStart: 'String',
};

export const enConsentContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: '',
  sectionTitles: {
    consentToTheApplication: 'Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you provide your consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
  },
  dependencies: {
    
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

export const enKeepYourDetailsContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: '',
  sectionTitles: {
    keepYourDetailsPrivate: 'Keeping your details private',
  },
  keys: {
    detailsKnown: 'Do the other people named in this application (the applicants) know any of your contact details?',
    startAlternative: 'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  },
  dependencies: {
    
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

export const enConfirmYourDetailsContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: '',
  sectionTitles: {
    confirmYourDetails: 'Confirm or edit your contact details',
  },
  keys: {
    applicant1FullName: 'Name',
    applicant1DateOfBirthText: 'Date of birth',
    applicant1PlaceOfBirthText: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
    applicant1SafeToCall: 'When it is safe to call you (optional)',
  },
  dependencies: {
    
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

export const enContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Application details',
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
};

export const enSupportYouNeedContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  sectionTitles: {
    aboutYou: 'Support you need during your case',
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
    respondentAdditionalInformation: 'International element',
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
  const userCase = content.userCase!;

  updateContent(enContent, userCase, urls);
  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(enConsentContent, userCase, urls, enConsentContent.sectionTitles.consentToTheApplication, consentFieldType, content.language),
      summaryList(enKeepYourDetailsContent, userCase, urls, enKeepYourDetailsContent.sectionTitles.keepYourDetailsPrivate, keepYourDetailsfieldType, content.language),
      summaryList(enConfirmYourDetailsContent, userCase, urls, enConfirmYourDetailsContent.sectionTitles.confirmYourDetails, confirmYourDetailsfieldType, content.language),
      summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails,applicationDetailsfieldType,content.language),
      summaryList(enSupportYouNeedContent, userCase, urls, enSupportYouNeedContent.sectionTitles.aboutYou,supportYouNeedFieldType,content.language),
      summaryList(enInternationalContent, userCase, urls, enInternationalContent.sectionTitles.respondentAdditionalInformation, inetnationlFactorFieldType, content.language),
      
    ],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: 'Current or previous court cases',
  sectionTitles: {
    applicationDetails: 'Application details',
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
  applicant1FullName: PERSONAL_DETAILS,
  applicant1DateOfBirthText: PERSONAL_DETAILS,
  applicant1PlaceOfBirthText: PERSONAL_DETAILS,
  address: ADDRESS_DETAILS,
  addressHistory: ADDRESS_HISTORY,
  applicant1PhoneNumber: CONTACT_DETAILS,
  applicant1EmailAddress: CONTACT_DETAILS,
  start: INTERNATIONAL_FACTORS_START,
  parents: INTERNATIONAL_FACTORS_PARENTS,
  jurisdiction: INTERNATIONAL_FACTORS_JURISDICTION,
  request: INTERNATIONAL_FACTORS_REQUEST,
  detailsKnown: DETAILS_KNOWN,
  startAlternative: START_ALTERNATIVE,
};

export const cyConsentContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
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
    consentToTheApplication: 'Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you provide your consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
  },
  dependencies: {
    
  },
  continue: 'Submit your response',
};



const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(cyConsentContent, userCase, urls, enContent.sectionTitles.applicationDetails, consentFieldType, content.language),
      summaryList(enKeepYourDetailsContent, userCase, urls, enKeepYourDetailsContent.sectionTitles.keepYourDetailsPrivate, keepYourDetailsfieldType, content.language),
      summaryList(enConfirmYourDetailsContent, userCase, urls, enConfirmYourDetailsContent.sectionTitles.confirmYourDetails, confirmYourDetailsfieldType, content.language),
      summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, applicationDetailsfieldType, content.language),
      summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, safetyConcernsfieldType, content.language),
      summaryList(enContent, userCase, urls, enContent.sectionTitles.applicationDetails, additionalInformationfieldType, content.language),
    ],
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

function updateContent(enContentTemp, userCaseTemp, urlsTemp) {
  if (userCaseTemp.proceedingsStart === 'No' && userCaseTemp.proceedingsStartOrder === 'No') {
    clearObject(enContentTemp.keys, urlsTemp);
    addProceedingsStart(enContentTemp, urlsTemp);
    addProceedingsStartOrder(enContentTemp, urlsTemp);
  } else if (userCaseTemp.proceedingsStart === 'Yes' || userCaseTemp.proceedingsStartOrder === 'Yes') {
    if (
      userCaseTemp.emergencyOrderOptions === 'No' ||
      userCaseTemp.supervisionOrderOption === 'No' ||
      userCaseTemp.careOrderOptions === 'No' ||
      userCaseTemp.childAbductionOrderOption === 'No' ||
      userCaseTemp.caOrderOption === 'No' ||
      userCaseTemp.financialOrderOption === 'No' ||
      userCaseTemp.nonmolestationOrderOption === 'No' ||
      userCaseTemp.occupationalOrderOptions === 'No' ||
      userCaseTemp.marraigeOrderOptions === 'No' ||
      userCaseTemp.restrainingOrderOptions === 'No' ||
      userCaseTemp.injuctiveOrderOptions === 'No' ||
      userCaseTemp.underTakingOrderOptions === 'No'
    ) {
      clearObject(enContentTemp.keys, urlsTemp);
      addProceedingsStart(enContentTemp, urlsTemp);
      addProceedingsStartOrder(enContentTemp, urlsTemp);
      addEmergencyOrder(enContentTemp, urlsTemp, userCaseTemp);
      addSuperVisionOrder(enContentTemp, urlsTemp, userCaseTemp);
      addCareOrder(enContentTemp, urlsTemp, userCaseTemp);
      addchildAbductionOrder(enContentTemp, urlsTemp, userCaseTemp);
      addCaOrder(enContentTemp, urlsTemp, userCaseTemp);
      addFinancialOrder(enContentTemp, urlsTemp, userCaseTemp);
      addNonmolestationOrder(enContentTemp, urlsTemp, userCaseTemp);
      addOccupationOrder(enContentTemp, urlsTemp, userCaseTemp);
      addMarriageOrder(enContentTemp, urlsTemp, userCaseTemp);
      addRestrainingOrder(enContentTemp, urlsTemp, userCaseTemp);
      addInjunctiveOrder(enContentTemp, urlsTemp, userCaseTemp);
      addUndertakingOrder(enContentTemp, urlsTemp, userCaseTemp);
    }
  }
}

function addProceedingsStart(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { proceedingsStart: 'Have the children been involved in a court case?' });
  Object.assign(urlstemp, { proceedingsStart: PROCEEDINGS_START });
}

function addProceedingsStartOrder(enContenttemp, urlstemp) {
  Object.assign(enContenttemp.keys, { proceedingsStartOrder: 'Have you had a court order made for your protection?' });
  Object.assign(urlstemp, { proceedingsStartOrder: PROCEEDINGS_START });
}

function addEmergencyOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { emergencyOrderOptions: 'Emergency Protection Order' });
  Object.assign(urlstemp, { emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.emergencyOrderOptions === 'Yes') {
    addEmergencyOrderSubFields(enContenttemp);
  }
}

function addEmergencyOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'emergencyOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'emergencyOrder.issueOrderDetails': 'Which court issued this order?' });
  //Object.assign(urlstemp, {});
}

function addSuperVisionOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { supervisionOrderOption: 'Supervision Order' });
  Object.assign(urlstemp, { supervisionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.supervisionOrderOption === 'Yes') {
    addSuperVisionOrderSubFields(enContenttemp);
  }
}

function addSuperVisionOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'supervisionOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'supervisionOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addCareOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { careOrderOptions: 'Care Order' });
  Object.assign(urlstemp, { careOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.careOrderOptions === 'Yes') {
    addCareOrderSubFields(enContenttemp);
  }
}

function addCareOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'careOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'careOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'careOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'careOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addchildAbductionOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { childAbductionOrderOption: 'Child Abduction' });
  Object.assign(urlstemp, { childAbductionOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.childAbductionOrderOption === 'Yes') {
    addchildAbductionOrderSubFields(enContenttemp);
  }
}

function addchildAbductionOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'childAbductionOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addCaOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { caOrderOption: 'Child Arrangements Order' });
  Object.assign(urlstemp, { caOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.caOrderOption === 'Yes') {
    addCaOrderSubFields(enContenttemp);
  }
}
function addCaOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'caOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'caOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'caOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'caOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addFinancialOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, {
    financialOrderOption: 'Financial Order under Schedule 1 of the Children Act 1989',
  });
  Object.assign(urlstemp, { financialOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.financialOrderOption === 'Yes') {
    addFinancialOrderSubFields(enContenttemp);
  }
}

function addFinancialOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'financialOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'financialOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'financialOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'financialOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'careOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addNonmolestationOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { nonmolestationOrderOption: 'Non-molestation Order' });
  Object.assign(urlstemp, { nonmolestationOrderOption: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.nonmolestationOrderOption === 'Yes') {
    addNonmolestationOrderSubFields(enContenttemp);
  }
}

function addNonmolestationOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'nonmolestationOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addOccupationOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { occupationalOrderOptions: 'Occupation Order' });
  Object.assign(urlstemp, { occupationalOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.occupationalOrderOptions === 'Yes') {
    addOccupationOrderSubFields(enContenttemp);
  }
}

function addOccupationOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'occupationOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'occupationOrder.issueOrderDetails': 'Which court issued this order?' });
}

function addMarriageOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { marraigeOrderOptions: 'Forced Marriage Protection Order' });
  Object.assign(urlstemp, { marraigeOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.marraigeOrderOptions === 'Yes') {
    addMarriagerderSubFields(enContenttemp);
  }
}

function addMarriagerderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'marraigeOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'marraigeOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addRestrainingOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { restrainingOrderOptions: 'Restraining Order' });
  Object.assign(urlstemp, { restrainingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.restrainingOrderOptions === 'Yes') {
    addRestrainingOrderSubFields(enContenttemp);
  }
}

function addRestrainingOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'restrainingOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'restrainingOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addInjunctiveOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { injuctiveOrderOptions: 'Other Injunctive Order' });
  Object.assign(urlstemp, { injuctiveOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.injuctiveOrderOptions === 'Yes') {
    addInjunctiveOrderSubFields(enContenttemp);
  }
}

function addInjunctiveOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'injuctiveOrder.issueOrderDetails': 'Which court issued this order?' });
}
function addUndertakingOrder(enContenttemp, urlstemp, userCaseTemp) {
  Object.assign(enContenttemp.keys, { underTakingOrderOptions: 'Undertaking in Place of an Order' });
  Object.assign(urlstemp, { underTakingOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS });
  if (userCaseTemp.underTakingOrderOptions === 'Yes') {
    addUndertakingOrderSubFields(enContenttemp);
  }
}

function addUndertakingOrderSubFields(enContenttemp) {
  Object.assign(enContenttemp.keys, { 'underTakingOrder.caseNoDetails': 'Case number' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.orderDateDetails': 'What date was it made' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.orderTimeDetails': 'How long was the order for?' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.currentOrderDetails': 'Is this a current order?' });
  Object.assign(enContenttemp.keys, { 'underTakingOrder.issueOrderDetails': 'Which court issued this order?' });
}

function clearObject(enContenttemp, urlstemp) {
  for (const key in enContenttemp) {
    delete enContenttemp[key];
  }
  for (const key in urlstemp) {
    delete urlstemp[key];
  }
}
