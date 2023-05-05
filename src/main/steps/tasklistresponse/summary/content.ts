import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';
import  {PastAndCurrentProceedings} from "../proceedings/mainUtils"
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
import { 
  //additionalInformationfieldType, applicationDetailsfieldType, 
  applicationDetailsfieldTypeMiam, confirmYourDetailsfieldType, consentFieldType, inetnationlFactorFieldType, keepYourDetailsfieldType, legalRepresantationFieldType, 
  //safetyConcernsfieldType, 
  //supportYouNeedFieldType 
} from './fieldTypeConstant';
import { populateSummaryData } from './handler';
import { summaryList as supportList} from '../../common/support-you-need-during-case/summary/utils';
import { safetyConcernHandler } from './safetyConcernHandler';

export const enlegalRepresntationContent = {
  sectionTitles: {
    title: '1. Legal representation',
  },
  keys: {
    legalRepresentation: 'Will you be using a legal representative to respond to the application?',
  },
};

export const enConsentContent = {
  sectionTitles: {
    title: '2. Consent to the application',
  },
  keys: {
    doYouConsent: 'Do you consent to the application?',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Does the applicant need permission from the court before making applications?',
    courtOrderDetails: 'Details',
  },
};

export const enKeepYourDetailsContent = {
  sectionTitles: {
    title: 'Keeping your details private',
  },
  keys: {
    detailsKnown: 'Do the other people named in this application (the applicants) know any of your contact details?',
    startAlternative:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  },
};

export const enContentMiam = {
  sectionTitles: {
    title: 'Mediation (MIAM)',
  },
  keys: {
    miamStart: 'Have you attended a MIAM?',
    miamWillingness: 'Would you be willing to attend a MIAM?',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM?',
  },
};

export const enConfirmYourDetailsContent = {
  sectionTitles: {
    title: 'Confirm or edit your contact details',
  },
  keys: {
    citizenUserFullName: 'Name',
    citizenUserDateOfBirthText: 'Date of birth',
    citizenUserPlaceOfBirthText: 'Place of birth',
    citizenUserAddressText: 'Address',
    citizenUserAddressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
};

export const enContent = {
  section: 'Check your answers',
  title: 'Please review your answers before you complete your response.',
  title2: 'Current or previous court cases',
  sectionTitles: {
    title: 'Current or previous proceeding',
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
};

export const enInternationalContent = {
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
export const enContentProceding = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and continue',
  Yes: 'Yes',
  No: 'No ',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
    courtOrderProtection: 'Have you had a court order made for your protection?',
    optitle: 'Provide details of court cases you or the children have been involved in',
    courtIssuedLabel: 'Which court issued this order?',
    caseNumberLabel: 'Case number',
    orderDateLabel: 'What date was it made',
    orderEndDateLabel: 'How long was the order for?',
    isCurrentOrderLabel: 'Is this a current order?',
    copyOfOrderLabel:"Do you have a copy of the order",
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
  otherOrderLabel: 'Other Order'
    
  },
};
export const enSaftyConcern = {
  sectionTitles: {
    title: '5. Safety concerns',
    additionationDetailsAboutChildern: 'Additional details about the children',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have'
  },
  keys: {
    details: 'Details',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    applicantDetails: 'Applicant [^^^] - Your details',
  },
  Yes: 'Yes',
  No: 'No ',
};

const cyContent: typeof enContent = {
  section: 'Check your answers -welsh',
  title: 'Please review your answers before you complete your response. -welsh',
  title2: 'Current or previous court cases -welsh',
  sectionTitles: {
    title: 'Current or previous proceeding -welsh',
  },
  statementOfTruth: 'Statement of truth -welsh',
  warning: 'Warning-welsh',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.-welsh',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration -welsh',
    },
  }, 
  continue: 'Submit your response -welsh',
};
export const cyContentProceding = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and continue',
  Yes: 'Yes',
  No: 'No ',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
    courtOrderProtection: 'Have you had a court order made for your protection?',
    optitle: 'Provide details of court cases you or the children have been involved in',
    courtIssuedLabel: 'Which court issued this order?',
    caseNumberLabel: 'Case number',
    orderDateLabel: 'What date was it made',
    orderEndDateLabel: 'How long was the order for?',
    isCurrentOrderLabel: 'Is this a current order?',
    copyOfOrderLabel:"Do you have a copy of the order",
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
  otherOrderLabel: 'Other Order'
    
  },
};
export const cylegalRepresntationContent = {
  sectionTitles: {
    title: '1. Legal representation -welsh',
  },
  keys: {
    legalRepresentation: 'Will you be using a legal representative to respond to the application? -welsh',
  },
};

