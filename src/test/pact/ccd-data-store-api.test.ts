jest.useRealTimers();

jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getCaseApi } from '../../main/app/case/CaseApi';

const { pactWith } = require('jest-pact');

config.get = jest.fn();

pactWith(
  {
    consumer: 'prl-citizen-frontend',
    provider: 'ccdDataStoreAPI_Cases',
    logLevel: 'DEBUG',
  },
  provider => {
    let caseApi;
    const userDetails = {
      accessToken: 'mock-user-access-token',
      id: '123456',
      email: 'user@hmcts.net',
      givenName: 'Firstname',
      familyName: 'Surname',
    };

    beforeEach(() => {
      const { Logger } = require('@hmcts/nodejs-logging');
      const logger: LoggerInstance = Logger.getLogger('server');
      when(config.get).calledWith('services.case.url').mockReturnValue(provider.mockService.baseUrl);
      caseApi = getCaseApi(userDetails, logger);
    });

    describe('ccd_data_store createCases and getCases API', () => {
      const CASES = [
        {
          id: '45678',
          state: 'Draft',
          case_data: { applyingWith: 'alone' },
        },
      ];

      const createCasesSuccessResponse = {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: CASES,
      };
      const createCasesRequest = {
        uponReceiving: 'a request to get cases',
        withRequest: {
          method: 'POST',
          path: '/citizens/123456/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      const getCasesSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: CASES,
      };
      const getCasesRequest = {
        uponReceiving: 'a request to get cases',
        withRequest: {
          method: 'GET',
          path: '/citizens/123456/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'prl-citizen-frontend makes request to get cases',
          ...createCasesRequest,
          ...getCasesRequest,
          willRespondWith: createCasesSuccessResponse,getCasesSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns all cases for a user', async () => {
        const cases = await caseApi.getCases();
        expect(cases).toEqual(CASES);
      });
    });
  
  }
);
