import config from 'config';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import * as oidc from '../../../../app/auth/user/oidc';
import * as steps from '../../../../steps';

import { getContactDetails, setContactDetails } from './ContactDetailsMapper';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

config.get = jest.fn();

describe('ContactDetailsMapper', () => {
  //const userEmail = 'test@example.com';
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

  test('Should return error while Failed to map data', async () => {
    //const errors = [{ propertyName: 'citizenUserPhoneNumber', errorType: 'invalid' }];
    const body = { citizenUserPhoneNumber: 'invalid phone number' };

    const req = mockRequest({ body });

    let flag = false;
    try {
      getContactDetails(req.session.userCase.respondentsFL401, req);
      flag = true;
    } catch (e) {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('Should  map set contact data', async () => {
    //const errors = [{ propertyName: 'citizenUserPhoneNumber', errorType: 'invalid' }];
    const body = { citizenUserPhoneNumber: 'invalid phone number' };

    const req = mockRequest({ body });

    let flag = false;
    try {
      setContactDetails(req.session.userCase.respondentsFL401, req);
      flag = true;
    } catch (e) {
      flag = false;
    }

    expect(flag).toEqual(true);
  });
});
