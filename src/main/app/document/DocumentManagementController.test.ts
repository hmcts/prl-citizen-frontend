//import { when } from 'jest-when';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

//import { DocumentType, State } from '../case/definition';
import { DocumentManagerController } from './DocumentManagementController';

//import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');
//import { getSystemUser  } from '../../app/auth/user/oidc';

jest.mock('../document/DocumentManagementClient');

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();
  });

  describe('fetch file', () => {
    test('fetch an existing file - %o', async () => {
      const { req, res } = getMockRequestResponse();
      req.originalUrl = 'http://localhost:8080/public/docs/FL401-Final-Document.pdf';
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
    });
  });
});
function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
