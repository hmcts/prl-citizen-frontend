import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../../app/case/CaseApi';

import MIAMDomesticAbuseEvidenceUploadController from './postController';

const uploadDocumentMock = jest.spyOn(CaseApi.prototype, 'uploadDocument');

describe('C100-rebuild > MIAM > domestic-abuse > upload-evidence > postController', () => {
  let req;
  let res;
  let controller;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    controller = new MIAMDomesticAbuseEvidenceUploadController({});
  });

  test('should remove errors and redirect if onlyContinue present', async () => {
    req.body = { onlyContinue: true };
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should stay on same page without errors if no file uploaded', async () => {
    req.body = { onlyContinue: false };
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/domestic-abuse/upload-evidence/:removeFileId?');
    expect(req.session.errors).toBeUndefined();
  });

  test('should redirect with error if file is too large', async () => {
    req.body = { onlyContinue: false };
    req.files = { miam_domesticAbuseEvidenceDocs: { name: 'test.pdf', size: '81230000', data: '', mimetype: 'text' } };
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'maxFileSize',
        propertyName: 'miam_domesticAbuseEvidenceDocs',
      },
    ]);
  });

  test('should redirect with error if invalid file type is present', async () => {
    req.body = { onlyContinue: false };
    req.files = { miam_domesticAbuseEvidenceDocs: { name: 'test.txt', size: '812300', data: '', mimetype: 'text' } };
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'invalidFileFormat',
        propertyName: 'miam_domesticAbuseEvidenceDocs',
      },
    ]);
  });

  test('should upload document, add to session and redirect', async () => {
    req.body = { onlyContinue: false };
    req.files = { miam_domesticAbuseEvidenceDocs: { name: 'test.pdf', size: 8123, data: '', mimetype: 'text' } };
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
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase.miam_domesticAbuseEvidenceDocs).toStrictEqual([
      {
        document_url: 'test/1234',
        document_binary_url: 'binary/test/1234',
        document_filename: 'test_document',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    ]);
  });

  test('should upload document, add to existing documents in session and redirect', async () => {
    req.body = { onlyContinue: false, uploadFile: true };
    req.files = { miam_domesticAbuseEvidenceDocs: { name: 'test.pdf', size: 8123, data: '', mimetype: 'text' } };
    req.session.userCase.miam_domesticAbuseEvidenceDocs = [
      {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    ];
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
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/domestic-abuse/upload-evidence');
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase.miam_domesticAbuseEvidenceDocs).toStrictEqual([
      {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
      {
        document_url: 'test/1234',
        document_binary_url: 'binary/test/1234',
        document_filename: 'test_document',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    ]);
  });

  test('should add error and redirect if response status is not Success', async () => {
    req.body = { onlyContinue: false };
    req.files = { miam_domesticAbuseEvidenceDocs: { name: 'test.pdf', size: 8123, data: '', mimetype: 'text' } };
    uploadDocumentMock.mockResolvedValue({
      status: 'Error',
      document: {
        document_url: 'test/1234',
        document_binary_url: 'binary/test/1234',
        document_filename: 'test_document',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'miam_domesticAbuseEvidenceDocs',
      },
    ]);
    expect(req.session.userCase.miam_domesticAbuseEvidenceDocs).toStrictEqual(undefined);
  });

  test('should catch error and redirect', async () => {
    req.body = { onlyContinue: false };
    req.files = { miam_domesticAbuseEvidenceDocs: { name: 'test.pdf', size: 8123, data: '', mimetype: 'text' } };
    uploadDocumentMock.mockRejectedValue({
      status: 'Error',
    });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'miam_domesticAbuseEvidenceDocs',
      },
    ]);
    expect(req.session.userCase.miam_domesticAbuseEvidenceDocs).toStrictEqual(undefined);
  });
});
