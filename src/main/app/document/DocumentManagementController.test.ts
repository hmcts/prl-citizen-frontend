import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');
jest.mock('../document/DocumentManagementClient');
jest.mock('../../app/auth/user/oidc');

describe('DocumentManagerController', () => {
  let fields;
  const documentManagerController = new DocumentManagerController(fields);
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();
    //jest.mock('getSystemUser', () => jest.fn());
  });

  describe('fetch file FL401-Final-Document for applicant', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/FL401-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'FL401FinalDocument.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-541.service.core-compute-preview.internal/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      });

      expect(res.redirect).toHaveBeenCalledWith(APPLICANT_TASK_LIST_URL);
    });
  });

  describe('fetch file FL401-Final-Document for applicant when file name is invalid', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/FL401-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: '',
        document_filename: '',
        document_binary_url: '',
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(true);
    });
  });

  describe('fetch file witness-statement-Final-Document for applicant', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/witness-statement-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.fl401UploadWitnessDocuments = [
        {
          id: '2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
          value: {
            document_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/95f7c1be-f880-49db-b192-6632f43742b4',
            document_binary_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
            document_filename: 'FL401C8Document.pdf',
            document_hash: null,
          },
        },
      ];

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-541.service.core-compute-preview.internal/cases/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
      });

      expect(res.redirect).toHaveBeenCalledWith(APPLICANT_TASK_LIST_URL);
    });
  });

  describe('fetch file witness-statement-Final-Document for applicant with invalid document_binary_url', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/witness-statement-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.fl401UploadWitnessDocuments = [
        {
          id: '2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
          value: {
            document_url: '',
            document_binary_url: '',
            document_filename: '',
            document_hash: null,
          },
        },
      ];

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(true);
    });
  });

  describe('check Allegation of Harm property saved', () => {
    test('check Allegation of Harm property saved', async () => {
      const { req, res } = getMockRequestResponse();
      req.session.user.idamId = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.respondents = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            email: 'abc@test.com',
            idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
          },
        },
      ];
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/aohviolence.pdf';
      req.headers.accept = 'application/pdf';
      req.query.updateCase = 'Yes';
      req.session.userCase.c1ADocument = {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(false);
      expect(mockGet).toHaveBeenCalledWith({
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-541.service.core-compute-preview.internal/cases/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
      });
    });
  });
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
