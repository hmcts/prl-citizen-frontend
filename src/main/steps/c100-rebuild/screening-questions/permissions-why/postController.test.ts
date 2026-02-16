import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../app/case/CaseApi';

import PermissionsWhyUploadController from './postController';

const uploadDocumentMock = jest.spyOn(CaseApi.prototype, 'uploadDocument');

describe('PermissionsWhyUploadController > postController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new PermissionsWhyUploadController({});
    req = mockRequest();
    res = mockResponse();

    req.session.userCase = {};
    req.session.errors = [];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should upload document and store in session', async () => {
    req.files = {
      sq_uploadDocument_subfield: { name: 'test.pdf', data: '', mimetype: 'application/pdf' },
    };

    uploadDocumentMock.mockResolvedValue({
      status: 'Success',
      document: {
        document_url: 'test/1234',
        document_binary_url: 'binary/test/1234',
        document_filename: 'test_document',
        document_hash: '1234',
        document_creation_date: '1/1/2026',
      },
    });

    await controller.post(req, res);

    expect(req.session.userCase.sq_uploadDocument_subfield).toBeDefined();
    expect(req.session.errors).toStrictEqual([]);
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should simply redirect when no file uploaded (optional)', async () => {
    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([]);
    expect(uploadDocumentMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should set error for invalid file format', async () => {
    req.files = {
      sq_uploadDocument_subfield: { name: 'test.exe', data: '', mimetype: 'application/x-msdownload' },
    };

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        propertyName: 'sq_uploadDocument_subfield',
        errorType: 'invalidFileFormat',
      },
    ]);

    expect(uploadDocumentMock).not.toHaveBeenCalled();
  });

  test('should set error for oversized file', async () => {
    req.files = {
      sq_uploadDocument_subfield: {
        name: 'test.pdf',
        data: '',
        mimetype: 'application/pdf',
        size: 999999999999,
      },
    };

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        propertyName: 'sq_uploadDocument_subfield',
        errorType: 'maxFileSize',
      },
    ]);

    expect(uploadDocumentMock).not.toHaveBeenCalled();
  });

  test('should not upload document and add error if document already present', async () => {
    req.files = { sq_uploadDocument_subfield: { name: 'test.jpg', data: '', mimetype: 'text' } };

    req.session.userCase = {
      sq_uploadDocument_subfield: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'multipleFiles',
        propertyName: 'sq_uploadDocument_subfield',
      },
    ]);
  });

  test('should set uploadError if API fails', async () => {
    req.files = {
      sq_uploadDocument_subfield: { name: 'test.pdf', data: '', mimetype: 'application/pdf' },
    };

    uploadDocumentMock.mockRejectedValue(new Error('fail'));

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        propertyName: 'sq_uploadDocument_subfield',
        errorType: 'uploadError',
      },
    ]);
  });
});
