import Axios, { AxiosInstance } from 'axios';
import config from 'config';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import type { AppSession } from '../controller/AppRequest';

export class CosApiClient {
  client: AxiosInstance;

  constructor(private readonly session: AppSession, readonly returnUrl: string) {
    this.client = Axios.create({
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: 'Bearer ' + session.user.accessToken,
        serviceAuthorization: getServiceAuthToken(),
        'return-url': returnUrl,
      },
    });
  }

  public async get(): Promise<string | undefined> {
    try {
      const response = await this.client.get<string>('/');
      const userCase = this.session.userCase;
      console.info(userCase);
      console.info(JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      const errMsg = 'Error connecting cos';
      console.error(errMsg);
    }
  }
}
