import axios, { AxiosInstance } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { DeleteDocumentRequest } from '../document/DeleteDocumentRequest';
import { GenerateAndUploadDocumentRequest } from '../document/GenerateAndUploadDocumentRequest';

import { CosApiClient } from './CosApiClient';
import { CaseWithId } from './case';
import { YesOrNo } from './definition';
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
    const actual = await client.UploadDocumentListFromCitizen(
      req.session.user,
      '123456',
      'test',
      'test',
      '12345',
      'a test',
      'Yes',
      files,
      YesOrNo.YES
    );
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
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.retrieveCasesByUserId(req.session.user);
    expect(actual).toEqual(response);
  });
});
