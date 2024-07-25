/* eslint-disable @typescript-eslint/no-explicit-any */
import { RAFlags } from '../../modules/reasonable-adjustments/definitions';
import { CitizenApplicationPacks, CitizenDocuments, CitizenOrders } from '../../steps/common/documents/definitions';
import { NotificationID } from '../../steps/common/task-list/components/notification-banner/definitions';
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
  AuthorityLetterEvidence,
  C100Applicant,
  C100DocumentInfo,
  C100OrderTypes,
  C100RebuildPartyDetails,
  C1AAbuseTypes,
  C1ASafteyConcerns,
  C1ASafteyConcernsAbout,
  CaseData,
  CaseInvite,
  CaseStatus,
  Child,
  ChildDetailsExtraTable,
  ChildDetailsTable,
  ChildrenDetails,
  ConfidentialDetails,
  ContactDetails,
  ContactPreference,
  CourtInvolvementEvidence,
  DateOfSubmission,
  Document,
  DocumentResponse,
  DocumentUploadResponse,
  DomesticAbuseExemptions,
  DraftConsentOrderFile,
  ExistingProceedings,
  Fl401UploadWitnessDocuments,
  HearingUrgencyTable,
  HearingsList,
  InternationalElementTable,
  InterpreterNeed,
  ListValue,
  LitigationCapacityTable,
  MiamExemptionsTable,
  MiamNonAttendReason,
  MiamTable,
  OrderInterface,
  OtherChildrenDetails,
  OtherDocuments,
  OtherName,
  OtherPeopleInTheCaseTable,
  OtherProceedingEmptyTable,
  OtherProceedings,
  OtherProceedingsDetailsTable,
  OtherProceedingsForSummaryTab,
  OtherProceedingsTable,
  OthersToNotify,
  PRLDocument,
  PartyDetails,
  PoliceInvolvementEvidence,
  ProceedingsOrderTypes,
  ReasonableAdjustments,
  Respondent,
  RespondentDocs,
  ResponseDocumentList,
  SelectTypeOfOrderEnum,
  SpecialArrangement,
  State,
  SummaryTabForOrderAppliedFor,
  SupportServiceEvidence,
  TypeOfApplicationTable,
  UploadDocumentList,
  UrgencyDetails,
  VictimLetterEvidence,
  WelshLanguageRequirementsTable,
  WelshNeed,
  WithoutNoticeOrderDetails,
  YesNoDontKnow,
  YesOrNo,
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
  hearingCollection: 'hearingCollection',
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
  respondentDocsList: 'respondentDocsList',
  caseInvites: 'caseInvites',
  draftOrderDoc: 'draftOrderDoc',
  c100DraftDoc: 'submitAndPayDownloadApplicationLink',
  isCafcassServed: 'soaCafcassServedOptions',
  isCafcassCymruServed: 'soaCafcassCymruServedOptions',
  applicantDocuments: 'applicantDocuments',
  respondentDocuments: 'respondentDocuments',
  citizenOtherDocuments: 'citizenOtherDocuments',
  citizenOrders: 'citizenOrders',
  citizenApplicationPacks: 'citizenApplicationPacks',
  finalServedApplicationDetailsList: 'finalServedApplicationDetailsList',
  newChildDetails: 'newChildDetails',
  citizenNotifications: 'citizenNotifications',
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
  newChildDetails?: Child[];
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
  /***  Below fields should be with in respondent object.*/
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
  hearingCollection?: HearingsList[];
  documentsGenerated?: ListValue<PRLDocument>[];
  yourchildconcernsstart?: YesOrNo;
  cameoutofallegationsharmwithNo?: boolean;
  //applicant1CannotUploadDocuments?: DocumentType[];
  hasCourtAskedForThisDoc?: YesOrNo;
  reasonForDocumentCantBeShared?: string;
  haveReasonForDocNotToBeShared?: YesOrNo;
  reasonsToNotSeeTheDocument?: string[];
  reasonsToRestrictDocument?: string;
  documentText?: string;
  applicantUploadFiles?: DocumentUploadResponse['document'][];
  declarationCheck?: string;
  finalDocument?: Document;
  fl401UploadWitnessDocuments?: Fl401UploadWitnessDocuments[];
  citizenUploadedDocumentList?: UploadDocumentList[];
  /*** Document upload */
  respondentUploadFiles?: DocumentUploadResponse['document'][];
  proceedingsCourtCase?: string;
  proceedingsStart?: YesOrNo;
  proceedingsCourtOrder?: string;
  proceedingsStartOrder?: YesOrNo;
  courtProceedingsInvolved?: string;
  supervisionOrderOption?: YesOrNo;
  supervisionOrder?: OrderInterface;
  emergencyOrderOptions?: YesOrNo;
  emergencyOrder?: OrderInterface;
  careOrderOptions?: YesOrNo;
  careOrder?: OrderInterface;
  childAbductionOrderOption?: YesOrNo;
  childAbductionOrder?: OrderInterface;
  caOrderOption?: YesOrNo;
  caOrder?: OrderInterface;
  financialOrderOption?: YesOrNo;
  financialOrder?: OrderInterface;
  nonmolestationOrderOption?: YesOrNo;
  nonmolestationOrder?: OrderInterface;
  occupationalOrderOptions?: YesOrNo;
  occupationOrder?: OrderInterface;
  marraigeOrderOptions?: YesOrNo;
  marraigeOrder?: OrderInterface;
  restrainingOrderOptions?: YesOrNo;
  restrainingOrder?: OrderInterface;
  injuctiveOrderOptions?: YesOrNo;
  injuctiveOrder?: OrderInterface;
  underTakingOrderOptions?: YesOrNo;
  underTakingOrder?: OrderInterface;

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
  languageDetails?: string;
  helpCommunication?: string[];
  describeOtherNeed?: string;
  safetyArrangements?: string[];
  safetyArrangementsDetails?: string;
  travellingOtherDetails?: string;
  unableForCourtProceedings?: YesOrNo;
  courtProceedingProvideDetails?: string;

  //CA-DA-Respondent
  attendingToCourt?: string[];
  respondentConcernedonChildAbout?: string;
  ConcernedonSelfAbout?: string;
  hearingDetails?: string;
  languageRequirements?: string[];
  reasonableAdjustments?: string[];
  docsSupport?: string[];
  docsDetails?: string;
  largePrintDetails?: string;
  otherDetails?: string;
  signLanguageDetails?: string;
  courtHearing?: string[];
  supportWorkerDetails?: string;
  familyProviderDetails?: string;
  therapyDetails?: string;
  communicationSupportOther?: string;
  courtComfort?: string[];
  lightingProvideDetails?: string;
  otherProvideDetails?: string;
  travellingToCourt?: string[];
  parkingDetails?: string;
  differentChairDetails?: string;
  //applicant1LanguagePreference?: LanguagePreference;

  safetyConcerns?: string;

  citizenRole?: FieldPrefix;
  orderWithoutGivingNoticeToRespondent?: WithoutNoticeOrderDetails;
  legalRepresentation?: YesOrNo;

  courtProceedingsOrders?: ProceedingsOrderTypes[];
  otherProceedings?: OtherProceedings;
  doesOrderClosesCase?: YesOrNo;
  selectTypeOfOrder?: SelectTypeOfOrderEnum;
  citizenResponseC7DocumentList?: ResponseDocumentList[];
  respondentDocsList?: RespondentDocs[];
  reasonableAdjustmentsPages?: ReasonableAdjustments[];
  respondentDocsSupportPage?: string[];
  respondentHelpCommunicationPage?: string[];
  respondentCourtHearingPage?: string[];
  respondentCourtComfortPage?: string[];
  respondentTravellingToCourtPage?: string[];
  //selectedPageUrls: Array<PageLink>;
  //C100 Rebuild
  contactDetailsPrivateAlternative?: string;
  c100ApplicationFees?: string;
  hwf_needHelpWithFees?: YesOrNo;
  hwf_feesAppliedDetails?: YesOrNo;
  caseId?: string;
  op_courtProceedingsOrders?: C100OrderTypes[];
  op_otherProceedings?: OtherProceedings;
  miam_otherProceedings?: string;
  miam_haveDocSigned?: string;
  miam_consent?: string;
  miam_attendance?: YesOrNo;
  miam_validReason?: YesOrNo;
  miam_certificate?: C100DocumentInfo;
  miam_mediatorDocument?: YesOrNo;
  miam_nonAttendanceReasons?: MiamNonAttendReason[];
  miam_domesticAbuse?: DomesticAbuseExemptions[];
  miam_domesticAbuse_policeInvolvement_subfields?: PoliceInvolvementEvidence[];
  miam_domesticAbuse_courtInvolvement_subfields?: CourtInvolvementEvidence[];
  miam_domesticAbuse_letterOfBeingVictim_subfields?: VictimLetterEvidence[];
  miam_domesticAbuse_letterFromAuthority_subfields?: AuthorityLetterEvidence[];
  miam_domesticAbuse_letterFromSupportService_subfields?: SupportServiceEvidence[];
  miam_canProvideDomesticAbuseEvidence?: YesOrNo;
  miam_detailsOfDomesticAbuseEvidence?: string;
  miam_domesticAbuseEvidenceDocs?: DocumentResponse[];
  miam_notAttendingReasons?: Miam_notAttendingReasons;
  miam_noMediatorReasons?: Miam_noMediatorReasons;
  miam_urgency?: Miam_urgency;
  miam_previousAttendance?: Miam_previousAttendance;
  miam_previousAttendanceEvidenceDoc?: DocumentResponse;
  miam_haveDocSignedByMediatorForPrevAttendance?: YesOrNo;
  miam_detailsOfEvidence?: string;
  miam_childProtectionEvidence?: Miam_childProtectionEvidence;
  hu_urgentHearingReasons?: YesOrNo;
  cd_children?: ChildrenDetails[];
  ocd_otherChildren?: OtherChildrenDetails[];
  ocd_hasOtherChildren?: YesOrNo;
  sq_writtenAgreement?: string;
  sq_legalRepresentation?: YesOrNo;
  sq_legalRepresentationApplication?: YesOrNo;
  sq_courtPermissionRequired?: YesOrNo;

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
  createdDate?: string;
  applicantName?: string;
  lastModifiedDate?: string;
  c100RebuildReturnUrl?: string;
  noOfDaysRemainingToSubmitCase?: string;
  partyContactPreference?: ContactPreference | null;
  draftOrderDoc?: Document;
  c100DraftDoc?: Document;
  withdrawApplication?: YesOrNo;
  withdrawApplicationReason?: string;
  isCafcassServed?: YesOrNo | null;
  isCafcassCymruServed?: YesOrNo | null;
  applicantDocuments?: CitizenDocuments[];
  respondentDocuments?: CitizenDocuments[];
  citizenOtherDocuments?: CitizenDocuments[];
  citizenOrders?: CitizenOrders[];
  citizenApplicationPacks?: CitizenApplicationPacks[];
  // RA local component
  ra_typeOfHearing?: string[];
  ra_noVideoAndPhoneHearing_subfield?: string;
  ra_specialArrangements?: string[];
  ra_specialArrangementsOther_subfield?: string;
  ra_languageNeeds?: string[];
  ra_needInterpreterInCertainLanguage_subfield?: string;
  ra_documentInformation?: string[];
  ra_disabilityRequirements?: string[];
  ra_specifiedColorDocuments_subfield?: string;
  ra_largePrintDocuments_subfield?: string;
  ra_documentHelpOther_subfield?: string;
  ra_communicationHelp?: string[];
  ra_signLanguageInterpreter_subfield?: string;
  ra_communicationHelpOther_subfield?: string;
  ra_supportCourt?: string[];
  ra_supportWorkerCarer_subfield?: string;
  ra_friendFamilyMember_subfield?: string;
  ra_therapyAnimal_subfield?: string;
  ra_supportCourtOther_subfield?: string;
  ra_feelComportable?: string[];
  ra_appropriateLighting_subfield?: string;
  ra_feelComportableOther_subfield?: string;
  ra_travellingCourt?: string[];
  ra_parkingSpace_subfield?: string;
  ra_differentTypeChair_subfield?: string;
  ra_travellingCourtOther_subfield?: string;
  ra_languageReqAndSpecialArrangements?: string;
  ra_existingFlags?: RAFlags;
  finalServedApplicationDetailsList?: ServedApplicationDetails[];
  wishToRespond?: YesOrNo;
  your_response_to_aoh?: string;
  aoh_wishToRespond?: YesOrNo;
  aoh_responseToAllegations?: string;
  miam_noAppointmentAvailableDetails?: string;
  miam_unableToAttainDueToDisablityDetails?: string;
  miam_noMediatorIn15mileDetails?: string;
  //AOH fields
  c1A_safteyConcerns?: C1ASafteyConcerns;
  c1A_safetyConernAbout?: C1ASafteyConcernsAbout[];
  c1A_haveSafetyConcerns?: YesOrNo;
  c1A_abductionReasonOutsideUk?: string;
  c1A_childsCurrentLocation?: string;
  c1A_childrenMoreThanOnePassport?: YesOrNo;
  c1A_possessionChildrenPassport?: string[];
  c1A_provideOtherDetails?: string;
  c1A_passportOffice?: YesOrNo;
  c1A_abductionPassportOfficeNotified?: YesOrNo;
  c1A_previousAbductionsShortDesc?: string;
  c1A_policeOrInvestigatorInvolved?: YesOrNo;
  c1A_policeOrInvestigatorOtherDetails?: string;
  c1A_otherConcernsDrugs?: YesOrNo;
  c1A_otherConcernsDrugsDetails?: string;
  c1A_childSafetyConcerns?: YesOrNo;
  c1A_childSafetyConcernsDetails?: string;
  c1A_keepingSafeStatement?: string;
  c1A_supervisionAgreementDetails?: string;
  c1A_agreementOtherWaysDetails?: YesOrNo;
  c1A_concernAboutApplicant?: C1AAbuseTypes[];
  c1A_concernAboutRespondent?: C1AAbuseTypes[];
  c1A_concernAboutChild?: C1AAbuseTypes[];
  c1A_childAbductedBefore?: YesOrNo;
  citizenNotifications?: CitizenNotification[];
  sos_respondentsServed?: string[];
  sos_respondentsServedDate?: CaseDate;
  sos_document?: Document;
}

