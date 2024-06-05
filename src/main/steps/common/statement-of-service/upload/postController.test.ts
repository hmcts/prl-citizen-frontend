import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import SOSUploadDocumentPostController from './postController';

const uploadDocumentMock = jest.spyOn(CosApiClient.prototype, 'uploadDocument');

describe('statement-of-service > upload > postController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new SOSUploadDocumentPostController({});
    req = mockRequest();
    res = mockResponse();
  });

  test('should upload document and redirect', async () => {
    req.body = { uploadFile: true };
    req.params = { context: 'personal-service' };
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.url = '/applicant/statement-of-service/upload';

    uploadDocumentMock.mockResolvedValue({
      status: 'Success',
      document: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    });

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(req.session.userCase.sos_document).toStrictEqual({
      document_url: 'test2/1234',
      document_binary_url: 'binary/test2/1234',
      document_filename: 'test_document_2',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    });
    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/personal-service');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should not upload document and add error if document already present', async () => {
    req.body = { uploadFile: true };
    req.params = { context: 'personal-service' };
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.url = '/applicant/statement-of-service/upload';
    req.session.userCase = {
      sos_document: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/personal-service');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'multipleFiles',
        propertyName: 'statementOfServiceDoc',
      },
    ]);
  });

  test('should not upload document and add error if no file present', async () => {
    req.body = { uploadFile: true };
    req.params = { context: 'personal-service' };
    req.url = '/applicant/statement-of-service/upload';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/personal-service');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'empty',
        propertyName: 'statementOfServiceDoc',
      },
    ]);
  });

  test('should set error when document upload status is not Success', async () => {
    req.body = { uploadFile: true };
    req.params = { context: 'personal-service' };
    req.url = '/applicant/statement-of-service/upload';
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };

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
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/personal-service');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'statementOfServiceDoc',
      },
    ]);
  });

  test('should catch error when uploading document', async () => {
    req.body = { uploadFile: true };
    req.params = { context: 'personal-service' };
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.url = '/applicant/statement-of-service/upload';

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/personal-service');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'statementOfServiceDoc',
      },
    ]);
  });

  test('should redirect without error when onlyContinue is true and document is present', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      sos_document: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    req.url = '/applicant/statement-of-service/upload';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toBeUndefined();
  });

  test('should redirect with error when onlyContinue is true and document is not present', async () => {
    req.body = { onlyContinue: true };
    req.url = '/applicant/statement-of-service/upload';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'empty',
        propertyName: 'statementOfServiceDoc',
      },
    ]);
  });
});
