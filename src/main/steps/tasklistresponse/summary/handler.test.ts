//import mockUserCase from "../../../../test/unit/utils/mockUserCase";
import { CaseType, State } from '../../../app/case/definition';

import { populateSummaryData } from './handler';
describe('handler', () => {
  let data;
  beforeEach(() => {
    data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      respondents: [
        {
          id: '1',
          value: {
            email: '',
            gender: 'male',
            address: {
              AddressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
            dxNumber: '123',
            landline: '987654321',
            lastName: 'Smith',
            firstName: 'John',
            dateOfBirth: '',
            otherGender: '',
            phoneNumber: '',
            placeOfBirth: '',
            previousName: '',
            solicitorOrg: {
              OrganisationID: '',
              OrganisationName: '',
            },
            sendSignUpLink: '',
            solicitorEmail: '',
            isAddressUnknown: '',
            solicitorAddress: {
              County: '',
              Country: '',
              PostCode: '',
              PostTown: '',
              AddressLine1: '',
              AddressLine2: '',
              AddressLine3: '',
            },
            isDateOfBirthKnown: '',
            solicitorReference: '',
            solicitorTelephone: '',
            isPlaceOfBirthKnown: '',
            isDateOfBirthUnknown: '',
            isAddressConfidential: '',
            isCurrentAddressKnown: '',
            relationshipToChildren: '',
            representativeLastName: '',
            representativeFirstName: '',
            canYouProvidePhoneNumber: '',
            canYouProvideEmailAddress: '',
            isAtAddressLessThan5Years: '',
            isPhoneNumberConfidential: '',
            isEmailAddressConfidential: '',
            respondentLivedWithApplicant: '',
            doTheyHaveLegalRepresentation: '',
            addressLivedLessThan5YearsDetails: '',
            otherPersonRelationshipToChildren: [''],
            isAtAddressLessThan5YearsWithDontKnow: '',
            response: {},
            user: {
              email: 'abc',
              idamId: '123',
            },
          },
        },
      ],
      caseTypeOfApplication: CaseType.C100,
    };
  });
  test('populateSummaryData is a function', () => {
    populateSummaryData(data, '123');
    expect(typeof populateSummaryData).toBe('function');
  });
  test('Keep detais private', () => {
    data.respondents[0].value.response.keepDetailsPrivate = {
      otherPeopleKnowYourContactDetails: 'Yes',
      confidentiality: 'Yes',
      confidentialityList: ['a', 'b'],
    };
    populateSummaryData(data, '123');
    expect(data.detailsKnown).toEqual('Yes');
    expect(data.startAlternative).toEqual('Yes');
    expect(data.contactDetailsPrivate).toEqual(['a', 'b']);
  });

  test('no address History', () => {
    data.isAtAddressLessThan5Years = 'Yes';
    populateSummaryData(data, '123');

    expect(data.citizenUserAddressHistory).toEqual('');
  });
  test('no address detail', () => {
    data.citizenUserAddress1 = undefined;
    data.citizenUserAddressTown = undefined;
    data.citizenUserAddressPostcode = undefined;
    populateSummaryData(data, '123');

    expect(data.citizenUserAddressText).toEqual('');
  });
  test('address detail', () => {
    data.citizenUserAddress1 = '1';
    data.citizenUserAddress2 = 'road';
    data.citizenUserAddressTown = 'Town';
    data.citizenUserAddressPostcode = '123456';
    populateSummaryData(data, '123');

    expect(data.citizenUserAddressText).toEqual('1 road Town 123456');
  });
  test('no detail', () => {
    data.citizenUserPlaceOfBirth = '';
    data.citizenUserDateOfBirth = '';
    data.citizenUserPhoneNumber = '';
    data.citizenUserEmailAddress = '';
    populateSummaryData(data, '123');

    expect(data.citizenUserPlaceOfBirthText).toEqual('');
    expect(data.citizenUserDateOfBirthText).toEqual('');
    expect(data.citizenUserPhoneNumberText).toEqual('');
    expect(data.citizenUserEmailAddressText).toEqual('');
  });
  test('detail', () => {
    data.citizenUserPlaceOfBirth = '';
    data.citizenUserDateOfBirth = {
      year: '2023',
      month: '12',
      day: '25',
    };
    data.citizenUserPhoneNumber = '9876';
    data.citizenUserEmailAddress = 'abc';
    populateSummaryData(data, '123');

    expect(data.citizenUserPlaceOfBirthText).toEqual('');
    expect(data.citizenUserDateOfBirthText).toEqual('25 December 2023');
    expect(data.citizenUserPhoneNumberText).toEqual('9876');
    expect(data.citizenUserEmailAddressText).toEqual('abc');
  });
  test('address', () => {
    data.respondents[0].value.address = {
      AddressLine1: '1',
      AddressLine2: 'road',
      PostTown: 'town',
      County: 'county',
      PostCode: 'abc123',
    };
    data.respondents[0].value.addressLivedLessThan5YearsDetails = 'abcde';
    populateSummaryData(data, '123');
    expect(data.citizenUserAddress1).toEqual('1');
    expect(data.citizenUserAddress2).toEqual('road');
    expect(data.citizenUserAddressTown).toEqual('town');
    expect(data.citizenUserAddressCounty).toEqual('county');
    expect(data.citizenUserAddressPostcode).toEqual('abc123');
    expect(data.citizenUserAddressHistory).toEqual('abcde');
  });

  test('International all No', () => {
    data.respondents[0].value.response.citizenInternationalElements = {
      childrenLiveOutsideOfEnWl: 'No',
      parentsAnyOneLiveOutsideEnWl: 'No',
      anotherPersonOrderOutsideEnWl: 'No',
      anotherCountryAskedInformation: 'No',
    };
    populateSummaryData(data, '123');
    expect(data.start).toEqual('No');
    expect(data.iFactorsStartProvideDetails).toEqual('');
    expect(data.parents).toEqual('No');
    expect(data.iFactorsParentsProvideDetails).toEqual('');
    expect(data.jurisdiction).toEqual('No');
    expect(data.iFactorsJurisdictionProvideDetails).toEqual('');
    expect(data.request).toEqual('No');
    expect(data.iFactorsRequestProvideDetails).toEqual('');
  });
  test('International all Yes', () => {
    data.respondents[0].value.response.citizenInternationalElements = {
      childrenLiveOutsideOfEnWl: 'Yes',
      childrenLiveOutsideOfEnWlDetails: 'abc',
      parentsAnyOneLiveOutsideEnWl: 'Yes',
      parentsAnyOneLiveOutsideEnWlDetails: 'abc',
      anotherPersonOrderOutsideEnWl: 'Yes',
      anotherPersonOrderOutsideEnWlDetails: 'abc',
      anotherCountryAskedInformation: 'Yes',
      anotherCountryAskedInformationDetaails: 'abc',
    };
    populateSummaryData(data, '123');
    expect(data.start).toEqual('Yes');
    expect(data.iFactorsStartProvideDetails).toEqual('abc');
    expect(data.parents).toEqual('Yes');
    expect(data.iFactorsParentsProvideDetails).toEqual('abc');
    expect(data.jurisdiction).toEqual('Yes');
    expect(data.iFactorsJurisdictionProvideDetails).toEqual('abc');
    expect(data.request).toEqual('Yes');
    expect(data.iFactorsRequestProvideDetails).toEqual('abc');
  });

  test('consent all Yes', () => {
    data.respondents[0].value.response.consent = {
      consentToTheApplication: 'Yes',
      reasonForNotConsenting: 'abc',
      permissionFromCourt: 'Yes',
      courtOrderDetails: 'abc',
    };
    populateSummaryData(data, '123');
    expect(data.doYouConsent).toEqual('Yes');
    expect(data.reasonForNotConsenting).toEqual('');
    expect(data.courtPermission).toEqual('Yes');
    expect(data.courtOrderDetails).toEqual('abc');
  });
  test('consent all No', () => {
    data.respondents[0].value.response.consent = {
      consentToTheApplication: 'No',
      reasonForNotConsenting: 'abc',
      permissionFromCourt: 'No',
      courtOrderDetails: 'abc',
    };
    populateSummaryData(data, '123');
    expect(data.doYouConsent).toEqual('No');
    expect(data.reasonForNotConsenting).toEqual(undefined);
    expect(data.courtPermission).toEqual('No');
    expect(data.courtOrderDetails).toEqual('');
  });
  test('Miam all No', () => {
    data.respondents[0].value.response.miam = {
      attendedMiam: 'No',
      willingToAttendMiam: 'No',
      reasonNotAttendingMiam: 'abc',
    };
    populateSummaryData(data, '123');
    expect(data.miamStart).toEqual('No');
    expect(data.miamWillingness).toEqual('No');
    expect(data.miamNotWillingExplnation).toEqual('abc');
  });
  test('Miam all yes', () => {
    data.respondents[0].value.response.miam = {
      attendedMiam: 'Yes',
    };
    populateSummaryData(data, '123');
    expect(data.miamStart).toEqual('Yes');
    expect(data.miamWillingness).toEqual('No');
    expect(data.miamNotWillingExplnation).toEqual('');
  });
  test('Miam all NO-yes', () => {
    data.respondents[0].value.response.miam = {
      attendedMiam: 'No',
      willingToAttendMiam: 'Yes',
    };
    populateSummaryData(data, '123');
    expect(data.miamStart).toEqual('No');
    expect(data.miamWillingness).toEqual('Yes');
    expect(data.miamNotWillingExplnation).toEqual('');
  });
});
