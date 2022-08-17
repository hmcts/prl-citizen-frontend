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
  hearingUrgencyTable: 'hearingUrgencyTable',
  isDisabilityPresent: 'isDisabilityPresent',
  isInterpreterNeeded: 'isInterpreterNeeded',
  miamExemptionsTable: 'miamExemptionsTable',
  isIntermediaryNeeded: 'isIntermediaryNeeded',
  allocatedJudgeDetails: 'allocatedJudgeDetails',
  miamCertificationDocumentUpload: 'miamCertificationDocumentUpload',
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
  finalDocument: 'finalDocument',
  fl401UploadWitnessDocuments: 'fl401UploadWitnessDocuments',
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
  children: Child[];
  miamTable: MiamTable;
  applicants: Applicant[];
  applicantsFL401: PartyDetails;
  respondentsFL401: PartyDetails;
  caseStatus: CaseStatus;
  welshNeeds: WelshNeed[];
  respondents: Respondent[];
  consentOrder: string;
  isCaseUrgent: string;
  isWelshNeeded: string;
  natureOfOrder: string;
  applicantTable: ApplicantTable[];
  othersToNotify: OthersToNotify[];
  urgencyDetails: UrgencyDetails;
  //respondentTable: RespondentTable[];
  allegationOfHarm: AllegationOfHarm;
  dateOfSubmission: DateOfSubmission;
  //declarationTable: DeclarationTable;
  interpreterNeeds: InterpreterNeed[];
  applicantCaseName: string;
  childDetailsTable: ChildDetailsTable[];
  jurisdictionIssue: string;
  ordersApplyingFor: string[];
  applicationDetails: string;
  familyMediatorMiam: string;
  setOutReasonsBelow: string;
  specialArrangement: SpecialArrangement;
  adjustmentsRequired: string;
  confidentialDetails: ConfidentialDetails;
  existingProceedings: string[];
  hearingUrgencyTable: HearingUrgencyTable;
  isDisabilityPresent: string;
  isInterpreterNeeded: string;
  miamExemptionsTable: MiamExemptionsTable;
  isIntermediaryNeeded: string;
  allocatedJudgeDetails: AllocatedJudgeDetails;
  applicantAttendedMiam: string;
  caseTypeOfApplication: string;
  claimingExemptionMiam: string;
  miamCertificationDocumentUpload: PRLDocument;
  draftConsentOrderFile: DraftConsentOrderFile;
  otherProceedingsTable: OtherProceedingsTable;
  allegationsOfHarmYesNo: string;
  childDetailsExtraTable: ChildDetailsExtraTable;
  reasonsForIntermediary: string;
  typeOfApplicationTable: TypeOfApplicationTable;
  litigationCapacityTable: LitigationCapacityTable;
  miamExemptionsChecklist: string[];
  attendingTheHearingTable: AttendingTheHearingTable;
  caseUrgencyTimeAndReason: string;
  welshLanguageRequirement: string;
  internationalElementTable: InternationalElementTable;
  litigationCapacityFactors: string;
  miamOtherGroundsChecklist: string;
  otherPeopleInTheCaseTable: OtherPeopleInTheCaseTable[];
  otherProceedingEmptyTable: OtherProceedingEmptyTable;
  requestToForeignAuthority: string;
  effortsMadeWithRespondents: string;
  jurisdictionIssueGiveReason: string;
  litigationCapacityReferrals: string;
  specialArrangementsRequired: string;
  //allegationsOfHarmOrdersTable: AllegationsOfHarmOrdersTable;
  habitualResidentInOtherState: string;
  otherProceedingsDetailsTable: OtherProceedingsDetailsTable[];
  summaryTabForOrderAppliedFor: SummaryTabForOrderAppliedFor;
  typeOfChildArrangementsOrder: string;
  applicationPermissionRequired: string;
  childrenKnownToLocalAuthority: string;
  isSpecialArrangementsRequired: string;
  otherProceedingsForSummaryTab: OtherProceedingsForSummaryTab[];
  allegationsOfHarmOverviewTable: AllegationsOfHarmOverviewTable;
  doYouNeedAWithoutNoticeHearing: string;
  litigationCapacityOtherFactors: string;
  welshLanguageRequirementsTable: WelshLanguageRequirementsTable;
  miamPreviousAttendanceChecklist: string;
  areRespondentsAwareOfProceedings: string;
  reasonsForApplicationWithoutNotice: string;
  allegationsOfHarmDomesticAbuseTable: AllegationsOfHarmDomesticAbuseTable;
  allegationsOfHarmOtherConcernsTable: AllegationsOfHarmOtherConcernsTable;
  applicationPermissionRequiredReason: string;
  requestToForeignAuthorityGiveReason: string;
  welshLanguageRequirementApplication: string;
  allegationsOfHarmChildAbductionTable: AllegationsOfHarmChildAbductionTable;
  childrenSubjectOfChildProtectionPlan: string;
  childrenKnownToLocalAuthorityTextArea: string;
  doYouRequireAHearingWithReducedNotice: string;
  litigationCapacityOtherFactorsDetails: string;
  c100ConfidentialityStatementDisclaimer: string[];
  habitualResidentInOtherStateGiveReason: string;
  languageRequirementApplicationNeedWelsh: string;
  previousOrOngoingProceedingsForChildren: string;
  welshLanguageRequirementApplicationNeedEnglish: string;

  //TODO: Below fields should be with in respondent object.
  serviceType: string;
  claimNumber?: string;
  caseCode?: string;
  accessCode?: string;
  detailsKnown?: string;
  startAlternative?: string;
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
  respondentName: string;
  respondentLastName?: string;
  respondentCaseInvites?: CaseInvite[];
  applicantCaseInvites?: CaseInvite[];
  contactDetailsPrivate?: string;
  orderCollection: ListValue<PRLDocument>[];
  documentsGenerated: ListValue<PRLDocument>[];
  //applicant1CannotUploadDocuments?: DocumentType[];
  applicant1UploadedFiles?: UploadedFile[];
  finalDocument: Document;
  fl401UploadWitnessDocuments: Fl401UploadWitnessDocuments[];
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum FieldPrefix {
  APPLICANT1 = 'applicant1',
  APPLICANT2 = 'applicant2',
  CHILDREN = 'children',
  BIRTH_FATHER = 'birthFather',
  BIRTH_MOTHER = 'birthMother',
  OTHER_PARENT = 'otherParent',
}

export interface UploadedFile {
  id: string;
  name: string;
}
