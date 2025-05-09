/* eslint-disable import/no-named-as-default */
import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseType } from '../../../../app/case/definition';
import * as steps from '../../../../steps';

import {
  ConfirmContactDetailsGetController,
  getConfidentialData,
  validateDataCompletion,
} from './ConfirmContactDetailsGetController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const mockedAxios = Axios as jest.Mocked<AxiosStatic>;
const token = 'authToken';
//const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

describe('ConfirmContactDetailsGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  const req = mockRequest();
  const res = mockResponse();
  const generateContent = content => languages[content.language];
  const controller = new ConfirmContactDetailsGetController('page', generateContent);
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

  test('should redirect with c100 case and map respondent details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          },
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
    expect(req.session.userCase).toStrictEqual({
      caseTypeOfApplication: 'C100',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressCounty: 'Dummy County',
      citizenUserAddressHistory: undefined,
      citizenUserAddressPostcode: 'SW13ND',
      citizenUserAddressTown: 'Dummy Town',
      citizenUserDateOfBirth: {
        day: '14',
        month: '11',
        year: '2000',
      },
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserFirstNames: 'John',
      citizenUserFullName: '',
      citizenUserLastNames: undefined,
      citizenUserPhoneNumber: '0987654321',
      citizenUserPlaceOfBirth: 'london',
      citizenUserSafeToCall: '',
      citizenUserSelectAddress: '',
      id: '1234',
      isAtAddressLessThan5Years: 'Yes',
      isCitizenLivingInRefuge: undefined,
      refugeDocument: undefined,
      respondents: [
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
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            },
          },
        },
      ],
      user: {
        idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      },
    });
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
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          },
        },
      },
    ];
    req.url = 'applicant';
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/checkanswers');
    expect(req.session.userCase).toStrictEqual({
      applicants: [
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
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            },
          },
        },
      ],
      caseTypeOfApplication: 'C100',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressCounty: 'Dummy County',
      citizenUserAddressHistory: undefined,
      citizenUserAddressPostcode: 'SW13ND',
      citizenUserAddressTown: 'Dummy Town',
      citizenUserDateOfBirth: {
        day: '14',
        month: '11',
        year: '2000',
      },
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserFirstNames: 'John',
      citizenUserFullName: '',
      citizenUserLastNames: undefined,
      citizenUserPhoneNumber: '0987654321',
      citizenUserPlaceOfBirth: 'london',
      citizenUserSafeToCall: '',
      citizenUserSelectAddress: '',
      id: '1234',
      isAtAddressLessThan5Years: 'Yes',
      isCitizenLivingInRefuge: undefined,
      refugeDocument: undefined,
      respondents: [
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
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            },
          },
        },
      ],
      user: {
        idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      },
    });
  });

  test('should redirect with c100 appilant case and map applicant details', async () => {
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
    expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/checkanswers');
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

  describe('getConfidentialData', () => {
    test('should set english confidential data', () => {
      req.session.userCase = {
        detailsKnown: 'Yes',
        startAlternative: 'Yes',
        contactDetailsPrivate: ['email', 'phoneNumber'],
        email: 'test@test.com',
        phoneNumber: '012345',
        address: {
          AddressLine1: 'Flatc1',
          AddressLine2: 'Unkonwn lane',
          County: 'Dummy County',
          PostCode: 'SW13ND',
          PostTown: 'Dummy Town',
        },
        citizenUserEmailAddressText: '',
        citizenUserPhoneNumberText: '',
        citizenUserAddressText: '',
      };
      getConfidentialData(req);
      expect(req.session.userCase.citizenUserEmailAddressText).toBe(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">This information will be kept confidential</span>'
      );
      expect(req.session.userCase.citizenUserPhoneNumberText).toBe(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">This information will be kept confidential</span>'
      );
      expect(req.session.userCase.citizenUserAddressText).toBe(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">If this information was provided by the applicant it should not be requested to be kept confidential.</span>'
      );
    });

    test('should set welsh confidential data', () => {
      req.session.lang = 'cy';
      req.session.userCase = {
        detailsKnown: 'Yes',
        startAlternative: 'Yes',
        contactDetailsPrivate: ['email', 'phoneNumber'],
        email: 'test@test.com',
        phoneNumber: '012345',
        address: {
          AddressLine1: 'Flatc1',
          AddressLine2: 'Unkonwn lane',
          County: 'Dummy County',
          PostCode: 'SW13ND',
          PostTown: 'Dummy Town',
        },
        citizenUserEmailAddressText: '',
        citizenUserPhoneNumberText: '',
        citizenUserAddressText: '',
      };
      getConfidentialData(req);
      expect(req.session.userCase.citizenUserEmailAddressText).toBe(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">Bydd yr wybodaeth hon yn cael ei chadw’n gyfrinachol</span>'
      );
      expect(req.session.userCase.citizenUserPhoneNumberText).toBe(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">Bydd yr wybodaeth hon yn cael ei chadw’n gyfrinachol</span>'
      );
      expect(req.session.userCase.citizenUserAddressText).toBe(
        '<br/><span class="govuk-hint govuk-!-margin-top-1">Os darparwyd y wybodaeth hon gan yr ymgeisydd ni ddylid gofyn am ei chadw\'n gyfrinachol.</span>'
      );
    });
  });
});
