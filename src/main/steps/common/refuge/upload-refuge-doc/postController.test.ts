import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import C8RefugeploadDocumentPostController from './postController';

const uploadDocumentMock = jest.spyOn(CosApiClient.prototype, 'uploadDocument');

describe('C8 Refuge > upload refuge doc > postController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new C8RefugeploadDocumentPostController({});
    req = mockRequest();
    res = mockResponse();
  });

  test('should upload document and redirect', async () => {
    req.body = { uploadFile: true };
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };
    req.url = '/applicant/refuge/upload-refuge-doc';

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

    expect(req.session.userCase.c8_refuge_document).toStrictEqual({
      document_url: 'test2/1234',
      document_binary_url: 'binary/test2/1234',
      document_filename: 'test_document_2',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    });
    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should upload document and redirect for c100 applicant', async () => {
    req.body = { uploadFile: true };
    req.params = { id: '6b792169-84df-4e9a-8299-c2c77c9b7e58' };
    req.session = {
      ...req.session,
      userCase: {
        appl_allApplicants: [
          {
            id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
            applicantFirstName: 'Test',
            applicantLastName: 'Test',
          },
        ],
      },
      user: {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
    };
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };
    req.originalUrl = '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58';

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

    expect(req.session.userCase.appl_allApplicants[0].refugeConfidentialityC8Form).toStrictEqual({
      document_url: 'test2/1234',
      document_binary_url: 'binary/test2/1234',
      document_filename: 'test_document_2',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    });
    expect(res.redirect).toHaveBeenCalledWith(
      '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58'
    );
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should upload document and redirect for c100 other person', async () => {
    req.body = { uploadFile: true };
    req.params = { id: '6b792169-84df-4e9a-8299-c2c77c9b7e58' };
    req.session = {
      ...req.session,
      userCase: {
        oprs_otherPersons: [
          {
            id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
            applicantFirstName: 'Test',
            applicantLastName: 'Test',
          },
        ],
      },
      user: {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
    };
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };
    req.originalUrl = '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58';

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

    expect(req.session.userCase.oprs_otherPersons[0].refugeConfidentialityC8Form).toStrictEqual({
      document_url: 'test2/1234',
      document_binary_url: 'binary/test2/1234',
      document_filename: 'test_document_2',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    });
    expect(res.redirect).toHaveBeenCalledWith(
      '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58'
    );
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should not upload document and add error if document already present', async () => {
    req.body = { uploadFile: true };
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };
    req.url = '/applicant/refuge/upload-refuge-doc';
    req.session.userCase = {
      c8_refuge_document: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'multipleFiles',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });

  test('should not upload document and add error if no file present', async () => {
    req.body = { uploadFile: true };
    req.url = '/applicant/refuge/upload-refuge-doc';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'empty',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });

  test('should set error when document upload status is not Success', async () => {
    req.body = { uploadFile: true };
    req.url = '/applicant/refuge/upload-refuge-doc';
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };

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

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });

  test('should catch error when uploading document', async () => {
    req.body = { uploadFile: true };
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', mimetype: 'text' } };
    req.url = '/applicant/refuge/upload-refuge-doc';

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'uploadError',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });

  test('should redirect without error when onlyContinue is true and document is present', async () => {
    req.body = { onlyContinue: true };
    req.session.userCase = {
      c8_refuge_document: {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    req.url = '/applicant/refuge/upload-refuge-doc';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toBeUndefined();
  });

  test('should redirect without error when onlyContinue is true and document is present for c100', async () => {
    req.body = { onlyContinue: true };
    req.params = { id: '6b792169-84df-4e9a-8299-c2c77c9b7e58' };
    req.session = {
      ...req.session,
      userCase: {
        appl_allApplicants: [
          {
            id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
            applicantFirstName: 'Test',
            applicantLastName: 'Test',
            refugeConfidentialityC8Form: {
              document_url: 'MOCK_URL',
              document_binary_url: 'MOCK_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
            },
          },
        ],
      },
      user: {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
    };
    req.originalUrl = '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
    expect(req.session.errors).toBeUndefined();
  });

  test('should redirect with error when onlyContinue is true and document is not present', async () => {
    req.body = { onlyContinue: true };
    req.url = '/applicant/refuge/upload-refuge-doc';

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'empty',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });

  test('should catch error when uploading non allowed document type', async () => {
    req.body = { uploadFile: true };
    req.files = { c8RefugeDocument: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.url = '/applicant/refuge/upload-refuge-doc';

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'fileFormat',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });

  test('should catch error when uploading beyond allowed size document', async () => {
    req.body = { uploadFile: true };
    req.files = { c8RefugeDocument: { name: 'test.jpg', data: '', size: '3000000000000000', mimetype: 'text' } };
    req.url = '/applicant/refuge/upload-refuge-doc';

    uploadDocumentMock.mockRejectedValue({
      status: 'Failure',
    });

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/refuge/upload-refuge-doc');
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'fileSize',
        propertyName: 'c8RefugeDocument',
      },
    ]);
  });
});
