import axios, { AxiosInstance } from 'axios';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { DeleteDocumentRequest } from '../document/DeleteDocumentRequest';
import { GenerateAndUploadDocumentRequest } from '../document/GenerateAndUploadDocumentRequest';

import { CosApiClient, UploadDocumentRequest } from './CosApiClient';
import { CaseWithId } from './case';
import { CaseData, CaseEvent, CaseType, PartyType, YesOrNo } from './definition';
import { toApiFormat } from './to-api-format';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

describe('CosApiClient', () => {
  test('connect cos api', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const client = new CosApiClient('abc', mockLogger);
    const actual = await client.get();
    expect(mockGet).toHaveBeenCalledWith('/');
    expect(actual).toEqual({ mockPayment: 'data' });
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

  test('generateUserUploadedStatementDocument', async () => {
    const response = { documentId: '123456', documentName: 'test' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const client = new CosApiClient('abc', mockLogger);
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
    const actual = await client.generateUserUploadedStatementDocument(generateAndUploadDocumentRequest);
    expect(actual).toEqual(response);
  });

  test('UploadDocumentListFromCitizen', async () => {
    const response = { documentId: '123456', documentName: 'test' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
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
    const client = new CosApiClient('abc', mockLogger);
    const deleteDocumentDetails = {
      caseId: '1234567',
      documentId: 'documentIdToDelete',
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    const actual = await client.deleteCitizenStatementDocument(deleteDocumentRequest);
    expect(actual).toEqual(response);
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

  test('generateUserUploadedStatementDocument', async () => {
    const client = new CosApiClient('abc', mockLogger);
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
      await client.generateUserUploadedStatementDocument(generateAndUploadDocumentRequest);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('UploadDocumentListFromCitizenWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', mockLogger);
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
    const client = new CosApiClient('abc', mockLogger);
    const deleteDocumentDetails = {
      caseId: '1234567',
      documentId: 'documentIdToDelete',
    };
    const deleteDocumentRequest = new DeleteDocumentRequest(deleteDocumentDetails);
    let flag = true;
    try {
      await client.deleteCitizenStatementDocument(deleteDocumentRequest);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
});

// describe('RetrieveCaseHearingsByCaseId', () => {
//   test('retrieveCaseHearingsByCaseId', async () => {
//     const req = mockRequest();
//     const client = new CosApiClient('abc', 'http://return-url');
//     const userCase: CaseWithId = {
//       id: '123445566',
//       state: State.AWAITING_SUBMISSION_TO_HMCTS,
//     };

//     const response = await client.retrieveCaseHearingsByCaseId(userCase, req.session.user);

//     expect(response.state).toEqual(State.AWAITING_SUBMISSION_TO_HMCTS);
//   });

//   test('retrieveCaseHearingsByCaseId_Error', async () => {
//     const req = mockRequest();
//     const client = new CosApiClient('abc', 'http://return-url');
//     const userCase: CaseWithId = {
//       id: '',
//       state: State.AWAITING_SUBMISSION_TO_HMCTS,
//     };
//     req.session.user = {};
//     let flag = true;
//     try {
//       await client.retrieveCaseHearingsByCaseId(userCase, req.session.user);
//     } catch {
//       flag = false;
//     }
//     expect(flag).toEqual(false);
//   });
// });
