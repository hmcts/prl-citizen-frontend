import { mockRequest } from '../../../../../test/unit/utils/mockRequest';

import { mapRequest, prepareRequest, setTextFields } from './ContactDetailsMapper';

let respondents;

describe('ContactDetailsMapper', () => {
  let req = mockRequest();
  beforeEach(() => {
    req.session.userCase = {
      citizenUserFirstNames: 'John',
      citizenUserLastNames: 'Smith',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserDateOfBirth: {
        year: '2000',
        month: '11',
        day: '14',
      },
      citizenUserPlaceOfBirth: 'london',
      citizenUserPhoneNumber: '0987654321',
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressTown: 'Dummy Town',
      citizenUserAddressCounty: 'Dummy County',
      citizenUserAddressPostcode: 'SW13ND',
      isAtAddressLessThan5Years: 'No',
      citizenUserAddressHistory: "Don't want to state",
    };
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'testFirstName',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
        },
      },
    ];
  });

  test('user is not staying in same address for 5 years', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    respondents[0].value = prepareRequest(req.session.userCase);
    console.log(prepareRequest(req.session.userCase));
    expect(respondents[0].value).toEqual(
      expect.objectContaining({
        address: {
          AddressLine1: 'Flatc1',
          AddressLine2: 'Unkonwn lane',
          County: 'Dummy County',
          PostCode: 'SW13ND',
          PostTown: 'Dummy Town',
        },
        dateOfBirth: '2000-11-14',
        email: 'a.b@test.com',
        firstName: 'John',
        isAtAddressLessThan5Years: 'No',
        addressLivedLessThan5YearsDetails: "Don't want to state",
        lastName: 'Smith',
        phoneNumber: '0987654321',
        placeOfBirth: 'london',
        previousName: 'Johnny Smith',
      })
    );
  });

  test('when SafeToCall,previous name present and when answer to the question user is staying in same address for 5 years changed to yes', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase = {
      ...req.session.userCase,
      isAtAddressLessThan5Years: 'Yes',
      citizenUserSafeToCall: '4 pm',
    };
    respondents[0].value = prepareRequest(req.session.userCase);
    console.log(prepareRequest(req.session.userCase));
    expect(respondents[0].value).toEqual(
      expect.objectContaining({
        address: {
          AddressLine1: 'Flatc1',
          AddressLine2: 'Unkonwn lane',
          County: 'Dummy County',
          PostCode: 'SW13ND',
          PostTown: 'Dummy Town',
        },
        dateOfBirth: '2000-11-14',
        email: 'a.b@test.com',
        firstName: 'John',
        isAtAddressLessThan5Years: 'Yes',
        lastName: 'Smith',
        phoneNumber: '0987654321',
        placeOfBirth: 'london',
        previousName: 'Johnny Smith',
        response: {
          safeToCallOption: '4 pm',
        },
      })
    );
  });
  test('Should map data in the usercase when mapRequest method is invoked', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const result = {
      address: {
        AddressLine1: 'Flatc1',
        AddressLine2: 'Unkonwn lane',
        County: 'Dummy County',
        PostCode: 'SW13ND',
        PostTown: 'Dummy Town',
      },
      dateOfBirth: '2000-11-14',
      email: 'a.b@test.com',
      firstName: 'John',
      isAtAddressLessThan5Years: 'Yes',
      lastName: 'Smith',
      phoneNumber: '0987654321',
      placeOfBirth: 'london',
      previousName: 'Johnny Smith',
      response: {
        safeToCallOption: '4 pm',
      },
    };
    respondents[0].value = result;
    req.session.userCase = mapRequest(respondents[0].value);

    expect(req.session.userCase).toEqual(
      expect.objectContaining({
        citizenUserFirstNames: 'John',
        citizenUserLastNames: 'Smith',
        citizenUserFullName: 'John Smith',
        citizenUserAdditionalName: 'Johnny Smith',
        citizenUserDateOfBirth: {
          year: '2000',
          month: '11',
          day: '14',
        },
        citizenUserPlaceOfBirth: 'london',
        citizenUserPhoneNumber: '0987654321',
        citizenUserEmailAddress: 'a.b@test.com',
        citizenUserAddress1: 'Flatc1',
        citizenUserAddress2: 'Unkonwn lane',
        citizenUserAddressTown: 'Dummy Town',
        citizenUserAddressCounty: 'Dummy County',
        citizenUserAddressPostcode: 'SW13ND',
        isAtAddressLessThan5Years: 'Yes',
        // citizenUserAddressHistory:"Don't want to state",
        citizenUserSafeToCall: '4 pm',
      })
    );
  });
  test('Should map optional data in the usercase when mapRequest method is invoked', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const result = {
      address: {
        AddressLine1: 'Flatc1',
        AddressLine2: 'Unkonwn lane',
        County: 'Dummy County',
        PostCode: 'SW13ND',
        PostTown: 'Dummy Town',
      },
      dateOfBirth: '2000-11-14',
      email: 'a.b@test.com',
      firstName: 'John',
      isAtAddressLessThan5Years: 'Yes',

      phoneNumber: '0987654321',
      placeOfBirth: 'london',
      previousName: 'Johnny Smith',
    };
    respondents[0].value = result;
    req.session.userCase = mapRequest(respondents[0].value);

    expect(req.session.userCase).toEqual(
      expect.objectContaining({
        citizenUserFirstNames: 'John',
        citizenUserLastNames: undefined,
        citizenUserFullName: '',
        citizenUserAdditionalName: 'Johnny Smith',
        citizenUserDateOfBirth: {
          year: '2000',
          month: '11',
          day: '14',
        },
        citizenUserPlaceOfBirth: 'london',
        citizenUserPhoneNumber: '0987654321',
        citizenUserEmailAddress: 'a.b@test.com',
        citizenUserAddress1: 'Flatc1',
        citizenUserAddress2: 'Unkonwn lane',
        citizenUserAddressTown: 'Dummy Town',
        citizenUserAddressCounty: 'Dummy County',
        citizenUserAddressPostcode: 'SW13ND',
        isAtAddressLessThan5Years: 'Yes',
        // citizenUserAddressHistory:"Don't want to state",
        citizenUserSafeToCall: undefined,
      })
    );
  });
  test('Should map all data in the usercase when setText method is invoked', async () => {
    req = mockRequest({
      session: {
        userCase: {
          citizenUserFirstNames: 'John',
          citizenUserLastNames: 'Smith',
          citizenUserAdditionalName: 'Johnny Smith',
          citizenUserDateOfBirth: {
            year: '2000',
            month: '11',
            day: '14',
          },
          citizenUserPlaceOfBirth: 'london',
          citizenUserPhoneNumber: '0987654321',
          citizenUserEmailAddress: 'a.b@test.com',
          citizenUserAddress1: 'Flatc1',
          citizenUserAddress2: 'Unkonwn lane',
          citizenUserAddressTown: 'Dummy Town',
          citizenUserAddressCounty: 'Dummy County',
          citizenUserAddressPostcode: 'SW13ND',
          isAtAddressLessThan5Years: 'No',
          citizenUserAddressHistory: "Don't want to state",
        },
      },
    });
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = setTextFields(req);

    expect(req.session.userCase).toEqual(
      expect.objectContaining({
        citizenUserFirstNames: 'John',
        citizenUserLastNames: 'Smith',
        citizenUserFullName: 'John Smith',
        citizenUserAddressHistory: "Don't want to state",
        citizenUserAdditionalName: 'Johnny Smith',
        citizenUserDateOfBirth: {
          year: '2000',
          month: '11',
          day: '14',
        },
        citizenUserAddressText: 'Flatc1 Unkonwn lane Dummy Town SW13ND',
        citizenUserEmailAddressText: 'a.b@test.com',
        citizenUserDateOfBirthText: '14 November 2000',
        citizenUserPlaceOfBirth: 'london',
        citizenUserPhoneNumber: '0987654321',
        citizenUserPhoneNumberText: '0987654321',
        citizenUserEmailAddress: 'a.b@test.com',
        citizenUserAddress1: 'Flatc1',
        citizenUserAddress2: 'Unkonwn lane',
        citizenUserAddressTown: 'Dummy Town',
        citizenUserAddressCounty: 'Dummy County',
        citizenUserAddressPostcode: 'SW13ND',
        isAtAddressLessThan5Years: 'No',
        citizenUserPlaceOfBirthText: 'london',
      })
    );
  });
  test('Should map partial data in the usercase when setText method is invoked', async () => {
    req = mockRequest({
      session: {
        userCase: {
          citizenUserFirstNames: 'John',
          citizenUserLastNames: 'Smith',
          citizenUserAdditionalName: 'Johnny Smith',
          citizenUserDateOfBirth: undefined,
          citizenUserPlaceOfBirth: undefined,
          citizenUserPhoneNumber: undefined,
          citizenUserEmailAddress: undefined,
          citizenUserAddress1: undefined,
          citizenUserAddress2: undefined,
          citizenUserAddressTown: undefined,
          citizenUserAddressCounty: undefined,
          citizenUserAddressPostcode: undefined,
          isAtAddressLessThan5Years: 'Yes',
          citizenUserAddressHistory: "Don't want to state",
        },
      },
    });
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = setTextFields(req);

    expect(req.session.userCase).toEqual(
      expect.objectContaining({
        citizenUserFirstNames: 'John',
        citizenUserLastNames: 'Smith',
        citizenUserFullName: 'John Smith',
        citizenUserAddressHistory: '',
        citizenUserAdditionalName: 'Johnny Smith',
        citizenUserDateOfBirth: undefined,
        citizenUserAddressText: '',
        citizenUserEmailAddressText: '',
        citizenUserDateOfBirthText: '',
        citizenUserPlaceOfBirth: undefined,
        citizenUserPhoneNumber: undefined,
        citizenUserPhoneNumberText: '',
        citizenUserEmailAddress: undefined,
        citizenUserAddress1: undefined,
        citizenUserAddress2: undefined,
        citizenUserAddressTown: undefined,
        citizenUserAddressCounty: undefined,
        citizenUserAddressPostcode: undefined,
        isAtAddressLessThan5Years: 'Yes',
        citizenUserPlaceOfBirthText: '',
      })
    );
  });
});
