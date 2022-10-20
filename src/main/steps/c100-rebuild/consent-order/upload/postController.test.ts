import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import ConsentOrderDocumentUpload from './postController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Consent Order Document Upload controller', () => {
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
    const controller = new ConsentOrderDocumentUpload(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = {
      co_certificate: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: 'applicantname_consent_order_draft_05102022.rtf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };

    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/c100-rebuild/consent-order/upload');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should should proceed to next page req.body.saveAndContinue and document exists', async () => {
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
    const controller = new ConsentOrderDocumentUpload(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.body.saveAndContinue = true;
    req.session.userCase = {
      co_certificate: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: 'applicantname_consent_order_draft_05102022.rtf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };

    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/citizen-home');
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
    const controller = new ConsentOrderDocumentUpload(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/c100-rebuild/consent-order/upload');
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
    const controller = new ConsentOrderDocumentUpload(mockForm.fields);
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '8123000098098', data: '', mimetype: 'text' } };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/c100-rebuild/consent-order/upload');
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

    const controller = new ConsentOrderDocumentUpload(mockForm.fields);
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', size: '812300', data: '', mimetype: 'text' } };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/c100-rebuild/consent-order/upload');
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

    const controller = new ConsentOrderDocumentUpload(mockForm.fields);
    const req = mockRequest({});
    const res = mockResponse();

    req.files = { documents: { name: 'test.pdf', size: '812300', data: '', mimetype: 'text' } };
    const dateOfSystem = new Date().toLocaleString('en-GB').split(',')[0].split('/').join('');
    const extensionType = req.files.documents.name.split('.')[req.files.documents.name.split('.').length - 1];

    req.locals.C100Api.uploadDocument.mockResolvedValue({
      document: {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        document_filename: `applicantname_consent_order_draft_${dateOfSystem}.${extensionType}`,
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    });

    await controller.post(req, res);

    expect(res.redirect).toBeCalledWith('/c100-rebuild/consent-order/upload');
  });
});

describe('when there is an error in saving session', () => {
  test('should throw an error', async () => {
    const controller = new ConsentOrderDocumentUpload({});
    const res = mockResponse();
    const req = mockRequest({
      session: {
        user: { email: 'test@example.com' },

        save: jest.fn(done => done('MOCK_ERROR')),
      },
    });
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    // const QUERY = {
    //   orderType: 'otherOrder',
    //   orderId: '1',
    // };
    // req.query = QUERY;
    req.session.userCase = {
      co_certificate: {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: 'applicantname_consent_order_draft_05102022.rtf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    };
    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }
  });
});
