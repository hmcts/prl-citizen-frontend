//import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { C100_CONSENT_ORDER_UPLOAD, C100_MIAM_UPLOAD } from '../urls';

import UploadDocumentController from './uploadDocumentController';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;
// mockedAxios.create = jest.fn(() => mockedAxios);

let paramCert: string;
let redirectUrl: string;
let fileNamePrefix: string;
beforeEach(() => {
  const req = mockRequest();
  req.url = '/c100-rebuild/miam/upload';
  if (req.url === '/c100-rebuild/miam/upload') {
    paramCert = 'miam_certificate';
    redirectUrl = `${C100_MIAM_UPLOAD}`;
    fileNamePrefix = 'applicantname__miam_certificate__05102022.rtf';
  } else {
    paramCert = 'co_certificate';
    redirectUrl = `${C100_CONSENT_ORDER_UPLOAD}`;
    fileNamePrefix = 'applicant__consent_order_draft__';
  }
});

describe('Document Upload controller', () => {
  test('Should redirect back to the current page when document already exists', async () => {
    const errors = [{ errorType: 'multipleFiles', propertyName: 'document' }];

    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };

    const req = mockRequest({});
    const res = mockResponse();
    req.url = redirectUrl;
    const controller = new UploadDocumentController(mockForm.fields);
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
    expect(req.session.errors).toEqual(errors);
  });

  test('Should throw error if file is null', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.url = redirectUrl;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should throw error if file is more than 20 MB', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '8123000098098', data: '', mimetype: 'text' } };
    const res = mockResponse();
    req.url = redirectUrl;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should throw error if file is in invalid format', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };

    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '812300', data: '', mimetype: 'text' } };
    const res = mockResponse();
    req.url = redirectUrl;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('Should Upload document and direct to upload page', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };

    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.url = redirectUrl;
    req.locals.C100Api.uploadDocument.mockResolvedValue({
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: fileNamePrefix,
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    });

    req.files = { documents: { name: 'test.pdf', size: '812300', data: '', mimetype: 'text' } };

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  test('should call super constructor with correct params', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new UploadDocumentController(mockForm.fields);
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

  test('Valid File case data', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };

    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.url = redirectUrl;
    req.locals.C100Api.uploadDocument.mockResolvedValue({
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: fileNamePrefix,
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    });
    req.files = { documents: { name: 'test.pdf', size: '2000', data: '', mimetype: 'text' } };
    await controller.post(req, res);
  });
});
