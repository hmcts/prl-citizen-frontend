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
  HearingsList,
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
  ProceedingsOrderTypes,
  ReasonableAdjustments,
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
  applicantContactPreferencesEnum,
  RespondentDocs,
  DocumentInfo,
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
  documentText?: string;
  applicantUploadFiles?: UploadedFile[];
  declarationCheck?: string;
  finalDocument?: Document;
  fl401UploadWitnessDocuments?: Fl401UploadWitnessDocuments[];
  citizenUploadedDocumentList?: UploadDocumentList[];
  /*** Document upload */
  respondentUploadFiles?: UploadedFile[];
  proceedingsCourtCase?: string;
  proceedingsStart?: YesOrNo;
  proceedingsCourtOrder?: string;
  proceedingsStartOrder?: YesOrNo;
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
  PRL_c1A_abductionReasonOutsideUk?: string;
  PRL_c1A_childsCurrentLocation?: string;
  PRL_c1A_childrenMoreThanOnePassport?: YesOrNo;
  PRL_c1A_possessionChildrenPassport?: string[];
  PRL_c1A_provideOtherDetails?: string;
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
  PRL_c1A_passportOffice?: YesOrNo;
  PRL_c1A_abductionPassportOfficeNotified?: YesOrNo;
  PRL_c1A_previousAbductionsShortDesc?: string;
  PRL_c1A_policeOrInvestigatorInvolved?: YesOrNo;
  PRL_c1A_policeOrInvestigatorOtherDetails?: string;
  PRL_c1A_childAbductedBefore?: YesOrNo;
  PRL_c1A_otherConcernsDrugs?: YesOrNo;
  PRL_c1A_otherConcernsDrugsDetails?: string;
  PRL_c1A_childSafetyConcerns?: YesOrNo;
  PRL_c1A_childSafetyConcernsDetails?: string;
  PRL_c1A_keepingSafeStatement?: string;
  PRL_c1A_supervisionAgreementDetails?: string;
  PRL_c1A_agreementOtherWaysDetails?: YesOrNo;
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
  createdDate?: string;
  applicantName?: string;
  lastModifiedDate?: string;
  c100RebuildReturnUrl?: string;
  noOfDaysRemainingToSubmitCase?: string;
  applicantPreferredContact?: applicantContactPreferencesEnum;
  draftOrderDoc?: Document;
  withdrawApplication?: YesOrNo;
  withdrawApplicationReason?: string;
  awp_need_hwf?: YesOrNo;
  awp_have_hwfReference?: YesOrNo;
  awp_hwf_referenceNumber?: string;
  awp_completedForm?: YesOrNo;
  awp_agreementForRequest?: YesOrNo;
  awp_informOtherParties?: YesOrNo;
  awp_reasonCantBeInformed?: string;
  awp_uploadedApplicationForms?: DocumentInfo[];
  awpFeeDetails?: Record<string, any>;
  awp_cancelDelayHearing?: string;
  awp_hasSupportingDocuments?: YesOrNo;
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
