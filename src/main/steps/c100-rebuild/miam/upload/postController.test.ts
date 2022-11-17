import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import MiamUploadDocument from './postController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Miam Document Upload controller', () => {
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
    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = {
      miam_certificate: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: 'applicantname__miam_certificate__05102022.rtf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload');
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
    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload');
  });

  test('Should throw error if file is more than 20 MB', async () => {
    const errors = [{ errorType: 'fileFormat', propertyName: 'document' }];
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
    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '8123000098098', data: '', mimetype: 'text' } };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should throw error if file is in invalid format', async () => {
    const errors = [{ errorType: 'fileFormat', propertyName: 'document' }];
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

    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '812300', data: '', mimetype: 'text' } };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload');
    expect(req.session.errors).toEqual(errors);
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

    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.locals.C100Api.uploadDocument.mockResolvedValue({
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: 'applicant__miam_certificate__05102022.rtf',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    });

    req.files = { documents: { name: 'test.pdf', size: '812300', data: '', mimetype: 'text' } };

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload');
  });

  test('Should redirect to dashboard when document already exists while clicking save and come back later and original path starts with /c100-rebuild', async () => {
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
    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({
      body: {
        saveAndComeLater: true,
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          miam_certificate: {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: 'applicantname__miam_certificate__05102022.rtf',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        },
      },
    });
    const res = mockResponse();
    req.path = '/c100-rebuild/dummyUrl';

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/dashboard-v1');
  });

  test('Should redirect back to the next page when document already exists while clicking save and continue', async () => {
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
    const controller = new MiamUploadDocument(mockForm.fields);
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          miam_certificate: {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: 'applicantname__miam_certificate__05102022.rtf',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        },
      },
    });
    const res = mockResponse();
    const response = {
      miam_certificate: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: 'applicantname__miam_certificate__05102022.rtf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
    expect(req.session.userCase).toEqual(response);
  });

  test('when there is an error in saving session should throw an error', async () => {
    const controller = new MiamUploadDocument({});
    const res = mockResponse();
    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        user: { email: 'test@example.com' },
        userCase: {
          miam_certificate: {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: 'applicantname__miam_certificate__05102022.rtf',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        },
        save: jest.fn(done => done('MOCK_ERROR')),
      },
    });

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
      //eslint-disable-next-line jest/no-conditional-expect
      expect(req.session.errors).toEqual([{ errorType: 'multipleFiles', propertyName: 'document' }]);
    }
  });
});
