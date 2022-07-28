import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import type { UserDetails } from '../controller/AppRequest';

import { CaseWithId } from './case';
import { CaseData } from './definition';
import { fromApiFormat } from './from-api-format';

export class CosApiClient {
  client: AxiosInstance;

  constructor(authToken: string, readonly returnUrl: string) {
    this.client = Axios.create({
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: 'Bearer ' + authToken,
        serviceAuthorization: getServiceAuthToken(),
        'return-url': returnUrl,
      },
    });
  }

  public async get(): Promise<string | undefined> {
    try {
      const response = await this.client.get<string>('/');
      const userCase = null;
      console.info(userCase);
      console.info(JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      //const errMsg = 'Error connecting cos';
      //console.error(errMsg);
    }
  }

  public async retrieveByCaseId(caseId: string, user: UserDetails): Promise<CaseWithId> {
    if (!caseId || !user) {
      return Promise.reject(new Error('Case id must be set and user must be set'));
    }
    const response = await Axios.get(config.get('services.cos.url') + `/${caseId}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        serviceAuthorization: getServiceAuthToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data.id,
      state: response.data.state,
      ...fromApiFormat(response.data),
    };
  }

  public async updateCase(
    user: UserDetails,
    caseId: string,
    data: Partial<CaseData>,
    eventId: string
  ): Promise<CaseWithId> {
    data.applicantCaseName = 'Legend';
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        serviceAuthorization: getServiceAuthToken(),
      };
      const response: AxiosResponse<CaseWithId> = await Axios.post(
        config.get('services.cos.url') + `/${caseId}/${eventId}/update-case`,
        data,
        { headers }
      );

      //console.log(response.data);
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
    } catch (err) {
      throw new Error('Case could not be updated.');
    }
  }
}
