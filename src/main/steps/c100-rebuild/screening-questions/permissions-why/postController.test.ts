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

  test('should simply redirect when no file uploaded (optional)', async () => {
    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([]);
    expect(uploadDocumentMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should set error for invalid file format', async () => {
    req.files = {
      file: {
        name: 'test.exe',
        data: Buffer.from('file'),
        mimetype: 'application/x-msdownload',
      },
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
      file: {
        name: 'test.pdf',
        data: Buffer.from('file'),
        mimetype: 'application/pdf',
        size: 9999999999999,
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
    req.files = {
      file: {
        name: 'test.pdf',
        data: '',
        mimetype: 'application/pdf',
      },
    };

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
      file: {
        name: 'test.pdf',
        data: Buffer.from('file'),
        mimetype: 'application/pdf',
      },
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

  test('should call session.save and redirect when no file exists', async () => {
    await controller.post(req, res);

    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should call uploadDocument with FormData', async () => {
    const uploadedFile = {
      name: 'test.pdf',
      data: Buffer.from('file'),
      mimetype: 'application/pdf',
    };

    req.files = {
      file: uploadedFile,
    };

    uploadDocumentMock.mockResolvedValue({
      status: 'SUCCESS',
      document: {
        document_url: 'url',
        document_binary_url: 'binary-url',
        document_filename: 'test.pdf',
        document_hash: '123',
        document_creation_date: '01/01/2024',
      },
    });

    await controller.post(req, res);
    expect(uploadDocumentMock).toHaveBeenCalledTimes(1);
    const formDataArg = uploadDocumentMock.mock.calls[0][0];
    expect(formDataArg).toBeDefined();
    expect(typeof formDataArg.append).toBe('function');
  });

  test('should continue normally if files object exists but subfield missing', async () => {
    req.files = {};

    await controller.post(req, res);

    expect(uploadDocumentMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });
});
