/* eslint-disable @typescript-eslint/no-explicit-any */

import Axios, { AxiosInstance } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, AppSession, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { C100_CASE_EVENT, C100_CASE_TYPE, State } from './definition';
import { logError } from './utils';

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
      logError(err, this.logger);
      throw new Error('Case could not be retreived');
    }
  }

  public async createCase(req: AppRequest<Partial<Case>>): Promise<CreateCaseResponse> {
    const data = {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      c100RebuildReturnUrl: C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT, //added to handle deafult returnURL incase save & come back is not invoked at all
      c100RebuildChildPostCode: req?.session?.userCase?.c100RebuildChildPostCode,
    };

    try {
      const response = await this.axios.post<CreateCaseResponse>('/case/create', data);
      const {
        id,
        caseTypeOfApplication,
        c100RebuildReturnUrl,
        state,
        noOfDaysRemainingToSubmitCase,
        c100RebuildChildPostCode,
      } = response?.data ?? {};
      return {
        id,
        caseTypeOfApplication,
        c100RebuildReturnUrl,
        state,
        noOfDaysRemainingToSubmitCase,
        c100RebuildChildPostCode,
      };
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Case could not be created.');
    }
  }

  public async createCaseTestingSupport(): Promise<RetreiveDraftCase> {
    try {
      const response = await this.axios.post<RetreiveDraftCase>('/testing-support/create-dummy-citizen-case');
      return detransformCaseData(response.data);
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Case could not be created.');
    }
  }

  /**
   * This is used to submit case based on the case event passed
   * @param caseId
   * @param caseData
   * @param returnUrl
   * @param caseEvent
   * @returns
   */
  public async submitC100Case(
    caseId: string,
    caseData: Partial<CaseWithId>,
    returnUrl: string,
    caseEvent: C100_CASE_EVENT,
    additionalData: Record<string, any> | undefined
  ): Promise<UpdateCaseResponse> {
    const { caseTypeOfApplication, c100RebuildChildPostCode, helpWithFeesReferenceNumber, ...rest } = caseData;
    const data: UpdateCaseRequest = {
      ...transformCaseData(rest),
      applicantPcqId: additionalData?.pcqId,
      caseTypeOfApplication: caseTypeOfApplication as string,
      c100RebuildChildPostCode,
      helpWithFeesReferenceNumber,
      c100RebuildReturnUrl: returnUrl,
      id: caseId,
      paymentServiceRequestReferenceNumber: caseData.paymentDetails?.serviceRequestReference,
      paymentReferenceNumber: caseData.paymentDetails?.payment_reference,
    };
    try {
      const response = await this.axios.post<UpdateCaseResponse>(
        `/citizen/${caseId}/${caseEvent}/submit-c100-application`,
        data
      );
      return { data: response.data };
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Case could not be updated.');
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
  public async saveC100DraftApplication(
    caseId: string,
    caseData: Partial<CaseWithId>,
    returnUrl: string,
    additionalData: Record<string, any> | undefined
  ): Promise<UpdateCaseResponse> {
    const { caseTypeOfApplication, c100RebuildChildPostCode, helpWithFeesReferenceNumber, applicantPcqId, ...rest } =
      caseData;
    const data: UpdateCaseRequest = {
      ...transformCaseData(rest),
      applicantPcqId: applicantPcqId ?? additionalData?.pcqId,
      caseTypeOfApplication: caseTypeOfApplication as string,
      c100RebuildChildPostCode,
      helpWithFeesReferenceNumber,
      c100RebuildReturnUrl: returnUrl,
      id: caseId,
      paymentServiceRequestReferenceNumber: caseData.paymentDetails?.serviceRequestReference,
      paymentReferenceNumber: caseData.paymentDetails?.payment_reference,
    };
    try {
      const response = await this.axios.post<UpdateCaseResponse>(
        `/citizen/${caseId}/save-c100-draft-application`,
        data
      );
      return { data: response.data };
    } catch (err) {
      logError(err, this.logger);
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
      caseData = { ...caseData, state: State.CASE_DELETED };
      const { caseId } = caseData;
      if (!caseId) {
        throw new Error('caseId not found so case could not be deleted.');
      }
      await this.axios.post<UpdateCaseResponse>(`/citizen/${caseId}/delete-application`, caseData);
      session.userCase = {} as CaseWithId;
      session.save();
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Error occured, case could not be deleted.');
    }
  }

  public async downloadC100Application(docId: string): Promise<void> {
    try {
      const response = await this.axios.get(`/${docId}/download`, {
        responseType: 'arraybuffer',
      });
      return response.data;
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Error occured, C100 application document could not be downloaded.');
    }
  }

  /**
   * Withdraw Case
   * @param caseData
   * @param session
   */
  public async withdrawCase(caseId: string, caseData: Partial<CaseWithId>): Promise<void> {
    try {
      if (!caseId) {
        throw new Error('caseId not found so case could not be withdrawn.');
      }
      const { withdrawApplication, withdrawApplicationReason } = caseData;

      await this.axios.post<UpdateCaseResponse>(`/citizen/${caseId}/withdraw`, {
        withDrawApplicationData: {
          withDrawApplication: withdrawApplication,
          withDrawApplicationReason: withdrawApplicationReason,
        },
      });
    } catch (err) {
      logError(err, this.logger);
      throw new Error('Error occured, case could not be withdrawn.');
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
  let transformedCaseData = Object.entries(caseData).reduce((transformedData: Record<string, any>, [field, data]) => {
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

  if (!Object.keys(transformedCaseData).includes(updateCaseDataMapper.co)) {
    transformedCaseData = { ...transformedCaseData, c100RebuildConsentOrderDetails: {} };
  }

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
    caseTypeOfApplication: caseData.caseTypeOfApplication,
    c100RebuildChildPostCode: caseData.c100RebuildChildPostCode,
    helpWithFeesReferenceNumber: caseData.helpWithFeesReferenceNumber,
    c100RebuildReturnUrl: caseData.c100RebuildReturnUrl,
    state: caseData.state,
    noOfDaysRemainingToSubmitCase: caseData.noOfDaysRemainingToSubmitCase,
    applicantPcqId: caseData.applicantPcqId,
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
  c100RebuildChildPostCode: string;
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
  c100RebuildChildPostCode?: string;
  helpWithFeesReferenceNumber?: string;
  c100RebuildReturnUrl: string;
  id: string;
  applicantPcqId?: string;
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
