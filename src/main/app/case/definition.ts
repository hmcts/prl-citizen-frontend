/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.33.956 on 2021-11-12 15:28:24.
import { CaseDate, FieldPrefix } from './case';

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
  soleTraderName?: string;
  familyMediatorMiam?: string;
  applicantAttendedMiam?: string;
  claimingExemptionMiam?: string;
  familyMediatorServiceName?: string;
  mediatorRegistrationNumber?: string;
}

export interface Miam {
  attendedMiam?: string;
  willingToAttendMiam?: string;
  reasonNotAttendingMiam?: string;
 }
export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3?: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country?: string;
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
  response: Response;
  user: User;
}

export interface User {
  email: string,
  idamId: string
}

export interface Response {
  legalRepresentation?: string;
  consent?: Consent;
  miam?: Miam;
  citizenInternationalElements?: CitizenInternationalElements;
  keepDetailsPrivate?: KeepDetailsPrivate;
  citizenFlags?: CitizenFlags
  safeToCallOption?: string;
  supportYouNeed?: ReasonableAdjustmentsSupport;
}

export interface ReasonableAdjustmentsSupport {
  helpCommunication?: HelpCommunicationEnum[],
  describeOtherNeed?: string,
  courtComfort?: CourtComfortEnum[],
  otherProvideDetails?: string,
  courtHearing?: CourtHearingEnum[],
  communicationSupportOther?: string,
  docsSupport?: DocsSupportEnum[],
  otherDetails?: string,
  languageRequirements?: LanguageRequirementsEnum[], 
  languageDetails?: string,
  reasonableAdjustments?: ReasonableAdjustmentsEnum[],
  safetyArrangements?: SafetyArrangemensEnum[],
  safetyArrangementsDetails?: string,
  travellingToCourt?: TravellingToCourtEnum[],
  travellingOtherDetails?: string,
  unableForCourtProceedings?: YesOrNo,
  courtProceedingProvideDetails?: string,
}

export const enum TravellingToCourtEnum {
  parkingspace = 'Parking space close to the venue',
  stepfree = 'Step free / wheelchair access',
  wheelchair = 'Use of venue wheelchair',
  toilet = 'Accessible toilet',
  lift = 'Help using a lift',
  differentchair = 'A different type of chair',
  building = 'Guiding in the building',
  other = 'Other',
  nosupport = 'No, I do not need any extra support at this time',
}

export const enum HelpCommunicationEnum {
  hearingloop = 'hearingloop',
  infraredreceiver = 'infraredreceiver',
  needspeakinghelp = 'needspeakinghelp',
  lipspeaker = 'lipspeaker',
  signlanguage = 'signlanguage',
  speechreporter = 'speechreporter',
  extratime = 'extratime',
  courtvisit = 'courtvisit',
  courthearing = 'courthearing',
  intermediary = 'intermediary',
  other = 'other',
  nosupport = 'nosupport',
}

export const enum CourtComfortEnum {
  appropriatelighting = 'appropriatelighting',
  breaks = 'breaks',
  space = 'space',
  other = 'other',
  nosupport = 'nosupport',
}

export const enum SafetyArrangemensEnum {
  waitingroom= 'Separate waiting room',
  separateexitentry= 'Separate exits and entrances',
  screens= 'Screens so you and the other people in the case cannot see each other',
  toilet= 'Separate toilets',
  advancedview= 'Advanced viewing of the court',
  videolinks= 'Video links',
  other= 'Other',
  nosupport = 'No, I do not need any extra support at this time',
}

export const enum ReasonableAdjustmentsEnum {
  docsformat= 'I need documents in an alternative format',
  commhelp= 'I need help communicating and understanding',
  hearingsupport= 'I need to bring support with me to a hearing',
  hearingcomfort= 'I need something to feel comfortable during a hearing',
  travellinghelp= 'I need help travelling to, or moving around court buildings',
  unabletotakecourtproceedings= 'Is there a reason you are unable to take part in the court proceedings?',
  nosupport= 'No, I do not need any extra support at this time',
}

export const enum LanguageRequirementsEnum {
  speakwelsh = 'I need to speak in Welsh',
  readandwritewelsh = 'I need to read and write in Welsh',
  languageinterpreter = 'I need an interpreter in a certain language',
  nointerpreter = 'No, I do not have any language requirements at this time',
  
}

export const enum DocsSupportEnum {
  docsprint = 'I need documents printed in a particular colour or font',
  docsreadformat = 'Documents in an easy read format',
  brailledocs = 'Braille documents',
  largeprintdocs = 'Documents in large print',
  docsaudio = 'Audio translation of documents',
  readoutdocs = 'Documents read out to me',
  emailInfo = 'Information emailed to me',
  other = 'Other',
  nosupport = 'I do not need any of this support at this time',
}

export const enum CourtHearingEnum {
  supportworker = 'A support worker or carer',
  familymember = 'A friend or family member',
  assistance = 'Assistance / guide dog',
  animal = 'Therapy animal',
  other = 'Other',
  nosupport = 'No, I do not need any extra support at this time',
}

export interface CitizenFlags {
  isApplicationViewed?: string,
  isAllegationOfHarmViewed?: string
  isAllDocumentsViewed?: string
}

export const enum DownloadFileFieldFlag {
  IS_APPLICATION_VIEWED = 'isApplicationViewed',
  IS_ALLEGATION_OF_HARM_VIEWED = 'isAllegationOfHarmViewed',

}
export interface FileProperties {
  elements?: string[],
  downloadFileFieldFlag?: string | DownloadFileFieldFlag
}
export interface CitizenInternationalElements {
  childrenLiveOutsideOfEnWl?: YesOrNo;
  childrenLiveOutsideOfEnWlDetails?: string;
  parentsAnyOneLiveOutsideEnWl?: YesOrNo;
  parentsAnyOneLiveOutsideEnWlDetails?: string;
  anotherPersonOrderOutsideEnWl?: YesOrNo;
  anotherPersonOrderOutsideEnWlDetails?: string;
  anotherCountryAskedInformation?: YesOrNo;
  anotherCountryAskedInformationDetaails?: string;
}
export interface Consent {
  consentToTheApplication?: string;
  noConsentReason?: string;
  applicationReceivedDate?: DateAsString;
  permissionFromCourt?: string;
  courtOrderDetails?: string;
}

