import axios from 'axios';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { UserDetails } from '../controller/AppRequest';

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: '1234',
};

jest.mock('axios');

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

import { CaseApi, getCaseApi } from './CaseApi';
import { C100_CASE_TYPE, PrivateLaw } from './definition';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const serviceType = PrivateLaw.PRIVATELAW;

const mockData = {
  caseTypeOfApplication: C100_CASE_TYPE.C100,
  c100RebuildChildPostCode: 'AB2 3BV',
  helpWithFeesReferenceNumber: 'HWF-1234',
  c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
  applicantCaseName: 'C100 test case',
  id: '1234',
};

describe('caseApi', () => {
  let api;
  beforeEach(() => {
    api = new CaseApi(mockedAxios, userDetails, mockLogger);
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

  test('Should create api', async () => {
    getCaseApi(userDetails, mockLogger);
    expect(api).toBeCalled;
  });

  test('getOrCreateCase should return usercase if found', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: '1234',
          state: 'Draft',
          case_data: mockData,
        },
      ],
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({
      id: '1234',
      state: 'Draft',
      caseTypeOfApplication: 'C100',
    });
  });

  test('getOrCreateCase should create a case if one is not found', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });
    const results = {
      data: {
        id: '1234',
        state: 'Draft',
        data: {},
      },
    };
    mockedAxios.post.mockResolvedValueOnce(results);
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({
      id: '1234',
      state: 'Draft',
    });
  });

  test('createCase should throw an error if case can not be created', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });

    mockedAxios.post.mockRejectedValueOnce({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('getCase should throw error if too many cases', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: '1234',
          state: 'Draft',
          case_data: mockData,
        },
        {
          id: '1234',
          state: 'Draft',
          case_data: mockData,
        },
      ],
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Too many cases assigned to user.');
  });

  test('getCases should throw error when case can not be found', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.getCases()).rejects.toThrow('Case could not be retrieved.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
  });

  test('getCaseById should return case details', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: '1234',
        state: 'Draft',
        data: mockData,
      },
    });
    const response = await api.getCaseById('1234');
    expect(response).toStrictEqual({
      id: '1234',
      state: 'Draft',
      caseTypeOfApplication: 'C100',
    });
  });

  test('getCaseById throw error if case can not be retrieved', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.getCaseById()).rejects.toThrow('Case could not be retrieved.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
  });

  test('getCaseUserRoles should return user roles', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        case_users: [
          {
            case_id: '1234',
            user_id: '1234',
            case_role: 'MOCK_ROLE',
          },
        ],
      },
    });
    const response = await api.getCaseUserRoles('1234', '1234');
    expect(response).toStrictEqual({
      case_users: [
        {
          case_id: '1234',
          user_id: '1234',
          case_role: 'MOCK_ROLE',
        },
      ],
    });
  });

  test('getCaseUserRoles throw error if case can not be retrieved', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.getCaseUserRoles('1234', '1234')).rejects.toThrow('Case roles could not be fetched.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
  });

  test('sendEvent should update case', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
        state: 'Draft',
        data: mockData,
      },
    });
    const response = await api.sendEvent('1234', mockData, 'eventName');
    expect(response).toStrictEqual({
      id: '1234',
      state: 'Draft',
      caseTypeOfApplication: 'C100',
    });
  });

  test('sendEvent should throw error if case can not be retrieved', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.sendEvent('1234', mockData, 'eventName')).rejects.toThrow('Case could not be updated.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
  });

  test('triggerEventWithData should update case using sendEvent', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
        state: 'Draft',
        data: mockData,
      },
    });
    const response = await api.triggerEventWithData('1234', mockData, 'eventName', mockData);
    expect(response).toStrictEqual({
      id: '1234',
      state: 'Draft',
      caseTypeOfApplication: 'C100',
    });
  });

  test('logError should log method and url for error with request', async () => {
    mockedAxios.get.mockRejectedValue({
      request: {
        status: 500,
      },
      config: {
        method: 'GET',
        url: 'case-users?case_ids=1234&user_ids=1234',
      },
    });
    await expect(api.getCaseUserRoles('1234', '1234')).rejects.toThrow('Case roles could not be fetched.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET case-users?case_ids=1234&user_ids=1234');
  });

  test('logError should log error message for errors without response or request', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'MOCK ERROR',
    });
    await expect(api.getCaseUserRoles('1234', '1234')).rejects.toThrow('Case roles could not be fetched.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'MOCK ERROR');
  });

  test('triggerEvent should update case using sendEvent', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
        state: 'Draft',
        data: mockData,
      },
    });
    const response = await api.triggerEvent('1234', mockData, 'eventName');
    expect(response).toStrictEqual({
      id: '1234',
      state: 'Draft',
      caseTypeOfApplication: 'C100',
    });
  });
});
