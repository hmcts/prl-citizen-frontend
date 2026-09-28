import { Pact } from '@pact-foundation/pact';
import config from 'config';
import { when } from 'jest-when';

import { getTokenFromApi } from '../../main/app/auth/service/get-service-auth-token';

jest.mock('../../main/app/auth/service/otp', () => ({
  generateOTP: jest.fn().mockResolvedValue('123456'),
}));

config.get = jest.fn();

const provider = new Pact({
  consumer: 'prl-citizen-frontend',
  provider: 's2s_auth',
  logLevel: 'debug',
});

describe('rpe-service-auth-provider API', () => {
  const EXPECTED_RESPONSE = 'MOCK_TOKEN';

  it('returns a service auth token', async () => {
    await provider
      .addInteraction()
      .given('i request a service auth token')
      .uponReceiving('a request for service auth token')
      .withRequest('POST', '/lease', request =>
        request
          .headers({
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
          })
          .jsonBody({
            microservice: 'prl-citizen-frontend',
            oneTimePassword: '123456',
          })
      )
      .willRespondWith(200, response =>
        response.headers({ 'content-type': 'application/json' }).jsonBody(EXPECTED_RESPONSE)
      )
      .executeTest(async mockServer => {
        when(config.get)
          .calledWith('services.authProvider.url')
          .mockReturnValue(mockServer.url)
          .calledWith('services.authProvider.microservice')
          .mockReturnValue('prl-citizen-frontend')
          .calledWith('services.authProvider.secret')
          .mockReturnValue('mock-secret');

        const token = await getTokenFromApi();
        expect(token).toEqual(EXPECTED_RESPONSE);
      });
  });
});