export interface KeepDetailsPrivate {
  otherPeopleKnowYourContactDetails?: string;
  confidentiality?: string;
  confidentialityList?: ConfidentialityList[];
}

 export enum ConfidentialityList{
   phoneNumber = 'phoneNumber',
   email = 'email',
   address = 'address',
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

export interface AddressGlobal extends Address {}

export interface AddressGlobalUK extends Address {}

export interface AddressUK extends Address {}

export interface CaseLink {
  CaseReference: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface DynamicElementIndicator {}

export interface DynamicList {
  value: DynamicListElement;
  list_items: DynamicListElement[];
  valueLabel: string;
  valueCode: string;
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

export interface DynamicListElement {
  code: string;
  label: string;
}

export interface Fee {
  FeeAmount: string;
  FeeCode: string;
  FeeDescription: string;
  FeeVersion: string;
}

export interface ListValue<T> {
  id: string;
  value: T;
}

export interface OrderSummary {
  PaymentReference?: string;
  Fees: ListValue<Fee>[];
  PaymentTotal: string;
}

export interface Organisation {
  OrganisationName: string;
  OrganisationID: string;
  OrganisationId: string;
}

export interface OrganisationPolicy<R> {
  Organisation: Organisation;
  PreviousOrganisations: PreviousOrganisation[];
  OrgPolicyReference: string;
  PrepopulateToUsersOrganisation: YesOrNo;
  OrgPolicyCaseAssignedRole: R;
}

export interface PreviousOrganisation {
  FromTimeStamp: DateAsString;
  ToTimeStamp: DateAsString;
  OrganisationName: string;
  OrganisationAddress: string;
}

export interface CaseNote {
  author: string;
  date: DateAsString;
  note: string;
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

export interface AcknowledgementOfService {
  jurisdictionDisagreeReason: string;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  statementOfTruth: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
}

export interface Value7 {
  personRelationshipToChild: string;
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


export interface AlternativeService {
  receivedServiceApplicationDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  dateOfPayment: DateAsString;
  paymentMethod: ServicePaymentMethod;
  feeAccountNumber: string;
  feeAccountReferenceNumber: string;
  helpWithFeesReferenceNumber: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
}

export interface OthersToNotify {
  id: string;
  value: PartyDetails;
}

export interface UrgencyDetails {
  urgencyStatus: string;
}

export interface Bailiff {
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
}

export const enum Nationality {
  BRITHISH = 'British',
  IRISH = 'Irish',
  OTHER = 'Other',
  NOT_SURE = 'Not sure',
}

export enum MiamNonAttendReason {
  DOMESTIC = 'domesticViolence',
  CHILD_PROTECTION = 'childProtection',
  URGENT = 'urgentHearing',
  PREV_MIAM = 'previousMIAMOrExempt',
  EXEMPT = 'validExemption',
  NONE = 'none',
}



export const enum ContactDetails {
  EMAIL = 'email',
  PHONE = 'phone',
}

export const enum ContactDetailsPrivate {
  EMAIL = 'email',
  PHONE = 'phone',
  ADDRESS = 'address'
}

export interface Children {
  FirstName: string;
  LastName: string;
  DateOfBirth: DateAsString;
  Nationality: Nationality[];
  AdditionalNationality: ListValue<OtherName>[];
  FirstNameAfterAdoption: string;
  LastNameAfterAdoption: string;
  SexAtBirth: Gender;
}

export interface InterpreterNeed {
  id: string;
  value: Value9;
}

export interface OtherName {
  id?: string;
  firstNames: string;
  lastNames: string;
}

export interface AdditionalNationality {
  country: string;
}

export interface PlacementOrder {
  placementOrderId: string;
  placementOrderType?: string;
  placementOrderNumber?: string;
  placementOrderCourt?: string;
  placementOrderDate?: CaseDate | string;
}

export interface ExistingProceedings {
  id?: string;
  value?: ProceedingDetails;
}

export interface ProceedingDetails {
  previousOrOngoingProceedings?: string;
  caseNumber?: string;
  dateStarted?: CaseDate | string;
  dateEnded?: CaseDate | string;
  typeOfOrder?: string[];
  otherTypeOfOrder?: string;
  nameOfJudge?: string;
  nameOfCourt?: string;
  nameOfChildrenInvolved?: string;
  nameOfGuardian?: string;
  nameAndOffice?: string;
  uploadRelevantOrder?: Document;
}

export interface OtherDocuments {
  id?: string;
  value?: OtherDocumentDetailss;
}

export interface OtherDocumentDetailss {
  documentName?: string;
  notes?: string;
  documentOther?: Document;
  documentTypeOther?: string;
  restrictCheckboxOtherDocuments?: string[];
}

export interface ChildDetailsTable {
  id: string;
  value: Value10;
}

export interface SpecialArrangement {
  areAnySpecialArrangements: string;
}

export interface AdoptionAgencyOrLocalAuthority {
  adopAgencyOrLaId: string;
  adopAgencyOrLaName?: string;
  adopAgencyOrLaPhoneNumber?: string;
  adopAgencyOrLaContactName?: string;
  adopAgencyOrLaContactEmail?: string;
}

export interface Sibling {
  siblingId: string;
  siblingFirstName?: string;
  siblingLastNames?: string;
  siblingPlacementOrders?: (PlacementOrder | ListValue<PlacementOrder>)[];
}



export type C100Applicant = {
  id?: string,
  applicantFirstName?: string | unknown,
  applicantLastName?: string | unknown,
  detailsKnown?: string | unknown
  startAlternative?: string | unknown,
  start?: string | unknown,
  contactDetailsPrivate?: unknown | [],
  contactDetailsPrivateAlternative?: unknown | [],
  applicantSelectedAddress?: number,
  applicantAddressPostcode?: string,
  applicantAddress1?: string,
  applicantAddress2?: string,
  applicantAddressTown?: string,
  applicantAddressCounty?: string,
  country?: string,
  applicantAddressHistory?: YesOrNo,
  applicantProvideDetailsOfPreviousAddresses?: string;
  personalDetails:{
    haveYouChangeName?: YesNoEmpty;
    applPreviousName?: string,
    dateOfBirth?: CaseDate;
    gender?: Gender;
    otherGenderDetails?: string;
    applicantPlaceOfBirth?: string;
  };
  relationshipDetails?: {
    relationshipToChildren: RelationshipToChildren[];
  };
  applicantContactDetail?: ContactDetail;
}

export interface RelationshipToChildren {
  relationshipType: RelationshipType;
  otherRelationshipTypeDetails?: string;
  childId: string;
}

export interface ContactDetail {
  canProvideEmail?: YesNoEmpty,
  emailAddress?: string,
  canProvideTelephoneNumber?: YesNoEmpty,
  telephoneNumber?: string,
  canNotProvideTelephoneNumberReason?: string,
  canLeaveVoiceMail?: YesNoEmpty,
  applicantContactPreferences?: String[];
}

export enum applicantContactPreferencesEnum {
  DIGITAL = 'Digital',
  POST = 'Post',
}

export type C100ListOfApplicants = C100Applicant[];

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

  allegationOfHarm: AllegationOfHarm;
  dateOfSubmission: DateOfSubmission;

  interpreterNeeds: InterpreterNeed[];
  childDetailsTable: ChildDetailsTable[];
  jurisdictionIssue: string;
  ordersApplyingFor: string[];
  applicationDetails: string;
  familyMediatorMiam: string;
  setOutReasonsBelow: string;
  specialArrangement: SpecialArrangement;
  adjustmentsRequired: string;
  confidentialDetails: ConfidentialDetails;
  existingProceedings: ExistingProceedings[];
  otherDocuments: OtherDocuments[];
  hearingUrgencyTable: HearingUrgencyTable;
  isDisabilityPresent: string;
  isInterpreterNeeded: string;
  miamExemptionsTable: MiamExemptionsTable;
  isIntermediaryNeeded: string;
  allocatedJudgeDetails: AllocatedJudgeDetails;
  miamCertificationDocumentUpload: Document;
  c1ADocument: Document;
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
  previousOrOngoingProceedingsForChildren: YesNoDontKnow;
  welshLanguageRequirementApplicationNeedEnglish: string;
  orderCollection: ListValue<PRLDocument>[];
  documentsGenerated: ListValue<PRLDocument>[];
  respondentName: string;
  finalDocument?: Document;
  serviceType: string;
  claimNumber: string;
  applicantCaseName: string;
  caseCode: string;
  respondentFirstName: string;
  respondentLastName: string;

  contactDetailsPrivate?: ContactDetails[];

  /***** Applicant1 *****/
  citizenUserFullName?: string;
  citizenUserFirstNames?: string;
  citizenUserLastNames?: string;
  applicant1HasOtherNames?: YesOrNo;
  citizenUserAdditionalName?: string;
  applicant1AdditionalNames?: OtherName[];
  citizenUserEmailAddress?: string;
  citizenUserSafeToCall?: string;
  citizenUserPhoneNumber?: string;
  citizenUserDateOfBirth?: CaseDate;
  citizenUserDateOfBirthText?: string;
  applicant1Occupation?: string;
  citizenUserSelectAddress?: string;
  citizenUserPlaceOfBirth?: string;
  citizenUserPlaceOfBirthText?: string;
  applicant1PlaceOfText?: string;
  citizenUserAddress1?: string;
  citizenUserAddress2?: string;
  citizenUserAddressTown?: string;
  citizenUserAddressCounty?: string;
  citizenUserAddressPostcode?: string;
  applicant1ContactDetails?: ContactDetails[];
  applicant1ContactDetailsConsent?: YesOrNo;
  citizenUserManualAddress1?: string;
  citizenUserManualAddress2?: string;
  citizenUserManualAddressTown?: string;
  citizenUserManualAddressCounty?: string;
  c100Applicants?: C100Applicant;
citizenUserManualAddressPostcode?: string;
  accessCode: string;
  caseInvites: CaseInvite[]
  detailsKnown?: string;
  startAlternative?: string;
  citizenRole?: FieldPrefix;
  fl401UploadWitnessDocuments: Fl401UploadWitnessDocuments[];
  doYouConsent?: YesOrNo;
  applicationReceivedDate?: CaseDate;
  courtPermission?: YesOrNo;
  reasonForNotConsenting?: string;
  courtOrderDetails?: string;
  miamStart?: string;
  citizenUploadedDocumentList?: UploadDocumentList[];
  orderWithoutGivingNoticeToRespondent?: WithoutNoticeOrderDetails;
  start?: YesOrNo;
  parents?: YesOrNo;
  jurisdiction?: YesOrNo;
  request?: YesOrNo;
  iFactorsJurisdictionProvideDetails?: string;
  iFactorsStartProvideDetails?: string;
  iFactorsRequestProvideDetails?: string;
  iFactorsParentsProvideDetails?: string;
  legalRepresentation?: YesOrNo;
  doesOrderClosesCase?: YesOrNo;
  selectTypeOfOrder?: SelectTypeOfOrderEnum;
  citizenResponseC7DocumentList?: ResponseDocumentList[];
}

export const enum SelectTypeOfOrderEnum {
  interim = 'interim',
  general = 'general',
  finl = 'finl',
}

export interface ConfidentialDetails {
  isConfidentialDetailsAvailable: string;
}

export interface AdoptionAgencyOrLocalAuthority {
  adopAgencyOrLaId: string;
  adopAgencyOrLaName?: string;
  adopAgencyOrLaPhoneNumber?: string;
  adopAgencyOrLaContactName?: string;
  adopAgencyOrLaContactEmail?: string;
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
export interface Sibling {
  siblingId: string;
  siblingFirstName?: string;
  siblingLastNames?: string;
  siblingPlacementOrders?: (PlacementOrder | ListValue<PlacementOrder>)[];
}

export interface MiamExemptionsTable {
  urgencyEvidence: string;
  otherGroundsEvidence: string;
  childProtectionEvidence: string;
  reasonsForMiamExemption: string;
  domesticViolenceEvidence: string;
  previousAttendenceEvidence: string;
}

export interface SocialWorker {
  socialWorkerName: string;
  socialWorkerPhoneNumber: string;
  socialWorkerEmail: string;
  socialWorkerTeamEmail: string;
}

export interface Solicitor {
  solicitorFirm: string;
  solicitorName: string;
  solicitorPhoneNumber: string;
  solicitorEmail: string;
  solicitorHelpingWithApplication: YesOrNo;
}

export const enum PaymentMethod {
  PAY_BY_CARD = 'payByCard',
  PAY_BY_HWF = 'payByHWF',
  APPLY_FOR_HWF = 'applyForHWF',
}
export interface CaseInvite {
  id: string;
  value: CaseInviteValue;
}

export interface CaseInviteValue {
  partyId: string;
  caseInviteEmail: string;
  accessCode: string;
  invitedUserId: string;
  expiryDate: string;
  isApplicant: YesOrNo;
}


export interface ConditionalOrder {
  DateSubmitted: DateAsString;
  RespondentAnswersLink: Document;
  ApplyForConditionalOrder: YesOrNo;
  OnlinePetitionLink: Document;
  ChangeOrAddToApplication: YesOrNo;
  IsEverythingInApplicationTrue: YesOrNo;
  SolicitorName: string;
  SolicitorFirm: string;
  SolicitorAdditionalComments: string;
  Granted: YesOrNo;
  ClaimsGranted: YesOrNo;
  ClaimsCostsOrderInformation: string;
  DecisionDate: DateAsString;
  GrantedDate: DateAsString;
  RefusalDecision: RefusalOption;
  RefusalAdminErrorInfo: string;
  RefusalRejectionReason: RejectionReason;
  RefusalRejectionAdditionalInfo: string;
  RefusalClarificationReason: ClarificationReason;
  RefusalClarificationAdditionalInfo: string;
  ClarificationResponse: string;
  ClarificationUploadDocuments: ListValue<DivorceDocument>[];
  OutcomeCase: YesOrNo;
  Court: ConditionalOrderCourt;
  DateAndTimeOfHearing: DateAsString;
  PronouncementJudge: string;
  JudgeCostsClaimGranted: JudgeCostsClaimGranted;
  JudgeCostsOrderAdditionalInfo: string;
  CertificateOfEntitlementDocument: DivorceDocument;
  ApplicantStatementOfTruth: YesOrNo;
}

export interface CtscContactDetails {
  serviceCentre: string;
  centreName: string;
  poBox: string;
  town: string;
  postcode: string;
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

export interface DivorceGeneralOrder {
  generalOrderDocument: DivorceDocument;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
}

export interface FinalOrder {
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
}

export interface GeneralEmail {
  generalEmailParties: GeneralParties;
  generalEmailOtherRecipientEmail: string;
  generalEmailOtherRecipientName: string;
  generalEmailDetails: string;
}

export interface GeneralOrder {
  generalOrderDate: DateAsString;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
  generalOrderRecitals: string;
  generalOrderJudgeType: GeneralOrderJudge;
  generalOrderJudgeName: string;
  generalOrderLegalAdvisorName: string;
  generalOrderDetails: string;
  generalOrderDraft: Document;
}

export interface GeneralReferral {
  generalReferralReason: GeneralReferralReason;
  generalApplicationFrom: GeneralParties;
  generalApplicationReferralDate: DateAsString;
  generalApplicationAddedDate: DateAsString;
  generalReferralType: GeneralReferralType;
  alternativeServiceMedium: AlternativeServiceMediumType;
  generalReferralJudgeDetails: string;
  generalReferralLegalAdvisorDetails: string;
  generalReferralFeeRequired: YesOrNo;
}

export interface HelpWithFees {
  ReferenceNumber: string;
  NeedHelp: YesOrNo;
  AppliedForFees: YesOrNo;
}

export interface Jurisdiction {
  Applicant1Residence: YesOrNo;
  Applicant2Residence: YesOrNo;
  Applicant1Domicile: YesOrNo;
  Applicant2Domicile: YesOrNo;
  App1HabituallyResLastTwelveMonths: YesOrNo;
  App1HabituallyResLastSixMonths: YesOrNo;
  ResidualEligible: YesOrNo;
  BothLastHabituallyResident: YesOrNo;
  Connections: JurisdictionConnections[];
}

export interface LabelContent {
  Applicant2: string;
  TheApplicant2: string;
  TheApplicant2UC: string;
  Applicant2UC: string;
  UnionType: string;
  UnionTypeUC: string;
  ApplicationType: ApplicationType;
}

export interface MarriageDetails {
  Applicant1Name: string;
  Applicant2Name: string;
  MarriedInUk: YesOrNo;
  CertificateInEnglish: YesOrNo;
  CertifiedTranslation: YesOrNo;
  CountryOfMarriage: string;
  PlaceOfMarriage: string;
  Date: DateAsString;
  IsSameSexCouple: YesOrNo;
  CertifyMarriageCertificateIsCorrect: YesOrNo;
  MarriageCertificateIsIncorrectDetails: string;
  IssueApplicationWithoutMarriageCertificate: YesOrNo;
}

export interface RejectReason {
  rejectReasonType: RejectReasonType;
  rejectDetails: string;
}

export interface RetiredFields {
  dataVersion: number;
  exampleRetiredField: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  applicant1LegalProceedingsRelated: LegalProceedingsRelated[];
  applicant2LegalProceedingsRelated: LegalProceedingsRelated[];
  dateConditionalOrderSubmitted: DateAsString;
  coWhoPaysCosts: WhoPaysCostOrder;
  coJudgeWhoPaysCosts: WhoPaysCostOrder;
  coJudgeTypeCostsDecision: CostOrderList;
  selectedDivorceCentreSiteId: string;
  coTypeCostsDecision: CostOrderList;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  doYouAgreeCourtHasJurisdiction: YesOrNo;
  serviceApplicationType: AlternativeServiceType;
  coCourtName: Court;
  courtName: Court;
  applicant1PrayerHasBeenGiven: YesOrNo;
  coAddNewDocuments: YesOrNo;
  coDocumentsUploaded: ListValue<DivorceDocument>[];
  coIsEverythingInPetitionTrue: YesOrNo;
}

export interface Solicitor {
  Name: string;
  Reference: string;
  Phone: string;
  Email: string;
  Address: string;
  AgreeToReceiveEmails: YesOrNo;
  OrganisationPolicy: OrganisationPolicy<UserRole>;
}

export interface SolicitorService {
  DateOfService: DateAsString;
  DocumentsServed: string;
  OnWhomServed: string;
  HowServed: DocumentsServedHow;
  ServiceDetails: string;
  AddressServed: string;
  BeingThe: DocumentsServedBeingThe;
  LocationServed: DocumentsServedWhere;
  SpecifyLocationServed: string;
  ServiceSotName: string;
  ServiceSotFirm: string;
  TruthStatement: string;
}

export interface ConfidentialDivorceDocument {
  confidentialDocumentsReceived: ConfidentialDocumentsReceived;
  documentEmailContent: string;
  documentLink: Document;
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
}

export interface DivorceDocument {
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
  documentType: DocumentType;
  documentEmailContent: string;
  documentLink: Document;
}

export interface AdoptionDocument {
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
  documentType: DocumentType;
  documentEmailContent: string;
  documentLink: Document;
}

export interface DocAssemblyRequest {
  templateId: string;
  outputType: string;
  formPayload: any;
  outputFilename: string;
}

export interface DocAssemblyResponse {
  renditionOutputLocation: string;
  binaryFilePath: string;
}

export interface DocumentInfo {
  url: string;
  filename: string;
  binaryUrl: string;
}
export interface Letter {
  divorceDocument: DivorceDocument;
  count: number;
}

export interface Print {
  letters: Letter[];
  caseId: string;
  caseRef: string;
  letterType: string;
}

export interface CreditAccountPaymentRequest {
  ccd_case_number: string;
  account_number: string;
  amount: string;
  fees: PaymentItem[];
  service: string;
  customer_reference: string;
  site_id: string;
  case_type: string;
  description: string;
  currency: string;
  organisation_name: string;
}

export interface CreditAccountPaymentResponse {
  account_number: string;
  ccd_case_number: string;
  amount: number;
  fees: Fee[];
  date_updated: string;
  method: string;
  status_histories: StatusHistoriesItem[];
  date_created: string;
  service_name: string;
  channel: string;
  description: string;
  organisation_name: string;
  payment_reference: string;
  external_provider: string;
  reference: string;
  case_reference: string;
  customer_reference: string;
  external_reference: string;
  site_id: string;
  payment_group_reference: string;
  currency: string;
  id: string;
  status: string;
}

/**
 * The response from retrieving a fee from fees and payments service
 */
export interface FeeResponse {
  version: number;
  description: string;
  code: string;
  fee_amount: number;
}

export interface Payment {
  created: DateAsString;
  updated: DateAsString;
  feeCode: string;
  amount: number;
  status: PaymentStatus;
  channel: string;
  reference: string;
  transactionId: string;
}

export interface PaymentItem {
  reference: string;
  volume: string;
  ccd_case_number: string;
  memo_line: string;
  natural_account_code: string;
  code: string;
  calculated_amount: string;
  version: string;
}

export interface PbaResponse {
  httpStatus: HttpStatus;
  errorMessage: string;
  paymentReference: string;
}

export interface StatusHistoriesItem {
  date_updated: string;
  date_created: string;
  external_status: string;
  status: string;
  error_code: string;
  error_message: string;
}

export type DateAsString = string;

export const enum FieldType {
  Unspecified = 'Unspecified',
  Email = 'Email',
  PhoneUK = 'PhoneUK',
  Date = 'Date',
  Document = 'Document',
  Schedule = 'Schedule',
  TextArea = 'TextArea',
  FixedList = 'FixedList',
  FixedRadioList = 'FixedRadioList',
  YesOrNo = 'YesOrNo',
  Address = 'Address',
  CaseLink = 'CaseLink',
  OrderSummary = 'OrderSummary',
  MultiSelectList = 'MultiSelectList',
  Collection = 'Collection',
  Label = 'Label',
}

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum YesNoNotsure {
  YES = 'Yes',
  NO = 'No',
  NOT_SURE = 'NotSure',
}

export const enum YesNoDontKnow {
  yes = 'yes',
  no = 'no',
  dontKnow = 'dontKnow',
  empty = '',
}

export const enum YesNoIDontKnow {
  YES = 'Yes',
  NO = 'No',
  IDONTKNOW = 'I'
}

export const enum SectionStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CAN_NOT_START_YET = 'CAN_NOT_START_YET',
  DOWNLOAD = 'DOWNLOAD',
  VIEW = 'VIEW',
  NOT_STARTED = 'NOT_STARTED',
  READY_TO_VIEW = "READY_TO_VIEW",
  NOT_AVAILABLE_YET = "NOT_AVAILABLE_YET"
}

export const enum AlternativeServiceMediumType {
  TEXT = 'text',
  EMAIL = 'email',
  SOCIAL_MEDIA = 'socialMedia',
  OTHER = 'other',
}

export const enum AlternativeServiceType {
  DEEMED = 'deemed',
  DISPENSED = 'dispensed',
  BAILIFF = 'bailiff',
}

export const enum ApplicationType {
  SOLE_APPLICATION = 'soleApplication',
  JOINT_APPLICATION = 'jointApplication',
}

export const enum ApplyingWith {
  ALONE = 'alone',
  WITH_SPOUSE_OR_CIVIL_PARTNER = 'withSpouseOrCivilPartner',
  WITH_SOME_ONE_ELSE = 'withSomeoneElse',
}

export const enum ClarificationReason {
  JURISDICTION_DETAILS = 'jurisdictionDetails',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertTranslation',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  PREVIOUS_PROCEEDINGS_DETAILS = 'previousProceedingDetails',
  STATEMENT_OF_CASE_DETAILS = 'caseDetailsStatement',
  OTHER = 'other',
}

export const enum ConditionalOrderCourt {
  BIRMIGHAM = 'birmingham',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum ConfidentialAddress {
  SHARE = 'share',
  KEEP = 'keep',
}

export const enum CostOrderList {
  ADDITIONAL_INFO = 'additionalInformation',
  SUBJECT_TO_DETAILED_ASSESSMENT = 'subjectToDetailedAssessment',
  HALF_COSTS = 'half',
  ALL_COSTS = 'all',
}

export const enum Court {
  SERVICE_CENTRE = 'serviceCentre',
  EAST_MIDLANDS = 'eastMidlands',
  WEST_MIDLANDS = 'westMidlands',
  SOUTH_WEST = 'southWest',
  NORTH_WEST = 'northWest',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum PrivateLaw {
  PRIVATELAW = 'prlapps',
}

export const enum DivorceOrDissolution {
  DIVORCE = 'divorce',
  DISSOLUTION = 'dissolution',
}

export const enum DocumentsServedBeingThe {
  LITIGATION_FRIEND = 'litigationFriend',
  SOLICITOR = 'solicitors',
  RESPONDENT = 'respondents',
  APPLICANT = 'applicants',
}

export const enum DocumentsServedHow {
  COURT_PERMITTED = 'courtPermitted',
  HANDED_TO = 'handedTo',
  DELIVERED_TO = 'deliveredTo',
  POSTED_TO = 'postedTo',
}

export const enum DocumentsServedWhere {
  OTHER_SPECIFY = 'otherSpecify',
  PLACE_BUSINESS_COMPANY = 'placeOfBusinessOfCompany',
  PRINCIPAL_OFFICE_COMPANY = 'principalOfficeCompany',
  PRINCIPAL_OFFICE_CORPORATION = 'principalOfficeCorporation',
  PRINCIPAL_OFFICE_PARTNERSHIP = 'principalOfficePartnership',
  LAST_KNOWN_PRINCIPAL_BUSINESS_PLACE = 'lastKnownPricipalBusinessPlace',
  LAST_KNOWN_BUSINESS_PLACE = 'lastKnownBusinessPlace',
  PRINCIPAL_PLACE_BUSINESS = 'principalPlaceBusiness',
  PLACE_BUSINESS = 'placeBusiness',
  LAST_KNOWN_RESIDENCE = 'lastKnownResidence',
  USUAL_RESIDENCE = 'usualResidence',
}

export const enum GeneralOrderJudge {
  DISTRICT_JUDGE = 'districtJudge',
  DEPUTY_DISTRICT_JUDGE = 'deputyDistrictJudge',
  HIS_HONOUR_JUDGE = 'hisHonourJudge',
  HER_HONOUR_JUDGE = 'herHonourJudge',
  RECORDER = 'recorder',
}

export const enum GeneralParties {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
  OTHER = 'other',
}

export const enum GeneralReferralReason {
  CASEWORKER_REFERRAL = 'caseworkerReferral',
  GENERAL_APPLICATION_REFERRAL = 'generalApplicationReferral',
}

export const enum GeneralReferralType {
  CASEWORKER_REFERRAL = 'alternativeServiceApplication',
  ORDER_APPLICATION_WITHOUT_MC = 'orderApplicationWithoutMc',
  ORDER_ON_FILLING_OF_ANSWERS = 'orderOnFilingOfAnswers',
  PERMISSION_ON_DA_OOT = 'permissionOnDaOot',
  DISCLOSURE_VIA_DWP = 'disclosureViaDwp',
  OTHER = 'other',
}

export interface OtherPeopleInTheCaseTable {
  id: string;
  value: Value11;
}

export interface OtherProceedingEmptyTable {
  otherProceedingEmptyField: string;
}

// // eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface ResponseDocumentList {
  id: string;
  value: ResponseDocuments;
}

export interface ResponseDocuments {
  partyName: string;
  createdBy: string;
  dateCreated: Date;
  citizenDocument: Document;
}

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

export const enum FinancialOrderFor {
  APPLICANT = 'applicant',
  CHILDREN = 'children',
}

export const enum GeneralOrderDivorceParties {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
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

export const enum JudgeCostsClaimGranted {
  YES = 'Yes',
  NO = 'No',
  ADJOURN = 'Adjourn',
}

export interface AllegationsOfHarmDomesticAbuseTable {
  sexualAbuseVictim: string;
  physicalAbuseVictim: string;
  emotionalAbuseVictim: string;
  financialAbuseVictim: string;
  psychologicalAbuseVictim: string;
}

/**
 * Values:
 * - `J` - APP_1_RESIDENT_JOINT
 * - `A` - APP_1_APP_2_RESIDENT
 * - `B` - APP_1_APP_2_LAST_RESIDENT
 * - `C` - APP_2_RESIDENT
 * - `D` - APP_1_RESIDENT_TWELVE_MONTHS
 * - `E` - APP_1_RESIDENT_SIX_MONTHS
 * - `F` - APP_1_APP_2_DOMICILED
 * - `G` - APP_1_DOMICILED
 * - `H` - APP_2_DOMICILED
 * - `I` - RESIDUAL_JURISDICTION
 */
export const enum JurisdictionConnections {
  /**
   * APP_1_RESIDENT_JOINT
   */
  APP_1_RESIDENT_JOINT = 'J',
  /**
   * APP_1_APP_2_RESIDENT
   */
  APP_1_APP_2_RESIDENT = 'A',
  /**
   * APP_1_APP_2_LAST_RESIDENT
   */
  APP_1_APP_2_LAST_RESIDENT = 'B',
  /**
   * APP_2_RESIDENT
   */
  APP_2_RESIDENT = 'C',
  /**
   * APP_1_RESIDENT_TWELVE_MONTHS
   */
  APP_1_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * APP_1_RESIDENT_SIX_MONTHS
   */
  APP_1_RESIDENT_SIX_MONTHS = 'E',
  /**
   * APP_1_APP_2_DOMICILED
   */
  APP_1_APP_2_DOMICILED = 'F',
  /**
   * APP_1_DOMICILED
   */
  APP_1_DOMICILED = 'G',
  /**
   * APP_2_DOMICILED
   */
  APP_2_DOMICILED = 'H',
  /**
   * RESIDUAL_JURISDICTION
   */
  RESIDUAL_JURISDICTION = 'I',
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

export const enum LegalProceedingsRelated {
  MARRIAGE = 'marriage',
  PROPERTY = 'property',
  CHILDREN = 'children',
}

export const enum RefusalOption {
  REJECT = 'reject',
  MORE_INFO = 'moreInfo',
  ADMIN_ERROR = 'adminError',
}

export const enum ReissueOption {
  DIGITAL_AOS = 'digitalAos',
  OFFLINE_AOS = 'offlineAos',
  REISSUE_CASE = 'reissueCase',
}

export const enum RejectReasonType {
  NO_INFO = 'noInfo',
  INCORRECT_INFO = 'incorrectInfo',
  OTHER = 'Other',
}

export const enum RejectionReason {
  NO_JURISDICTION = 'noJurisdiction',
  NO_CRITERIA = 'noCriteria',
  INSUFFICIENT_DETAILS = 'insufficentDetails',
  OTHER = 'other',
}

export const enum ServiceMethod {
  SOLICITOR_SERVICE = 'solicitorService',
  COURT_SERVICE = 'courtService',
}

export const enum ServicePaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEE_PAY_BY_HWF = 'feePayByHelp',
  FEE_PAY_BY_PHONE = 'feePayByTelephone',
  FEE_PAY_BY_CHEQUE = 'feePayByCheque',
}

export const enum SolicitorPaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
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
  AwaitingSubmissionToHmcts = 'AWAITING_SUBMISSION_TO_HMCTS',
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
  Deleted = 'DELETED'
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

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum WhoPaysCostOrder {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}

export const enum ConfidentialDocumentsReceived {
  AOS = 'aos',
  ANNEX_A = 'annexa',
  AOS_INVITATION_LETTER_OFFLINE_RESP = 'aosInvitationLetterOfflineResp',
  APPLICATION = 'application',
  BAILIFF_SERVICE = 'baliffService',
  COE = 'coe',
  CO_ANSWERS = 'coAnswers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  CO_REFUSAL_CLARIFICATION_RESP = 'coRefusalClarificationResp',
  CORRESPONDENCE = 'correspondence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  DEEMED_SERVICE = 'deemedService',
  DISPENSE_WITH_SERVICE = 'dispenseWithService',
  D84A = 'd84a',
  D9D = 'd9d',
  D9H = 'd9h',
  EMAIL = 'email',
  FINAL_ORDER_APPLICATION = 'finalOrderApplication',
  FINAL_ORDER_GRANTED = 'finalOrderGranted',
  MARRIAGE_CERT = 'marriageCert',
  MARRIAGE_CERT_TRANSLATION = 'marriageCertTranslation',
  NAME_CHANGE = 'nameChange',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OTHER = 'other',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
}

export const enum DocumentType {
  AOS_OVERDUE_COVER_LETTER = 'aosOverdueCoverLetter',
  ACKNOWLEDGEMENT_OF_SERVICE = 'acknowledgementOfService',
  ANNEX_A = 'annexA',
  APPLICATION = 'application',
  BAILIFF_CERTIFICATE_OF_SERVICE = 'bailiffCertificateOfService',
  BAILIFF_SERVICE = 'bailiffService',
  CERTIFICATE_OF_ENTITLEMENT = 'certificateOfEntitlement',
  CERTIFICATE_OF_SERVICE = 'certificateOfService',
  CONDITIONAL_ORDER_ANSWERS = 'conditionalOrderAnswers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  CONDITIONAL_ORDER_REFUSAL = 'conditionalOrderRefusal',
  CORRESPONDENCE = 'correspondence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  D84 = 'd84',
  D9D = 'd9D',
  D9H = 'd9H',
  DEEMED_SERVICE = 'deemedService',
  DEEMED_AS_SERVICE_GRANTED = 'deemedAsServiceGranted',
  DEEMED_SERVICE_REFUSED = 'deemedServiceRefused',
  DISPENSE_WITH_SERVICE = 'dispenseWithService',
  DISPENSE_WITH_SERVICE_GRANTED = 'dispenseWithServiceGranted',
  DISPENSE_WITH_SERVICE_REFUSED = 'dispenseWithServiceRefused',
  EMAIL = 'email',
  FINAL_ORDER_APPLICATION = 'finalOrderApplication',
  FINAL_ORDER_GRANTED = 'finalOrderGranted',
  GENERAL_ORDER = 'generalOrder',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertificateTranslation',
  NAME_CHANGE_EVIDENCE = 'nameChangeEvidence',
  NOTICE_OF_PROCEEDINGS = 'noticeOfProceedings',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OBJECTION_TO_COSTS = 'objectionToCosts',
  OTHER = 'other',
  PRONOUNCEMENT_LIST = 'pronouncementList',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  RESPONDENT_INVITATION = 'aos',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
  BIRTH_OR_ADOPTION_CERTIFICATE = 'birthOrAdoptionCertificate',
  DEATH_CERTIFICATE = 'deathCertificate',
  APPLICATION_SUMMARY = 'applicationSummary',
  FL401_FINAL_DOCUMENT = 'FL401-Final-Document.pdf',
  WITNESS_STATEMENT = 'witness-statement-Final-Document.pdf',
}

export const enum PaymentStatus {
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
  DECLINED = 'declined',
  TIMED_OUT = 'timedOut',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}

export const enum PbaErrorMessage {
  CAE0001 = 'CAE0001',
  CAE0003 = 'CAE0003',
  CAE0004 = 'CAE0004',
  NOT_FOUND = 'NOT_FOUND',
  GENERAL = 'GENERAL',
}

/**
 * Values:
 * - `CONTINUE`
 * - `SWITCHING_PROTOCOLS`
 * - `PROCESSING`
 * - `CHECKPOINT`
 * - `OK`
 * - `CREATED`
 * - `ACCEPTED`
 * - `NON_AUTHORITATIVE_INFORMATION`
 * - `NO_CONTENT`
 * - `RESET_CONTENT`
 * - `PARTIAL_CONTENT`
 * - `MULTI_STATUS`
 * - `ALREADY_REPORTED`
 * - `IM_USED`
 * - `MULTIPLE_CHOICES`
 * - `MOVED_PERMANENTLY`
 * - `FOUND`
 * - `MOVED_TEMPORARILY` - @deprecated
 * - `SEE_OTHER`
 * - `NOT_MODIFIED`
 * - `USE_PROXY` - @deprecated
 * - `TEMPORARY_REDIRECT`
 * - `PERMANENT_REDIRECT`
 * - `BAD_REQUEST`
 * - `UNAUTHORIZED`
 * - `PAYMENT_REQUIRED`
 * - `FORBIDDEN`
 * - `NOT_FOUND`
 * - `METHOD_NOT_ALLOWED`
 * - `NOT_ACCEPTABLE`
 * - `PROXY_AUTHENTICATION_REQUIRED`
 * - `REQUEST_TIMEOUT`
 * - `CONFLICT`
 * - `GONE`
 * - `LENGTH_REQUIRED`
 * - `PRECONDITION_FAILED`
 * - `PAYLOAD_TOO_LARGE`
 * - `REQUEST_ENTITY_TOO_LARGE` - @deprecated
 * - `URI_TOO_LONG`
 * - `REQUEST_URI_TOO_LONG` - @deprecated
 * - `UNSUPPORTED_MEDIA_TYPE`
 * - `REQUESTED_RANGE_NOT_SATISFIABLE`
 * - `EXPECTATION_FAILED`
 * - `I_AM_A_TEAPOT`
 * - `INSUFFICIENT_SPACE_ON_RESOURCE` - @deprecated
 * - `METHOD_FAILURE` - @deprecated
 * - `DESTINATION_LOCKED` - @deprecated
 * - `UNPROCESSABLE_ENTITY`
 * - `LOCKED`
 * - `FAILED_DEPENDENCY`
 * - `TOO_EARLY`
 * - `UPGRADE_REQUIRED`
 * - `PRECONDITION_REQUIRED`
 * - `TOO_MANY_REQUESTS`
 * - `REQUEST_HEADER_FIELDS_TOO_LARGE`
 * - `UNAVAILABLE_FOR_LEGAL_REASONS`
 * - `INTERNAL_SERVER_ERROR`
 * - `NOT_IMPLEMENTED`
 * - `BAD_GATEWAY`
 * - `SERVICE_UNAVAILABLE`
 * - `GATEWAY_TIMEOUT`
 * - `HTTP_VERSION_NOT_SUPPORTED`
 * - `VARIANT_ALSO_NEGOTIATES`
 * - `INSUFFICIENT_STORAGE`
 * - `LOOP_DETECTED`
 * - `BANDWIDTH_LIMIT_EXCEEDED`
 * - `NOT_EXTENDED`
 * - `NETWORK_AUTHENTICATION_REQUIRED`
 */
export const enum HttpStatus {
  CONTINUE = 'CONTINUE',
  SWITCHING_PROTOCOLS = 'SWITCHING_PROTOCOLS',
  PROCESSING = 'PROCESSING',
  CHECKPOINT = 'CHECKPOINT',
  OK = 'OK',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  NON_AUTHORITATIVE_INFORMATION = 'NON_AUTHORITATIVE_INFORMATION',
  NO_CONTENT = 'NO_CONTENT',
  RESET_CONTENT = 'RESET_CONTENT',
  PARTIAL_CONTENT = 'PARTIAL_CONTENT',
  MULTI_STATUS = 'MULTI_STATUS',
  ALREADY_REPORTED = 'ALREADY_REPORTED',
  IM_USED = 'IM_USED',
  MULTIPLE_CHOICES = 'MULTIPLE_CHOICES',
  MOVED_PERMANENTLY = 'MOVED_PERMANENTLY',
  FOUND = 'FOUND',
  /**
   * @deprecated
   */
  MOVED_TEMPORARILY = 'MOVED_TEMPORARILY',
  SEE_OTHER = 'SEE_OTHER',
  NOT_MODIFIED = 'NOT_MODIFIED',
  /**
   * @deprecated
   */
  USE_PROXY = 'USE_PROXY',
  TEMPORARY_REDIRECT = 'TEMPORARY_REDIRECT',
  PERMANENT_REDIRECT = 'PERMANENT_REDIRECT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  PROXY_AUTHENTICATION_REQUIRED = 'PROXY_AUTHENTICATION_REQUIRED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  CONFLICT = 'CONFLICT',
  GONE = 'GONE',
  LENGTH_REQUIRED = 'LENGTH_REQUIRED',
  PRECONDITION_FAILED = 'PRECONDITION_FAILED',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  /**
   * @deprecated
   */
  REQUEST_ENTITY_TOO_LARGE = 'REQUEST_ENTITY_TOO_LARGE',
  URI_TOO_LONG = 'URI_TOO_LONG',
  /**
   * @deprecated
   */
  REQUEST_URI_TOO_LONG = 'REQUEST_URI_TOO_LONG',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
  REQUESTED_RANGE_NOT_SATISFIABLE = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  EXPECTATION_FAILED = 'EXPECTATION_FAILED',
  I_AM_A_TEAPOT = 'I_AM_A_TEAPOT',
  /**
   * @deprecated
   */
  INSUFFICIENT_SPACE_ON_RESOURCE = 'INSUFFICIENT_SPACE_ON_RESOURCE',
  /**
   * @deprecated
   */
  METHOD_FAILURE = 'METHOD_FAILURE',
  /**
   * @deprecated
   */
  DESTINATION_LOCKED = 'DESTINATION_LOCKED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  LOCKED = 'LOCKED',
  FAILED_DEPENDENCY = 'FAILED_DEPENDENCY',
  TOO_EARLY = 'TOO_EARLY',
  UPGRADE_REQUIRED = 'UPGRADE_REQUIRED',
  PRECONDITION_REQUIRED = 'PRECONDITION_REQUIRED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  REQUEST_HEADER_FIELDS_TOO_LARGE = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  UNAVAILABLE_FOR_LEGAL_REASONS = 'UNAVAILABLE_FOR_LEGAL_REASONS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP_VERSION_NOT_SUPPORTED',
  VARIANT_ALSO_NEGOTIATES = 'VARIANT_ALSO_NEGOTIATES',
  INSUFFICIENT_STORAGE = 'INSUFFICIENT_STORAGE',
  LOOP_DETECTED = 'LOOP_DETECTED',
  BANDWIDTH_LIMIT_EXCEEDED = 'BANDWIDTH_LIMIT_EXCEEDED',
  NOT_EXTENDED = 'NOT_EXTENDED',
  NETWORK_AUTHENTICATION_REQUIRED = 'NETWORK_AUTHENTICATION_REQUIRED',
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
export const RESPONDENTS_DETAILS = 'respondentsDetails';
export const APPLICANTS_DETAILS = 'applicantsDetails';
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
export const SYSTEM_LINK_APPLICANT_2 = 'citizen-update-application';
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

// citizen frontend
export interface orderInterface {
  caseNoDetails: string;
  orderDateDetails: CaseDate;
  orderTimeDetails: string;
  currentOrderDetails: YesOrNo;
  issueOrderDetails: string;
}


export const enum CONFIDENTIAL_DETAILS {
  PUBLIC = 'This information was provided by the applicant so it cannot be kept confidential.',
  PRIVATE = 'This information will be kept confidential',
}

export const enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  EMPTY = ''
}

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

// citizen frontend
export interface orderInterface {
  caseNoDetails: string;
  orderDateDetails: CaseDate;
  orderTimeDetails: string;
  currentOrderDetails: YesOrNo;
  issueOrderDetails: string;
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


/** Document upload interfaces */
export interface CitizenDocument {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface DocumentDetails {
  documentName: string;
  documentUploadedDate: string;
}

export interface Value {
  parentDocumentType: string;
  documentType: string;
  partyName: string;
  isApplicant: string;
  uploadedBy: string;
  dateCreated: string;
  documentDetails: DocumentDetails;
  citizenDocument: CitizenDocument;
  documentRequestedByCourt: YesOrNo;
}

export interface UploadDocumentList {
  id: string;
  value: Value;
}
/***  */
// citizen frontend
export interface orderInterface {
  caseNoDetails: string;
  orderDateDetails: CaseDate;
  orderTimeDetails: string;
  currentOrderDetails: YesOrNo;
  issueOrderDetails: string;
}

export const enum ThePrayer {
  I_CONFIRM = 'Yes',
}

export type RespondentCaseId = string | number | undefined;
export type RespondentCaseData = object | [] | undefined;

export interface Banner {
  bannerHeading?: string;
  bannerHeadingLink?: string;
  bannerHeadingText?: string;
  bannerContent?: Content[];
  bannerLinks?: BannerLink[];
}
export interface Content {
  line1?: string;
  line2?: string;
}
export interface BannerLink {
  href?: string;
  text?: string;
}

export interface WithoutNoticeOrderDetails {
  orderWithoutGivingNotice?: YesOrNo;
}

export enum ApplicantReasonableAdjustments {
  DOCUMENTS_SUPPORT = 'document format',
  COMMUNICATION_HELP = 'comminication help',
  COURT_HEARING_SUPPORT = 'hearing support',
  COURT_HEARING_COMFORT = 'hearing comfort',
  TRAVELLING_TO_COURT = 'travel help',
  UNABLE_TO_TAKE_COURT_PROCEEDINGS = 'unable to take court proceedings',
  NO_NEED_OF_SUPPORT = 'no need of support',
 }

 export enum ReasonableAdjustments {
  DOCUMENTS_SUPPORT = 'document format',
  COMMUNICATION_HELP = 'comminication help',
  COURT_HEARING_SUPPORT = 'hearing support',
  COURT_HEARING_COMFORT = 'hearing comfort',
  TRAVELLING_TO_COURT = 'travel help',
  NO_NEED_OF_SUPPORT = 'no need of support',
 }

export const enum C100_CASE_TYPE {
  C100 = 'C100',
}

export const enum C100_CASE_EVENT {
  CASE_UPDATE = 'citizen-case-update',
  CASE_SUBMIT = 'citizen-case-submit',
  DELETE_CASE = 'deleteApplication',
}

export enum C100OrderTypes {
  CHILD_ARRANGEMENT_ORDER = 'childArrangementOrder',
  EMERGENCY_PROTECTION_ORDER = 'emergencyProtectionOrder',
  SUPERVISION_ORDER = 'supervisionOrder',
  CARE_ORDER = 'careOrder',
  CHILD_ABDUCTION_ORDER = 'childAbductionOrder',
  CONTACT_ORDER_FOR_DIVORCE = 'contactOrderForDivorce',
  CONTACT_ORDER_FOR_ADOPTION='contactOrderForAdoption',
  CHILD_MAINTENANCE_ORDER='childMaintenanceOrder',
  FINANCIAL_ORDER='financialOrder',
  NON_MOLESTATION_ORDER='nonMolestationOrder',
  OCCUPATION_ORDER='occupationOrder',
  FORCED_MARRIAGE_PROTECTION_ORDER='forcedMarriageProtectionOrder',
  RESTRANING_ORDER='restrainingOrder',
  OTHER_INJUCTION_ORDER='otherInjuctionOrder',
  UNDERTAKING_ORDER='undertakingOrder',
  OTHER_ORDER='otherOrder',
}

export const enum YesNoEmpty {
  YES = 'Yes',
  NO = 'No',
  EMPTY = '',
}

export interface C100DocumentInfo extends DocumentInfo{
  id: string;
}
export interface C100OrderInterface {
  id: string;
  orderDetail: string;
  caseNo: string;
  orderDate: CaseDate;
  currentOrder: YesNoEmpty;
  orderEndDate: CaseDate;
  orderCopy: YesNoEmpty;
  orderDocument?: C100DocumentInfo;
}

export const C100OrderTypeKeyMapper = {
  childArrangementOrder: 'childArrangementOrders',
  emergencyProtectionOrder:'emergencyProtectionOrders',
  supervisionOrder:'supervisionOrders',
  careOrder: 'careOrders',
  childAbductionOrder:'childAbductionOrders',
  contactOrderForDivorce: 'contactOrdersForDivorce',
  contactOrderForAdoption: 'contactOrdersForAdoption',
  childMaintenanceOrder: 'childMaintenanceOrders',
  financialOrder: 'financialOrders',
  nonMolestationOrder: 'nonMolestationOrders',
  occupationOrder: 'occupationOrders',
  forcedMarriageProtectionOrder: 'forcedMarriageProtectionOrders',
  restrainingOrder: 'restrainingOrders',
  otherInjuctionOrder: 'otherInjuctionOrders',
  undertakingOrder: 'undertakingOrders',
  otherOrder: 'otherOrders'
}
export const AllowedFileExtentionList = ['jpg', 'jpeg', 'bmp', 'png' , 'tif', 'tiff', 'pdf', 'doc', 'docx']
export const C100MaxFileSize = '20000000'
export interface C100OrderTypeInterface {
  childArrangementOrders?: C100OrderInterface[],
  emergencyProtectionOrders?:C100OrderInterface[],
  supervisionOrders?:C100OrderInterface[],
  careOrders?: C100OrderInterface[],
  childAbductionOrders?:C100OrderInterface[],
  contactOrdersForDivorce?: C100OrderInterface[],
  contactOrdersForAdoption?: C100OrderInterface[],
  childMaintenanceOrders?: C100OrderInterface[],
  financialOrders?: C100OrderInterface[],
  nonMolestationOrders?: C100OrderInterface[],
  occupationOrders?: C100OrderInterface[],
  forcedMarriageProtectionOrders?: C100OrderInterface[],
  restrainingOrders?: C100OrderInterface[],
  otherInjuctionOrders?: C100OrderInterface[],
  undertakingOrders?: C100OrderInterface[],
  otherOrders?: C100OrderInterface[]
}

export interface OtherProceedings {
  order?: C100OrderTypeInterface
}

export enum C1AAbuseTypes {
  PHYSICAL_ABUSE = 'physicalAbuse',
  PSYCHOLOGICAL_ABUSE = 'psychologicalAbuse',
  EMOTIONAL_ABUSE = 'emotionalAbuse',
  SEXUAL_ABUSE = 'sexualAbuse',
  FINANCIAL_ABUSE = 'financialAbuse',
  ABDUCTION = 'abduction',
  WITNESSING_DOMESTIC_ABUSE='witnessingDomesticAbuse',
  SOMETHING_ELSE='somethingElse',
}

export enum C1ASafteyConcernsAbout{
  CHILDREN = 'children',
  APPLICANT = 'applicant',
  OTHER = 'otherConcerns',
}

export interface C1ASafteyConcernsAbuse{
  behaviourDetails?: string;
  behaviourStartDate?: string;
  isOngoingBehaviour?:YesNoEmpty;
  seekHelpFromPersonOrAgency?: YesNoEmpty;
  seekHelpDetails?: string;
  childrenConcernedAbout?: string;
}

export interface C1ASafteyConcerns {
  child?: {
    physicalAbuse?:C1ASafteyConcernsAbuse;
    psychologicalAbuse?:C1ASafteyConcernsAbuse;
    emotionalAbuse?:C1ASafteyConcernsAbuse;
    sexualAbuse?:C1ASafteyConcernsAbuse;
    financialAbuse?: C1ASafteyConcernsAbuse;
  },
  applicant?:{
    physicalAbuse?:C1ASafteyConcernsAbuse;
    psychologicalAbuse?:C1ASafteyConcernsAbuse;
    emotionalAbuse?:C1ASafteyConcernsAbuse;
    sexualAbuse?:C1ASafteyConcernsAbuse;
    financialAbuse?: C1ASafteyConcernsAbuse;
    somethingElse?: C1ASafteyConcernsAbuse;
  },
  }

  export type ChildrenDetails = {
    id: string;
    firstName: string;
    lastName: string;
    personalDetails: {
      dateOfBirth?: CaseDate;
      isDateOfBirthUnknown?: YesNoEmpty;
      approxDateOfBirth?: CaseDate;
      gender: Gender;
      otherGenderDetails?: string;
    };
    childMatters: {
      needsResolution: string[];
    };
    parentialResponsibility: {
      statement: string;
    };
    liveWith?: People[]
  };

  export type OtherChildrenDetails = {
    id: string;
    firstName: string;
    lastName: string;
    personalDetails: {
      dateOfBirth?: CaseDate;
      isDateOfBirthUnknown?: YesNoEmpty;
      approxDateOfBirth?: CaseDate;
      gender: Gender;
      otherGenderDetails?: string;
    };
  };

  export type C100RebuildPartyDetails = {
    id: string;
    firstName: string;
    lastName: string;
    personalDetails: {
      hasNameChanged?: YesNoDontKnow;
      previousFullName?: string;
      dateOfBirth?: CaseDate;
      isDateOfBirthUnknown?: YesNoEmpty;
      approxDateOfBirth?: CaseDate;
      gender: Gender;
      otherGenderDetails?: string;
      respondentPlaceOfBirth?: string;
      respondentPlaceOfBirthUnknown?: YesOrNo;
    };
    relationshipDetails: {
      relationshipToChildren: RelationshipToChildren[];
    };
    address: C100Address;
    contactDetails?: {
      donKnowEmailAddress?: YesOrNo
      emailAddress?: string
      telephoneNumber?: string
      donKnowTelephoneNumber?: YesOrNo
    }
    addressUnknown?: YesOrNo;
  };

  export interface RelationshipToChildren {
    relationshipType: RelationshipType;
    otherRelationshipTypeDetails?: string;
    childId: string;
  }

  export const enum RelationshipType {
    MOTHER = 'Mother',
    FATHER = 'Father',
    GUARDIAN = 'Guardian',
    SPECIAL_GUARDIAN = 'Special Guardian',
    GRAND_PARENT = 'Grandparent',
    OTHER = 'Other',
    EMPTY = ''
  }
  
  export interface C100Address extends Address {
    selectedAddress?: number,
    addressHistory?: YesNoDontKnow,
    provideDetailsOfPreviousAddresses?: string
  }


  export enum PartyType {
    CHILDREN = 'children',
    APPLICANT = 'applicant',
    OTHER_CHILDREN = 'otherChildren',
    RESPONDENT = 'respondent',
    OTHER_PERSON = 'otherPerson',
  }

  export type People = {
      id: string;
      firstName: string;
      lastName: string;
      partyType: PartyType;
  }