export const cyConsentContent = {
  sectionTitles: {
    title: '2. Consent to the application -welsh',
  },
  keys: {
    doYouConsent: 'Do you consent to the application? -welsh',
    applicationReceivedDate: 'When did you receive the application? -welsh',
    courtPermission: 'Does the applicant need permission from the court before making applications? -welsh',
    courtOrderDetails: 'Details -welsh',
  },
};

export const cyKeepYourDetailsContent = {
  sectionTitles: {
    title: 'Keeping your details private -welsh',
  },
  keys: {
    detailsKnown: 'Do the other people named in this application (the applicants) know any of your contact details? -welsh',
    startAlternative:
      'Do you want to keep your contact details private from the other people named in the application (the applicants)? -welsh',
  },
};

export const cyContentMiam = {
  sectionTitles: {
    title: 'Mediation (MIAM) -welsh',
  },
  keys: {
    miamStart: 'Have you attended a MIAM? -welsh',
    miamWillingness: 'Would you be willing to attend a MIAM? -welsh',
    miamNotWillingExplnation: 'Explain why you are not willing to attend a MIAM? -welsh',
  },
};

export const cyConfirmYourDetailsContent = {
  sectionTitles: {
    title: 'Confirm or edit your contact details -welsh',
  },
  keys: {
    citizenUserFullName: 'Name -welsh',
    citizenUserDateOfBirthText: 'Date of birth -welsh',
    citizenUserPlaceOfBirthText: 'Place of birth -welsh',
    citizenUserAddressText: 'Address -welsh',
    citizenUserAddressHistory: 'Address history -welsh',
    citizenUserPhoneNumberText: 'Phone number -welsh',
    citizenUserEmailAddressText: 'Email -welsh',
    citizenUserSafeToCall: 'When it is safe to call you (optional) -welsh',
  },
};

