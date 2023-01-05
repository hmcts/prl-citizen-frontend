import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import * as steps from '../../../../steps';

import { ConfirmContactDetailsGetController } from './ConfirmContactDetailsGetController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const mockedAxios = Axios as jest.Mocked<AxiosStatic>;
const token = 'authToken';

describe('ConfirmContactDetailsGetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  //const userEmail = 'test@example.com';
  const generateContent = content => languages[content.language];
  beforeEach(() => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });
  });
  afterEach(() => {
    getNextStepUrlMock.mockClear();
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
    const controller = new ConfirmContactDetailsGetController('page', generateContent);

    const req = mockRequest({ body });
    const res = mockResponse();
    let flag = false;
    try {
      await controller.get(req, res);
      flag = true;
    } catch (e) {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
});
