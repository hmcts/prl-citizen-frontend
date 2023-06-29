import { CaseWithId } from '../../../main/app/case/case';
import { YesNoNotsure, YesOrNo } from '../../../main/app/case/definition';

export default {
  dateChildMovedIn: { day: 12, month: 10, year: '2020' },
  adopAgencyOrLAs: [
    {
      adopAgencyOrLaId: 'MOCK_ID_1',
      adopAgencyOrLaName: 'MOCK_AGENCY_NAME_1',
      adopAgencyOrLaPhoneNumber: '01234567890',
      adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME_1',
      adopAgencyOrLaContactEmail: 'contact1@email.com',
    },
    {
      adopAgencyOrLaId: 'MOCK_ID_2',
      adopAgencyOrLaName: 'MOCK_AGENCY_NAME_2',
      adopAgencyOrLaPhoneNumber: '01234567891',
      adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME_2',
      adopAgencyOrLaContactEmail: 'contact2@email.com',
    },
  ],

  socialWorkerName: 'MOCK_SOCIAL_WORKER_NAME',
  socialWorkerPhoneNumber: '01234567892',
  socialWorkerEmail: 'socialworker@email.com',
  socialWorkerTeamEmail: 'socialworkerteam@email.com',
  hasAnotherAdopAgencyOrLA: YesOrNo.YES,

  citizenUserFirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
  citizenUserLastNames: 'MOCK_APPLICANT1_LAST_NAMES',
  applicant1HasOtherNames: YesOrNo.YES,
  applicant1AdditionalNames: [{ firstNames: 'MOCK_ADDITIONAL_FIRST_NAMES', lastNames: 'MOCK_ADDITIONAL_LAST_NAMES' }],
  citizenUserEmailAddress: 'applicant1@email.com',
  applicantSafeCallTime: '10:30',
  citizenUserPhoneNumber: '01234567893',
  applicant1ContactDetailsConsent: YesOrNo.YES,
  citizenUserDateOfBirth: { day: '1', month: '4', year: '1990' },
  applicant1Occupation: 'MOCK_OCCUPATION',
  citizenUserAddress1: 'MOCK_ADDRESS_LINE_1',
  citizenUserAddressTown: 'MOCK_ADDRESS_TOWN',
  citizenUserAddressCounty: 'MOCK_ADDRESS_COUNTY',
  citizenUserAddressPostcode: 'MOCK_ADDRESS_POSTCODE',

  applicant2FirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
  applicant2LastNames: 'MOCK_APPLICANT1_LAST_NAMES',
  applicant2HasOtherNames: YesOrNo.NO,
  applicant2EmailAddress: 'applicant2@email.com',
  applicant2PhoneNumber: '01234567894',
  applicant2ContactDetailsConsent: YesOrNo.YES,
  applicant2DateOfBirth: { day: '3', month: '6', year: '1992' },
  applicant2Occupation: 'MOCK_OCCUPATION',
  applicant2Address1: 'MOCK_ADDRESS_LINE_1',
  applicant2AddressTown: 'MOCK_ADDRESS_TOWN',
  applicant2AddressCounty: 'MOCK_ADDRESS_COUNTY',
  applicant2AddressPostcode: 'MOCK_ADDRESS_POSTCODE',

  childrenFirstName: 'CHILDREN_FIRST_NAMES',
  childrenLastName: 'CHILDREN_LAST_NAMES',
  childrenDateOfBirth: { day: 9, month: 8, year: 2020 },

  childrenAdditionalNationalities: ['MOCK_COUNTRY'],
  childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME_AFTER_ADOPTION',
  childrenLastNameAfterAdoption: 'MOCK_LAST_NAME_AFTER_ADOPTION',
  placementOrders: [
    {
      placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
      placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
      placementOrderCourt: 'MOCK_PLACEMENT_ORDER_COURT',
      placementOrderDate: { day: 12, month: 11, year: 2020 },
    },
    {
      placementOrderId: 'MOCK_PLACEMENT_ORDER_ID2',
      placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE2',
      placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER2',
      placementOrderCourt: 'MOCK_PLACEMENT_ORDER_COURT2',
      placementOrderDate: { day: 10, month: 11, year: 2020 },
    },
  ],
  addAnotherPlacementOrder: YesOrNo.NO,

  birthMotherFirstNames: 'BIRTH_MOTHER_FIRST_NAMES',
  birthMotherLastNames: 'BIRTH_MOTHER_LAST_NAMES',
  birthMotherStillAlive: YesNoNotsure.YES,

  birthMotherAdditionalNationalities: ['MOCK_COUNTRY'],
  birthMotherOccupation: 'MOCK_OCCUPATION',
  birthMotherAddressKnown: YesOrNo.YES,
  birthMotherAddress1: 'MOCK_ADDRESS_LINE1',
  birthMotherAddress2: 'MOCK_ADDRESS_LINE2',
  birthMotherAddress3: 'MOCK_ADDRESS_LINE3',
  birthMotherAddressTown: 'MOCK_ADDRESS_TOWN',
  birthMotherAddressCounty: 'MOCK_ADDRESS_COUNTY',
  birthMotherAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  birthMotherAddressCountry: 'MOCK_ADDRESS_COUNTRY',

  birthFatherNameOnCertificate: YesOrNo.YES,
  birthFatherFirstNames: 'BIRTH_FATHER_FIRST_NAMES',
  birthFatherLastNames: 'BIRTH_FATHER_LAST_NAMES',
  birthFatherStillAlive: YesNoNotsure.YES,

  birthFatherOccupation: 'MOCK_OCCUPATION',
  birthFatherAddressKnown: YesOrNo.YES,
  birthFatherAddress1: 'MOCK_ADDRESS_LINE1',
  birthFatherAddressTown: 'MOCK_ADDRESS_TOWN',
  birthFatherAddressCounty: 'MOCK_ADDRESS_COUNTY',
  birthFatherAddressPostcode: 'MOCK_ADDRESS_POSTCODE',

  otherParentFirstNames: 'MOCK_OTHER_PARENT_FIRST_NAME',
  otherParentLastNames: 'MOCK_OTHER_PARENT_FIRST_NAME',
  otherParentExists: YesOrNo.YES,
  otherParentAddress1: 'MOCK_ADDRESS_1',
  otherParentAddressTown: 'MOCK_ADDRESS_TOWN',
  otherParentAddressCounty: 'MOCK_ADDRESS_COUNTY',
  otherParentAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  otherParentAddressCountry: 'MOCK_ADDRESS_COUNTRY',
  otherParentAddressKnown: YesOrNo.YES,
  miamStart: 'Yes',
  applicationReceivedDate: { day: 11, month: 3, year: 2022 },
  invalidApplicationReceivedDate: '11 March 2022',
  hasSiblings: YesNoNotsure.YES,
  hasPoForSiblings: YesNoNotsure.YES,
  siblings: [
    {
      siblingId: 'MOCK_SIBLING_ID',
      siblingFirstName: 'MOCK_SIBLING_FIRST_NAME',
      siblingLastNames: 'MOCK_SIBLING_LAST_NAMES',
      siblingPlacementOrders: [
        {
          placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
          placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
        },
      ],
    },
  ],
  findFamilyCourt: YesOrNo.NO,
  familyCourtName: 'MOCK_FAMILY_COURT',
  applicant1UploadedFiles: [{ id: 'MOCK_DOCUMENT_ID', name: 'MOCK_DOCUMENT_FILE_NAME' }],
  applicant1DocumentsUploaded: [{ id: 'MOCK_DOCUMENT_ID', value: { documentFileName: 'MOCK_DOCUMENT_FILE_NAME' } }],
  orderCollection: [],
  respondentsFL401: {
    firstName: 'test',
    lastName: 'test',
  },
  applicantsFL401: {
    firstName: 'test',
    lastName: 'test',
  },
  applicants: [
    {
      id: '1234',
      value: {
        user: {
          idamId: '0000-0000-0000-0000',
        },
        response: {
          citizenFlags: {},
        },
      },
    },
  ],
  id: '1234',
} as unknown as CaseWithId;
