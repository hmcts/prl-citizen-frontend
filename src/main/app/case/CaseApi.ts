import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
//import { stat } from 'fs';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  //Adoption,
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  CITIZEN_CREATE,
  CaseData,
  //JURISDICTION,
  ListValue,
  Payment,
  State,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

// enum AdoptionServiceType {
//   INTERNATIONAL_ADOPTION = 'internationalAdoption',
//   RELINQUISHED_ADOPTION = 'relinquishedAdoption',
//   STEPPARENT_ADOPTION = 'stepparentAdoption',
//   PARENTAL_ORDERS = 'parentalOrders'
//   }

//   enum PrivateLawServiceType {
//   FEMALE_GENITAL_MUTILATION_ORDERS = 'femaleGenitalMutilationOrdersFGM',
//   FORCED_MARRIAGE_PROTECTION_ORDER = 'forcedProtectionMarriageOrderFMPO',
//   SPECIAL_GUARDIANSHIP = 'specialGuardianship',
//   FINANCIAL_APPLICATIONS = 'financialApplications',
//   DECLARATION_OF_PARENTAGE = 'declarationOfParentage'
//   }
export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    //private readonly userDetails: UserDetails,
    private readonly logger: LoggerInstance
  ) {}

  public async getOrCreateCase(/*serviceType: Adoption, userDetails: UserDetails*/): Promise<CaseWithId> {
    //const userCase = await this.getCase();
    //return userCase || this.createCase(serviceType, userDetails);
    //return this.createCase();
    return { id: '', state: State.Holding };
  }

  public async getOrCreateCaseNew(
    req: AppRequest,
    userDetails: UserDetails,
    formData: Partial<Case>
  ): Promise<CaseWithId> {
    return this.createCaseNew(req, userDetails, formData);
  }

  /* private async getCase(): Promise<CaseWithId | false> {
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
  } */

  /* private async getCases(): Promise<CcdV1Response[]> {
    try {
      const response = await this.axios.get<CcdV1Response[]>(
        `/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`
      );
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  } */

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.axios.get<CcdV2Response>(`/cases/${caseId}`);

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  private getCaseType(req: AppRequest): string {
    let caseType = '';
    //const adoptionServiceTypeValues = Object.values(AdoptionServiceType);

    if (req.session.userCase.serviceType === 'Yes') {
      caseType = 'A58';
    } else if (req.session.userCase.serviceType === 'No') {
      caseType = 'A58';
    }

    return caseType;
  }

  public async createCaseNew(req: AppRequest, userDetails: UserDetails, formData: Partial<Case>): Promise<CaseWithId> {
    const caseType = this.getCaseType(req);
    console.log('caseType=>' + caseType);
    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.axios.get(
      `/case-types/${CASE_TYPE}/event-triggers/${CITIZEN_CREATE}`
    );
    //console.log('caseapi.ts ' + serviceType);
    const token = tokenResponse.data.token;
    const event = { id: CITIZEN_CREATE };
    const data = {
      //adoption: serviceType,
      // applicant1FirstName: userDetails.givenName,
      // applicant1LastName: userDetails.familyName,
      // applicant1Email: userDetails.email,
      applicant1FirstName: formData.applicant1FirstNames,
      applicant1LastName: formData.applicant1LastNames,
      applicant1Email: userDetails.email,
    };
    //console.log("token => "+token+", event => "+event+", data => "+data);
    try {
      const response = await this.axios.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
        data,
        event,
        event_token: token,
      });

      //console.log("response =======> "+JSON.stringify(response.data));
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  // TODO: clean up below code
  /*private async createCase(serviceType: Adoption, userDetails: UserDetails) ): Promise<CaseWithId> {

    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.axios.get(
          `/case-types/${CASE_TYPE}/event-triggers/${CITIZEN_CREATE}`
        );
        console.log('caseapi.ts ' + serviceType);
        const token = tokenResponse.data.token;
        const event = { id: CITIZEN_CREATE };
        const data = {
          //adoption: serviceType,
          applicant1FirstName: userDetails.givenName,
          applicant1LastName: userDetails.familyName,
          applicant1Email: userDetails.email,
        };

    try {

    const response = await this.axios.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
            data,
            event,
            event_token: token,
          });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
      return { id: '', state: State.Holding };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }*/

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
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const data = toApiFormat(userData);
    return this.sendEvent(caseId, data, eventName);
  }

  public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
    return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  }

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
    //userDetails,
    logger
  );
};

/* interface CcdV1Response {
  id: string;
  state: State;
  case_data: CaseData;
} */

interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
