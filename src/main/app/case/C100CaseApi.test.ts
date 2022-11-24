import axios from 'axios';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { UserDetails } from '../controller/AppRequest';

import { CaseApi } from './C100CaseApi';
import { C100_CASE_EVENT, C100_CASE_TYPE } from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: '1234',
};
const mockData = {
  caseTypeOfApplication: C100_CASE_TYPE.C100,
  c100RebuildChildPostCode: 'AB2 3BV',
  helpWithFeesReferenceNumber: 'HWF-1234',
  c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
  applicantCaseName: 'C100 test case',
  id:  '1234'
};

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  let api; // = new CaseApi(mockedAxios, mockLogger);

  beforeEach(() => {
    api = new CaseApi(mockedAxios, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should create a case', async () => {
    const request = {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
    };

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
        caseTypeOfApplication: 'C100',
      },
    });
    const userCase = await api.createCase();

    expect(userCase).toStrictEqual({
      id: '1234',
      caseTypeOfApplication: 'C100',
    });
    expect(mockedAxios.post).toHaveBeenCalledWith('/case/create', request);
  });

  test('Should throw error if there is an error in creating a case', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.createCase()).rejects.toThrow('Case could not be created.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should update case if one is found', async () => {
    //mock
    const caseData = {
      ...mockData,
    };
    mockedAxios.post.mockResolvedValueOnce({ data: caseData });
    const updatedCaseData = await api.updateCase(
      '1234',
      caseData,
      'c100-rebuild/dummyUrl',
      C100_CASE_EVENT.CASE_UPDATE
    );

    expect(updatedCaseData).toStrictEqual({ data: caseData });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '1234/citizen-case-update/update-case',
      { ...mockData },
      {
        headers: { accessCode: 'null' },
      }
    );
  });

  test('Should throw error if there is an error updating case', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.updateCase('1234', userDetails, 'c100-rebuild/dummyUrl')).rejects.toThrow(
      'Case could not be updated.'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should throw error when case could not be retrieved', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.retrieveCaseById('1234')).rejects.toThrow('Case could not be retreived');
    expect(mockLogger.error).toHaveBeenCalled();
  });

  test('Should throw error when case could not be deleted', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.deleteCase()).rejects.toThrow('Error occured, case could not be deleted.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'caseId not found so case could not be deleted.');
  });

  test('Should upload document', async () => {
    const formData: FormData = new FormData();
    const req = mockRequest();
    req.files = { documents: { name: 'test.pdf', size: '812300', data: '', mimetype: 'text' } };
    const dateOfSystem = new Date().toLocaleString('en-GB').split(',')[0].split('/').join('');
    const extensionType = req.files.documents.name.split('.')[req.files.documents.name.split('.').length - 1];
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        document: {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
          document_filename: `applicant__consent_order_draft__${dateOfSystem}.${extensionType}`,
          document_binary_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        },
      },
    });

    formData.append('file', req.files.documents.data, {
      contentType: req.files.documents.mimetype,
      filename: `applicant__consent_order_draft__${dateOfSystem}.${extensionType}`,
      header: {
        accessCode: '12345678',
      },
    });

    const response = {
      status: 'success',
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: `applicant__consent_order_draft__${dateOfSystem}.${extensionType}`,
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };

    const userCase = await api.uploadDocument(formData);

    expect(userCase).toStrictEqual(response);
    expect(mockedAxios.post).toHaveBeenCalledWith('/upload-citizen-document', formData, {
      headers: { ...formData.getHeaders() },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  });

  test('Should throw error when document cannot be uploaded', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    const formData: FormData = new FormData();

    await expect(api.uploadDocument(formData)).rejects.toThrow('Document could not be uploaded.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should throw error when document cannot be deleted', async () => {
    mockedAxios.delete.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'DELETE',
      },
    });

    await expect(api.deleteDocument('1234')).rejects.toThrow('Document could not be deleted.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error DELETE undefined 500');
  });

  test('Should submit case on citizen-case-submit', async () => {
    //mock
    const caseData = {
      ...mockData,
    };
    mockedAxios.post.mockResolvedValueOnce({ data: caseData });
    const updatedCaseData = await api.updateCase(
      '1234',
      caseData,
      'c100-rebuild/dummyUrl',
      C100_CASE_EVENT.CASE_SUBMIT
    );

    expect(updatedCaseData).toStrictEqual({ data: caseData });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '1234/citizen-case-submit/update-case',
      { ...mockData },
      {
        headers: { accessCode: 'null' },
      }
    );
  });
});
