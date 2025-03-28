/* eslint-disable import/no-named-as-default */
import https from 'https';

import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  CASE_TYPE,
  //CITIZEN_ADD_PAYMENT,
  CITIZEN_CREATE,
  CaseData,
  DocumentUploadResponse,
  JURISDICTION,
  LanguagePreference,
  //ListValue,
  //Payment,
  PrivateLaw,
  State,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';
import { logError } from './utils';

export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly userDetails: UserDetails,
    private readonly logger: LoggerInstance
  ) {}

  public async getOrCreateCase(
    serviceType: PrivateLaw,
    userDetails: UserDetails,
    languagePreference = LanguagePreference.ENGLISH
  ): Promise<CaseWithId> {
    const userCase = await this.getCase();
    return userCase || this.createCase(serviceType, userDetails, languagePreference);
  }

  private async getCase(): Promise<CaseWithId | false> {
    const cases = await this.getCases();

    switch (cases.length) {
      case 0: {
        return false;
      }
      case 1: {
        const { id, state, case_data: caseData } = cases[0];
        return { ...fromApiFormat(caseData), id: id.toString(), state };
      }
      default: {
        throw new Error('Too many cases assigned to user.');
      }
    }
  }

  public async getCases(): Promise<CcdV1Response[]> {
    try {
      const response = await this.axios.get<CcdV1Response[]>(
        `/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`
      );
      return response.data;
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.axios.get<CcdV2Response>(`/cases/${caseId}`);

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Case could not be retrieved.');
    }
  }
  private async createCase(
    serviceType: PrivateLaw,
    userDetails: UserDetails,
    languagePreference: LanguagePreference
  ): Promise<CaseWithId> {
    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.axios.get(
      `/case-types/${CASE_TYPE}/event-triggers/${CITIZEN_CREATE}`
    );
    const token = tokenResponse.data.token;
    const event = { id: CITIZEN_CREATE };
    const data = {
      serviceType,
      applicant1FirstName: userDetails.givenName,
      applicant1LastName: userDetails.familyName,
      applicant1Email: userDetails.email,
      applicant1LanguagePreference: languagePreference,
    };

    try {
      const response = await this.axios.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
        data,
        event,
        event_token: token,
      });
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Case could not be created.');
    }
  }

  public async uploadDocument(formdata: FormData): Promise<DocumentUploadResponse> {
    try {
      const response = await this.axios.post<DocumentUploadResponse>('/upload-citizen-document', formdata, {
        headers: {
          ...formdata.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      return { document: response.data.document, status: response.data.status };
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Document could not be uploaded.');
    }
  }

  public async deleteDocument(docId: string): Promise<void> {
    try {
      await this.axios.delete<void>(`/${docId}/delete`);
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Document could not be deleted.');
    }
  }

  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      logError(err, this.logger);
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
      logError(err, this.logger);
      throw new Error('Case could not be updated.');
    }
  }

  public async triggerEventWithData(
    caseId: string,
    userData: Partial<Case>,
    eventName: string,
    data: Partial<CaseData>
  ): Promise<CaseWithId> {
    // const data = toApiFormat(userData);
    // const data = userData;
    // return this.sendEvent(caseId, data, eventName);
    return this.sendEvent(caseId, data, eventName);
  }

  // public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
  //   return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  // }

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

export const caseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: `Bearer ${userDetails.accessToken}`,
        ServiceAuthorization: `Bearer ${getServiceAuthToken()}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
    userDetails,
    logger
  );
};