export interface CitizenNotification {
  id: NotificationID;
  show: boolean;
  new: boolean;
  final: boolean;
  multiple: boolean;
  personalService?: boolean;
}

export enum Miam_notAttendingReasons {
  applyingForWithoutNoticeHearing = 'applyingForWithoutNoticeHearing',
  under18 = 'under18',
  canNotAccessMediator = 'canNotAccessMediator',
  none = 'none',
}
export enum Miam_noMediatorReasons {
  noAppointmentAvailable = 'noAppointmentAvailable',
  disability = 'disability',
  noMediatorIn15mile = 'noMediatorIn15mile',
  inPrison = 'inPrison',
  bailThatPreventContact = 'bailThatPreventContact',
  releaseFromPrisonOnLicence = 'releaseFromPrisonOnLicence',
  none = 'none',
}

export enum Miam_previousAttendance {
  fourMonthsPriorAttended = 'fourMonthsPriorAttended',
  miamExamptionApplied = 'miamExamptionApplied',
  none = 'none',
}
export enum Miam_urgency {
  freedomPhysicalSafety = 'freedomPhysicalSafety',
  freedomPhysicalSafetyInFamily = 'freedomPhysicalSafetyInFamily',
  riskSafetyInHome = 'riskSafetyInHome',
  riskOfHarmToChildren = 'riskOfHarmToChildren',
  unlawfullyRemovedFromUK = 'unlawfullyRemovedFromUK',
  riskOfUnfairCourtDecision = 'riskOfUnfairCourtDecision',
  riskUnreasonableFinancialHardship = 'riskUnreasonableFinancialHardship',
  riskOfIrretrievableProblems = 'riskOfIrretrievableProblems',
  riskOfCourtProceedingsDispute = 'riskOfCourtProceedingsDispute',
  none = 'none',
}
export enum Miam_childProtectionEvidence {
  localAuthority = 'localAuthority',
  childProtectionPlan = 'childProtectionPlan',
  none = 'none',
}
export interface ServedApplicationDetails {
  id: string;
  value: ServedApplication;
}
export type ServedApplication = {
  emailNotificationDetails: EmailNotificationDetails[] | [];
  whoIsResponsible: string;
};
export interface EmailNotificationDetails {
  id: string;
  value: emailNotification;
}
export type emailNotification = {
  servedParty: string;
};

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
  applicationPayOnline?: YesOrNo;
  legalRepresentativeForProceedings?: YesOrNo;
  legalRepresentativeForApplication?: YesOrNo;
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
export interface HearingData {
  hmctsServiceCode: string;
  caseRef: string;
  caseHearings: HearingsList[];
  courtTypeId: string;
  courtName: string;
}
export interface StatementOfServiceRequest {
  partiesServedDate: string;
  partiesServed: string[];
  citizenSosDocs: Document;
  isOrder: YesOrNo;
}
