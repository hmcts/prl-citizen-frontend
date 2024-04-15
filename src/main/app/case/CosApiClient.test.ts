import axios, { AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { UserDetails } from '../controller/AppRequest';

import { CosApiClient, DocumentFileUploadRequest, UploadedFiles } from './CosApiClient';
import { CaseWithId } from './case';
import { CaseData, CaseEvent, CaseType, DocumentUploadResponse, PartyType, YesOrNo } from './definition';
import { toApiFormat } from './to-api-format';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');
jest.mock('form-data');

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

describe('CosApiClient', () => {
  const DocumentUploadReq = {
    caseId: '',
    categoryId: '',
    partyId: '',
    partyName: '',
    partyType: PartyType.APPLICANT,
    freeTextStatements: 'text',
    files: [
      { originalname: 'uploaded-file.jpg', data: 'mock data', name: 'uploaded-file.jpg' },
    ] as unknown as UploadedFiles,
    documents: [
      {
        document_url: 'abc',
        document_binary_url: 'bcd',
        document_filename: 'test',
        document_hash: 'test',
        document_creation_date: 'testDate',
      },
    ],
  };

  const userDetails: UserDetails = {
    accessToken: '123',
    email: 'billy@bob.com',
    givenName: 'billy',
    familyName: 'bob',
    id: '1234',
  };
  test('connect cos api', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.get();
    expect(mockGet).toHaveBeenCalledWith('/');
    expect(actual).toEqual({ mockPayment: 'data' });
  });
  test('cannot connect cos api', async () => {
    mockedAxios.create.mockRejectedValueOnce;
    const client = new CosApiClient('abc', mockLogger);
    await expect(client.get()).rejects.toThrow('Could not connect to cos-api client.');
  });

  test('retrieveCaseAndHearings', async () => {
    const response = {
      status: 'test',
      id: '200',
      state: 'SUCCESS',
      data: {
        caseData: { id: '200', state: 'SUCCESS', applicantsFL401: { firstName: 'testuser', lastName: 'Citizen' } },
        hearings: 'hearings',
      },
    };
    mockedAxios.get.mockReturnValueOnce(response as unknown as Promise<CaseWithId>);
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.retrieveCaseAndHearings('1234567', 'Yes' as YesOrNo);
    expect(actual).toEqual({
      caseData: { id: '200', state: 'SUCCESS', applicantsFL401: { firstName: 'testuser', lastName: 'Citizen' } },
      hearingData: 'hearings',
    });
  });

  test('retrieveCaseAndHearings should throw error', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });
    const client = new CosApiClient('abc', mockLogger);

    await expect(client.retrieveCaseAndHearings('1234567', 'Yes' as YesOrNo)).rejects.toThrow(
      'Error occured, case data and hearings could not be retrieved - retrieveCaseAndHearings'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
  });

  test('retrieveByCaseId', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.retrieveByCaseId('1234567', req.session.user);
    expect(actual).toEqual(response);
  });

  test('retrieveByCaseId should throw error', async () => {
    mockedAxios.get.mockRejectedValue({
      request: {
        status: 500,
      },
      config: {
        method: 'GET',
        url: '/retrieveByCaseId',
      },
    });
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);

    await expect(client.retrieveByCaseId('1234567', req.session.user)).rejects.toThrow(
      'Error occured, could not retreive case data - retrieveByCaseId.'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /retrieveByCaseId');
  });

  test('validateAccessCode', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.validateAccessCode('1234567', '1234', req.session.user);
    expect(actual).toEqual(response);
  });

  test('validateAccessCode should throw error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);

    await expect(client.validateAccessCode('1234567', '123', req.session.user)).rejects.toThrow(
      'Error occured, validate access code failed - validateAccessCode'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('updateCase', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const caseData = toApiFormat(req?.session?.userCase);
    const actual = await client.updateCase('123456', caseData, 'update');
    expect(actual).toEqual(response);
  });

  test('updateCaseData', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.updateCaseData(
      '123456',
      {
        firstName: 'testuser',
        lastName: 'Citizen',
        email: 'abc@example.net',
        dateOfBirth: '03-20-2023',
        phoneNumber: '7755664466',
        placeOfBirth: 'BPP',
        previousName: 'test',
        isAtAddressLessThan5Years: 'No',
        addressLivedLessThan5YearsDetails: 'Hello',
        address: {
          AddressLine1: 'string',
          AddressLine2: 'string',
          AddressLine3: 'string',
          PostTown: 'string',
          County: 'string',
          PostCode: 'string',
          Country: 'string',
        },
      },
      'applicant' as PartyType,
      'C100' as CaseType,
      'hearingNeeds' as CaseEvent
    );
    expect(actual).toEqual(response);
  });

  test('updateCaseData should throw error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    const client = new CosApiClient('abc', mockLogger);

    await expect(
      client.updateCaseData(
        '123456',
        {
          firstName: 'testuser',
          lastName: 'Citizen',
          email: 'abc@example.net',
          dateOfBirth: '03-20-2023',
          phoneNumber: '7755664466',
          placeOfBirth: 'BPP',
          previousName: 'test',
          isAtAddressLessThan5Years: 'No',
          addressLivedLessThan5YearsDetails: 'Hello',
          address: {
            AddressLine1: 'string',
            AddressLine2: 'string',
            AddressLine3: 'string',
            PostTown: 'string',
            County: 'string',
            PostCode: 'string',
            Country: 'string',
          },
        },
        'applicant' as PartyType,
        'C100' as CaseType,
        'hearingNeeds' as CaseEvent
      )
    ).rejects.toThrow('Error occured, case could not be updated - updateCaseData');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('getHearingsByCaseID', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<any>);
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.retrieveCaseHearingsByCaseId(req.session.user, '123456');
    expect(actual).toEqual(response);
  });

  test('retrieveCaseHearingsByCaseId should throw error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    const client = new CosApiClient('abc', mockLogger);
    const req = mockRequest();

    await expect(client.retrieveCaseHearingsByCaseId(req.session.user, '1234')).rejects.toThrow(
      'Error occured, case could not be updated - retrieveCaseHearingsByCaseId'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('submitRespondentResponse', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const caseData = toApiFormat(req?.session?.userCase);
    const actual = await client.submitRespondentResponse('123456', '123456', caseData);
    expect(actual).toEqual(response);
  });

  test('generateStatementDocument', async () => {
    const response = {
      document: {
        document_url: 'abc',
        document_binary_url: 'bcd',
        document_filename: 'test',
        document_hash: 'test',
        document_creation_date: 'testDate',
      },
      status: 200,
    };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.generateStatementDocument(DocumentUploadReq);
    expect(actual).toEqual(response);
  });

  test('uploadStatementDocument should return correct response data', async () => {
    const response = {
      status: 200,
      document: {
        document_url: 'abc',
        document_binary_url: 'bcd',
        document_filename: 'test',
        document_hash: 'test',
        document_creation_date: 'testDate',
      },
    };
    const req = {
      caseId: '1234',
      categoryId: '1',
      partyId: '1234',
      partyName: 'party name',
      partyType: 'applicant',
      files: [
        { originalname: 'uploaded-file.jpg', data: 'mock data', name: 'uploaded-file.jpg' },
      ] as unknown as UploadedFiles,
    } as DocumentFileUploadRequest;

    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<DocumentUploadResponse>);
    const client = new CosApiClient('abc', mockLogger);
    const result = await client.uploadStatementDocument(userDetails, req);
    expect(result).toStrictEqual(response);
  });

  test('uploadStatementDocument-with api error', async () => {
    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    await expect(client.uploadStatementDocument(req.session.user, DocumentUploadReq)).rejects.toThrow(
      'Error occured, upload citizen statement document failed - UploadDocumentListFromCitizen'
    );
  });

  test('deleteCitizenStatementDocument-', async () => {
    mockedAxios.delete.mockResolvedValueOnce;
    const req = mockRequest({
      session: {
        userCase: {
          applicantUploadFiles: [
            {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              document_binary_url: '',
              document_filename: '',
              document_hash: '',
              document_creation_date: 'string;',
            },
          ],
        },
      },
    });
    req.params.documentId = 'c9f56483-6e2d-43ce-9de8-72661755b87c';
    const client = new CosApiClient('abc', mockLogger);
    const docId = 'c9f56483-6e2d-43ce-9de8-72661755b87c';
    await expect(client.deleteCitizenStatementDocument(docId)).rejects.toThrow(
      'Error occured, document could not be deleted. - deleteCitizenStatementDocument'
    );
  });
  test('submitUploadedDocuments-', async () => {
    const response = { status: 'success' };
    mockedAxios.post.mockReturnValueOnce({ status: 'success' } as unknown as Promise<any>);
    //mockedAxios.post.mockRejectedValueOnce
    const req = mockRequest({
      session: {
        userCase: {
          applicantUploadFiles: [
            {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              document_binary_url: '',
              document_filename: '',
              document_hash: '',
              document_creation_date: 'string;',
            },
          ],
        },
      },
    });
    req.params.documentId = 'c9f56483-6e2d-43ce-9de8-72661755b87c';
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.submitUploadedDocuments(req.session.user, req.session.userCase.applicantUploadFiles);
    expect(actual).toEqual(response);
    //await expect(client.submitUploadedDocuments(req.session.user, req.session.userCase.applicantUploadFiles[0])).toBe({});
  });

  test('submitUploadedDocuments-should fail with api error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    await expect(client.submitUploadedDocuments(req.session.user, DocumentUploadReq)).rejects.toThrow(
      'submit citizen uploaded documents failed.'
    );
  });

  test('linkCaseToCitizen', async () => {
    const response = { id: '1234567' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const client = new CosApiClient('abc', mockLogger);
    let flag = false;
    try {
      await client.linkCaseToCitizen('1234567', '123456789');
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(false);
  });

  test('linkCaseToCitizen should throw error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    const client = new CosApiClient('abc', mockLogger);

    await expect(client.linkCaseToCitizen('1234567', '123')).rejects.toThrow(
      'Error occured, failed to link case to citizen - linkCaseToCitizen'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
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
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.retrieveCasesByUserId();
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

  test('retrieveCasesByUserId should throw error', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });
    const client = new CosApiClient('abc', mockLogger);

    await expect(client.retrieveCasesByUserId()).rejects.toThrow(
      'Error occured, could not retrive cases - retrieveCasesByUserId'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
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
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.generateC7DraftDocument(req.session.user, '123456', '123456789', data);
    expect(actual).not.toBeUndefined;
  });

  test('generateC7Document throws exception', async () => {
    const data = {} as Partial<CaseData>;
    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    let flag = false;
    try {
      await client.generateC7DraftDocument(req.session.user, '123456', '123456789', data);
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
    const client = new CosApiClient('abc', mockLogger);
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
    const client = new CosApiClient('abc', mockLogger);
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
    const client = new CosApiClient('abc', mockLogger);
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = true;
    try {
      await client.updateCase('123456', caseData, 'update');
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('submitRespondentResponseWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = true;
    try {
      await client.submitRespondentResponse('123456', '123456', caseData);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('generateStatementDocument', async () => {
    const client = new CosApiClient('abc', mockLogger);
    const DocumentUploadReq = {
      caseId: '',
      categoryId: '',
      partyId: '',
      partyName: '',
      partyType: PartyType.APPLICANT,
      freeTextStatements: 'text',
    };
    let flag = true;
    try {
      await client.generateStatementDocument(DocumentUploadReq);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('uploadStatementDocument', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
    const DocumentUploadReq = {
      files: [
        { originalname: 'uploaded-file.jpg', data: 'mock data', name: 'uploaded-file.jpg' },
      ] as unknown as UploadedFiles,
    };
    let flag = true;
    try {
      await client.uploadStatementDocument(req.session.user, DocumentUploadReq);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('deleteCitizenStatementDocumentWithError', async () => {
    const client = new CosApiClient('abc', mockLogger);
    const docId = '12345';
    let flag = true;
    try {
      await client.deleteCitizenStatementDocument(docId);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
});

describe('RetrieveCaseHearingsByCaseId', () => {
  test('retrieveCaseHearingsByCaseId', async () => {
    const req = mockRequest();
    const response = { id: '1234567' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const client = new CosApiClient('abc', mockLogger);

    const result = await client.retrieveCaseHearingsByCaseId(req.session.userCase, req.session.user);

    expect(result).toEqual(response);
  });

  test('retrieveCaseHearingsByCaseId_Error', async () => {
    const req = mockRequest();
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });
    const client = new CosApiClient('abc', mockLogger);
    await expect(client.retrieveCaseHearingsByCaseId(req.session.userCase, req.session.user)).rejects.toThrow(
      'Error occured, case could not be updated - retrieveCaseHearingsByCaseId'
    );
  });
});
