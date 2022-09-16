import https from 'https';

import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { C100 } from './definition';

interface CreateCaseResponse {
  id: string;
}

export interface DocumentUploadResponse {
  status: string;
  document: {
    document_url: string;
    document_binary_url: string;
    document_filename: string;
    document_hash: string;
    document_creation_date: string;
  };
}

class CaseApi {
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public async createCase(): Promise<CreateCaseResponse> {
    const data = {
      caseTypeOfApplication: C100.CASE_TYPE_OF_APPLICATION,
    };

    try {
      const response = await this.axios.post<CreateCaseResponse>('/case/create', {
        data,
      });
      return { id: response.data.id };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  public async uploadDocument(formdata: FormData): Promise<DocumentUploadResponse> {
    try {
      const response = await this.axios.post<DocumentUploadResponse>('/upload-citizen-statement-document', formdata, {
        headers: {
          ...formdata.getHeaders(),
        },
      });
      return { document: response.data.document, status: response.data.status };
    } catch (err) {
      this.logError(err);
      throw new Error('Document could not be uploaded.');
    }
  }

  public async deleteDocument(docId: string): Promise<void> {
    try {
      await this.axios.delete<void>(`/${docId}/delete`);
    } catch (err) {
      this.logError(err);
      throw new Error('Document could not be deleted.');
    }
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

export const caseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: `Bearer ${userDetails.accessToken}`,
        serviceAuthorization: `Bearer ${getServiceAuthToken()}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
    logger
  );
};
