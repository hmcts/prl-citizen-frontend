jest.useRealTimers();

jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import { Pact } from '@pact-foundation/pact';
import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getCaseApi } from '../../main/app/case/CaseApi';

config.get = jest.fn();

const provider = new Pact({
  consumer: 'prl-citizen-frontend',
  provider: 'ccdDataStoreAPI_Cases',
  logLevel: 'debug',
});

describe('ccd_data_store createCases and getCases API', () => {
  const CASES = [
    {
      id: '45678',
      state: 'Draft',
      case_data: { applyingWith: 'alone' },
    },
  ];

  it('returns all cases for a user', async () => {
    await provider
      .addInteraction()
      .given('prl-citizen-frontend makes request to get cases')
      .uponReceiving('a request to get cases')
      .withRequest('GET', '/citizens/123456/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases', request =>
        request.headers({
          Authorization: 'Bearer mock-user-access-token',
          ServiceAuthorization: 'mock-service-auth-token',
          experimental: 'true',
          Accept: '*/*',
          'Content-Type': 'application/json',
        })
      )
      .willRespondWith(200, response => response.headers({ 'Content-Type': 'application/json' }).jsonBody(CASES))
      .executeTest(async mockServer => {
        const userDetails = {
          accessToken: 'mock-user-access-token',
          id: '123456',
          email: 'user@hmcts.net',
          givenName: 'Firstname',
          familyName: 'Surname',
        };
        const { Logger } = require('@hmcts/nodejs-logging');
        const logger: LoggerInstance = Logger.getLogger('server');
        when(config.get).calledWith('services.case.url').mockReturnValue(mockServer.url);
        const caseApi = getCaseApi(userDetails, logger);
        const cases = await caseApi.getCases();
        expect(cases).toEqual(CASES);
      });
  });
});
