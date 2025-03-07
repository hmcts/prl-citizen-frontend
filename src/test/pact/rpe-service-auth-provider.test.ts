import config from 'config';
import { when } from 'jest-when';

import { getTokenFromApi } from '../../main/app/auth/service/get-service-auth-token';

const { Matchers } = require('@pact-foundation/pact');
const { pactWith } = require('jest-pact');
const { string } = Matchers;

jest.mock('otplib', () => ({
  authenticator: {
    generate: jest.fn(() => '784467'),
  },
}));

config.get = jest.fn();

pactWith(
  {
    consumer: 'prl-citizen-frontend',
    provider: 's2s_auth',
    logLevel: 'DEBUG',
  },
  provider => {
    describe('rpe-service-auth-provider API', () => {
      const EXPECTED_RESPONSE = { 'pact:matcher:type': 'type', value: 'someMicroServiceToken' };

      const successResponse = {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
        body: string('someMicroServiceToken'),
      };

      const serviceAuthTokenRequest = {
        uponReceiving: 'a request for a token',
        withRequest: {
          method: 'POST',
          path: '/lease',
          headers: {
            'content-type': 'application/json',
          },
          body: {
            microservice: 'microserviceName',
            oneTimePassword: '784467',
          },
        },
      };

      beforeEach(() => {
        when(config.get)
          .calledWith('services.authProvider.url')
          .mockReturnValue(provider.mockService.baseUrl)
          .calledWith('services.authProvider.microservice')
          .mockReturnValue('microserviceName')
          .calledWith('services.authProvider.secret')
          .mockReturnValue('mock-secret');

        const interaction = {
          state: 'microservice with valid credentials',
          ...serviceAuthTokenRequest,
          willRespondWith: successResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a service auth token', async () => {
        const token = await getTokenFromApi();
        expect(token).toEqual(EXPECTED_RESPONSE);
      });
    });
  }
);
