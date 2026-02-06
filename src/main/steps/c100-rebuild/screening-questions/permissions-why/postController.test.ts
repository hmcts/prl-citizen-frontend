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
  });

  test('should upload document and redirect', async () => {
    req.body = { uploadFile: true, onlyContinue: true };
    req.files = { sq_uploadDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };

    uploadDocumentMock.mockResolvedValue({
      status: 'Success',
      document: {
        document_url: 'test/1234',
        document_binary_url: 'binary/test/1234',
        document_filename: 'test_document',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    });

    await controller.post(req, res);

    expect(req.session.userCase.sq_uploadDocument).toStrictEqual({
      document_url: 'test/1234',
      document_binary_url: 'binary/test/1234',
      document_filename: 'test_document',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    });
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/screening-questions/permissions-why');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should allow continue without uploading a document', async () => {
    req.body = { uploadFile: false };

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toStrictEqual(undefined);
  });

  test('should not upload document and add error if document already present', async () => {
    req.body = { uploadFile: true };
    req.files = { sq_uploadDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };

    req.session.userCase = {
      sq_uploadDocument: {
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
        propertyName: 'sq_uploadDocument',
      },
    ]);
  });

  test('should set error when document upload status is not Success', async () => {
    req.body = { uploadFile: true };
    req.files = { sq_uploadDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };

    uploadDocumentMock.mockResolvedValue({
      status: 'Failure',
      document: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'sq_uploadDocument',
      },
    ]);
  });

  test('should catch error when uploading document', async () => {
    req.body = { uploadFile: true };

    req.files = { sq_uploadDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'sq_uploadDocument',
      },
    ]);
  });

  test('should redirect without error when onlyContinue is true and document is present', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      sq_uploadDocument: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should not throw error when no document is provided', async () => {
    req.body = { uploadFile: false };

    req.files = { sq_uploadDocument: undefined };

    uploadDocumentMock.mockRejectedValue({
      status: 'Success',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual(undefined);
  });

  test('should catch error when uploading non allowed document type', async () => {
    req.body = { uploadFile: true };

    req.files = { sq_uploadDocument: { name: 'test.rtf', data: '', mimetype: 'text' } };

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'invalidFileFormat',
        propertyName: 'sq_uploadDocument',
      },
    ]);
  });

  test('should catch error when uploading beyond allowed size document', async () => {
    req.body = { uploadFile: true };

    req.files = {
      sq_uploadDocument: { name: 'test.jpg', data: '', size: '3000000000000000', mimetype: 'text' },
    };

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'maxFileSize',
        propertyName: 'sq_uploadDocument',
      },
    ]);
  });
});
