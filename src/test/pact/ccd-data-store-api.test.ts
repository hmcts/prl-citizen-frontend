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

    describe('ccd_data_store getCaseById API', () => {
      const EXPECTED_CASE_DATA = {
        id: '45678',
        state: 'Draft',
        applyingWith: 'alone',
      };

      const getCaseByIdSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: '45678',
          state: 'Draft',
          data: { applyingWith: 'alone' },
        },
      };

      const getCaseByIdRequest = {
        uponReceiving: 'a request to get case by id',
        withRequest: {
          method: 'GET',
          path: '/cases/45678',
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
          state: 'prl-citizen-frontend makes request to get case by id',
          ...getCaseByIdRequest,
          willRespondWith: getCaseByIdSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns case data by id', async () => {
        const caseResponse = await caseApi.getCaseById('45678');
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });

    describe('ccd_data_store createCase API', () => {
      const EXPECTED_CASE_DATA = {
        id: '45678',
        state: 'Draft',
      };

      const createCaseEventTokenResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          token: 'create-case-event-token',
        },
      };

      const createCaseEventTokenRequest = {
        uponReceiving: 'a request to get citizen-create-application event token',
        withRequest: {
          method: 'POST',
          path: '/cases/45678/events',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      const createCaseResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: '45678',
          state: 'Draft',
          data: {},
        },
      };

      const createCaseRequest = {
        uponReceiving: 'a request to get citizen-create-application event token',
        withRequest: {
          method: 'POST',
          path: '/case-types/PRLAPPS/cases',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: {
            data: {
              applicant1FirstName: userDetails.givenName,
              applicant1LastName: userDetails.familyName,
              applicant1Email: userDetails.email,
            },
            event: { id: 'citizen-create-application' },
            event_token: 'create-case-event-token',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'prl-citizen-frontend makes request to get citizen-create-application event token',
          ...createCaseEventTokenRequest,
          willRespondWith: createCaseEventTokenResponse,
        };
        provider.addInteraction(interaction);

        const interaction2 = {
          state: 'prl-citizen-frontend makes request to create case',
          ...createCaseRequest,
          willRespondWith: createCaseResponse,
        };
        provider.addInteraction(interaction2);
      });

      it('creates a new case and return case data in response', async () => {
        const caseResponse = await caseApi.createCase('privatelaw', userDetails);
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });

    // describe('ccd_data_store case-users API', () => {
    //   const EXPECTED_CASE_USER_ROLES = {
    //     case_users: [{ case_id: '45678', user_id: '123456', case_role: 'citizen' }],
    //   };

    //   const getCaseUserRolesResponse = {
    //     status: 200,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: {
    //       case_users: [{ case_id: '45678', user_id: '123456', case_role: 'citizen' }],
    //     },
    //   };

    //   const getCaseUserRolesRequest = {
    //     uponReceiving: 'a request to get case-user roles',
    //     withRequest: {
    //       method: 'GET',
    //       path: '/case-users',
    //       headers: {
    //         Authorization: 'Bearer mock-user-access-token',
    //         ServiceAuthorization: 'mock-service-auth-token',
    //         experimental: 'true',
    //         Accept: '*/*',
    //         'Content-Type': 'application/json',
    //       },
    //       query: 'case_ids=45678&user_ids=123456',
    //     },
    //   };

    //   beforeEach(() => {
    //     const interaction = {
    //       state: 'prl-citizen-frontend makes request to get case-users roles',
    //       ...getCaseUserRolesRequest,
    //       willRespondWith: getCaseUserRolesResponse,
    //     };
    //     provider.addInteraction(interaction);
    //   });

    //   it('return case assigned user roles in response for given caseId and userId', async () => {
    //     const caseUserRoles = await caseApi.getCaseUserRoles('45678', userDetails.id);
    //     expect(caseUserRoles).toEqual(EXPECTED_CASE_USER_ROLES);
    //   });
    // });

  
  }
);
