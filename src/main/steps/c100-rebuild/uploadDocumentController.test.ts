import axios from 'axios';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../app/case/C100CaseApi';
import { C100_CONSENT_ORDER_UPLOAD, C100_MIAM_UPLOAD } from '../urls';

import UploadDocumentController from './uploadDocumentController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

let paramCert: string;
let redirectUrl: string;
let fileNamePrefix: string;
beforeEach(() => {
  const req = mockRequest();
  req.url = '/c100-rebuild/miam/upload';
  if (req.url.includes(C100_MIAM_UPLOAD)) {
    paramCert = 'miam_certificate';
    redirectUrl = '/c100-rebuild/miam/upload';
    fileNamePrefix = 'applicant__miam_certificate__';
  } else if (req.url.includes(C100_CONSENT_ORDER_UPLOAD)) {
    paramCert = 'co_certificate';
    redirectUrl = '/c100-rebuild/consent-order/upload';
    fileNamePrefix = 'applicant__consent_order_draft__';
  }
});

describe('Document Upload controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const controller = new UploadDocumentController({});

  test('Should redirect back to the current page when document already exists', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    req.originalUrl = redirectUrl;
    req.url = redirectUrl;
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = {
      [paramCert]: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: fileNamePrefix,
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should throw error when error with saving session', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    req.originalUrl = redirectUrl;
    req.url = redirectUrl;
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = {
      [paramCert]: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: fileNamePrefix,
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };
    req.session.save = jest.fn(done => done('MOCK_ERROR'));

    let flag = false;
    let error;
    try {
      await controller.post(req, res);
    } catch (err) {
      flag = true;
      error = err;
    }

    expect(flag).toBe(true);
    expect(error).toBe('MOCK_ERROR');
  });

  test('Should throw error if file is null', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    req.originalUrl = redirectUrl;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should throw error if file is more than 20 MB', async () => {
    const req = mockRequest({});
    req.files = { documents: { name: 'test.docx', size: '8123000098098', data: '', mimetype: 'text' } };
    const res = mockResponse();
    req.originalUrl = redirectUrl;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should throw error if file is in invalid format', async () => {
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '812300', data: '', mimetype: 'text' } };
    const res = mockResponse();
    req.originalUrl = redirectUrl;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should Upload document and direct to upload page', async () => {
    const req = mockRequest({});
    req.locals.C100Api = new CaseApi(mockedAxios, mockLogger);
    const res = mockResponse();
    req.originalUrl = redirectUrl;
    req.url = redirectUrl;
    mockedAxios.post.mockResolvedValueOnce({
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: 'applicant__consent_order_draft__',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    });

    req.files = { documents: { name: 'test.pdf', size: '100', data: '', mimetype: 'text' } };

    await controller.post(req, res);
    expect(req.session.userCase.co_certificate).toBe(undefined);
  });

  test('Should Upload document and direct to upload page for consent order', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    req.originalUrl = '/c100-rebuild/consent-order/upload';
    req.url = '/c100-rebuild/consent-order/upload';
    req.locals.C100Api.uploadDocument.mockResolvedValue({
      status: 'Success',
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: 'applicant__consent_order_draft__',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        document_hash: 'MOCK_HASH',
        document_creation_date: 'MOCK_DATE',
      },
    });

    req.files = { documents: { name: 'test.pdf', size: '100', data: '', mimetype: 'text' } };

    await controller.post(req, res);
    expect(req.session.userCase.co_certificate).toBe(undefined);
  });

  test('should call super constructor with correct params', async () => {
    const req = mockRequest({
      body: {
        saveAndComeLater: true,
      },
      session: {
        user: { email: 'test@example.com' },
        userCase: {
          [paramCert]: {
            undefined,
          },
        },
      },
    });
    const errors = [];
    errors.push({ propertyName: 'document', errorType: 'required' } as never);
    req.session.errors = errors;
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should redirect when document exists and save and continue clicked', async () => {
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        user: { email: 'test@example.com' },
        userCase: {
          ['miam_certificate']: {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: fileNamePrefix,
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        },
      },
    });
    req.originalUrl = redirectUrl;
    req.url = redirectUrl;
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });
});
