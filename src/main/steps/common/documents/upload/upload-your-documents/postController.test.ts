import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../../app/case/CosApiClient';

import UploadDocumentPostController from './postController';

const generateStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'generateStatementDocument');
const uploadMultipleDocumentsMock = jest.spyOn(CosApiClient.prototype, 'uploadMultipleDocuments');
const submitUploadedDocumentsMock = jest.spyOn(CosApiClient.prototype, 'submitUploadedDocuments');

describe('documents > upload > upload-your-documents > postController', () => {
  describe('generateDocument', () => {
    test('should generate document', async () => {
      const req = mockRequest({
        body: {
          generateDocument: true,
          statementText: 'statement text',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });
      const res = mockResponse();

      const documentDetail = [
        {
          status: 'Success',
          success: { messageHtml: 'uploaded.pdf', messageText: 'uploaded.pdf' },
          document: {
            document_url: 'string',
            document_binary_url: 'string',
            document_filename: 'string',
            document_hash: 'string',
            document_creation_date: 'string',
            name: 'uploaded.pdf',
          },
        },
      ];
      generateStatementDocumentMock.mockResolvedValue(documentDetail);

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.userCase.applicantUploadFiles).toStrictEqual([
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      ]);
    });

    test('should set error when statement text not present', async () => {
      const req = mockRequest({
        body: {
          generateDocument: true,
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });
      const res = mockResponse();
      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'noStatementOrFile',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });

    test('should set error when generateStatementDocument state not success', async () => {
      const req = mockRequest({
        body: {
          generateDocument: true,
          statementText: 'statement text',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });
      const res = mockResponse();

      const documentDetail = [
        {
          status: '',
          success: { messageHtml: 'uploaded.pdf', messageText: 'uploaded.pdf' },
          document: {
            document_url: 'string',
            document_binary_url: 'string',
            document_filename: 'string',
            document_hash: 'string',
            document_creation_date: 'string',
            name: 'uploaded.pdf',
          },
        },
      ];
      generateStatementDocumentMock.mockResolvedValue(documentDetail);

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'uploadError',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });

    test('should set error when generateStatementDocument throws error', async () => {
      const req = mockRequest({
        body: {
          generateDocument: true,
          statementText: 'statement text',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });
      const res = mockResponse();

      generateStatementDocumentMock.mockRejectedValueOnce({ status: '500' });

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'uploadError',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });
  });

  describe('post routing', () => {
    test('should route to uploadDocument when uploadFile is submitted', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });

      req.files = {
        documents: {
          name: 'test.pdf',
          data: '',
          mimetype: 'application/pdf',
        },
      };

      const res = mockResponse();

      uploadMultipleDocumentsMock.mockResolvedValue([
        {
          status: 'Success',
          success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
          document: {
            document_url: '/documents/test',
            document_filename: 'test.pdf',
            document_binary_url: '/documents/test/binary',
            document_hash: '123',
            document_creation_date: '07/10/2026',
          },
        },
      ]);

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(uploadMultipleDocumentsMock).toHaveBeenCalled();
    });

    test('should route to uploadDocument when files are present even without uploadFile', async () => {
      const req = mockRequest({
        body: {},
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });

      req.files = {
        documents: {
          name: 'test.pdf',
          data: '',
          mimetype: 'application/pdf',
        },
      };

      const res = mockResponse();

      uploadMultipleDocumentsMock.mockResolvedValue([
        {
          status: 'Success',
          success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
          document: {
            document_url: '/documents/test',
            document_filename: 'test.pdf',
            document_binary_url: '/documents/test/binary',
            document_hash: '123',
            document_creation_date: '07/10/2026',
          },
        },
      ]);

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(uploadMultipleDocumentsMock).toHaveBeenCalled();
    });

    test('should route to deleteDocument when delete is submitted', async () => {
      const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

      const req = mockRequest({
        body: {
          delete: 'document-123',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
            accessToken: 'token',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url: '/documents/document-123',
              },
            ],
          },
        },
      });

      const res = mockResponse();

      deleteDocumentMock.mockResolvedValue('Success');

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(deleteDocumentMock).toHaveBeenCalledWith('document-123');
    });

    test('should route to submitDocuments when onlyContinue is submitted', async () => {
      const req = mockRequest({
        body: {
          onlyContinue: true,
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url: '/documents/document-123',
              },
            ],
          },
        },
      });

      const res = mockResponse();

      submitUploadedDocumentsMock.mockResolvedValue({
        data: 'Success',
      });

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(submitUploadedDocumentsMock).toHaveBeenCalled();
    });
  });

  describe('uploadDocument XHR handling', () => {
    test('should return JSON response for an XHR request', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
        },
        headers: {
          'sec-fetch-dest': 'empty',
          accept: 'application/json',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });

      req.files = {
        documents: {
          name: 'test.pdf',
          data: '',
          mimetype: 'application/pdf',
        },
      };

      const res = mockResponse();

      uploadMultipleDocumentsMock.mockResolvedValue([
        {
          status: 'Success',
          success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
          document: {
            document_url: '/documents/test',
            document_filename: 'test.pdf',
            document_binary_url: '/documents/test/binary',
            document_hash: '123',
            document_creation_date: '07/10/2026',
          },
        },
      ]);

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(res.json).toHaveBeenCalledWith({
        success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
        file: {
          filename: 'test',
          originalname: 'test.pdf',
        },
        redirectUrl: '/applicant/documents/upload/your-position-statements/upload-your-documents',
      });

      expect(res.redirect).not.toHaveBeenCalled();
    });

    test('should return JSON error for an XHR request when no file is supplied', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
        },
        headers: {
          'sec-fetch-dest': 'empty',
          accept: 'application/json',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });

      const res = mockResponse();

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: 'noStatementOrFile',
        },
        redirectUrl: expect.any(String),
      });
    });

    test('should use normal redirect for a non-XHR request', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
        },
        headers: {
          'sec-fetch-dest': 'document',
          accept: 'text/html',
        },
        params: {
          docCategory: 'your-position-statements',
        },
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });

      const res = mockResponse();

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(res.redirect).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
