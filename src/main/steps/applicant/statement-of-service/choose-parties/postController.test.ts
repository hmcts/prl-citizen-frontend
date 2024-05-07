import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import UploadSosPostController from './postController';

const uploadDocumentListFromCitizenMock = jest.spyOn(CosApiClient.prototype, 'uploadStatementDocument');
const deleteCitizenStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteCitizenStatementDocument');

describe('statement-of-service > choose-parties > postController', () => {
  describe('uploadDocument', () => {
    test('should generate document', async () => {
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
      const req = mockRequest({
        body: {
          uploadFile: true,
        },
        params: {},
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            statementOfServiceDocument: documentDetail.document,
          },
        },
      });

      req.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };

      const res = mockResponse();

      uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);
      deleteCitizenStatementDocumentMock.mockResolvedValueOnce('SUCCESS');

      const controller = new UploadSosPostController({});

      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.userCase.statementOfServiceDocument).toStrictEqual({
        document_url: 'string',
        document_binary_url: 'string',
        document_filename: 'string',
        document_hash: 'string',
        document_creation_date: 'string',
        name: 'file_example_TIFF_1MB',
      });
    });

    test('should set error when files are not present', async () => {
      const req = mockRequest({
        body: {
          uploadFile: true,
        },
        params: {},
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
      const controller = new UploadSosPostController({});

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
        params: {},
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

      const controller = new UploadSosPostController({});

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
        params: {},
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

      const controller = new UploadSosPostController({});

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

  describe('validate form fields', () => {
    test('should return errors', async () => {
      const req = mockRequest();
      req.session.userCase = {
        respondents: [
          {
            id: 'test',
            value: {},
          },
        ],
      };
      req.body = {
        sos_partiesServed: [''],
        sos_partiesServedDate: undefined,
      };

      const res = mockResponse();
      const controller = new UploadSosPostController({});
      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toHaveLength(2);
    });

    test('should return to summary page with no errors', async () => {
      const req = mockRequest();
      req.session.userCase = {
        respondents: [
          {
            id: 'test',
            value: {},
          },
        ],
        statementOfServiceDocument: {},
      };
      req.body = {
        sos_partiesServed: ['John'],
        'sos_partiesServedDate-day': '1',
        'sos_partiesServedDate-month': '1',
        'sos_partiesServedDate-year': '2000',
      };

      const res = mockResponse();
      const controller = new UploadSosPostController({});
      await controller.post(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toHaveLength(0);
    });
  });
});
