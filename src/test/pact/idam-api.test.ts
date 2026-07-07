import http from 'node:http';

import axios from 'axios';
import config from 'config';

import { getSystemUser, getUserDetails } from '../../main/app/auth/user/oidc';

const { pactWith } = require('jest-pact');

const idamApiTestUsername = (process.env.IDAM_API_TEST_USERNAME || process.env.CITIZEN_USERNAME) as string;
const idamApiTestPassword = (process.env.IDAM_API_TEST_PASSWORD || process.env.CITIZEN_PW) as string;
const idamApiTestClientSecret = (process.env.IDAM_API_TEST_CLIENT_SECRET || process.env.CITIZEN_IDAM_SECRET) as string;

if (!idamApiTestUsername || !idamApiTestPassword || !idamApiTestClientSecret) {
  throw new Error(
    'Missing IDAM pact test credentials. Set IDAM_API_TEST_* vars (preferred) or CI fallbacks CITIZEN_USERNAME/CITIZEN_PW/CITIZEN_IDAM_SECRET.'
  );
}

jest.setTimeout(10000);
pactWith(
  {
    consumer: 'prl-citizen-frontend',
    provider: 'idamApi_oidc',
    logLevel: 'DEBUG',
  },
  provider => {
    describe('idam-get-user-details API', () => {
      const EXPECTED_USER_DETAILS = {
        accessToken: 'mock_access_token',
        id: '267491aa-b696-4235-83a6-3b9253709798',
        email: idamApiTestUsername,
        givenName: 'citizen',
        familyName: 'automation',
      };

      const getUserDetailsSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          scope: 'openid profile roles',
          id_token:
            'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiLWRQR3FQR3ZGc2swTm5ZVUtycWV1ZyIsInN1YiI6ImNpdGl6ZW4uYXV0b21hdGlvbkBtYWlsaW5hdG9yLmNvbSIsImF1ZGl0VHJhY2tpbmdJZCI6IjYwNDBmMzljLTE1M2UtNDRiMS04ZTlhLTMxNDNiZDQ4NjVkYS0zNDUxNzkyMiIsInJvbGVzIjpbImNpdGl6ZW4iXSwiaXNzIjoiaHR0cHM6Ly9mb3JnZXJvY2stYW0uc2VydmljZS5jb3JlLWNvbXB1dGUtaWRhbS1hYXQyLmludGVybmFsOjg0NDMvb3BlbmFtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvaG1jdHMiLCJ0b2tlbk5hbWUiOiJpZF90b2tlbiIsImdpdmVuX25hbWUiOiJjaXRpemVuIiwidWlkIjoiMjY3NDkxYWEtYjY5Ni00MjM1LTgzYTYtM2I5MjUzNzA5Nzk4IiwiYXVkIjoiYWRvcHRpb24td2ViIiwiY19oYXNoIjoiNFE5V1RxNEl6YXRHR3ZrM0lobm5ZZyIsImFjciI6IjAiLCJhenAiOiJhZG9wdGlvbi13ZWIiLCJhdXRoX3RpbWUiOjE2NDc2MDIzODYsIm5hbWUiOiJjaXRpemVuIGF1dG9tYXRpb24iLCJyZWFsbSI6Ii9obWN0cyIsImV4cCI6MTY0NzYwNTk4NiwidG9rZW5UeXBlIjoiSldUVG9rZW4iLCJmYW1pbHlfbmFtZSI6ImF1dG9tYXRpb24iLCJpYXQiOjE2NDc2MDIzODZ9.pDD_n-4AM4-APP-iAVgL-fTxD7cSyIzn5pa0mDsvFr8NM8_Uq8pB-bIJ_tPeN07tWvibc02epqWTIX8ex_BelRzp7dbXuP7zdY2xKJ1bH7Zg2twNiOk-oNxTigyhOor3OJYGm3UY6YG42iby4Z17UkwbmrdE9NqkKOmTQKgr2zaOwQARlkp9lEKHJUSsTkM3QFnvgQQhSL-osDOKSPAw1mlCuT-8Ogsj2z4PUYm7Fw3kjjknkB1_ikogyrKU5Wt9Ab1if8dgnGsiBfkpw26Cp9NaG0An8-dgQSIrwVfoLkJSWoVDJKW-IaDsVdKXmiiJbSnyjJt4o4n_jaqIHLpihw',
          token_type: 'Bearer',
          expires_in: '28799',
        },
      };

      const getUserDetailsRequest = {
        uponReceiving: 'a request to get user details',
        withRequest: {
          method: 'POST',
          path: '/o/token',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `client_id=prl-citizen-frontend&client_secret=${idamApiTestClientSecret}&grant_type=authorization_code&redirect_uri=http://localhost:3001/receiver&code=raw-code`,
        },
      };

      beforeEach(() => {
        // Pact spins up/down mock servers between tests; disable keep-alive so Axios does not reuse stale sockets.
        axios.defaults.httpAgent = new http.Agent({ keepAlive: false });
        config.get = jest.fn() as never;
        (config.get as jest.Mock).mockImplementation((configPath: string) => {
          const configMap: Record<string, string> = {
            'services.idam.tokenURL': `${provider.mockService.baseUrl}/o/token`,
            'services.idam.clientID': 'prl-citizen-frontend',
            'services.idam.citizenClientSecret': idamApiTestClientSecret,
          };

          return configMap[configPath];
        });

        const interaction = {
          state: 'adoption-web request user details from idam',
          ...getUserDetailsRequest,
          willRespondWith: getUserDetailsSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns user details', async () => {
        const userDetails = await getUserDetails('http://localhost:3001', 'raw-code', '/receiver');
        expect(userDetails).toEqual(EXPECTED_USER_DETAILS);
      });
    });

    describe('idam-get-system-user-details API', () => {
      const EXPECTED_USER_DETAILS = {
        accessToken: 'mock_access_token',
        id: '267491aa-b696-4235-83a6-3b9253709798',
        email: idamApiTestUsername,
        givenName: 'citizen',
        familyName: 'automation',
      };

      const getUserDetailsSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          scope: 'openid profile roles',
          id_token:
            'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiLWRQR3FQR3ZGc2swTm5ZVUtycWV1ZyIsInN1YiI6ImNpdGl6ZW4uYXV0b21hdGlvbkBtYWlsaW5hdG9yLmNvbSIsImF1ZGl0VHJhY2tpbmdJZCI6IjYwNDBmMzljLTE1M2UtNDRiMS04ZTlhLTMxNDNiZDQ4NjVkYS0zNDUxNzkyMiIsInJvbGVzIjpbImNpdGl6ZW4iXSwiaXNzIjoiaHR0cHM6Ly9mb3JnZXJvY2stYW0uc2VydmljZS5jb3JlLWNvbXB1dGUtaWRhbS1hYXQyLmludGVybmFsOjg0NDMvb3BlbmFtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvaG1jdHMiLCJ0b2tlbk5hbWUiOiJpZF90b2tlbiIsImdpdmVuX25hbWUiOiJjaXRpemVuIiwidWlkIjoiMjY3NDkxYWEtYjY5Ni00MjM1LTgzYTYtM2I5MjUzNzA5Nzk4IiwiYXVkIjoiYWRvcHRpb24td2ViIiwiY19oYXNoIjoiNFE5V1RxNEl6YXRHR3ZrM0lobm5ZZyIsImFjciI6IjAiLCJhenAiOiJhZG9wdGlvbi13ZWIiLCJhdXRoX3RpbWUiOjE2NDc2MDIzODYsIm5hbWUiOiJjaXRpemVuIGF1dG9tYXRpb24iLCJyZWFsbSI6Ii9obWN0cyIsImV4cCI6MTY0NzYwNTk4NiwidG9rZW5UeXBlIjoiSldUVG9rZW4iLCJmYW1pbHlfbmFtZSI6ImF1dG9tYXRpb24iLCJpYXQiOjE2NDc2MDIzODZ9.pDD_n-4AM4-APP-iAVgL-fTxD7cSyIzn5pa0mDsvFr8NM8_Uq8pB-bIJ_tPeN07tWvibc02epqWTIX8ex_BelRzp7dbXuP7zdY2xKJ1bH7Zg2twNiOk-oNxTigyhOor3OJYGm3UY6YG42iby4Z17UkwbmrdE9NqkKOmTQKgr2zaOwQARlkp9lEKHJUSsTkM3QFnvgQQhSL-osDOKSPAw1mlCuT-8Ogsj2z4PUYm7Fw3kjjknkB1_ikogyrKU5Wt9Ab1if8dgnGsiBfkpw26Cp9NaG0An8-dgQSIrwVfoLkJSWoVDJKW-IaDsVdKXmiiJbSnyjJt4o4n_jaqIHLpihw',
          token_type: 'Bearer',
          expires_in: '28799',
        },
      };

      const getUserDetailsRequest = {
        uponReceiving: 'a request to get system-user details',
        withRequest: {
          method: 'POST',
          path: '/o/token',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=password&username=${idamApiTestUsername}&password=${idamApiTestPassword}&client_id=prl-citizen-frontend&client_secret=${idamApiTestClientSecret}&scope=openid%20profile%20roles%20openid%20roles%20profile`,
        },
      };

      beforeEach(() => {
        axios.defaults.httpAgent = new http.Agent({ keepAlive: false });
        config.get = jest.fn() as never;
        (config.get as jest.Mock).mockImplementation((configPath: string) => {
          const configMap: Record<string, string> = {
            'services.idam.tokenURL': `${provider.mockService.baseUrl}/o/token`,
            'services.idam.clientID': 'prl-citizen-frontend',
            'services.idam.citizenClientSecret': idamApiTestClientSecret,
            'services.idam.systemUsername': idamApiTestUsername,
            'services.idam.systemPassword': idamApiTestPassword,
          };

          return configMap[configPath];
        });

        const interaction = {
          state: 'prl-citizen-frontend request system-user details from idam',
          ...getUserDetailsRequest,
          willRespondWith: getUserDetailsSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns user details', async () => {
        const userDetails = await getSystemUser();
        expect(userDetails).toEqual(EXPECTED_USER_DETAILS);
      });
    });
  }
);
