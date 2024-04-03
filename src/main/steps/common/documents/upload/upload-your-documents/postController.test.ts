import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../../app/case/CosApiClient';
import { FormFields } from '../../../../../app/form/Form';

import UploadDocumentPostController from './postController';

const generateStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'generateStatementDocument');
const uploadDocumentListFromCitizenMock = jest.spyOn(CosApiClient.prototype, 'uploadStatementDocument');
const submitUploadedDocumentsMock = jest.spyOn(CosApiClient.prototype, 'submitUploadedDocuments');

describe('common > documents > upload > upload-your-documents > postController', () => {
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

      const documentDetail = {
        status: 'Success',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      };
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
          errorType: 'empty',
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

      const documentDetail = {
        status: '',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      };
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
          errorType: 'empty',
          propertyName: 'uploadDocumentFileUpload',
        },
      ]);
    });

    test('should set error when uploadStatementDocument state not success', async () => {
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

    test('should set error when uploadStatementDocument throws error', async () => {
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
          errorType: 'empty',
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
      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      const res = mockResponse();

      const documentDetail = {
        data: '500',
      };
      submitUploadedDocumentsMock.mockResolvedValue(documentDetail);

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
  });
});
