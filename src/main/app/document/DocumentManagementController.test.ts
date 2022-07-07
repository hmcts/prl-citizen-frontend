import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL } from '../../steps/urls';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');

jest.mock('../document/DocumentManagementClient');

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();
  });

  describe('fetch file FL401-Final-Document for applicant', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/FL401-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.fl401SubmittedApplication = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'FL401-Final-Document.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({
        url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      });

      expect(res.redirect).toHaveBeenCalledWith(APPLICANT_TASK_LIST_URL);
    });
  });

  describe('fetch file FL401-Final-Document for respondent', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/respondent/public/docs/FL401-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.fl401SubmittedApplication = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'FL401-Final-Document.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({
        url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      });

      expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_TASK_LIST_URL);
    });
  });

  describe('fetch file FL401-Final-Document for respondent when file properties are empty', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/respondent/public/docs/FL401-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.fl401SubmittedApplication = {
        document_url: '',
        document_filename: '',
        document_binary_url: '',
      };

      let errorFlag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        errorFlag = true;
      }
      expect(errorFlag).toBe(true);
    });
  });
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
