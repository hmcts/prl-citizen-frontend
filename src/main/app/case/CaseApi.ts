import Axios, { AxiosError, AxiosInstance,AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { Case,  CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import { CASE_TYPE, CaseData, JURISDICTION, State } from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly userDetails: UserDetails,
    private readonly logger: LoggerInstance
  ) {}

  public async getCases(): Promise<CcdV1Response[]> {
    try {
      const response = await this.axios.get<CcdV1Response[]>(
        `/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`
      );
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.axios.get<CcdV2Response>(`/cases/${caseId}`);
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case roles could not be fetched.');
    }
  }

  private async sendEvent(caseId: string, data: Partial<CaseData>, eventName: string): Promise<CaseWithId> {
     try {
       const tokenResponse = await this.axios.get<CcdTokenResponse>(`/cases/${caseId}/event-triggers/${eventName}`);
       const token = tokenResponse.data.token;
       const event = { id: eventName };

       const response: AxiosResponse<CcdV2Response> = await this.axios.post(`/cases/${caseId}/events`, {
         event,
         data,
         event_token: token,
       });
       // ...fromApiFormat(response.data.data)
       return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
     } catch (err) {
       this.logError(err);
       throw new Error('Case could not be updated.');
     }
   }

  // public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
  //   //const data = toApiFormat(userData);
  //   //const data = userData;
  //   // return this.sendEvent(caseId, data, eventName);
  //   console.log(eventName);
  //   return this.sendEvent(caseId, userData, eventName);
  // }

  // public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
  //   return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  // }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
  }
  
  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return this.sendEvent(caseId, toApiFormat(userData), eventName);
  }
  
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.case.url'),
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    userDetails,
    logger
  );
};

interface CcdV1Response {
  id: string;
  state: State;
  case_data: CaseData;
}

interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
