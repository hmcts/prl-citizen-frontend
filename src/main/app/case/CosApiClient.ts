import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { DeleteDocumentRequest } from '../../app/document/DeleteDocumentRequest';
import { DocumentDetail } from '../../app/document/DocumentDetail';
import { GenerateAndUploadDocumentRequest } from '../../app/document/GenerateAndUploadDocumentRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import type { UserDetails } from '../controller/AppRequest';

import { CaseWithId } from './case';
import { CaseData, CaseEvent, CaseType, PartyDetails, PartyType, YesOrNo } from './definition';
import { fromApiFormat } from './from-api-format';

export class CosApiClient {
  client: AxiosInstance;

  constructor(authToken: string, private readonly logger: LoggerInstance) {
    this.client = Axios.create({
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: 'Bearer ' + authToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
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

    try {
      const response = await this.client.get(config.get('services.cos.url') + `/${caseId}`);

      return {
        id: response.data.id,
        state: response.data.state,
        ...fromApiFormat(response.data),
      };
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, could not retreive case data - retrieveByCaseId.');
    }
  }

  public async validateAccessCode(caseId: string, accessCode: string, user: UserDetails): Promise<string> {
    if (!caseId || !user || !accessCode) {
      throw new Error('Case id must be set and user must be set');
    }

    const data = {
      caseId,
      accessCode,
    };

    try {
      const response = await this.client.post(config.get('services.cos.url') + '/citizen/validate-access-code', data, {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
          ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        },
      });

      return response.data;
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, validate access code failed - validateAccessCode');
    }
  }

  public async updateCase(caseId: string, data: Partial<CaseData>, eventId: string): Promise<CaseWithId> {
    try {
      const response = await this.client.post(
        config.get('services.cos.url') + `/${caseId}/${eventId}/update-case`,
        data
      );

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, case could not be updated - updateCase');
    }
  }

  public async updateCaseData(
    caseId: string,
    partyDetails: Partial<PartyDetails>,
    partyType: PartyType,
    caseType: CaseType,
    eventName: CaseEvent
  ): Promise<CaseWithId> {
    try {
      const data = {
        partyDetails,
        partyType,
        caseType,
      };
      const response = await this.client.post(
        config.get('services.cos.url') + `/citizen/${caseId}/${eventName}/update-party-details`,
        data
      );

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, case could not be updated - updateCaseData');
    }
  }

  /**  submit respondent response*/
  public async submitRespondentResponse(caseId: string, partyId: string, data: Partial<CaseData>): Promise<CaseWithId> {
    try {
      const response = await this.client.post(
        config.get('services.cos.url') + `/${caseId}/${partyId}/generate-c7document-final`,
        data
      );

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, final-c7document generation failed - submitRespondentResponse');
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
      const response = await this.client.post(
        config.get('services.cos.url') + `/${caseId}/${partyId}/generate-c7document`,
        data
      );

      return {
        status: response.status,
        documentId: response.data?.document_binary_url,
        documentName: response.data?.document_filename,
      };
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, draft-c7document generation failed - generateC7DraftDocument');
    }
  }

  public async generateUserUploadedStatementDocument(
    generateAndUploadDocumentRequest: GenerateAndUploadDocumentRequest
  ): Promise<DocumentDetail> {
    try {
      const response = await this.client.post(
        config.get('services.cos.url') + '/generate-citizen-statement-document',
        generateAndUploadDocumentRequest
      );
      return {
        status: response.status,
        documentId: response.data?.documentId,
        documentName: response.data?.documentName,
      };
    } catch (error) {
      this.logError(error);
      throw new Error(
        'Error occured, citizen-statement document generation failed - generateUserUploadedStatementDocument'
      );
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

      const response = await this.client.post(
        config.get('services.cos.url') + '/upload-citizen-statement-document',
        formData,
        { headers }
      );
      return {
        status: response.status,
        documentId: response.data?.documentId,
        documentName: response.data?.documentName,
      };
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, upload citizen statement document failed - UploadDocumentListFromCitizen');
    }
  }

  public async deleteCitizenStatementDocument(deleteDocumentRequest: DeleteDocumentRequest): Promise<string> {
    try {
      const response = await this.client.post(
        config.get('services.cos.url') + '/delete-citizen-statement-document',
        deleteDocumentRequest
      );
      return response.data;
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, document could not be deleted. - deleteCitizenStatementDocument');
    }
  }

  public async linkCaseToCitizen(caseId: string, accessCode: string): Promise<AxiosResponse> {
    try {
      const data = {
        caseId,
        accessCode,
      };

      const response = await this.client.post(config.get('services.cos.url') + '/citizen/link-case-to-account', data);
      return response;
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, failed to link case to citizen - linkCaseToCitizen');
    }
  }

  /**
   * It retrieves all cases from the COS service for a user and returns it in a format that the frontend can use
   * @param {UserDetails} user - UserDetails - this is the user object that is passed in from the front
   * end.
   * @returns The response from the API is being returned.
   */
  public async retrieveCasesByUserId(): Promise<CaseWithId[]> {
    try {
      const response = await this.client.get(config.get('services.cos.url') + '/cases');

      return response.data.map(_case => ({
        ..._case.caseData,
        caseStatus: {
          state: _case.stateName,
        },
      }));
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, could not retrive cases - retrieveCasesByUserId');
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public async retrieveCaseHearingsByCaseId(user: UserDetails, caseId: string): Promise<any> {
    try {
      const response = await this.client.post(config.get('services.cos.url') + `/hearing/${caseId}`);

      return response.data;
    } catch (error) {
      this.logError(error);
      throw new Error('Error occured, case could not be updated - retrieveCaseHearingsByCaseId');
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
