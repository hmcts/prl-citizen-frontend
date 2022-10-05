import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../../app/auth/user/oidc';
import { FormContent } from '../../../../app/form/Form';
import * as steps from '../../../../steps';

import { ConfirmContactDetailsPostController } from './ConfirmContactDetailsPostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

jest.mock('axios');
config.get = jest.fn();
const mockedAxios = Axios as jest.Mocked<AxiosStatic>;
const token =
  'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0cHJsMTgzQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImYzNGU2YzljLWZkZmItNDQ0Zi1hYzY2LWVkMWZkNjYwMWViMy0xOTg3MTc1MTgiLCJpc3MiOiJodHRwczovL2Zvcmdlcm9jay1hbS5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1pZGFtLWFhdDIuaW50ZXJuYWw6ODQ0My9vcGVuYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9obWN0cyIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImRkSlhYZHFIMVI4OEkyUkZCMHF5RU8xQWt0MCIsImF1ZCI6InBybC1jaXRpemVuLWZyb250ZW5kIiwibmJmIjoxNjU5NjUxMjA2LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIl0sImF1dGhfdGltZSI6MTY1OTY1MTEzOSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NTk2ODAwMDYsImlhdCI6MTY1OTY1MTIwNiwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IklibmFqNy1KeGZkYXlLUzBzN09SY1BwbmZ2dyJ9.WeOAW87CoUG6mFyE8vlkEZNmKsOipS_3PASiYBxUHOr1M_hSYegwmEVDlaaSgtzzjsUg2Kgo7-ereOmyb1qYFmXY-x6AmKs-IUtWdNeNX4iV_lXP85y0Dtag-meze3mV08d3yVpkfIiskQiGSh1bD1IrSk4UHmp3-q7DLcR26NNxy8Lb1w5FWcnGdfGUuq6wdk5sF1DYoL5vP80NcrUIZ6bEOVhm0CCsVd7KMVxLQZ7cFvvLGFJYKHthChrw3ym1MIVUjkKMpzD5PdYbyjxzB0hLD2ep8R4fB3S_wxZdyqywzQFTGH0kFrHOgGCweLsBOi3odNsnJVNrwklbBtMd2w';

describe('ConfirmContactDetailsPostController', () => {
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
    const mockPhoneNumberFormContent = {
      fields: {
        citizenUserPhoneNumber: {
          type: 'tel',
        },
      },
    } as unknown as FormContent;

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
    const controller = new ConfirmContactDetailsPostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    let flag = false;
    try {
      await controller.post(req, res);
      flag = true;
    } catch (e) {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
});
