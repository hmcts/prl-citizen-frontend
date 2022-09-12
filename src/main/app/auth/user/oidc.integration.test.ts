import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { CALLBACK_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

jest.mock('axios');
config.get = jest.fn();

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

const token =
  'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0cHJsMTgzQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImYzNGU2YzljLWZkZmItNDQ0Zi1hYzY2LWVkMWZkNjYwMWViMy0xOTg3MTc1MTgiLCJpc3MiOiJodHRwczovL2Zvcmdlcm9jay1hbS5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1pZGFtLWFhdDIuaW50ZXJuYWw6ODQ0My9vcGVuYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9obWN0cyIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImRkSlhYZHFIMVI4OEkyUkZCMHF5RU8xQWt0MCIsImF1ZCI6InBybC1jaXRpemVuLWZyb250ZW5kIiwibmJmIjoxNjU5NjUxMjA2LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIl0sImF1dGhfdGltZSI6MTY1OTY1MTEzOSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NTk2ODAwMDYsImlhdCI6MTY1OTY1MTIwNiwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IklibmFqNy1KeGZkYXlLUzBzN09SY1BwbmZ2dyJ9.WeOAW87CoUG6mFyE8vlkEZNmKsOipS_3PASiYBxUHOr1M_hSYegwmEVDlaaSgtzzjsUg2Kgo7-ereOmyb1qYFmXY-x6AmKs-IUtWdNeNX4iV_lXP85y0Dtag-meze3mV08d3yVpkfIiskQiGSh1bD1IrSk4UHmp3-q7DLcR26NNxy8Lb1w5FWcnGdfGUuq6wdk5sF1DYoL5vP80NcrUIZ6bEOVhm0CCsVd7KMVxLQZ7cFvvLGFJYKHthChrw3ym1MIVUjkKMpzD5PdYbyjxzB0hLD2ep8R4fB3S_wxZdyqywzQFTGH0kFrHOgGCweLsBOi3odNsnJVNrwklbBtMd2w';

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
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0cHJsMTgzQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImYzNGU2YzljLWZkZmItNDQ0Zi1hYzY2LWVkMWZkNjYwMWViMy0xOTg3MTc1MTgiLCJpc3MiOiJodHRwczovL2Zvcmdlcm9jay1hbS5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1pZGFtLWFhdDIuaW50ZXJuYWw6ODQ0My9vcGVuYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9obWN0cyIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImRkSlhYZHFIMVI4OEkyUkZCMHF5RU8xQWt0MCIsImF1ZCI6InBybC1jaXRpemVuLWZyb250ZW5kIiwibmJmIjoxNjU5NjUxMjA2LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIl0sImF1dGhfdGltZSI6MTY1OTY1MTEzOSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NTk2ODAwMDYsImlhdCI6MTY1OTY1MTIwNiwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IklibmFqNy1KeGZkYXlLUzBzN09SY1BwbmZ2dyJ9.WeOAW87CoUG6mFyE8vlkEZNmKsOipS_3PASiYBxUHOr1M_hSYegwmEVDlaaSgtzzjsUg2Kgo7-ereOmyb1qYFmXY-x6AmKs-IUtWdNeNX4iV_lXP85y0Dtag-meze3mV08d3yVpkfIiskQiGSh1bD1IrSk4UHmp3-q7DLcR26NNxy8Lb1w5FWcnGdfGUuq6wdk5sF1DYoL5vP80NcrUIZ6bEOVhm0CCsVd7KMVxLQZ7cFvvLGFJYKHthChrw3ym1MIVUjkKMpzD5PdYbyjxzB0hLD2ep8R4fB3S_wxZdyqywzQFTGH0kFrHOgGCweLsBOi3odNsnJVNrwklbBtMd2w',
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
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0cHJsMTgzQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImYzNGU2YzljLWZkZmItNDQ0Zi1hYzY2LWVkMWZkNjYwMWViMy0xOTg3MTc1MTgiLCJpc3MiOiJodHRwczovL2Zvcmdlcm9jay1hbS5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1pZGFtLWFhdDIuaW50ZXJuYWw6ODQ0My9vcGVuYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9obWN0cyIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImRkSlhYZHFIMVI4OEkyUkZCMHF5RU8xQWt0MCIsImF1ZCI6InBybC1jaXRpemVuLWZyb250ZW5kIiwibmJmIjoxNjU5NjUxMjA2LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIl0sImF1dGhfdGltZSI6MTY1OTY1MTEzOSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NTk2ODAwMDYsImlhdCI6MTY1OTY1MTIwNiwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IklibmFqNy1KeGZkYXlLUzBzN09SY1BwbmZ2dyJ9.WeOAW87CoUG6mFyE8vlkEZNmKsOipS_3PASiYBxUHOr1M_hSYegwmEVDlaaSgtzzjsUg2Kgo7-ereOmyb1qYFmXY-x6AmKs-IUtWdNeNX4iV_lXP85y0Dtag-meze3mV08d3yVpkfIiskQiGSh1bD1IrSk4UHmp3-q7DLcR26NNxy8Lb1w5FWcnGdfGUuq6wdk5sF1DYoL5vP80NcrUIZ6bEOVhm0CCsVd7KMVxLQZ7cFvvLGFJYKHthChrw3ym1MIVUjkKMpzD5PdYbyjxzB0hLD2ep8R4fB3S_wxZdyqywzQFTGH0kFrHOgGCweLsBOi3odNsnJVNrwklbBtMd2w',
      email: 'testprl183@mailinator.com',
      familyName: undefined,
      givenName: undefined,
      id: undefined,
    });
  });
});
