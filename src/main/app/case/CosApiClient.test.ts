import axios, { AxiosInstance } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { DeleteDocumentRequest } from '../document/DeleteDocumentRequest';
import { GenerateAndUploadDocumentRequest } from '../document/GenerateAndUploadDocumentRequest';

import { CosApiClient, UploadDocumentRequest } from './CosApiClient';
import { CaseWithId } from './case';
import {
  AWPApplicationReason,
  AWPApplicationType,
  AWPFeeDetailsRequest,
  CaseData,
  CaseType,
  FeeDetailsResponse,
  PartyDetails,
  PartyType,
  State,
  YesOrNo,
} from './definition';
import { toApiFormat } from './to-api-format';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('CosApiClient', () => {
  test('connect cos api', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.get();
    expect(mockGet).toHaveBeenCalledWith('/');
    expect(actual).toEqual({ mockPayment: 'data' });
  });

  test('retrieveByCaseId', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.retrieveByCaseId('1234567', req.session.user);
    expect(actual).toEqual(response);
  });

  test('validateAccessCode', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.validateAccessCode('1234567', '1234', req.session.user);
    expect(actual).toEqual(response);
  });

  test('updateCase', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    const actual = await client.updateCase(req.session.user, '123456', caseData, 'update');
    expect(actual).toEqual(response);
  });

  test('submitRespondentResponse', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    const actual = await client.submitRespondentResponse(req.session.user, '123456', '123456', caseData);
    expect(actual).toEqual(response);
  });

  test('generateUserUploadedStatementDocument', async () => {
    const response = { documentId: '123456', documentName: 'test' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const uploadDocumentDetails = {
      documentRequestedByCourt: 'No',
      caseId: '123456',
      freeTextUploadStatements: 'test',
      parentDocumentType: 'test',
      documentType: 'test',
      partyName: 'test',
      partyId: '123456789',
      isApplicant: 'Yes',
    };
    const generateAndUploadDocumentRequest = new GenerateAndUploadDocumentRequest(uploadDocumentDetails);
    const actual = await client.generateUserUploadedStatementDocument(
      req.session.user,
      generateAndUploadDocumentRequest
    );
    expect(actual).toEqual(response);
  });

  test('UploadDocumentListFromCitizen', async () => {
    const response = { documentId: '123456', documentName: 'test' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const files = [];
    const request: UploadDocumentRequest = {
      user: req.session.user,
      caseId: '123456',
      parentDocumentType: 'test',
      documentType: 'test',
      partyId: '12345',
      partyName: 'a test',
      isApplicant: 'Yes',
      files,
      documentRequestedByCourt: YesOrNo.YES,
    };
    const actual = await client.UploadDocumentListFromCitizen(request);
    expect(actual).toEqual(response);
  });

  test('deleteCitizenStatementDocument', async () => {
    const response = { documentId: '123456', documentName: 'test' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const deleteDocumentDetails = {
      caseId: '1234567',
      documentId: 'documentIdToDelete',
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    const actual = await client.deleteCitizenStatementDocument(req.session.user, deleteDocumentRequest);
    expect(actual).toEqual(response);
  });

  test('linkCaseToCitizen', async () => {
    const response = { id: '1234567' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = false;
    try {
      await client.linkCaseToCitizen(req.session.user, '1234567', req, '123456789', caseData);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(false);
  });

  test('updateRespondentCase', async () => {
    const response = { id: '1234567' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = false;
    try {
      await client.updateRespondentCase(req.session.user, '123456789', req, caseData);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(false);
  });

  test('retrieveCasesByUserId', async () => {
    const response = {
      id: '200',
      state: 'SUCCESS',
      data: [
        {
          caseData: { id: '1234', postCode: 'xyz' },
          stateName: 'Draft',
        },
      ],
    };
    mockedAxios.get.mockReturnValueOnce(response as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.retrieveCasesByUserId(req.session.user);
    expect(actual).toEqual([
      {
        id: '1234',
        postCode: 'xyz',
        caseStatus: {
          state: 'Draft',
        },
      },
    ]);
  });

  test('generateC7Document', async () => {
    const response = {
      status: 'test',
      data: {
        document_binary_url: 'test',
        document_filename: 'test',
      },
    };
    const data = {} as Partial<CaseData>;
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.generateC7DraftDocument(req.session.user, '123456', '123456789', data);
    expect(actual).not.toBeUndefined;
  });

  test('generateC7Document throws exception', async () => {
    const data = {} as Partial<CaseData>;
    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    let flag = false;
    try {
      await client.generateC7DraftDocument(req.session.user, '123456', '123456789', data);
    } catch (error) {
      flag = true;
    }
    expect(flag).toEqual(true);
  });

  test('fetchAWPFeeCodeDetails', async () => {
    const applicationDetails = {
      caseId: '1234567' as CaseData['id'],
      applicationType: 'C2' as AWPApplicationType,
      applicationReason: 'delay-or-cancel-hearing' as AWPApplicationReason,
      caseType: 'FL401' as CaseType,
      partyType: 'applicant' as PartyType,
    } as AWPFeeDetailsRequest;
    const response = {
      id: '200',
      state: 'SUCCESS',
      feeDetails: {
        feeAmount: 167,
        feeAmountText: '167',
        feeType: 'MOCK_FEE_TYPE',
      },
    };

    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<FeeDetailsResponse>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.fetchAWPFeeCodeDetails(applicationDetails, req.session.user);
    expect(actual).toEqual(response);
  });

  test('fetchAWPFeeCodeDetails throws error', async () => {
    const applicationDetails = {
      caseId: '1234567' as CaseData['id'],
      applicationType: 'C2' as AWPApplicationType,
      applicationReason: 'delay-or-cancel-hearing' as AWPApplicationReason,
      caseType: 'FL401' as CaseType,
      partyType: 'applicant' as PartyType,
    } as AWPFeeDetailsRequest;

    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');

    let flag = false;
    try {
      await client.fetchAWPFeeCodeDetails(applicationDetails, req.session.user);
    } catch (error) {
      flag = true;
    }

    expect(flag).toEqual(true);
  });
});

describe('CosApiClientWithError', () => {
  test('retrieveByCaseIdWithError', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const id = '';
    let flag = true;
    try {
      await client.retrieveByCaseId(id, req.session.user);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });

  test('validateAccessCodeWithError', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const id = '';
    let flag = true;
    try {
      await client.validateAccessCode(id, '1234', req.session.user);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });

  test('updateCaseWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = true;
    try {
      await client.updateCase(req.session.user, '123456', caseData, 'update');
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('submitRespondentResponseWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = true;
    try {
      await client.submitRespondentResponse(req.session.user, '123456', '123456', caseData);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('generateUserUploadedStatementDocument', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const uploadDocumentDetails = {
      documentRequestedByCourt: 'No',
      caseId: '123456',
      freeTextUploadStatements: 'test',
      parentDocumentType: 'test',
      documentType: 'test',
      partyName: 'test',
      partyId: '123456789',
      isApplicant: 'Yes',
    };
    let flag = true;
    const generateAndUploadDocumentRequest = new GenerateAndUploadDocumentRequest(uploadDocumentDetails);
    try {
      await client.generateUserUploadedStatementDocument(req.session.user, generateAndUploadDocumentRequest);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('UploadDocumentListFromCitizenWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const files = [];
    const request: UploadDocumentRequest = {
      user: req.session.user,
      caseId: '123456',
      parentDocumentType: 'test',
      documentType: 'test',
      partyId: '12345',
      partyName: 'a test',
      isApplicant: 'Yes',
      files,
      documentRequestedByCourt: YesOrNo.YES,
    };
    let flag = true;
    try {
      await client.UploadDocumentListFromCitizen(request);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('deleteCitizenStatementDocumentWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const deleteDocumentDetails = {
      caseId: '1234567',
      documentId: 'documentIdToDelete',
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    let flag = true;
    try {
      await client.deleteCitizenStatementDocument(req.session.user, deleteDocumentRequest);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
});

describe('RetrieveCaseHearingsByCaseId', () => {
  test('retrieveCaseHearingsByCaseId', async () => {
    const userCase: CaseWithId = {
      id: '123445566',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
    };

    const response = {
      id: '200',
      state: 'SUCCESS',
      data: [
        {
          caseData: { id: '123445566' },
          stateName: 'Draft',
        },
      ],
    };
    mockedAxios.post.mockReturnValueOnce(response as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');

    const actual = await client.retrieveCaseHearingsByCaseId(userCase.id, req.session.user);

    expect(actual).toEqual([
      {
        caseData: { id: '123445566' },
        stateName: 'Draft',
      },
    ]);
  });

  test('retrieveCaseHearingsByCaseId_Error', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const userCase: CaseWithId = {
      id: '',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
    };
    req.session.user = {};
    let flag = true;
    try {
      await client.retrieveCaseHearingsByCaseId(userCase.id, req.session.user);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });
});

describe('createAWPApplication', () => {
  test('createAWPApplication', async () => {
    const userCase: CaseWithId = {
      id: '123445566',
      awp_need_hwf: YesOrNo.YES,
      awp_have_hwfReference: YesOrNo.YES,
      awp_hwf_referenceNumber: 'MOCK_HWF_REFERENCE',
      awp_completedForm: YesOrNo.YES,
      awp_agreementForRequest: YesOrNo.NO,
      awp_informOtherParties: YesOrNo.YES,
      awp_reasonCantBeInformed: 'MOCK_REASON',
      awp_uploadedApplicationForms: [
        {
          url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c2',
          filename: 'file_example_TIFF_1MB_V1.tiff',
          binaryUrl:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c2/binary',
          hash: 'MOCK_HASH',
          categoryId: '1',
          createdDate: 'MOCK_DATE',
        },
      ],
      awp_cancelDelayHearing: undefined,
      awp_isThereReasonForUrgentRequest: YesOrNo.YES,
      awp_urgentRequestReason: 'MOCK_REASON',
      awp_hasSupportingDocuments: YesOrNo.YES,
      awp_supportingDocuments: [
        {
          url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c2',
          filename: 'file_example_TIFF_1MB_V1.tiff',
          binaryUrl:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c2/binary',
          hash: 'MOCK_HASH',
          categoryId: '1',
          createdDate: 'MOCK_DATE',
        },
      ],
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
    };

    const response = {
      id: '200',
      state: 'SUCCESS',
      data: [
        {
          caseData: { id: '123445566' },
          stateName: 'Draft',
        },
      ],
    };
    mockedAxios.post.mockReturnValueOnce(response as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');

    const partyDetails = { firstName: 'MOCK_FIRST_NAME', lastName: 'MOCK_LAST_NAME' } as PartyDetails;

    const actual = await client.createAWPApplication(
      req.session.user,
      userCase,
      'C2' as AWPApplicationType,
      'request-more-time' as AWPApplicationReason,
      'FL401' as PartyType,
      partyDetails
    );

    expect(actual).toEqual([
      {
        caseData: { id: '123445566' },
        stateName: 'Draft',
      },
    ]);
  });

  test('createAWPApplication throws error', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const userCase: CaseWithId = {
      id: '',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
    };
    req.session.user = {};
    let flag = true;
    try {
      await client.createAWPApplication(
        req.session.user,
        userCase,
        'C2' as AWPApplicationType,
        'request-more-time' as AWPApplicationReason,
        'FL401' as PartyType,
        { firstName: undefined, lastName: 'MOCK_LAST_NAME' }
      );
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });
});
