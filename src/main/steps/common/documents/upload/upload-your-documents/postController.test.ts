import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../../app/case/CosApiClient';
import { FormFields } from '../../../../../app/form/Form';

import UploadDocumentPostController from './postController';

const generateStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'generateStatementDocument');
const uploadDocumentListFromCitizenMock = jest.spyOn(CosApiClient.prototype, 'uploadDocument');
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

  describe('uploadDocument', () => {
    test('should generate document', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
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

      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };

      const res = mockResponse();

      const documentDetail = {
        status: 'Success',
        success: { messageHtml: 'file_example_TIFF_1MB.tiff', messageText: 'file_example_TIFF_1MB.tiff' },
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'file_example_TIFF_1MB',
        },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);

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
          name: 'file_example_TIFF_1MB',
        },
      ]);
    });

    test('should set error when files are not present', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
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

    test('should set error when uploadDocument state not success', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
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
      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      const res = mockResponse();

      const documentDetail = {
        status: '',
        success: { messageHtml: 'file_example_TIFF_1MB.tiff', messageText: 'file_example_TIFF_1MB.tiff' },
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);

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

    test('should set error when uploadDocument throws error', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
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
      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      const res = mockResponse();

      uploadDocumentListFromCitizenMock.mockRejectedValueOnce({ status: '500' });

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

    test('should not set error when not exceeding max documents', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
          documentDataRef: 'documentDataRef',
          redirectUrl: '/some-redirect-url',
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
            documentDataRef: new Array(18).fill({}),
          },
        },
      });
      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue({
        status: 'Success',
        success: { messageHtml: 'file_example_TIFF_1MB.tiff', messageText: 'file_example_TIFF_1MB.tiff' },
        document: {
          document_url: 'test/1234',
          document_binary_url: 'binary/test/1234',
          document_filename: 'test_document',
          document_hash: '1234',
          document_creation_date: '1/1/2024',
        },
      });
      const res = mockResponse();

      const controller = new UploadDocumentPostController({});
      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([]);

      expect(res.redirect).not.toHaveBeenCalledWith('/some-redirect-url');
    });

    test('should  set error when  exceeding max documents', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
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
            applicantUploadFiles: new Array(21).fill({}),
          },
        },
      });
      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      const res = mockResponse();
      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'maxDocumentsReached',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });
  });

  describe('submitDocuments', () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormFields;

    test.each([
      { category: 'your-position-statements' },
      { category: 'your-witness-statements' },
      { category: 'other-people-witness-statement' },
      { category: 'media-files' },
      { category: 'medical-records' },
      { category: 'letters-from-school' },
      { category: 'tenancy-and-mortgage-agreements' },
      { category: 'medical-reports' },
      { category: 'paternity-test-reports' },
      { category: 'drug-and-alcohol-tests' },
      { category: 'police-disclosures' },
      { category: 'other-documents' },
    ])('should submit documents for each category', async ({ category }) => {
      const req = mockRequest({
        body: {
          onlyContinue: true,
        },
        params: {
          docCategory: category,
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
            applicantUploadFiles: [
              {
                document_url: 'string',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
      });
      const res = mockResponse();

      const documentDetail = {
        data: 'Success',
      };
      submitUploadedDocumentsMock.mockResolvedValue(documentDetail);

      const controller = new UploadDocumentPostController(mockFormContent);

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([]);
    });

    test('should set error when files are not present', async () => {
      const req = mockRequest({
        body: {
          onlyContinue: true,
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

      const controller = new UploadDocumentPostController(mockFormContent);

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'noFile',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });

    test('should set error when submitUploadedDocuments state not success', async () => {
      const req = mockRequest({
        body: {
          onlyContinue: true,
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
            applicantUploadFiles: [
              {
                document_url: 'string',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
            reasonsToNotSeeTheDocument: ['containsSentsitiveInformation'],
          },
        },
      });

      const res = mockResponse();

      submitUploadedDocumentsMock.mockResolvedValue({
        data: '500',
      });

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);

      expect(submitUploadedDocumentsMock).toHaveBeenCalled();

      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'uploadError',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });

    test('should set error when submitUploadedDocuments throws error', async () => {
      const req = mockRequest({
        body: {
          onlyContinue: true,
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
            reasonsToNotSeeTheDocument: ['hasConfidentailDetails'],
            applicantUploadFiles: [
              {
                document_url: 'string',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
      });
      const res = mockResponse();

      submitUploadedDocumentsMock.mockRejectedValueOnce({ data: '500' });

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

    test('should ignore all request body fields except declarationCheck when updating userCase', async () => {
      const req = mockRequest({
        body: {
          onlyContinue: true,
          id: '5678',
          declarationCheck: 'new declaration',
          caseType: 'C100',
        },
        params: {
          docCategory: 'other-documents',
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
            applicantUploadFiles: [
              {
                document_url: 'string',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
      });

      submitUploadedDocumentsMock.mockResolvedValue({ data: 'Success' });

      const controller = new UploadDocumentPostController(mockFormContent);

      await controller.post(req, mockResponse());
      await new Promise(process.nextTick);

      expect(req.session.userCase.declarationCheck).toBe('new declaration');
      expect(req.session.userCase.id).toBe('1234');
      expect(req.session.userCase.caseType).toBe('FL401');
    });
  });

  describe('deleteDocument', () => {
    const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

    beforeEach(() => {
      deleteDocumentMock.mockReset();
    });

    test('should delete document and return successful JSON response', async () => {
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
            id: 'case-123',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url: '/documents/document-123',
                document_binary_url: 'binary/document-123',
                document_filename: 'test.pdf',
              },
              {
                document_url: '/documents/document-456',
                document_binary_url: 'binary/document-456',
                document_filename: 'other.pdf',
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

      expect(req.session.userCase.applicantUploadFiles).toEqual([
        {
          document_url: '/documents/document-456',
          document_binary_url: 'binary/document-456',
          document_filename: 'other.pdf',
        },
      ]);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        redirectUrl: expect.any(String),
      });
    });

    test('should delete the uploaded files property when the last document is deleted', async () => {
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
          applicationSettings: {
            isDocumentGeneratedAndUplaoded: true,
          },
          userCase: {
            id: 'case-123',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url: '/documents/document-123',
                document_filename: 'test.pdf',
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

      expect(req.session.userCase.applicantUploadFiles).toBeUndefined();
      expect(req.session.applicationSettings.isDocumentGeneratedAndUplaoded).toBeUndefined();
      expect(deleteDocumentMock).toHaveBeenCalledWith('document-123');
    });

    test('should set deleteError and return error JSON when deleteDocument fails', async () => {
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
            id: 'case-123',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url: '/documents/document-123',
                document_filename: 'test.pdf',
              },
            ],
          },
        },
      });

      const res = mockResponse();

      deleteDocumentMock.mockRejectedValueOnce(new Error('delete failed'));

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(req.session.errors).toEqual([
        {
          errorType: 'deleteError',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          message: 'errors.uploadDocumentFileUpload.deleteError',
        },
        redirectUrl: expect.any(String),
      });
    });
  });

  describe('post routing', () => {
    test('should route to generateDocument when generateDocument is submitted', async () => {
      const req = mockRequest({
        body: {
          generateDocument: true,
          statementText: 'statement',
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

      generateStatementDocumentMock.mockResolvedValue([]);

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(generateStatementDocumentMock).toHaveBeenCalled();
    });

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

      uploadDocumentListFromCitizenMock.mockResolvedValue({
        status: 'Success',
        success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
        document: {
          document_url: '/documents/test',
          document_filename: 'test.pdf',
          document_binary_url: '/documents/test/binary',
          document_hash: '123',
          document_creation_date: '07/10/2026',
        },
      });

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(uploadDocumentListFromCitizenMock).toHaveBeenCalled();
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

      uploadDocumentListFromCitizenMock.mockResolvedValue({
        status: 'Success',
        success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
        document: {
          document_url: '/documents/test',
          document_filename: 'test.pdf',
          document_binary_url: '/documents/test/binary',
          document_hash: '123',
          document_creation_date: '07/10/2026',
        },
      });

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(uploadDocumentListFromCitizenMock).toHaveBeenCalled();
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

    test('should set uploadError when submitUploadedDocuments returns a non-success response', async () => {
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
                document_url: '/documents/test',
              },
            ],
          },
        },
      });

      const res = mockResponse();

      submitUploadedDocumentsMock.mockResolvedValue({
        data: 'Failed',
      });

      const controller = new UploadDocumentPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);

      expect(req.session.errors).toEqual([
        {
          errorType: 'uploadError',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
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

      uploadDocumentListFromCitizenMock.mockResolvedValue({
        status: 'Success',
        success: { messageHtml: 'test.pdf', messageText: 'test.pdf' },
        document: {
          document_url: '/documents/test',
          document_filename: 'test.pdf',
          document_binary_url: '/documents/test/binary',
          document_hash: '123',
          document_creation_date: '07/10/2026',
        },
      });

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
          message: 'errors.uploadDocumentFileUpload.noStatementOrFile',
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
