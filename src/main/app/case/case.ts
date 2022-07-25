/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject } from '../controller/PostController';

import { CaseData, ContactDetails, OtherName, State, YesOrNo } from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  serviceType: 'serviceType',
  claimNumber: 'claimNumber',
  caseCode: 'caseCode',
  respondentFirstName: 'respondentFirstName',
  respondentLastName: 'respondentLastName',
  contactDetailsPrivate: 'contactDetailsPrivate',

  //applicant1FirstNames: 'applicant1FirstName',
  // applicant1LastNames: 'applicant1LastName',
  //applicant1FullName: 'applicant1FullName',
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
  detailsKnown?: string;
  startAlternative?: string;
  contactDetailsPrivate?: string;
  contactDetailsPrivateAlternative?: string;
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

  contactDetailsPrivate?: string;

  /***** Applicant1 *****/
  applicant1FullName?: string;
  applicant1FirstNames?: string;
  applicant1LastNames?: string;
  applicant1HasOtherNames?: YesOrNo;
  applicant1AdditionalName?: string;
  applicant1AdditionalNames?: OtherName[];
  applicant1EmailAddress?: string;
  applicant1PhoneNumber?: string;
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

  //applicant1LanguagePreference?: LanguagePreference;

  safetyConcerns?: string;
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
