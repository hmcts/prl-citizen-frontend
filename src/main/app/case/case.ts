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
  Fl401UploadWitnessDocuments,
  HearingUrgencyTable,
  InternationalElementTable,
  InterpreterNeed,
  ListValue,
  LitigationCapacityTable,
  MiamExemptionsTable,
  MiamTable,
  orderInterface,
  OtherName,
  OtherPeopleInTheCaseTable,
  OtherProceedingEmptyTable,
  OtherProceedingsDetailsTable,
  OtherProceedingsForSummaryTab,
  OtherProceedingsTable,
  OthersToNotify,
  PRLDocument,
  Respondent,
  SpecialArrangement,
  State,
  SummaryTabForOrderAppliedFor,
  TypeOfApplicationTable,
  UploadDocumentList,
  UrgencyDetails,
  WelshLanguageRequirementsTable,
  WelshNeed,
  YesOrNo,
  //DocumentType,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  children: 'children',
  miamTable: 'miamTable',
  caseStatus: 'caseStatus',
  welshNeeds: 'welshNeeds',
  respondents: 'respondents',
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
  hearingUrgencyTable: 'hearingUrgencyTable',
  isDisabilityPresent: 'isDisabilityPresent',
  isInterpreterNeeded: 'isInterpreterNeeded',
  miamExemptionsTable: 'miamExemptionsTable',
  isIntermediaryNeeded: 'isIntermediaryNeeded',
  allocatedJudgeDetails: 'allocatedJudgeDetails',
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
  respondentFirstName: 'respondentFirstName',
  finalDocument: 'finalDocument',
  fl401UploadWitnessDocuments: 'fl401UploadWitnessDocuments',
  applicantDocumentsUploaded: 'applicantDocumentsUploaded',
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
  //respondentTable: RespondentTable[];
  allegationOfHarm?: AllegationOfHarm;
  dateOfSubmission?: DateOfSubmission;
  //declarationTable: DeclarationTable;
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
  existingProceedings?: string[];
  hearingUrgencyTable?: HearingUrgencyTable;
  isDisabilityPresent?: string;
  isInterpreterNeeded?: string;
  miamExemptionsTable?: MiamExemptionsTable;
  isIntermediaryNeeded?: string;
  allocatedJudgeDetails?: AllocatedJudgeDetails;
  applicantAttendedMiam?: string;
  caseTypeOfApplication?: string;
  claimingExemptionMiam?: string;
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
  //allegationsOfHarmOrdersTable: AllegationsOfHarmOrdersTable;
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
  previousOrOngoingProceedingsForChildren?: string;
  welshLanguageRequirementApplicationNeedEnglish?: string;

  //TODO: Below fields should be with in respondent object.
  /***** case code authorization fields *****/
  serviceType?: string;
  claimNumber?: string;
  caseCode?: string;
  accessCode?: string;
  detailsKnown?: string;
  startAlternative?: string;
  contactDetailsPrivate?: string;
  miamStart?: string;
  miamWillingness?: string;
  miamNotWillingExplnation?: string;
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
  respondentFirstName?: string;
  respondentLastName?: string;
  respondentCaseInvites?: CaseInvite[];
  applicantCaseInvites?: CaseInvite[];
  orderCollection?: ListValue<PRLDocument>[];
  documentsGenerated?: ListValue<PRLDocument>[];
  //applicant1CannotUploadDocuments?: DocumentType[];
  documentText?: string;
  applicantUploadFiles?: UploadedFile[];
  declarationCheck?: string;
  finalDocument?: Document;
  fl401UploadWitnessDocuments?: Fl401UploadWitnessDocuments[];
  /*** Document upload */
  applicantDocumentsUploaded?: ListValue<UploadDocumentList>[];
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
  applicant1FullName?: string;
  applicant1FirstNames?: string;
  applicant1LastNames?: string;
  applicant1HasOtherNames?: YesOrNo;
  applicant1AdditionalName?: string;
  applicant1AdditionalNames?: OtherName[];
  applicant1EmailAddress?: string;
  applicant1PhoneNumber?: string;
  applicant1SafeToCall?: string;
  applicant1DateOfBirth?: CaseDate;
  applicant1DateOfBirthText?: string;
  applicant1Occupation?: string;
  applicant1SelectAddress?: string;
  applicant1PlaceOfBirth?: string;
  applicant1PlaceOfBirthText?: string;
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
}

export interface CaseWithId extends Case {
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

export interface UploadedFile {
  id: string;
  name: string;
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