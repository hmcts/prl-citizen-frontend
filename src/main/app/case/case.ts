import { AnyObject } from '../controller/PostController';

import {
  Adoption,
  AdoptionAgencyOrLocalAuthority,
  ApplicationType,
  ApplyingWith,
  CaseData,
  ContactDetails,
  DateAsString,
  DivorceDocument,
  DocumentType,
  Gender,
  JurisdictionConnections,
  ListValue,
  Nationality,
  OrderSummary,
  OtherName,
  Payment,
  PlacementOrder,
  Sibling,
  State,
  YesNoNotsure,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  serviceType: 'serviceType',
  applicationType: 'applicationType',
  dateChildMovedIn: 'dateChildMovedIn',
  applyingWith: 'applyingWith',
  applyingWithAdoption: 'applyingWithAdoption',
  applyingWithPrivateLaw: 'applyingWithPrivateLaw',
  applicant1HelpPayingNeeded: 'applicant1HWFNeedHelp',
  applicant1AlreadyAppliedForHelpPaying: 'applicant1HWFAppliedForFees',
  applicant1HelpWithFeesRefNo: 'applicant1HWFReferenceNumber',
  connections: 'jurisdictionConnections',

  applicant1FirstNames: 'applicant1FirstName',
  applicant1LastNames: 'applicant1LastName',
  applicant1HasOtherNames: 'applicant1HasOtherNames',
  applicant1AdditionalNames: 'applicant1AdditionalNames',
  applicant1DateOfBirth: 'applicant1DateOfBirth',
  applicant1Occupation: 'applicant1Occupation',
  applicant1EmailAddress: 'applicant1EmailAddress',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  applicant1Nationality: 'applicant1Nationality',
  applicant1AdditionalNationalities: 'applicant1AdditionalNationalities',
  applicant1Address1: 'applicant1Address1',
  applicant1Address2: 'applicant1Address2',
  applicant1AddressTown: 'applicant1AddressTown',
  applicant1AddressCounty: 'applicant1AddressCountry',
  applicant1AddressPostcode: 'applicant1AddressPostCode',
  applicant1ContactDetails: 'applicant1ContactDetails',

  applicant2FirstNames: 'applicant2FirstName',
  applicant2LastNames: 'applicant2LastName',
  applicant2HasOtherNames: 'applicant2HasOtherNames',
  applicant2AdditionalNames: 'applicant2AdditionalNames',
  applicant2DateOfBirth: 'applicant2DateOfBirth',
  applicant2Occupation: 'applicant2Occupation',
  applicant2EmailAddress: 'applicant2EmailAddress',
  applicant2PhoneNumber: 'applicant2PhoneNumber',
  applicant2Nationality: 'applicant2Nationality',
  applicant2AdditionalNationalities: 'applicant2AdditionalNationalities',
  applicant2Address1: 'applicant2Address1',
  applicant2Address2: 'applicant2Address2',
  applicant2AddressTown: 'applicant2AddressTown',
  applicant2AddressCounty: 'applicant2AddressCountry',
  applicant2AddressPostcode: 'applicant2AddressPostCode',
  applicant2AddressSameAsApplicant1: 'applicant2AddressSameAsApplicant1',
  applicant2ContactDetails: 'applicant2ContactDetails',

  childrenFirstName: 'childrenFirstName',
  childrenLastName: 'childrenLastName',
  childrenDateOfBirth: 'childrenDateOfBirth',
  childrenNationality: 'childrenNationality',
  childrenAdditionalNationalities: 'childrenAdditionalNationalities',
  childrenFirstNameAfterAdoption: 'childrenFirstNameAfterAdoption',
  childrenLastNameAfterAdoption: 'childrenLastNameAfterAdoption',
  childrenSexAtBirth: 'childrenSexAtBirth',
  addAnotherPlacementOrder: 'addAnotherPlacementOrder',
  placementOrders: 'placementOrders',
  selectedPlacementOrderId: 'selectedPlacementOrderId',

  birthMotherFirstNames: 'birthMotherFirstName',
  birthMotherLastNames: 'birthMotherLastName',
  birthMotherStillAlive: 'birthMotherStillAlive',
  birthMotherNotAliveReason: 'birthMotherNotAliveReason',
  birthMotherNationality: 'birthMotherNationality',
  birthMotherAdditionalNationalities: 'birthMotherOtherNationalities',
  birthMotherOccupation: 'birthMotherOccupation',
  birthMotherAddressKnown: 'birthMotherAddressKnown',
  birthMotherAddress1: 'birthMotherAddress1',
  birthMotherAddress2: 'birthMotherAddress2',
  birthMotherAddress3: 'birthMotherAddress3',
  birthMotherAddressTown: 'birthMotherAddressTown',
  birthMotherAddressCounty: 'birthMotherAddressCounty',
  birthMotherAddressPostcode: 'birthMotherAddressPostCode',
  birthMotherAddressCountry: 'birthMotherAddressCountry',
  birthMotherAddressNotKnownReason: 'birthMotherAddressNotKnownReason',

  birthFatherNameOnCertificate: 'birthFatherNameOnCertificate',
  birthFatherFirstNames: 'birthFatherFirstName',
  birthFatherLastNames: 'birthFatherLastName',
  birthFatherStillAlive: 'birthFatherStillAlive',
  birthFatherUnsureAliveReason: 'birthFatherNotAliveReason',
  birthFatherNationality: 'birthFatherNationality',
  birthFatherAdditionalNationalities: 'birthFatherOtherNationalities',
  birthFatherOccupation: 'birthFatherOccupation',
  birthFatherAddressKnown: 'birthFatherAddressKnown',
  birthFatherAddress1: 'birthFatherAddress1',
  birthFatherAddress2: 'birthFatherAddress2',
  birthFatherAddress3: 'birthFatherAddress3',
  birthFatherAddressTown: 'birthFatherAddressTown',
  birthFatherAddressCounty: 'birthFatherAddressCounty',
  birthFatherAddressPostcode: 'birthFatherAddressPostCode',
  birthFatherAddressCountry: 'birthFatherAddressCountry',
  birthFatherAddressNotKnownReason: 'birthFatherAddressNotKnownReason',

  otherParentFirstNames: 'otherParentFirstName',
  otherParentLastNames: 'otherParentLastName',
  otherParentExists: 'otherParentStillAlive',
  otherParentAddress1: 'otherParentAddress1',
  otherParentAddress2: 'otherParentAddress2',
  otherParentAddress3: 'otherParentAddress3',
  otherParentAddressTown: 'otherParentAddressTown',
  otherParentAddressCounty: 'otherParentAddressCounty',
  otherParentAddressPostcode: 'otherParentAddressPostCode',
  otherParentAddressCountry: 'otherParentAddressCountry',
  otherParentAddressKnown: 'otherParentAddressKnown',
  otherParentAddressNotKnownReason: 'otherParentAddressNotKnownReason',

  socialWorkerName: 'socialWorkerName',
  socialWorkerPhoneNumber: 'socialWorkerPhoneNumber',
  socialWorkerEmail: 'socialWorkerEmail',
  socialWorkerTeamEmail: 'socialWorkerTeamEmail',
  solicitorFirm: 'solicitorFirm',
  solicitorName: 'solicitorName',
  solicitorPhoneNumber: 'solicitorPhoneNumber',
  solicitorEmail: 'solicitorEmail',
  solicitorHelpingWithApplication: 'solicitorHelpingWithApplication',
  adopAgencyOrLAs: 'adopAgencyOrLAs',
  siblings: 'siblings',
  payments: 'applicationPayments',

  applicant1IBelieveApplicationIsTrue: 'applicant1StatementOfTruth',
  applicant2IBelieveApplicationIsTrue: 'applicant2StatementOfTruth',
  applicant1SotFullName: 'applicant1SotFullName',
  applicant2SotFullName: 'applicant2SotFullName',
  pcqId: 'pcqId',

  hasAnotherAdopAgencyOrLA: 'hasAnotherAdopAgencyOrLA',
  selectedAdoptionAgencyId: 'selectedAdoptionAgencyId',
  hasSiblings: 'hasSiblings',
  hasSiblingNotSureReason: 'hasSiblingNotSureReason',
  hasPoForSiblings: 'hasPoForSiblings',
  hasPoForSiblingsNotSureReason: 'hasPoForSiblingsNotSureReason',
  addAnotherSiblingPlacementOrder: 'addAnotherSiblingPlacementOrder',
  selectedSiblingId: 'selectedSiblingId',
  selectedSiblingPoId: 'selectedSiblingPoId',

  applyForFinancialOrder: 'applicant1FinancialOrder',
  applicant1DocumentsUploaded: 'applicant1DocumentsUploaded',
  applicant2DocumentsUploaded: 'applicant2DocumentsUploaded',
  documentsGenerated: 'documentsGenerated',
  applicationFeeOrderSummary: 'applicationFeeOrderSummary',
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
  applyingWith?: ApplyingWith;
  applyingWithAdoption?: string;
  applyingWithPrivateLaw?: string;
  dateChildMovedIn?: CaseDate;
  serviceType?: string;
  adoptionApplicationType?: string;

  /***** Applicant1 *****/
  applicant1FirstNames?: string;
  applicant1LastNames?: string;
  applicant1HasOtherNames?: YesOrNo;
  applicant1AdditionalName?: string;
  applicant1AdditionalNames?: OtherName[];
  applicant1EmailAddress?: string;
  applicant1PhoneNumber?: string;
  applicant1DateOfBirth?: CaseDate;
  applicant1Occupation?: string;
  applicant1Nationality?: Nationality[];
  applicant1AdditionalNationalities?: string[];
  applicant1SelectAddress?: string;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1ContactDetails?: ContactDetails[];
  emailAddressConsent?: string;
  homePhoneNumber?: string;
  mobilePhoneNumber?: string;
  emailAddress?: string;

  /***** Applicant2 *****/
  applicant2FirstNames?: string;
  applicant2LastNames?: string;
  applicant2HasOtherNames?: YesOrNo;
  applicant2AdditionalName?: string;
  applicant2AdditionalNames?: OtherName[];
  applicant2DateOfBirth?: CaseDate;
  applicant2Occupation?: string;
  applicant2EmailAddress?: string;
  applicant2PhoneNumber?: string;
  applicant2Nationality?: Nationality[];
  applicant2AdditionalNationalities?: string[];
  applicant2AddressSameAsApplicant1?: YesOrNo;
  applicant2SelectAddress?: string;
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2AddressTown?: string;
  applicant2AddressCounty?: string;
  applicant2AddressPostcode?: string;
  applicant2ContactDetails?: ContactDetails[];

  /***** Children *****/
  childrenFirstName?: string;
  childrenLastName?: string;
  childrenDateOfBirth?: CaseDate;
  childrenNationality?: Nationality[];
  childrenAdditionalNationalities?: string[];
  childrenFirstNameAfterAdoption?: string;
  childrenLastNameAfterAdoption?: string;
  childrenSexAtBirth?: Gender;
  addAnotherPlacementOrder?: YesOrNo;
  placementOrders?: PlacementOrder[];
  selectedPlacementOrderId?: string;

  /***** Birth mother *****/
  birthMotherFirstNames?: string;
  birthMotherLastNames?: string;
  birthMotherStillAlive?: YesNoNotsure;
  birthMotherNotAliveReason?: string;
  birthMotherNationality?: string[];
  birthMotherAdditionalNationalities?: string[];
  birthMotherOccupation?: string;
  birthMotherAddressKnown?: YesOrNo;
  birthMotherSelectAddress?: string;
  birthMotherAddress1?: string;
  birthMotherAddress2?: string;
  birthMotherAddress3?: string;
  birthMotherAddressTown?: string;
  birthMotherAddressCounty?: string;
  birthMotherAddressPostcode?: string;
  birthMotherAddressCountry?: string;
  birthMotherAddressNotKnownReason?: string;

  /***** Birth Father *****/
  birthFatherNameOnCertificate?: string;
  birthFatherFirstNames?: string;
  birthFatherLastNames?: string;
  birthFatherStillAlive?: string;
  birthFatherUnsureAliveReason?: string;
  birthFatherNationality?: string[];
  birthFatherAdditionalNationalities?: string[];
  birthFatherOccupation?: string;
  birthFatherAddressKnown?: YesOrNo;
  birthFatherSelectAddress?: string;
  birthFatherAddress1?: string;
  birthFatherAddress2?: string;
  birthFatherAddress3?: string;
  birthFatherAddressTown?: string;
  birthFatherAddressCounty?: string;
  birthFatherAddressPostcode?: string;
  birthFatherAddressCountry?: string;
  birthFatherAddressNotKnownReason?: string;

  /***** Other Parent *****/
  otherParentFirstNames?: string;
  otherParentLastNames?: string;
  otherParentExists?: YesOrNo;
  otherParentSelectAddress?: string;
  otherParentAddress1?: string;
  otherParentAddress2?: string;
  otherParentAddress3?: string;
  otherParentAddressTown?: string;
  otherParentAddressCounty?: string;
  otherParentAddressPostcode?: string;
  otherParentAddressCountry?: string;
  otherParentAddressKnown?: YesOrNo;
  otherParentAddressNotKnownReason?: string;

  /***** Adoption Agency, Social Worker and Solicitor *****/
  adopAgencyOrLAs?: AdoptionAgencyOrLocalAuthority[];
  hasAnotherAdopAgencyOrLA?: YesOrNo;
  selectedAdoptionAgencyId?: string;
  socialWorkerName?: string;
  socialWorkerPhoneNumber?: string;
  socialWorkerEmail?: string;
  socialWorkerTeamEmail?: string;
  solicitorFirm?: string;
  solicitorName?: string;
  solicitorPhoneNumber?: string;
  solicitorEmail?: string;
  solicitorHelpingWithApplication?: YesOrNo;

  /***** Sibling *****/
  siblings?: Sibling[];
  hasSiblings?: YesNoNotsure;
  hasSiblingNotSureReason?: string;
  hasPoForSiblings?: YesNoNotsure;
  hasPoForSiblingsNotSureReason?: string;
  addAnotherSiblingPlacementOrder?: YesOrNo;
  selectedSiblingId?: string;
  selectedSiblingPoId?: string;
  addAnotherSibling?: YesOrNo;

  /***** Statement of truth *****/
  applicant1IBelieveApplicationIsTrue?: Checkbox;
  applicant2IBelieveApplicationIsTrue?: Checkbox;
  applicant1SotFullName?: string;
  applicant2SotFullName?: string;
  pcqId?: string;

  /***** Common across different type of users *****/
  addButton?: string;
  addAnotherNationality?: string;
  addAnotherNameHidden?: string;
  applicationType?: ApplicationType;
  payments?: ListValue<Payment>[];

  adoption?: Adoption;

  applicant1HelpPayingNeeded?: YesOrNo;
  applicant1AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant1HelpWithFeesRefNo?: string;
  jurisdictionResidualEligible?: Checkbox;
  connections?: JurisdictionConnections[];

  applyForFinancialOrder?: YesOrNo;
  applicant1UploadedFiles?: UploadedFile[];
  applicant2UploadedFiles?: UploadedFile[];
  documentsGenerated?: ListValue<DivorceDocument>[];
  applicant1DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant2DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant1CannotUpload?: Checkbox;
  applicant2CannotUpload?: Checkbox;
  applicant1CannotUploadDocuments?: DocumentType | DocumentType[];
  applicant2CannotUploadDocuments?: DocumentType | DocumentType[];
  dueDate?: DateAsString;
  caseReference?: string;
  dateSubmitted?: Date;
  applicationFeeOrderSummary?: OrderSummary;
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
}