export const cySupportYouNeedContent = {
  sectionTitles: {
    title: 'Support you need during your case -welsh',
  },
  keys: {
    attendingToCourt: 'Would you be able to take part in hearings by video and phone? -welsh',
    hearingDetails: 'Please provide the details -welsh',
    languageRequirements: 'Do you have any language requirements? -welsh',
    languageDetails: 'Please provide language details -welsh',
    safetyArrangements: 'Do you or the children need special safety arrangements at court? -welsh',
    safetyArrangementsDetails: 'Please describe your need in detail -welsh',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case? -welsh',
    docsSupport: 'I need documents in an alternative format -welsh',
    docsDetails: 'Please provide the docs details -welsh',
    largePrintDetails: 'Please provide the large print details -welsh',
    otherDetails: 'Please provide the other details -welsh',
    helpCommunication: 'I need help communicating and understanding -welsh',
    describeSignLanguageDetails: 'Please provide sign language details -welsh',
    describeOtherNeed: 'Please provide the details -welsh',
    courtHearing: 'I would need to bring support with me to a court hearing -welsh',
    supportWorkerDetails: 'Please provide support worker details -welsh',
    familyProviderDetails: 'Please provide family member details -welsh',
    therapyDetails: 'Please provide therapy animal details -welsh',
    communicationSupportOther: 'Please provide the details -welsh',
    courtComfort: 'I need something to make me feel comfortable during a court hearing -welsh',
    lightingProvideDetails: 'Please describe appropriate lighting details -welsh',
    otherProvideDetails: 'Please describe your need in detail -welsh',
    travellingToCourt: 'I need help travelling to, or moving around court buildings -welsh',
    parkingDetails: 'Please describe parking space details -welsh',
    differentChairDetails: 'Please describe different chair details -welsh',
    travellingOtherDetails: 'Please describe your need in detail -welsh',
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
};

export const cyInternationalContent = {
  sectionTitles: {
    title: '6. International element -welsh',
  },
  keys: {
    start: 'Do the children live outside of England or Wales? -welsh',
    iFactorsStartProvideDetails: 'Provide details -welsh',
    parents: "Do the childrens' parents or anyone significant to the children live outside of England or Wales? -welsh",
    iFactorsParentsProvideDetails: 'Provide details -welsh',
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales? -welsh',
    iFactorsJurisdictionProvideDetails: 'Provide details -welsh',
    request: 'Has another country asked (or been asked) for information or help for the children? -welsh',
    iFactorsRequestProvideDetails: 'Provide details -welsh',
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

export const cySaftyConcern = {
  sectionTitles: {
    title: '5. Safety concerns -welsh',
    additionationDetailsAboutChildern: 'Additional details about the children',
    childSafetyConcerns: 'Safety concerns: the children in the application ',
    yourSafetyConcerns: 'Safety concern: your safety',
    otherSafetyConcerns: 'Safety concern: other concerns that you have'
  },
  keys: {
    details: 'Details',
    //child concern screens
    detailsOfChildConcern: 'Briefly describe the [***] [^^^] if you feel able to ',
    concerns: 'concerns',
    againstChild: 'against the child',
    applicantDetails: 'Applicant [^^^] - Your details',
  },
  Yes: 'Yes',
  No: 'No ',
};
export const cyDummyContent = {
  sectionTitles: {
    title2: '3. Your details -welsh',
    title3: '4. Application details -welsh',
  },
  keys: {},
  dependencies: {},
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
      supportList(enSupportYouNeedContent, userCase, urls, 'en', enSupportYouNeedContent.sectionTitles.title),
      summaryList(enDummyContent, userCase, '', enDummyContent.sectionTitles.title3, '', content.language),
      summaryList(
        enContentMiam,
        userCase,
        urls,
        enContentMiam.sectionTitles.title,
        applicationDetailsfieldTypeMiam,
        content.language
      ),
      PastAndCurrentProceedings(enContentProceding,userCase),
      // summaryList(
      //   enContent,
      //   userCase,
      //   urls,
      //   enContent.sectionTitles.title,
      //   applicationDetailsfieldType,
      //   content.language
      // ),
      safetyConcernHandler(userCase),
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

const cy: typeof en = (content: CommonContent) => {
  populateSummaryData(content.userCase, content.userIdamId);
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(
        cylegalRepresntationContent,
        userCase,
        urls,
        cylegalRepresntationContent.sectionTitles.title,
        legalRepresantationFieldType,
        content.language
      ),
      summaryList(
        cyConsentContent,
        userCase,
        urls,
        cyConsentContent.sectionTitles.title,
        consentFieldType,
        content.language
      ),
      summaryList(cyDummyContent, userCase, '', cyDummyContent.sectionTitles.title2, '', content.language),
      summaryList(
        cyKeepYourDetailsContent,
        userCase,
        urls,
        cyKeepYourDetailsContent.sectionTitles.title,
        keepYourDetailsfieldType,
        content.language
      ),
      summaryList(
        cyConfirmYourDetailsContent,
        userCase,
        urls,
        cyConfirmYourDetailsContent.sectionTitles.title,
        confirmYourDetailsfieldType,
        content.language
      ),
      supportList(cySupportYouNeedContent, userCase, urls, 'cy', cySupportYouNeedContent.sectionTitles.title),
      summaryList(cyDummyContent, userCase, '', cyDummyContent.sectionTitles.title3, '', content.language),
      summaryList(
        cyContentMiam,
        userCase,
        urls,
        cyContentMiam.sectionTitles.title,
        applicationDetailsfieldTypeMiam,
        content.language
      ),
      PastAndCurrentProceedings(cyContentProceding,userCase),
      safetyConcernHandler(userCase),
      summaryList(
        cyInternationalContent,
        userCase,
        urls,
        cyInternationalContent.sectionTitles.title,
        inetnationlFactorFieldType,
        content.language
      ),
      /////
      // summaryList(
      //   enContent,
      //   userCase,
      //   urls,
      //   enContent.sectionTitles.title,
      //   applicationDetailsfieldType,
      //   content.language
      // ),
      //summaryList(enContent, userCase, urls, enContent.sectionTitles.title, safetyConcernsfieldType, content.language),
      // summaryList(
      //   enContent,
      //   userCase,
      //   urls,
      //   enContent.sectionTitles.title,
      //   additionalInformationfieldType,
      //   content.language
      // ),
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

