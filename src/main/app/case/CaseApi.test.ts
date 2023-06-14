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

const mockedAxios = axios as jest.Mocked<typeof axios>;

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

test('Should throw error when get case fails', async () => {
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

test('Should throw error when getCases fails', async () => {
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
