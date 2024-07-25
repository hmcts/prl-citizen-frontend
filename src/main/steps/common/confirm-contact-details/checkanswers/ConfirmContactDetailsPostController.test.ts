import config from 'config';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import * as steps from '../../../../steps';

import { ConfirmContactDetailsPostController } from './ConfirmContactDetailsPostController';
import { prepareRequest } from './ContactDetailsMapper';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;
let prepare;
let updated;

describe('ConfirmContactDetailsPostController', () => {
  let fields;
  const controller = new ConfirmContactDetailsPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          address: {
            AddressLine1: 'Flatc1',
            AddressLine2: 'Unkonwn lane',
            Country: 'Dummy County',
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
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
        },
      },
    ];

    req.session.user = {
      ...req.session.user,
      id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
    };
    req.session.userCase = {
      ...req.session.userCase,
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressCountry: 'Dummy County',
      citizenUserAddressPostcode: 'SW13ND',
      citizenUserAddressTown: 'Dummy Town',
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      citizenUserAddressHistory: '',
      citizenUserDateOfBirth: {
        year: '2000',
        month: '11',
        day: '14',
      },
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserFirstNames: 'John',
      isAtAddressLessThan5Years: 'Yes',
      citizenUserLastNames: 'Smith',
      citizenUserPhoneNumber: '0987654321',
      citizenUserPlaceOfBirth: 'london',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserSafeToCall: '4 pm',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'testuser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            dateOfBirth: '03-20-2023',
            phoneNumber: '7755664466',
            placeOfBirth: 'BPP',
            previousName: 'test',
            isAtAddressLessThan5Years: 'No',
            addressLivedLessThan5YearsDetails: 'Hello',
            address: {
              AddressLine1: 'Flatc1',
              AddressLine2: 'Unkonwn lane',
              Country: 'Dummy County',
              PostCode: 'SW13ND',
              PostTown: 'Dummy Town',
            },
            user: {
              idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              email: 'test1234@example.net',
            },
            response: {},
          },
        },
      ],
      caseInvites: [
        {
          id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'respondent2@example.net',
            accessCode: '3GYFGJHO',
            invitedUserId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
            hasLinked: 'Yes',
            expiryDate: '2023-05-07',
            isApplicant: 'No',
          },
        },
      ],
    };

    prepare = {
      address: {
        AddressLine1: 'Flatc1',
        AddressLine2: 'Unkonwn lane',
        Country: 'Dummy County',
        PostCode: 'SW13ND',
        PostTown: 'Dummy Town',
      },
      addressLivedLessThan5YearsDetails: '',
      dateOfBirth: '2000-11-14',
      email: 'a.b@test.com',
      firstName: 'John',
      isAtAddressLessThan5Years: 'Yes',
      lastName: 'Smith',
      phoneNumber: '0987654321',
      placeOfBirth: 'london',
      previousName: 'Johnny Smith',
      response: { safeToCallOption: '4 pm' },
    };

    updated = {
      address: {
        AddressLine1: 'Flatc1',
        AddressLine2: 'Unkonwn lane',
        Country: 'Dummy County',
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
      response: { safeToCallOption: '4 pm' },
      user: {
        idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        email: 'test@example.net',
      },
    };

    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    getNextStepUrlMock.mockClear();
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
  });

  test('Should redirect c100 applicant', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toBeCalled;
  });
  test('Should redirect c100 respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'respondent';
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toBeCalled;
  });
  test('Should redirect FL401 respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.url = 'respondent';
    req.session.userCase.respondentsFL401 = partyDetails[0].value;
    req.session.userCase.caseTypeOfApplication = 'FL401';
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(req.session.userCase.respondentsFL401).toStrictEqual(updated);
    expect(res.redirect).toBeCalled;
  });
  test('Should redirect FL401 applicant', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicantsFL401 = partyDetails[0].value;
    req.session.userCase.caseTypeOfApplication = 'FL401';
    req.session.userCase.caseInvites = [];
    req.url = 'applicant';
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toBeCalled;
  });
  test('Should redirect C100 applicant after choosing post preference', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicantsFL401 = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    req.session.userCase.preferredModeOfContact = 'post';
    req.session.applicationSettings = { navFromContactPreferences: true };
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toHaveBeenLastCalledWith('/applicant/contact-preference/confirmation');
  });
  test('Should redirect C100 applicant after choosing digital preference', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.applicantsFL401 = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.url = 'applicant';
    req.session.userCase.preferredModeOfContact = 'email';
    req.session.applicationSettings = { navFromContactPreferences: true };
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toHaveBeenLastCalledWith('/applicant/contact-preference/confirmation');
  });

  test('Should redirect C100 respondent after choosing post preference', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    req.url = 'respondent';
    req.session.userCase.preferredModeOfContact = 'post';
    req.session.applicationSettings = { navFromContactPreferences: true };
    req.session.userCase.caseInvites = [
      {
        id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'respondent2@example.net',
          accessCode: '3GYFGJHO',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          hasLinked: 'Yes',
          expiryDate: '2023-05-07',
          isApplicant: 'No',
        },
      },
    ];
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toHaveBeenLastCalledWith('/respondent/contact-preference/confirmation');
  });

  test('Should redirect C100 respondent after choosing digital preference', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = partyDetails;
    req.url = 'respondent';
    req.session.userCase.preferredModeOfContact = 'email';
    req.session.applicationSettings = { navFromContactPreferences: true };
    req.session.userCase.caseInvites = [
      {
        id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'respondent2@example.net',
          accessCode: '3GYFGJHO',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          hasLinked: 'Yes',
          expiryDate: '2023-05-07',
          isApplicant: 'No',
        },
      },
    ];
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toHaveBeenLastCalledWith('/respondent/contact-preference/confirmation');
  });

  test('Should not update the userCase for safety concerns when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(controller.post(req, res)).rejects.toThrow(
      'ConfirmContactDetailsPostController - error when saving contact details and redirecting'
    );
  });
});
