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
  ResponseDocumentList,
  SelectTypeOfOrderEnum,
  SpecialArrangement,
  State,
  SummaryTabForOrderAppliedFor,
  TypeOfApplicationTable,
  UploadDocumentList,
  UrgencyDetails,
  WelshLanguageRequirementsTable,
  WelshNeed,
  WithoutNoticeOrderDetails,
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
  OtherChildrenDetails,
  C100RebuildPartyDetails,
  C100Applicant,
  PRL_C1ASafteyConcernsAbout,
  PRL_C1ASafteyConcerns,
  PRL_C1AAbuseTypes,
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
  citizenUserSafeToCall: 'citizenUserSafeToCall',
  citizenUserPhoneNumber: 'citizenUserPhoneNumber',
  citizenUserPlaceOfBirth: 'citizenUserPlaceOfBirth',
  // citizenUserAddress1: 'citizenUserAddress1',
  // citizenUserAddress2: 'citizenUserAddress2',
  // citizenUserAddressTown: 'citizenUserAddressTown',
  // citizenUserAddressCounty: 'applicant1AddressCountry',
  // citizenUserAddressPostcode: 'applicant1AddressPostCode',
  applicant1ContactDetails: 'applicant1ContactDetails',
  applicant1ContactDetailsConsent: 'applicant1ContactDetailsConsent',
  //applicant1LanguagePreference: 'applicant1LanguagePreference',
  citizenRole: 'citizenRole',
  miamStart: 'miamStart',
  orderWithoutGivingNoticeToRespondent: 'orderWithoutGivingNoticeToRespondent',
  start: 'start',
  iFactorsStartProvideDetails: 'iFactorsStartProvideDetails',
  parents: 'parents',
  iFactorsParentsProvideDetails: 'iFactorsParentsProvideDetails',
  jurisdiction: 'jurisdiction',
  iFactorsJurisdictionProvideDetails: 'iFactorsJurisdictionProvideDetails',
  request: 'request',
  iFactorsRequestProvideDetails: 'iFactorsRequestProvideDetails',
  doesOrderClosesCase: 'doesOrderClosesCase',
  selectTypeOfOrder: 'selectTypeOfOrder',
  citizenResponseC7DocumentList: 'citizenResponseC7DocumentList',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};
  for (const field of Object.keys(data as Record<string, any>)) {
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
  yourchildconcernsstart?: YesOrNo;
  cameoutofallegationsharmwithNo?: boolean;
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
  citizenUserSafeToCall?: string;
  citizenUserPhoneNumber?: string;
  citizenUserPhoneNumberText?: string;
  citizenUserDateOfBirth?: CaseDate;
  citizenUserDateOfBirthText?: string;
  applicant1Occupation?: string;
  citizenUserSelectAddress?: string;
  citizenUserPlaceOfBirth?: string;
  citizenUserPlaceOfBirthText?: string;
  citizenUserAddress1?: string;
  citizenUserAddress2?: string;
  citizenUserAddressTown?: string;
  citizenUserAddressCounty?: string;
  citizenUserAddressPostcode?: string;
  citizenUserAddressText?: string;
  citizenUserAddressHistory?: string;
  isAtAddressLessThan5Years?: string;
  applicant1ContactDetails?: ContactDetails[];
  applicant1ContactDetailsConsent?: YesOrNo;
  citizenUserManualAddress1?: string;
  citizenUserManualAddress2?: string;
  citizenUserManualAddressTown?: string;
  citizenUserManualAddressCounty?: string;
  citizenUserManualAddressPostcode?: string;

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
  respondentConcernedonChildAbout?: string;
  ConcernedonSelfAbout?: string;
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
  //applicant1LanguagePreference?: LanguagePreference;

  safetyConcerns?: string;

  citizenRole?: FieldPrefix;
  orderWithoutGivingNoticeToRespondent?: WithoutNoticeOrderDetails;
  legalRepresentation?: YesOrNo;
  doesOrderClosesCase?: YesOrNo;
  selectTypeOfOrder?: SelectTypeOfOrderEnum;
  citizenResponseC7DocumentList?: ResponseDocumentList[];

  //C100 Rebuild
  contactDetailsPrivateAlternative?: string;
  c100ApplicationFees?: string;
  ra_disabilityRequirements?: string[];
  hwf_needHelpWithFees?: YesOrNo;
  hwf_feesAppliedDetails?: YesOrNo;
  caseId?: string;
  c1A_haveSafetyConcerns?: YesOrNo;
  PRL_c1A_haveSafetyConcerns?: YesOrNo;
  op_courtProceedingsOrders?: C100OrderTypes[];
  op_otherProceedings?: OtherProceedings;
  c1A_safetyConernAbout?: C1ASafteyConcernsAbout[];
  PRL_c1A_safetyConernAbout?: PRL_C1ASafteyConcernsAbout[];
  c1A_safteyConcerns?: C1ASafteyConcerns;
  PRL_c1A_safteyConcerns?: PRL_C1ASafteyConcerns;
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
  cd_children?: ChildrenDetails[];
  ocd_otherChildren?: OtherChildrenDetails[];
  ocd_hasOtherChildren?: YesOrNo;
  sq_writtenAgreement?: string;
  sq_legalRepresentation?: YesOrNo;
  sq_legalRepresentationApplication?: YesOrNo;
  sq_courtPermissionRequired?: YesOrNo;
  c1A_concernAboutChild?: C1AAbuseTypes[];
  PRL_c1A_concernAboutChild?: PRL_C1AAbuseTypes[];
  c1A_concernAboutApplicant?: C1AAbuseTypes[];
  c1A_concernAboutRespondent?: C1AAbuseTypes[];
  PRL_c1A_concernAboutRespondent?: PRL_C1AAbuseTypes[];
  c1A_childAbductedBefore?: YesOrNo;
  co_certificate?: C100DocumentInfo;
  too_courtOrder?: string[];
  too_stopOtherPeopleDoingSomethingSubField?: string[];
  too_resolveSpecificIssueSubField?: string[];
  otherPersonFirstName?: C100RebuildPartyDetails['firstName'];
  otherPersonLastName?: C100RebuildPartyDetails['lastName'];
  oprs_otherPersonCheck?: YesOrNo;
  oprs_otherPersons?: C100RebuildPartyDetails[];
  c100TempFirstName?: string;
  c100TempLastName?: string;
  resp_Respondents?: C100RebuildPartyDetails[];
  appl_allApplicants?: C100Applicant[];
  op_childrenInvolvedCourtCase?: YesOrNo;
  op_courtOrderProtection?: YesOrNo;
  hwn_hearingPart1?: YesOrNo;
  c100RebuildChildPostCode?: string;
  helpWithFeesReferenceNumber?: string;
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
    serviceRequestReference: string;
  };
  id: string;
  state: State;
  applicantTemporaryFormData?: {
    TempFirstName?: string | unknown;
    TempLastName?: string | unknown;
  };
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
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}

export interface UploadedFile {
  id: string;
  name: string;
}
