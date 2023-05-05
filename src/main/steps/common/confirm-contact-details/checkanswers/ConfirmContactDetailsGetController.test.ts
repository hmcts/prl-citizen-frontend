import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseType } from '../../../../app/case/definition';
import * as steps from '../../../../steps';

import { ConfirmContactDetailsGetController, validateDataCompletion } from './ConfirmContactDetailsGetController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const mockedAxios = Axios as jest.Mocked<AxiosStatic>;
const token = 'authToken';
//const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

describe('ConfirmContactDetailsGetController', () => {
  // const languages = {
  //   en: {
  //     text: 'english',
  //   },
  //   cy: {
  //     text: 'welsh',
  //   },
  // };
  const req = mockRequest();
  const res = mockResponse();
  //const generateContent = content => languages[content.language];
  const controller = new ConfirmContactDetailsGetController();
  //const userEmail = 'test@example.com';
  beforeEach(() => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    //updateCaserMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    getNextStepUrlMock.mockClear();
    retrieveByCaseIdMock.mockClear();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    //const errors = [{ propertyName: 'citizenUserPhoneNumber', errorType: 'invalid' }];
    const body = { citizenUserPhoneNumber: 'invalid phone number' };

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
    const reqs = mockRequest({ body });
    let flag = false;
    try {
      await controller.get(reqs, res);
      flag = true;
    } catch (e) {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
  test('should redirect with c100 case', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = [
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

          phoneNumber: '0987654321',
          placeOfBirth: 'london',
          previousName: 'Johnny Smith',
        },
      },
    ];
    req.url = 'respondent';
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/respondent/confirm-contact-details/checkanswers');
  });
  test('should redirect with c100 appilant case', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = [
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

          phoneNumber: '0987654321',
          placeOfBirth: 'london',
          previousName: 'Johnny Smith',
        },
      },
    ];
    req.url = 'applicant';
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/checkanswers?byApplicant=applicant');
  });
  test('should redirect with FL401  applicant case', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = CaseType.FL401;
    req.session.userCase.applicantsFL401 = {
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
    req.url = 'applicant';
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/checkanswers');
  });
  test('should redirect with FL401  repondent case', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = CaseType.FL401;
    req.session.userCase.respondentsFL401 = {
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
    req.url = 'respondent';
    await controller.get(req, res);
    expect(res.redirect).toBeCalled;
  });
  test('validate data completion', () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = CaseType.FL401;
    req.session.userCase.respondentsFL401 = {
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
      placeOfBirth: '',
      previousName: 'Johnny Smith',
    };
    validateDataCompletion(req);
    expect(req.session.userCase['placeOfBirth']).toBe(undefined);
  });
});
