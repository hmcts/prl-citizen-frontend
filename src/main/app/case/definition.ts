export interface ChildDetails {
  gender: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  otherGender: string;
  childLiveWith: string[];
  orderAppliedFor: string[];
  isDateOfBirthUnknown: string;
  personWhoLivesWithChild: string[];
  relationshipToApplicant: string;
  relationshipToRespondent: string;
  applicantsRelationshipToChild: string;
  parentalResponsibilityDetails: string;
  respondentsRelationshipToChild: string;
  otherApplicantsRelationshipToChild: string;
  otherRespondentsRelationshipToChild: string;
}

export interface Child {
  id: string;
  value: ChildDetails;
}

export interface MiamTable {
  soleTraderName: string;
  familyMediatorMiam: string;
  applicantAttendedMiam: string;
  claimingExemptionMiam: string;
  familyMediatorServiceName: string;
  mediatorRegistrationNumber: string;
}

export interface Address {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface SolicitorOrg {
  OrganisationID: string;
  OrganisationName: string;
}

export interface SolicitorAddress {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface PartyDetails {
  email: string;
  gender: string;
  address: Address;
  dxNumber: string;
  landline: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  otherGender: string;
  phoneNumber: string;
  placeOfBirth: string;
  previousName: string;
  solicitorOrg: SolicitorOrg;
  sendSignUpLink: string;
  solicitorEmail: string;
  isAddressUnknown: string;
  solicitorAddress: SolicitorAddress;
  isDateOfBirthKnown: string;
  solicitorReference: string;
  solicitorTelephone: string;
  isPlaceOfBirthKnown: string;
  isDateOfBirthUnknown: string;
  isAddressConfidential: string;
  isCurrentAddressKnown: string;
  relationshipToChildren: string;
  representativeLastName: string;
  representativeFirstName: string;
  canYouProvidePhoneNumber: string;
  canYouProvideEmailAddress: string;
  isAtAddressLessThan5Years: string;
  isPhoneNumberConfidential: string;
  isEmailAddressConfidential: string;
  respondentLivedWithApplicant: string;
  doTheyHaveLegalRepresentation: string;
  addressLivedLessThan5YearsDetails: string;
  otherPersonRelationshipToChildren: string[];
  isAtAddressLessThan5YearsWithDontKnow: string;
}

export interface Applicant {
  id: string;
  value: PartyDetails;
}

export interface CaseStatus {
  state: string;
}

export interface WelshNeedsDeatils {
  whoNeedsWelsh: string;
  spokenOrWritten: string[];
  fl401SpokenOrWritten: string[];
}

export interface WelshNeed {
  id: string;
  value: WelshNeedsDeatils;
}

export interface Address2 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface SolicitorOrg2 {
  OrganisationID: string;
  OrganisationName: string;
}

export interface SolicitorAddress2 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface Respondent {
  id: string;
  value: PartyDetails;
}

export interface Address3 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface SolicitorOrg3 {
  OrganisationID: string;
  OrganisationName: string;
}

export interface Value5 {
  email: string;
  gender: string;
  address: Address3;
  dxNumber: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  otherGender: string;
  phoneNumber: string;
  placeOfBirth: string;
  previousName: string;
  solicitorOrg: SolicitorOrg3;
  solicitorEmail: string;
  solicitorReference: string;
  isAddressConfidential: string;
  representativeLastName: string;
  representativeFirstName: string;
  canYouProvideEmailAddress: string;
  isAtAddressLessThan5Years: string;
  isPhoneNumberConfidential: string;
  isEmailAddressConfidential: string;
  addressLivedLessThan5YearsDetails: string;
}

export interface ApplicantTable {
  id: string;
  value: Value5;
}

export interface Address4 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface SolicitorOrg4 {
  OrganisationID: string;
  OrganisationName: string;
}

export interface SolicitorAddress3 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface Value7 {
  personRelationshipToChild: string;
}

export interface OtherPersonRelationshipToChildren {
  id: string;
  value: Value7;
}

export interface OthersToNotify {
  id: string;
  value: PartyDetails;
}

export interface UrgencyDetails {
  urgencyStatus: string;
}

export interface Address5 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface SolicitorOrg5 {
  organisationID: string;
  organisationName: string;
}

export interface AllegationOfHarm {
  typesOfHarm: string;
}

export interface DateOfSubmission {
  dateOfSubmission: string;
}

//To Do: Fields like Valu2,value3 value4 ... etc needs to be revisited incase of any use from them
export interface Value9 {
  name: string;
  party: string[];
  language: string;
  otherAssistance: string;
}

export interface InterpreterNeed {
  id: string;
  value: Value9;
}

export interface Value10 {
  gender: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  otherGender: string;
  childLiveWith: string;
  orderAppliedFor: string;
  personWhoLivesWithChild: string[];
  applicantsRelationshipToChild: string;
  parentalResponsibilityDetails: string;
  respondentsRelationshipToChild: string;
  otherApplicantsRelationshipToChild: string;
  otherRespondentsRelationshipToChild: string;
}

export interface ChildDetailsTable {
  id: string;
  value: Value10;
}

export interface SpecialArrangement {
  areAnySpecialArrangements: string;
}

export interface ConfidentialDetails {
  isConfidentialDetailsAvailable: string;
}

export interface HearingUrgencyTable {
  isCaseUrgent: string;
  setOutReasonsBelow: string;
  caseUrgencyTimeAndReason: string;
  effortsMadeWithRespondents: string;
  doYouNeedAWithoutNoticeHearing: string;
  areRespondentsAwareOfProceedings: string;
  reasonsForApplicationWithoutNotice: string;
  doYouRequireAHearingWithReducedNotice: string;
}

export interface MiamExemptionsTable {
  urgencyEvidence: string;
  otherGroundsEvidence: string;
  childProtectionEvidence: string;
  reasonsForMiamExemption: string;
  domesticViolenceEvidence: string;
  previousAttendenceEvidence: string;
}

export interface AllocatedJudgeDetails {
  lastName: string;
  courtName: string;
  judgeTitle: string;
  emailAddress: string;
}

export interface DraftConsentOrderFile {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface OtherProceedingsTable {
  previousOrOngoingProceedings: string;
}

export interface ChildDetailsExtraTable {
  childrenKnownToLocalAuthority: string;
  childrenSubjectOfChildProtectionPlan: string;
}

export interface TypeOfApplicationTable {
  natureOfOrder: string;
  ordersApplyingFor: string;
  typeOfChildArrangementsOrder: string;
}

export interface LitigationCapacityTable {
  litigationCapacityFactors: string;
  litigationCapacityReferrals: string;
  litigationCapacityOtherFactors: string;
  litigationCapacityOtherFactorsDetails: string;
}

export interface AttendingTheHearingTable {
  isWelshNeeded: string;
  adjustmentsRequired: string;
  isDisabilityPresent: string;
  isInterpreterNeeded: string;
  isIntermediaryNeeded: string;
  reasonsForIntermediary: string;
  specialArrangementsRequired: string;
  isSpecialArrangementsRequired: string;
}

export interface InternationalElementTable {
  jurisdictionIssue: string;
  requestToForeignAuthority: string;
  habitualResidentInOtherState: string;
  requestToForeignAuthorityGiveReason: string;
  habitualResidentInOtherStateGiveReason: string;
}

export interface Address6 {
  County: string;
  Country: string;
  PostCode: string;
  PostTown: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
}

export interface Value12 {
  personRelationshipToChild: string;
}

export interface RelationshipToChild {
  id: string;
  value: Value12;
}

export interface Value11 {
  email: string;
  gender: string;
  address: Address6;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  otherGender: string;
  phoneNumber: string;
  placeOfBirth: string;
  previousName: string;
  isDateOfBirthKnown: string;
  isPlaceOfBirthKnown: string;
  relationshipToChild: RelationshipToChild[];
  isCurrentAddressKnown: string;
  canYouProvidePhoneNumber: string;
  canYouProvideEmailAddress: string;
}

export interface OtherPeopleInTheCaseTable {
  id: string;
  value: Value11;
}

export interface OtherProceedingEmptyTable {
  otherProceedingEmptyField: string;
}

// // eslint-disable-next-line @typescript-eslint/no-empty-interface

// export interface OccupationOrder {

// }

// export interface RestrainingOrder {
// }

// export interface NonMolestationOrder {
// }

// export interface OtherInjunctiveOrder {
// }

// export interface UndertakingInPlaceOrder {
// }

// export interface ForcedMarriageProtectionOrder {
// }

// export interface AllegationsOfHarmOrdersTable {
//   occupationOrder: OccupationOrder;
//   ordersOccupation: string;
//   restrainingOrder: RestrainingOrder;
//   ordersRestraining: string;
//   nonMolestationOrder: NonMolestationOrder;
//   ordersNonMolestation: string;
//   otherInjunctiveOrder: OtherInjunctiveOrder;
//   ordersOtherInjunctive: string;
//   undertakingInPlaceOrder: UndertakingInPlaceOrder;
//   ordersUndertakingInPlace: string;
//   forcedMarriageProtectionOrder: ForcedMarriageProtectionOrder;
//   ordersForcedMarriageProtection: string;
// }

export interface Value13 {
  dateEnded: string;
  caseNumber: string;
  dateStarted: string;
  nameOfCourt: string;
  nameOfJudge: string;
  typeOfOrder: string;
  nameAndOffice: string;
  nameOfGuardian: string;
  otherTypeOfOrder: string;
  nameOfChildrenInvolved: string;
  previousOrOngoingProceedings: string;
}

export interface OtherProceedingsDetailsTable {
  id: string;
  value: Value13;
}

export interface SummaryTabForOrderAppliedFor {
  ordersApplyingFor: string;
  typeOfChildArrangementsOrder: string;
}

export interface Value14 {
  caseNumber: string;
  nameOfCourt: string;
  typeOfOrder: string;
}

export interface OtherProceedingsForSummaryTab {
  id: string;
  value: Value14;
}

export interface AllegationsOfHarmOverviewTable {
  allegationsOfHarmYesNo: string;
  allegationsOfHarmChildAbuseYesNo: string;
  allegationsOfHarmDomesticAbuseYesNo: string;
  allegationsOfHarmOtherConcernsYesNo: string;
  allegationsOfHarmChildAbductionYesNo: string;
  allegationsOfHarmSubstanceAbuseYesNo: string;
}

export interface WelshLanguageRequirementsTable {
  welshLanguageRequirement: string;
  welshLanguageRequirementApplication: string;
  languageRequirementApplicationNeedWelsh: string;
  welshLanguageRequirementApplicationNeedEnglish: string;
}

export interface AllegationsOfHarmDomesticAbuseTable {
  sexualAbuseVictim: string;
  physicalAbuseVictim: string;
  emotionalAbuseVictim: string;
  financialAbuseVictim: string;
  psychologicalAbuseVictim: string;
}

export interface AllegationsOfHarmOtherConcernsTable {
  agreeChildOtherContact: string;
  agreeChildSupervisedTime: string;
  agreeChildUnsupervisedTime: string;
  allegationsOfHarmOtherConcerns: string;
  allegationsOfHarmOtherConcernsDetails: string;
  allegationsOfHarmOtherConcernsCourtActions: string;
}

export interface AllegationsOfHarmChildAbductionTable {
  childrenLocationNow: string;
  previousAbductionThreats: string;
  childAtRiskOfAbductionReason: string;
  abductionPassportOfficeNotified: string;
  previousAbductionThreatsDetails: string;
  abductionPreviousPoliceInvolvement: string;
  abductionPreviousPoliceInvolvementDetails: string;
}

export interface CaseData {
  id: string;
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
  orderCollection: ListValue<PRLDocument>[];
  documentsGenerated: ListValue<PRLDocument>[];
  respondentName: string;
  finalDocument: Document;
  fl401UploadWitnessDocuments: Fl401UploadWitnessDocuments[];
}

export const enum State {
  Holding = 'Holding',
  AwaitingAos = 'AwaitingAos',
  AosDrafted = 'AosDrafted',
  AosOverdue = 'AosOverdue',
  Applicant2Approved = 'Applicant2Approved',
  AwaitingPayment = 'AwaitingPayment',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  AwaitingDocuments = 'AwaitingDocuments',
  AwaitingApplicant1Response = 'AwaitingApplicant1Response',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingBailiffReferral = 'AwaitingBailiffReferral',
  AwaitingBailiffService = 'AwaitingBailiffService',
  AwaitingClarification = 'AwaitingClarification',
  AwaitingConditionalOrder = 'AwaitingConditionalOrder',
  AwaitingGeneralConsideration = 'AwaitingGeneralConsideration',
  AwaitingGeneralReferralPayment = 'AwaitingGeneralReferralPayment',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  AwaitingLegalAdvisorReferral = 'AwaitingLegalAdvisorReferral',
  AwaitingService = 'AwaitingService',
  AwaitingServiceConsideration = 'AwaitingServiceConsideration',
  AwaitingServicePayment = 'AwaitingServicePayment',
  ConditionalOrderDrafted = 'ConditionalOrderDrafted',
  ConditionalOrderPronounced = 'ConditionalOrderPronounced',
  ConditionalOrderRefused = 'ConditionalOrderRefused',
  Disputed = 'Disputed',
  Draft = 'Draft',
  FinalOrderComplete = 'FinalOrderComplete',
  IssuedToBailiff = 'IssuedToBailiff',
  AwaitingPronouncement = 'AwaitingPronouncement',
  PendingDispute = 'PendingDispute',
  BulkCaseReject = 'BulkCaseReject',
  Submitted = 'Submitted',
  successAuthentication = 'SuccessAuthentication',
}

export const CASE_TYPE = 'PRLAPPS';
export const JURISDICTION = 'PRIVATELAW';

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export interface OtherName {
  id?: string;
  firstNames: string;
  lastNames: string;
}

export const CITIZEN_SUBMIT = 'citizen-submit-application';
export const CITIZEN_INVITE_APPLICANT_2 = 'citizen-invite-applicant2';
export const CITIZEN_CREATE = 'citizen-create-application';
export const APPLICANT_2_APPROVE = 'applicant2-approve';
export const APPLICANT_2_CONFIRM_RECEIPT = 'applicant2-confirm-receipt';
export const CITIZEN_UPDATE_CONTACT_DETAILS = 'citizen-update-contact-details';
export const CITIZEN_SAVE_AND_CLOSE = 'citizen-save-and-close';
export const APPLICANT_2_NOT_BROKEN = 'applicant2-not-broken';
export const CITIZEN_UPDATE = 'citizen-update-application';
export const CITIZEN_APPLICANT_2_REQUEST_CHANGES = 'applicant2-request-changes';
export const SWITCH_TO_SOLE = 'switch-to-sole';
export const APPLICANT_1_CONFIRM_RECEIPT = 'applicant1-confirm-receipt';
export const APPLICANT_1_RESUBMIT = 'applicant1-resubmit';
export const CITIZEN_ADD_PAYMENT = 'citizen-add-payment';
export const CITIZEN_APPLICANT2_UPDATE = 'citizen-applicant2-update-application';
export const UPDATE_AOS = 'update-aos';
export const DRAFT_CONDITIONAL_ORDER = 'draft-conditional-order';
export const UPDATE_CONDITIONAL_ORDER = 'update-conditional-order';
export const SUBMIT_CONDITIONAL_ORDER = 'submit-conditional-order';
export const SUBMIT_AOS = 'submit-aos';
export const DRAFT_AOS = 'draft-aos';
export const SYSTEM_REMIND_APPLICANT2 = 'system-remind-applicant2';
export const SYSTEM_UPDATE_CASE_PRONOUNCEMENT_JUDGE = 'system-update-case-pronouncement-judge';
export const SYSTEM_LINK_APPLICANT_2 = 'system-link-applicant2';
export const SYSTEM_PRONOUNCE_CASE = 'system-pronounce-case';
export const SYSTEM_UPDATE_CASE_COURT_HEARING = 'system-update-case-court-hearing';
export const SYSTEM_REMIND_APPLICANT_1_APPLICATION_REVIEWED = 'system-remind-applicant1';
export const SYSTEM_MIGRATE_CASE = 'system-migrate-case';
export const SYSTEM_LINK_WITH_BULK_CASE = 'system-link-with-bulk-case';
export const SYSTEM_ISSUE_SOLICITOR_SERVICE_PACK = 'system-issue-solicitor-service-pack';
export const SYSTEM_PROGRESS_HELD_CASE = 'system-progress-held-case';
export const SYSTEM_REMOVE_BULK_CASE = 'system-remove-bulk-case';
export const SYSTEM_NOTIFY_APPLICANT1_CONDITIONAL_ORDER = 'system-notify-applicant1-conditional-order';
export const SYSTEM_APPLICATION_NOT_REVIEWED = 'system-application-not-reviewed';
export const SYSTEM_PROGRESS_TO_AOS_OVERDUE = 'system-progress-to-aos-overdue';
export const CASEWORKER_SYSTEM_USER_UPDATE_ISSUE_DATE = 'system-update-issue-date';

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}
export const enum YesNoNotsure {
  YES = 'Yes',
  NO = 'No',
  NOT_SURE = 'NotSure',
}

export interface CaseInvite {
  partyId: string;
  caseInviteEmail: string;
  accessCode: string;
  invitedUserId: string;
  expiryDate: string;
}

export const enum UserRole {
  CASE_WORKER = 'caseworker-divorce-courtadmin_beta',
  LEGAL_ADVISOR = 'caseworker-divorce-courtadmin-la',
  SUPER_USER = 'caseworker-divorce-superuser',
  SYSTEMUPDATE = 'caseworker-divorce-systemupdate',
  SOLICITOR = 'caseworker-divorce-solicitor',
  APPLICANT_1_SOLICITOR = '[APPONESOLICITOR]',
  APPLICANT_2_SOLICITOR = '[APPTWOSOLICITOR]',
  ORGANISATION_CASE_ACCESS_ADMINISTRATOR = 'caseworker-caa',
  CITIZEN = 'citizen',
  CREATOR = '[CREATOR]',
  APPLICANT_2 = '[APPLICANTTWO]',
}

export const enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export const enum SectionStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
  COMPLETED = 'COMPLETED',
  NOT_AVAILABLE_YET = 'NOT_AVAILABLE_YET',
  READY_TO_VIEW = 'READY_TO_VIEW',
  DOWNLOAD = 'DOWNLOAD',
}

export type DateAsString = string;
export interface PRLDocument {
  dateCreated: DateAsString;
  orderType: string;
  orderDocument: Document;
  otherDetails: OtherDetails;
}

export interface OtherDetails {
  createdBy: string;
  orderCreatedDate: string;
  orderMadeDate: string;
  orderRecipients: string;
}

export interface ListValue<T> {
  id: string;
  value: T;
}

export const enum DocumentType {
  BIRTH_OR_ADOPTION_CERTIFICATE = 'birthOrAdoptionCertificate',
  DEATH_CERTIFICATE = 'deathCertificate',
  APPLICATION = 'application',
  EMAIL = 'email',
  APPLICATION_SUMMARY = 'applicationSummary',
  FL401_FINAL_DOCUMENT = 'FL401-Final-Document.pdf',
  WITNESS_STATEMENT = 'witness-statement-Final-Document.pdf',
  //APPLICATION_WITNESS_STATEMENT = 'witness-statement-Final-Document.pdf',
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
  document_hash?: string | undefined | null;
}
export interface Fl401UploadWitnessDocuments {
  id: string;
  value: Document;
}
