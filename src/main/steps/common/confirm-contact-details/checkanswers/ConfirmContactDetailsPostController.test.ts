import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
//import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';

import { ConfirmContactDetailsPostController } from './ConfirmContactDetailsPostController';
import { prepareRequest } from './ContactDetailsMapper';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const mockedAxios = Axios as jest.Mocked<AxiosStatic>;
const token = 'Bearer dummy_token';
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;
let prepare;
let updated;

describe('ConfirmContactDetailsPostController', () => {
  const controller = new ConfirmContactDetailsPostController();
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
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
        },
      },
    ];

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

    prepare = {
      address: {
        AddressLine1: 'Flatc1',
        AddressLine2: 'Unkonwn lane',
        County: 'Dummy County',
        PostCode: 'SW13ND',
        PostTown: 'Dummy Town',
      },
      addressLivedLessThan5YearsDetails: "Don't want to state",
      dateOfBirth: '2000-11-14',
      email: 'a.b@test.com',
      firstName: 'John',
      isAtAddressLessThan5Years: 'No',
      lastName: 'Smith',
      phoneNumber: '0987654321',
      placeOfBirth: 'london',
      previousName: 'Johnny Smith',
      response: {},
    };

    updated = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
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
          response: { safeToCallOption: '4 pm' },
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
        },
      },
    ];

    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    getNextStepUrlMock.mockClear();
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const body = { citizenUserPhoneNumber: 'invalid phone number' };
    // const mockPhoneNumberFormContent = {
    //   fields: {
    //     citizenUserPhoneNumber: {
    //       type: 'tel',
    //     },
    //   },
    // } as unknown as FormContent;

    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('prl-citizen-frontend')
      .calledWith('services.idam.authorizationURL')
      .mockReturnValue('https://idam-web-public/login');

    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });
    const control = new ConfirmContactDetailsPostController();

    const reqs = mockRequest({ body });
    const ress = mockResponse();
    let flag = false;
    try {
      await control.post(reqs, ress);
      flag = true;
    } catch (e) {
      flag = false;
    }

    expect(flag).toEqual(false);
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
    req.session.userCase.respondentsFL401 = partyDetails;
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
    req.session.userCase.applicantsFL401 = partyDetails;
    req.session.userCase.caseTypeOfApplication = 'FL401';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(retrieveByCaseIdMock).toBeCalled;
    expect(updateCaserMock).toBeCalled;
    expect(prepareRequest(req.session.userCase)).toStrictEqual(prepare);
    expect(res.redirect).toBeCalled;
  });
});
