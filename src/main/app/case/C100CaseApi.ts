/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { C100_CASE_NAME } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppSession, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { C100_CASE_EVENT, C100_CASE_TYPE, State } from './definition';
export class CaseApi {
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public async retrieveCaseById(caseId: string): Promise<RetreiveDraftCase> {
    if (!caseId) {
      throw new Error('caseId cannot be empty');
    }
    try {
      const response = await this.axios.get<RetreiveDraftCase>(`${config.get('services.cos.url')}/${caseId}`);
      return detransformCaseData(response.data);
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retreived');
    }
  }

  public async createCase(): Promise<CreateCaseResponse> {
    const data = {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      c100RebuildReturnUrl: C100_CASE_NAME, //added to handle deafult returnURL incase save & come back is not invoked at all
    };

    try {
      const response = await this.axios.post<CreateCaseResponse>('/case/create', data);
      const { id, caseTypeOfApplication, c100RebuildReturnUrl, state, noOfDaysRemainingToSubmitCase } = response?.data;
      return { id, caseTypeOfApplication, c100RebuildReturnUrl, state, noOfDaysRemainingToSubmitCase };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  public async TScreateCase(): Promise<CreateCaseResponse> {

    try {
      const response = await this.axios.post<CreateCaseResponse>('/testing-support/create-dummy-citizen-case');
      //const { id, caseTypeOfApplication, c100RebuildReturnUrl, state, noOfDaysRemainingToSubmitCase } = response?.data;
      console.log(response)
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  /**
   * This is used to update/submit case based on the case event passed
   * @param caseId
   * @param caseData
   * @param returnUrl
   * @param caseEvent
   * @returns
   */
  public async updateCase(
    caseId: string,
    caseData: Partial<CaseWithId>,
    returnUrl: string,
    caseEvent: C100_CASE_EVENT
  ): Promise<UpdateCaseResponse> {
    const { caseTypeOfApplication, c100RebuildChildPostCode, helpWithFeesReferenceNumber, applicantCaseName, ...rest } =
      caseData;
    const data: UpdateCaseRequest = {
      ...transformCaseData(rest),
      caseTypeOfApplication: caseTypeOfApplication as string,
      applicantCaseName,
      c100RebuildChildPostCode,
      helpWithFeesReferenceNumber,
      c100RebuildReturnUrl: returnUrl,
      id: caseId,
      paymentServiceRequestReferenceNumber: caseData.paymentDetails?.serviceRequestReference,
      paymentReferenceNumber: caseData.paymentDetails?.payment_reference,
    };
    try {
      const response = await this.axios.post<UpdateCaseResponse>(`${caseId}/${caseEvent}/update-case`, data, {
        headers: {
          accessCode: 'null',
        },
      });
      return { data: response.data };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  /**
   * Delete Case
   * State: DELETED
   * Event: C100_CASE_EVENT.DELETE_CASE
   * @param caseData
   * @param session
   */
  public async deleteCase(caseData: Partial<CaseWithId>, session: AppSession): Promise<void> {
    try {
      caseData = { ...caseData, state: State.DELETED };
      const { caseId } = caseData;
      if (!caseId) {
        throw new Error('caseId not found so case could not be deleted.');
      }
      await this.axios.post<UpdateCaseResponse>(`${caseId}/${C100_CASE_EVENT.DELETE_CASE}/update-case`, caseData, {
        headers: {
          accessCode: 'null',
        },
      });
      session.userCase = {} as CaseWithId;
      session.save();
    } catch (err) {
      this.logError(err);
      throw new Error('Error occured, case could not be deleted.');
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

  public async downloadDraftApplication(docId: string): Promise<void> {
    try {
      const response = await this.axios.get(`/${docId}/download`, {
        responseType: 'arraybuffer',
      });
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Draft application could not be downloaded.');
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
        ServiceAuthorization: `Bearer ${getServiceAuthToken()}`,
        'Content-Type': 'application/json',
      },
    }),
    logger
  );
};

const transformCaseData = (caseData: Partial<Case>): UpdateCase => {
  const caseDataMapperKeys = Object.keys(updateCaseDataMapper);
  const transformedCaseData = Object.entries(caseData).reduce((transformedData: Record<string, any>, [field, data]) => {
    const [type] = field.split('_');
    const key = updateCaseDataMapper[type];

    if (caseDataMapperKeys.includes(type) && !transformedData[key]) {
      transformedData[key] = {};
    }

    if (transformedData[key]) {
      transformedData[key][field] = data;
    }

    return transformedData;
  }, {});

  return (
    Object.entries(transformedCaseData).reduce((data: UpdateCase, [_field, _data]) => {
      data[_field] = JSON.stringify(_data);
      return data;
    }, {}) ?? {}
  );
};

const detransformCaseData = (caseData: RetreiveDraftCase): RetreiveDraftCase => {
  let detransformedCaseData = {
    caseId: caseData.id,
    applicantCaseName: caseData.applicantCaseName,
    caseTypeOfApplication: caseData.caseTypeOfApplication,
    c100RebuildChildPostCode: caseData.c100RebuildChildPostCode,
    helpWithFeesReferenceNumber: caseData.helpWithFeesReferenceNumber,
    c100RebuildReturnUrl: caseData.c100RebuildReturnUrl,
    state: caseData.state,
    noOfDaysRemainingToSubmitCase: caseData.noOfDaysRemainingToSubmitCase,
  } as RetreiveDraftCase;

  Object.values(updateCaseDataMapper).forEach(field => {
    if (field in caseData) {
      detransformedCaseData = { ...detransformedCaseData, ...JSON.parse(caseData[field]) };
      delete detransformedCaseData[field];
    }
  });

  return detransformedCaseData;
};


interface CreateCaseResponse {
  id: string;
  caseTypeOfApplication: string;
  c100RebuildReturnUrl: string;
  state: State;
  noOfDaysRemainingToSubmitCase: string;
}
interface UpdateCaseResponse {
  [key: string]: any;
}

export interface RetreiveDraftCase extends CaseWithId {
  caseTypeOfApplication: string;
  c100RebuildChildPostCode?: string;
  helpWithFeesReferenceNumber?: string;
  c100RebuildReturnUrl: string;
}

interface UpdateCase {
  c100RebuildInternationalElements?: Record<string, string>;
  c100RebuildReasonableAdjustments?: Record<string, string>;
  c100RebuildTypeOfOrder?: Record<string, string>;
  c100RebuildHearingWithoutNotice?: Record<string, string>;
  c100RebuildOtherProceedings?: Record<string, string>;
  c100RebuildChildDetails?: Record<string, string>;
  c100RebuildMaim?: Record<string, string>;
  c100RebuildHearingUrgency?: Record<string, string>;
  c100RebuildOtherChildrenDetails?: Record<string, string>;
  c100RebuildApplicantDetails?: Record<string, string>;
  c100RebuildRespondentDetails?: Record<string, string>;
  c100RebuildOtherPersonsDetails?: Record<string, string>;
  c100RebuildSafetyConcerns?: Record<string, string>;
  c100RebuildScreeningQuestions?: Record<string, string>;
  c100RebuildConsentOrderDetails?: Record<string, string>;
  c100RebuildHelpWithFeesDetails?: Record<string, string>;
}

interface UpdateCaseRequest extends UpdateCase {
  caseTypeOfApplication: string;
  applicantCaseName?: string;
  c100RebuildChildPostCode?: string;
  helpWithFeesReferenceNumber?: string;
  c100RebuildReturnUrl: string;
  id: string;
  paymentServiceRequestReferenceNumber?: string;
  paymentReferenceNumber?: string;
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

const updateCaseDataMapper = {
  ie: 'c100RebuildInternationalElements',
  ra: 'c100RebuildReasonableAdjustments',
  too: 'c100RebuildTypeOfOrder',
  hwn: 'c100RebuildHearingWithoutNotice',
  op: 'c100RebuildOtherProceedings',
  cd: 'c100RebuildChildDetails',
  miam: 'c100RebuildMaim',
  hu: 'c100RebuildHearingUrgency',
  ocd: 'c100RebuildOtherChildrenDetails',
  appl: 'c100RebuildApplicantDetails',
  resp: 'c100RebuildRespondentDetails',
  oprs: 'c100RebuildOtherPersonsDetails',
  c1A: 'c100RebuildSafetyConcerns',
  sq: 'c100RebuildScreeningQuestions',
  co: 'c100RebuildConsentOrderDetails',
  hwf: 'c100RebuildHelpWithFeesDetails',
};
