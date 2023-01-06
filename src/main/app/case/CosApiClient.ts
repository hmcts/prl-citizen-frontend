import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import FormData from 'form-data';

import { DeleteDocumentRequest } from '../../app/document/DeleteDocumentRequest';
import { DocumentDetail } from '../../app/document/DocumentDetail';
import { GenerateAndUploadDocumentRequest } from '../../app/document/GenerateAndUploadDocumentRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { CaseWithId } from './case';
import { CaseData, RespondentCaseData, RespondentCaseId, YesOrNo } from './definition';
import { fromApiFormat } from './from-api-format';

export class CosApiClient {
  client: AxiosInstance;

  constructor(authToken: string, readonly returnUrl: string) {
    this.client = Axios.create({
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: 'Bearer ' + authToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        'return-url': returnUrl,
      },
    });
  }

  /**
   * It returns a string or undefined.
   * @returns The response.data is being returned.
   */
  public async get(): Promise<string | undefined> {
    try {
      const response = await this.client.get<string>('/');
      return response.data;
    } catch (e) {
      throw new Error('Could not connect to cos-api client.');
    }
  }

  /**
   * It retrieves a case from the COS service, and returns it in a format that the frontend can use
   * @param {string} caseId - The id of the case you want to retrieve
   * @param {UserDetails} user - UserDetails - this is the user object that is passed in from the front
   * end.
   * @returns The response from the API is being returned.
   */
  public async retrieveByCaseId(caseId: string, user: UserDetails): Promise<CaseWithId> {
    if (!caseId || !user) {
      return Promise.reject(new Error('Case id must be set and user must be set'));
    }
    const response = await Axios.get(config.get('services.cos.url') + `/${caseId}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
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

  public async validateAccessCode(caseId: string, accessCode: string, user: UserDetails): Promise<string> {
    if (!caseId || !user || !accessCode) {
      return Promise.reject(new Error('Case id must be set and user must be set'));
    }
    const response = await Axios.get(config.get('services.cos.url') + '/validate-access-code', {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        caseId,
        accessCode,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }

  public async updateCase(
    user: UserDetails,
    caseId: string,
    data: Partial<CaseData>,
    eventId: string
  ): Promise<CaseWithId> {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        accessCode: 'Dummy accessCode',
      };
      const response = await Axios.post(config.get('services.cos.url') + `/${caseId}/${eventId}/update-case`, data, {
        headers,
      });

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
    } catch (err) {
      throw new Error('Case could not be updated.');
    }
  }

  /**  submit respondent response*/
  public async submitRespondentResponse(
    user: UserDetails,
    caseId: string,
    partyId: string,
    data: Partial<CaseData>
  ): Promise<CaseWithId> {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
      };
      const response = await Axios.post(
        config.get('services.cos.url') + `/${caseId}/${partyId}/generate-c7document-final`,
        data,
        {
          headers,
        }
      );

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
    } catch (err) {
      throw new Error('Case could not be updated with c7 response fom respondent.');
    }
  }

  /**  generate c7 draft document*/
  public async generateC7DraftDocument(
    user: UserDetails,
    caseId: string,
    partyId: string,
    data: Partial<CaseData>
  ): Promise<DocumentDetail> {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
      };
      const response = await Axios.post(
        config.get('services.cos.url') + `/${caseId}/${partyId}/generate-c7document`,
        data,
        {
          headers,
        }
      );

      return {
        status: response.status,
        documentId: response.data?.document_binary_url,
        documentName: response.data?.document_filename,
      };
    } catch (err) {
      throw new Error('failed to generate c7 document.');
    }
  }

  public async generateUserUploadedStatementDocument(
    user: UserDetails,
    generateAndUploadDocumentRequest: GenerateAndUploadDocumentRequest
  ): Promise<DocumentDetail> {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
      };

      console.log('Generated document request: ', generateAndUploadDocumentRequest);
      const response = await Axios.post(
        config.get('services.cos.url') + '/generate-citizen-statement-document',
        generateAndUploadDocumentRequest,
        { headers }
      );
      return {
        status: response.status,
        documentId: response.data?.documentId,
        documentName: response.data?.documentName,
      };
    } catch (err) {
      throw new Error('Generate citizen statement document failed.');
    }
  }

  public async UploadDocumentListFromCitizen(request: UploadDocumentRequest): Promise<DocumentDetail> {
    try {
      const headers = {
        Accept: '*/*',
        'Content-Type': '*',
        Authorization: 'Bearer ' + request.user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
      };
      const formData = new FormData();

      for (const [, file] of Object.entries(request.files)) {
        formData.append('files', file.data, file.name);
      }

      formData.append('documentRequestedByCourt', request.documentRequestedByCourt);
      formData.append('caseId', request.caseId);
      formData.append('parentDocumentType', request.parentDocumentType);
      formData.append('documentType', request.documentType);
      formData.append('partyId', request.partyId);
      formData.append('partyName', request.partyName);
      formData.append('isApplicant', request.isApplicant);

      const response = await Axios.post(
        config.get('services.cos.url') + '/upload-citizen-statement-document',
        formData,
        { headers }
      );
      return {
        status: response.status,
        documentId: response.data?.documentId,
        documentName: response.data?.documentName,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new Error('Upload citizen statement document failed.');
    }
  }

  public async deleteCitizenStatementDocument(
    user: UserDetails,
    deleteDocumentRequest: DeleteDocumentRequest
  ): Promise<string> {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
      };

      const response = await Axios.post(
        config.get('services.cos.url') + '/delete-citizen-statement-document',
        deleteDocumentRequest,
        { headers }
      );
      return response.data;
    } catch (err) {
      throw new Error('Document could not be deleted.');
    }
  }

  public async linkCaseToCitizen(
    user: UserDetails,
    caseId: string,
    req: AppRequest,
    accessCode: string,
    data: Partial<CaseData>
  ): Promise<AxiosResponse> {
    try {
      data.applicantCaseName = 'Tom Jerry - updated';
      const eventId = 'linkCase';
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        accessCode,
      };
      const response = await Axios.post(config.get('services.cos.url') + `/${caseId}/${eventId}/update-case`, data, {
        headers,
      });
      return response;
    } catch (err) {
      throw new Error('Failed to link case to citizen.');
    }
  }

  /**
   * It takes a user, a caseId, a request and some data and returns a promise of an AxiosResponse
   * @param {UserDetails} user - UserDetails - this is the user object that is returned from the auth
   * service.
   * @param {RespondentCaseId} caseId - RespondentCaseId,
   * @param {AppRequest} req - AppRequest
   * @param {RespondentCaseData} data - RespondentCaseData
   * @returns The response from the API call.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async updateRespondentCase(
    user: UserDetails,
    caseId: RespondentCaseId,
    req: AppRequest,
    data: RespondentCaseData
  ): Promise<AxiosResponse> {
    try {
      const eventId = 'keepYourDetailsPrivate';
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
      };
      //: AxiosResponse<CaseWithId>
      const response = await Axios.post(config.get('services.cos.url') + `/${caseId}/${eventId}/update-case`, data, {
        headers,
      });
      return response;
    } catch (err) {
      throw new Error('Case could not be updated - updateRespondentCase');
    }
  }

  /**
   * It retrieves all cases from the COS service for a user and returns it in a format that the frontend can use
   * @param {UserDetails} user - UserDetails - this is the user object that is passed in from the front
   * end.
   * @returns The response from the API is being returned.
   */
  public async retrieveCasesByUserId(user: UserDetails): Promise<CaseWithId[]> {
    try {
      const response = await Axios.get(config.get('services.cos.url') + '/cases', {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
          ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return response.data.map(_case => ({
        ..._case.caseData,
        caseStatus: {
          state: _case.stateName,
        },
      }));
    } catch (e) {
      throw new Error('Could not retrive cases - retrieveCasesByUserId');
    }
  }
}

export interface UploadDocumentRequest {
  user: UserDetails;
  caseId: string;
  parentDocumentType: string;
  documentType: string;
  partyId: string;
  partyName: string;
  isApplicant: string;
  files: UploadedFiles;
  documentRequestedByCourt: YesOrNo;
}

export type UploadedFiles =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];
