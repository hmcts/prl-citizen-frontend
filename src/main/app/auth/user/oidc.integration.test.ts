import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { CALLBACK_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

jest.mock('axios');
config.get = jest.fn();

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvcmlhbiIsInVpZCI6IjEyMyJ9.KaDIFSDdD3ZIYCl_qavvYbQ3a4abk47iBOZhB1-9mUQ';

describe('getRedirectUrl', () => {
  test('should create a valid URL to redirect to the login screen', () => {
    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('adoption-web')
      .calledWith('services.idam.authorizationURL')
      .mockReturnValue('https://idam-web-public/login');

    expect(getRedirectUrl('http://localhost', CALLBACK_URL)).toBe(
      'https://idam-web-public/login?client_id=adoption-web&response_type=code&redirect_uri=http://localhost/receiver'
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
    expect(result).toStrictEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
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
    expect(result).toStrictEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
    });
  });
});
