/* eslint-disable import/no-named-as-default */
import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { CALLBACK_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

jest.mock('axios');
config.get = jest.fn();

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

const token: string = process.env.DUMMY_ACCESS_TOKEN as string;

describe('getRedirectUrl', () => {
  test('should create a valid URL to redirect to the login screen', () => {
    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('prl-citizen-frontend')
      .calledWith('services.idam.authorizationURL')
      .mockReturnValue('https://idam-web-public/login');

    expect(getRedirectUrl('http://localhost', CALLBACK_URL)).toBe(
      'https://idam-web-public/login?client_id=prl-citizen-frontend&response_type=code&redirect_uri=http://localhost/receiver'
    );
  });
});

describe('getUserDetails', () => {
  test('should exchange a code for a token and decode a JWT to get the user details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });
    const result = await getUserDetails('http://localhost', '123', CALLBACK_URL);
    expect(result).toEqual({
      accessToken: token,
      email: 'testprl183@mailinator.com',
      familyName: undefined,
      givenName: undefined,
      id: undefined,
    });
  });
});

describe('getCaseWorkerUser', () => {
  test('should retrieve a token with caseworker username and password then decode the JWT to get user details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });

    const result = await getSystemUser();
    expect(result).toEqual({
      accessToken: token,
      email: 'testprl183@mailinator.com',
      familyName: undefined,
      givenName: undefined,
      id: undefined,
    });
  });
});
