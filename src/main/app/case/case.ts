/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject } from '../controller/PostController';

import {
  C100OrderTypes,
  CaseData,
  ContactDetails,
  OtherName,
  OtherProceedings,
  State,
  YesOrNo,
  orderInterface,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  serviceType: 'serviceType',
  claimNumber: 'claimNumber',
  caseCode: 'caseCode',
  respondentFirstName: 'respondentFirstName',
  respondentLastName: 'respondentLastName',
  contactDetailsPrivate: 'contactDetailsPrivate',

  applicant1FirstNames: 'applicant1FirstNames',
  applicant1LastNames: 'applicant1LastNames',
  applicant1FullName: 'applicant1FullName',
  applicant1HasOtherNames: 'applicant1HasOtherNames',
  applicant1AdditionalNames: 'applicant1AdditionalNames',
  applicant1DateOfBirth: 'applicant1DateOfBirth',
  applicant1Occupation: 'applicant1Occupation',
  applicant1EmailAddress: 'applicant1EmailAddress',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  applicant1PlaceOfBirth: 'applicant1PlaceOfBirth',
  applicant1Address1: 'applicant1Address1',
  applicant1Address2: 'applicant1Address2',
  applicant1AddressTown: 'applicant1AddressTown',
  // applicant1AddressCounty: 'applicant1AddressCountry',
  // applicant1AddressPostcode: 'applicant1AddressPostCode',
  applicant1ContactDetails: 'applicant1ContactDetails',
  applicant1ContactDetailsConsent: 'applicant1ContactDetailsConsent',
  //applicant1LanguagePreference: 'applicant1LanguagePreference',
  citizenRole: 'citizenRole',
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
  /***** case code authorization fields *****/
  serviceType: string;
  claimNumber?: string;
  caseCode?: string;
  accessCode?: string;
  detailsKnown?: string;
  miamOtherProceedings?: string;
  miam_haveDocSigned?: string;
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
  //C100 Rebuild
  contactDetailsPrivateAlternative?: string;
  c100ApplicationFees?: string;
  ra_disabilityRequirements?: string[];
  needHelpWithFees?: YesOrNo;
  feesAppliedDetails?: YesOrNo;
  caseId?: string;
  haveSafetyConcerns?: YesOrNo;
  op_courtProceedingsOrders?: C100OrderTypes[];
  op_otherProceedings?: OtherProceedings;
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
