/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject } from '../controller/PostController';

import {
  AllegationOfHarm,
  AllegationsOfHarmChildAbductionTable,
  AllegationsOfHarmDomesticAbuseTable,
  AllegationsOfHarmOtherConcernsTable,
  AllegationsOfHarmOverviewTable,
  AllocatedJudgeDetails,
  Applicant,
  ApplicantTable,
  AttendingTheHearingTable,
  CaseData,
  CaseInvite,
  CaseStatus,
  Child,
  ChildDetailsExtraTable,
  ChildDetailsTable,
  ConfidentialDetails,
  ContactDetails,
  DateOfSubmission,
  Document,
  DraftConsentOrderFile,
  ExistingProceedings,
  Fl401UploadWitnessDocuments,
  HearingUrgencyTable,
  InternationalElementTable,
  InterpreterNeed,
  ListValue,
  LitigationCapacityTable,
  MiamExemptionsTable,
  MiamTable,
  OtherDocuments,
  OtherName,
  OtherPeopleInTheCaseTable,
  OtherProceedingEmptyTable,
  OtherProceedingsDetailsTable,
  OtherProceedingsForSummaryTab,
  OtherProceedingsTable,
  OthersToNotify,
  PRLDocument,
  PartyDetails,
  Respondent,
  SpecialArrangement,
  State,
  SummaryTabForOrderAppliedFor,
  TypeOfApplicationTable,
  UploadDocumentList,
  UrgencyDetails,
  WelshLanguageRequirementsTable,
  WelshNeed,
  YesNoDontKnow,
  YesOrNo,
  orderInterface,
  //C100 Rebuild
  // eslint-disable-next-line sort-imports
  C100DocumentInfo,
  C100OrderTypes,
  C1ASafteyConcerns,
  MiamNonAttendReason,
  OtherProceedings,
  //DocumentType,
  ChildrenDetails,
  C1ASafteyConcernsAbout,
  C1AAbuseTypes,
  C100RebuildPartyDetails,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  children: 'children',
  miamTable: 'miamTable',
  caseStatus: 'caseStatus',
  welshNeeds: 'welshNeeds',
  respondents: 'respondents',
  applicants: 'applicants',
  applicantsFL401: 'applicantsFL401',
  respondentsFL401: 'respondentsFL401',
  consentOrder: 'consentOrder',
  isCaseUrgent: 'isCaseUrgent',
  isWelshNeeded: 'isWelshNeeded',
  natureOfOrder: 'natureOfOrder',
  applicantTable: 'applicantTable',
  othersToNotify: 'othersToNotify',
  urgencyDetails: 'urgencyDetails',
  //respondentTable: 'RespondentTable[]',
  allegationOfHarm: 'allegationOfHarm',
  dateOfSubmission: 'dateOfSubmission',
  //declarationTable: 'DeclarationTable',
  interpreterNeeds: 'interpreterNeeds',
  applicantCaseName: 'applicantCaseName',
  childDetailsTable: 'childDetailsTable',
  jurisdictionIssue: 'jurisdictionIssue',
  ordersApplyingFor: 'ordersApplyingFor',
  applicationDetails: 'applicationDetails',
  familyMediatorMiam: 'familyMediatorMiam',
  setOutReasonsBelow: 'setOutReasonsBelow',
  specialArrangement: 'specialArrangement',
  adjustmentsRequired: 'adjustmentsRequired',
  confidentialDetails: 'confidentialDetails',
  existingProceedings: 'existingProceedings',
  otherDocuments: 'otherDocuments',
  hearingUrgencyTable: 'hearingUrgencyTable',
  isDisabilityPresent: 'isDisabilityPresent',
  isInterpreterNeeded: 'isInterpreterNeeded',
  miamExemptionsTable: 'miamExemptionsTable',
  isIntermediaryNeeded: 'isIntermediaryNeeded',
  allocatedJudgeDetails: 'allocatedJudgeDetails',
  miamCertificationDocumentUpload: 'miamCertificationDocumentUpload',
  c1ADocument: 'c1ADocument',
  applicantAttendedMiam: 'applicantAttendedMiam',
  caseTypeOfApplication: 'caseTypeOfApplication',
  claimingExemptionMiam: 'claimingExemptionMiam',
  draftConsentOrderFile: 'draftConsentOrderFile',
  otherProceedingsTable: 'otherProceedingsTable',
  allegationsOfHarmYesNo: 'allegationsOfHarmYesNo',
  childDetailsExtraTable: 'childDetailsExtraTable',
  reasonsForIntermediary: 'reasonsForIntermediary',
  typeOfApplicationTable: 'typeOfApplicationTable',
  litigationCapacityTable: 'litigationCapacityTable',
  miamExemptionsChecklist: 'miamExemptionsChecklist',
  attendingTheHearingTable: 'attendingTheHearingTable',
  caseUrgencyTimeAndReason: 'caseUrgencyTimeAndReason',
  welshLanguageRequirement: 'welshLanguageRequirement',
  internationalElementTable: 'internationalElementTable',
  litigationCapacityFactors: 'litigationCapacityFactors',
  miamOtherGroundsChecklist: 'miamOtherGroundsChecklist',
  //otherPeopleInTheCaseTable: 'otherPeopleInTheCaseTable[]',
  otherProceedingEmptyTable: 'otherProceedingEmptyTable',
  requestToForeignAuthority: 'requestToForeignAuthority',
  effortsMadeWithRespondents: 'effortsMadeWithRespondents',
  jurisdictionIssueGiveReason: 'jurisdictionIssueGiveReason',
  litigationCapacityReferrals: 'litigationCapacityReferrals',
  specialArrangementsRequired: 'specialArrangementsRequired',
  //allegationsOfHarmOrdersTable: 'allegationsOfHarmOrdersTable',
  habitualResidentInOtherState: 'habitualResidentInOtherState',
  //otherProceedingsDetailsTable: 'otherProceedingsDetailsTable[]',
  summaryTabForOrderAppliedFor: 'summaryTabForOrderAppliedFor',
  typeOfChildArrangementsOrder: 'typeOfChildArrangementsOrder',
  applicationPermissionRequired: 'applicationPermissionRequired',
  childrenKnownToLocalAuthority: 'childrenKnownToLocalAuthority',
  isSpecialArrangementsRequired: 'isSpecialArrangementsRequired',
  otherProceedingsForSummaryTab: 'otherProceedingsForSummaryTab',
  allegationsOfHarmOverviewTable: 'allegationsOfHarmOverviewTable',
  doYouNeedAWithoutNoticeHearing: 'doYouNeedAWithoutNoticeHearing',
  litigationCapacityOtherFactors: 'litigationCapacityOtherFactors',
  //welshLanguageRequirementsTable: 'WelshLanguageRequirementsTable',
  miamPreviousAttendanceChecklist: 'miamPreviousAttendanceChecklist',
  areRespondentsAwareOfProceedings: 'areRespondentsAwareOfProceedings',
  reasonsForApplicationWithoutNotice: 'reasonsForApplicationWithoutNotice',
  allegationsOfHarmDomesticAbuseTable: 'allegationsOfHarmDomesticAbuseTable',
  allegationsOfHarmOtherConcernsTable: 'allegationsOfHarmOtherConcernsTable',
  applicationPermissionRequiredReason: 'applicationPermissionRequiredReason',
  requestToForeignAuthorityGiveReason: 'requestToForeignAuthorityGiveReason',
  welshLanguageRequirementApplication: 'welshLanguageRequirementApplication',
  allegationsOfHarmChildAbductionTable: 'allegationsOfHarmChildAbductionTable',
  childrenSubjectOfChildProtectionPlan: 'childrenSubjectOfChildProtectionPlan',
  childrenKnownToLocalAuthorityTextArea: 'childrenKnownToLocalAuthorityTextArea',
  doYouRequireAHearingWithReducedNotice: 'doYouRequireAHearingWithReducedNotice',
  litigationCapacityOtherFactorsDetails: 'litigationCapacityOtherFactorsDetails',
  c100ConfidentialityStatementDisclaimer: 'c100ConfidentialityStatementDisclaimer',
  habitualResidentInOtherStateGiveReason: 'habitualResidentInOtherStateGiveReason',
  languageRequirementApplicationNeedWelsh: 'languageRequirementApplicationNeedWelsh',
  previousOrOngoingProceedingsForChildren: 'previousOrOngoingProceedingsForChildren',
  welshLanguageRequirementApplicationNeedEnglish: 'welshLanguageRequirementApplicationNeedEnglish',
  orderCollection: 'orderCollection',
  respondentName: 'respondentName',
  respondentFirstName: 'respondentFirstName',
  finalDocument: 'finalDocument',
  fl401UploadWitnessDocuments: 'fl401UploadWitnessDocuments',
  citizenUploadedDocumentList: 'citizenUploadedDocumentList',
  serviceType: 'serviceType',
  claimNumber: 'claimNumber',
  caseCode: 'caseCode',
  respondentLastName: 'respondentLastName',
  contactDetailsPrivate: 'contactDetailsPrivate',

  citizenUserFirstNames: 'citizenUserFirstNames',
  citizenUserLastNames: 'citizenUserLastNames',
  citizenUserFullName: 'citizenUserFullName',
  applicant1HasOtherNames: 'applicant1HasOtherNames',
  applicant1AdditionalNames: 'applicant1AdditionalNames',
  citizenUserDateOfBirth: 'citizenUserDateOfBirth',
  applicant1Occupation: 'applicant1Occupation',
  citizenUserEmailAddress: 'citizenUserEmailAddress',
  applicant1SafeToCall: 'applicant1SafeToCall',
  citizenUserPhoneNumber: 'citizenUserPhoneNumber',
  citizenUserPlaceOfBirth: 'citizenUserPlaceOfBirth',
  applicant1Address1: 'applicant1Address1',
  applicant1Address2: 'applicant1Address2',
  applicant1AddressTown: 'applicant1AddressTown',
  // applicant1AddressCounty: 'applicant1AddressCountry',
  // applicant1AddressPostcode: 'applicant1AddressPostCode',
  applicant1ContactDetails: 'applicant1ContactDetails',
  applicant1ContactDetailsConsent: 'applicant1ContactDetailsConsent',
  //applicant1LanguagePreference: 'applicant1LanguagePreference',
  citizenRole: 'citizenRole',
  miamStart: 'miamStart',

  start: 'start',
  iFactorsStartProvideDetails: 'iFactorsStartProvideDetails',
  parents: 'parents',
  iFactorsParentsProvideDetails: 'iFactorsParentsProvideDetails',
  jurisdiction: 'jurisdiction',
  iFactorsJurisdictionProvideDetails: 'iFactorsJurisdictionProvideDetails',
  request: 'request',
  iFactorsRequestProvideDetails: 'iFactorsRequestProvideDetails',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};
  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }
  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  children?: Child[];
  miamTable?: MiamTable;
  applicants?: Applicant[];
  applicantsFL401?: PartyDetails;
  respondentsFL401?: PartyDetails;
  caseStatus?: CaseStatus;
  welshNeeds?: WelshNeed[];
  respondents?: Respondent[];
  consentOrder?: string;
  isCaseUrgent?: string;
  isWelshNeeded?: string;
  natureOfOrder?: string;
  applicantTable?: ApplicantTable[];
  othersToNotify?: OthersToNotify[];
  urgencyDetails?: UrgencyDetails;
  //respondentTable?: RespondentTable[];
  allegationOfHarm?: AllegationOfHarm;
  dateOfSubmission?: DateOfSubmission;
  //declarationTable?: DeclarationTable;
  interpreterNeeds?: InterpreterNeed[];
  applicantCaseName?: string;
  childDetailsTable?: ChildDetailsTable[];
  jurisdictionIssue?: string;
  ordersApplyingFor?: string[];
  applicationDetails?: string;
  familyMediatorMiam?: string;
  setOutReasonsBelow?: string;
  specialArrangement?: SpecialArrangement;
  adjustmentsRequired?: string;
  confidentialDetails?: ConfidentialDetails;
  existingProceedings?: ExistingProceedings[];
  otherDocuments?: OtherDocuments[];
  hearingUrgencyTable?: HearingUrgencyTable;
  isDisabilityPresent?: string;
  isInterpreterNeeded?: string;
  miamExemptionsTable?: MiamExemptionsTable;
  isIntermediaryNeeded?: string;
  allocatedJudgeDetails?: AllocatedJudgeDetails;
  applicantAttendedMiam?: string;
  caseTypeOfApplication?: string;
  claimingExemptionMiam?: string;
  miamCertificationDocumentUpload?: Document;
  c1ADocument?: Document;
  draftConsentOrderFile?: DraftConsentOrderFile;
  otherProceedingsTable?: OtherProceedingsTable;
  allegationsOfHarmYesNo?: string;
  childDetailsExtraTable?: ChildDetailsExtraTable;
  reasonsForIntermediary?: string;
  typeOfApplicationTable?: TypeOfApplicationTable;
  litigationCapacityTable?: LitigationCapacityTable;
  miamExemptionsChecklist?: string[];
  attendingTheHearingTable?: AttendingTheHearingTable;
  caseUrgencyTimeAndReason?: string;
  welshLanguageRequirement?: string;
  internationalElementTable?: InternationalElementTable;
  litigationCapacityFactors?: string;
  miamOtherGroundsChecklist?: string;
  otherPeopleInTheCaseTable?: OtherPeopleInTheCaseTable[];
  otherProceedingEmptyTable?: OtherProceedingEmptyTable;
  requestToForeignAuthority?: string;
  effortsMadeWithRespondents?: string;
  jurisdictionIssueGiveReason?: string;
  litigationCapacityReferrals?: string;
  specialArrangementsRequired?: string;
  //allegationsOfHarmOrdersTable?: AllegationsOfHarmOrdersTable;
  habitualResidentInOtherState?: string;
  otherProceedingsDetailsTable?: OtherProceedingsDetailsTable[];
  summaryTabForOrderAppliedFor?: SummaryTabForOrderAppliedFor;
  typeOfChildArrangementsOrder?: string;
  applicationPermissionRequired?: string;
  childrenKnownToLocalAuthority?: string;
  isSpecialArrangementsRequired?: string;
  otherProceedingsForSummaryTab?: OtherProceedingsForSummaryTab[];
  allegationsOfHarmOverviewTable?: AllegationsOfHarmOverviewTable;
  doYouNeedAWithoutNoticeHearing?: string;
  litigationCapacityOtherFactors?: string;
  welshLanguageRequirementsTable?: WelshLanguageRequirementsTable;
  miamPreviousAttendanceChecklist?: string;
  areRespondentsAwareOfProceedings?: string;
  reasonsForApplicationWithoutNotice?: string;
  allegationsOfHarmDomesticAbuseTable?: AllegationsOfHarmDomesticAbuseTable;
  allegationsOfHarmOtherConcernsTable?: AllegationsOfHarmOtherConcernsTable;
  applicationPermissionRequiredReason?: string;
  requestToForeignAuthorityGiveReason?: string;
  welshLanguageRequirementApplication?: string;
  allegationsOfHarmChildAbductionTable?: AllegationsOfHarmChildAbductionTable;
  childrenSubjectOfChildProtectionPlan?: string;
  childrenKnownToLocalAuthorityTextArea?: string;
  doYouRequireAHearingWithReducedNotice?: string;
  litigationCapacityOtherFactorsDetails?: string;
  c100ConfidentialityStatementDisclaimer?: string[];
  habitualResidentInOtherStateGiveReason?: string;
  languageRequirementApplicationNeedWelsh?: string;
  previousOrOngoingProceedingsForChildren?: YesNoDontKnow;
  welshLanguageRequirementApplicationNeedEnglish?: string;

  //TODO?: Below fields should be with in respondent object.
  serviceType?: string;
  claimNumber?: string;
  caseCode?: string;
  accessCode?: string;
  detailsKnown?: string;
  startAlternative?: string;
  contactDetailsPrivate?: string[];
  miamStart?: string;
  miamWillingness?: string;
  miamNotWillingExplnation?: string;
  c1A_supervisionAgreementDetails?: string;
  c1A_agreementOtherWaysDetails?: string;
  doYouConsent?: YesOrNo;
  applicationReceivedDate?: CaseDate;
  courtPermission?: YesOrNo;
  reasonForNotConsenting?: string;
  courtOrderDetails?: string;
  start?: YesOrNo;
  parents?: YesOrNo;
  jurisdiction?: YesOrNo;
  request?: YesOrNo;
  iFactorsJurisdictionProvideDetails?: string;
  iFactorsStartProvideDetails?: string;
  iFactorsRequestProvideDetails?: string;
  iFactorsParentsProvideDetails?: string;
  confirmcontactdetails?: string;
  respondentName?: string;
  respondentFirstName?: string;
  respondentLastName?: string;
  caseInvites?: CaseInvite[];
  orderCollection?: ListValue<PRLDocument>[];
  documentsGenerated?: ListValue<PRLDocument>[];
  //applicant1CannotUploadDocuments?: DocumentType[];
  documentText?: string;
  applicantUploadFiles?: UploadedFile[];
  declarationCheck?: string;
  finalDocument?: Document;
  fl401UploadWitnessDocuments?: Fl401UploadWitnessDocuments[];
  citizenUploadedDocumentList?: UploadDocumentList[];
  /*** Document upload */
  respondentUploadFiles?: UploadedFile[];
  proceedingsCourtCase?: string;
  proceedingsStart?: string;
  proceedingsCourtOrder?: string;
  proceedingsStartOrder?: string;
  courtProceedingsInvolved?: string;
  supervisionOrderOption?: YesOrNo;
  supervisionOrder?: orderInterface;
  emergencyOrderOptions?: YesOrNo;
  emergencyOrder?: orderInterface;
  careOrderOptions?: YesOrNo;
  careOrder?: orderInterface;
  childAbductionOrderOption?: YesOrNo;
  childAbductionOrder?: orderInterface;
  caOrderOption?: YesOrNo;
  caOrder?: orderInterface;
  financialOrderOption?: YesOrNo;
  financialOrder?: orderInterface;
  nonmolestationOrderOption?: YesOrNo;
  nonmolestationOrder?: orderInterface;
  occupationalOrderOptions?: YesOrNo;
  occupationOrder?: orderInterface;
  marraigeOrderOptions?: YesOrNo;
  marraigeOrder?: orderInterface;
  restrainingOrderOptions?: YesOrNo;
  restrainingOrder?: orderInterface;
  injuctiveOrderOptions?: YesOrNo;
  injuctiveOrder?: orderInterface;
  underTakingOrderOptions?: YesOrNo;
  underTakingOrder?: orderInterface;

  /***** Applicant1 *****/
  citizenUserFullName?: string;
  citizenUserFirstNames?: string;
  citizenUserLastNames?: string;
  applicant1HasOtherNames?: YesOrNo;
  citizenUserAdditionalName?: string;
  applicant1AdditionalNames?: OtherName[];
  citizenUserEmailAddress?: string;
  citizenUserEmailAddressText?: string;
  applicant1SafeToCall?: string;
  citizenUserPhoneNumber?: string;
  citizenUserPhoneNumberText?: string;
  citizenUserDateOfBirth?: CaseDate;
  citizenUserDateOfBirthText?: string;
  applicant1Occupation?: string;
  applicant1SelectAddress?: string;
  citizenUserPlaceOfBirth?: string;
  citizenUserPlaceOfBirthText?: string;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1ContactDetails?: ContactDetails[];
  applicant1ContactDetailsConsent?: YesOrNo;
  applicant1PostalAddress1?: string;
  applicant1PostalAddress2?: string;
  applicant1PostalAddress3?: string;
  applicant1PostalAddressTown?: string;
  applicant1PostalAddressCounty?: string;
  applicant1PostalAddressPostcode?: string;

  //applicant1LanguagePreference?: LanguagePreference;
  //support you need during the case
  languageRequirements?: string;
  languageDetails?: string;
  reasonableAdjustments?: string;
  helpCommunication?: string;
  describeOtherNeed?: string;
  courtHearing?: string;
  communicationSupportOther?: string;
  docsSupport?: string;
  otherDetails?: string;
  courtComfort?: string;
  otherProvideDetails?: string;
  safetyArrangements?: string;
  safetyArrangementsDetails?: string;
  travellingToCourt?: string;
  travellingOtherDetails?: string;
  unableForCourtProceedings?: string;
  courtProceedingProvideDetails?: string;

  //CA-DA-Respondent
  respondentAttendingToCourt?: string;
  respondentHearingDetails?: string;
  respondentLangRequirements?: string;
  respondentLangDetails?: string;
  respondentSpecialArrangements?: string;
  respondentSpecialArrangementsDetails?: string;
  respondentReasonableAdjustments?: string;
  respondentDocsSupport?: string;
  respondentDocsDetails?: string;
  respondentLargePrintDetails?: string;
  respondentOtherDetails?: string;
  respondentHelpCommunication?: string;
  respondentSignLanguageDetails?: string;
  respondentDescribeOtherNeed?: string;
  respondentCourtHearing?: string;
  respondentSupportWorkerDetails?: string;
  respondentFamilyDetails?: string;
  respondentTherapyDetails?: string;
  respondentCommSupportOther?: string;
  respondentCourtComfort?: string;
  respondentLightingDetails?: string;
  respondentOtherProvideDetails?: string;
  respondentTravellingToCourt?: string;
  respondentParkingDetails?: string;
  respondentDifferentChairDetails?: string;
  respondentTravellingOtherDetails?: string;
  //applicant1LanguagePreference?: LanguagePreference;

  safetyConcerns?: string;

  citizenRole?: FieldPrefix;
  legalRepresentation?: YesOrNo;

  //C100 Rebuild
  contactDetailsPrivateAlternative?: string;
  c100ApplicationFees?: string;
  ra_disabilityRequirements?: string[];
  needHelpWithFees?: YesOrNo;
  feesAppliedDetails?: YesOrNo;
  caseId?: string;
  c1A_haveSafetyConcerns?: YesOrNo;
  op_courtProceedingsOrders?: C100OrderTypes[];
  op_otherProceedings?: OtherProceedings;
  c1A_safetyConernAbout?: C1ASafteyConcernsAbout[];
  c1A_safteyConcerns?: C1ASafteyConcerns;
  miam_otherProceedings?: string;
  miam_haveDocSigned?: string;
  miam_consent?: string;
  miam_attendance?: YesOrNo;
  miam_validReason?: YesOrNo;
  miam_certificate?: C100DocumentInfo;
  miam_mediatorDocument?: YesOrNo;
  miam_nonAttendanceReasons?: MiamNonAttendReason[];
  miam_domesticAbuse?: string[];
  miam_childProtectionEvidence?: string[];
  miam_urgency?: string[];
  miam_previousAttendance?: string[];
  miam_notAttendingReasons?: string[];
  hu_urgentHearingReasons?: YesOrNo;
  c1A_passportOffice?: YesOrNo;
  childFirstName?: ChildrenDetails['firstName'];
  childLastName?: ChildrenDetails['lastName'];
  cd_children?: ChildrenDetails[];
  sq_writtenAgreement?: string;
  sq_legalRepresentation?: YesOrNo;
  sq_legalRepresentationApplication?: YesOrNo;
  sq_courtPermissionRequired?: YesOrNo;
  c1A_concernAboutChild?: C1AAbuseTypes[];
  c1A_concernAboutApplicant?: C1AAbuseTypes[];
  c1A_childAbductedBefore?: YesOrNo;
  c100RespondentFirstName?: C100RebuildPartyDetails['firstName'];
  c100RespondentLastName?: C100RebuildPartyDetails['lastName'];
  resp_Respondents?: C100RebuildPartyDetails[];
}

export interface CaseWithId extends Case {
  paymentSuccessDetails?: {
    amount: string;
    reference: string;
    ccd_case_number: string;
    case_reference: string;
    channel: string;
    method: string;
    status: string;
    external_reference: string;
    payment_group_reference: string;
  };
  paymentDetails?: {
    payment_reference: string;
    date_created: string;
    external_reference: string;
    next_url: string;
    status: string;
  };
  id: string;
  state: State;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export enum FieldPrefix {
  APPLICANT1 = 'applicant1',
  APPLICANT2 = 'applicant2',
  CHILDREN = 'children',
  BIRTH_FATHER = 'birthFather',
  BIRTH_MOTHER = 'birthMother',
  OTHER_PARENT = 'otherParent',
  APPLICANT = 'APPLICANT',
  RESPONDENT = 'RESPONDENT',
}

export interface UploadedFile {
  id: string;
  name: string;
}
