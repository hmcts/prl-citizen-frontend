import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../app/case/CaseApi';

import MIAMAttendanceEvidenceUploadController from './postController';

const uploadDocumentMock = jest.spyOn(CaseApi.prototype, 'uploadDocument');

describe('MIAMAttendanceEvidenceUploadController > postController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new MIAMAttendanceEvidenceUploadController({});
    req = mockRequest();
    res = mockResponse();
  });

  test('should upload document and redirect', async () => {
    req.body = { uploadFile: true, onlyContinue: true };
    req.files = { miam_previousAttendanceEvidenceDoc: { name: 'test.jpg', data: '', mimetype: 'text' } };

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

    expect(req.session.userCase.miam_previousAttendanceEvidenceDoc).toStrictEqual({
      document_url: 'test/1234',
      document_binary_url: 'binary/test/1234',
      document_filename: 'test_document',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    });
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload-evidence-of-attending-miam-or-ncdr');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should not upload document and add error if document already present', async () => {
    req.body = { uploadFile: true };
    req.files = { miam_previousAttendanceEvidenceDoc: { name: 'test.jpg', data: '', mimetype: 'text' } };

    req.session.userCase = {
      miam_previousAttendanceEvidenceDoc: {
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
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });

  test('should not upload document and add error if no file present', async () => {
    req.body = { uploadFile: true };
    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'required',
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });

  test('should set error when document upload status is not Success', async () => {
    req.body = { uploadFile: true };
    req.files = { miam_previousAttendanceEvidenceDoc: { name: 'test.jpg', data: '', mimetype: 'text' } };

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
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });

  test('should catch error when uploading document', async () => {
    req.body = { uploadFile: true };

    req.files = { miam_previousAttendanceEvidenceDoc: { name: 'test.jpg', data: '', mimetype: 'text' } };

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });

  test('should redirect without error when onlyContinue is true and document is present', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      miam_previousAttendanceEvidenceDoc: {
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

  test('should redirect with error when onlyContinue is true and document is not present', async () => {
    req.body = { onlyContinue: true };

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'required',
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });
  test('should catch error when uploading non allowed document type', async () => {
    req.body = { uploadFile: true };

    req.files = { miam_previousAttendanceEvidenceDoc: { name: 'test.rtf', data: '', mimetype: 'text' } };

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'invalidFileFormat',
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });
  test('should catch error when uploading beyond allowed size document', async () => {
    req.body = { uploadFile: true };

    req.files = {
      miam_previousAttendanceEvidenceDoc: { name: 'test.jpg', data: '', size: '3000000000000000', mimetype: 'text' },
    };

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);

    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'maxFileSize',
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });
});
