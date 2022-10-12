import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
import { CosApiClient } from '../case/CosApiClient';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');
jest.mock('../document/DocumentManagementClient');
jest.mock('../../app/auth/user/oidc');

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
let partyDetails;
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
const generateUserUploadedStatementDocumentMock = jest.spyOn(
  CosApiClient.prototype,
  'generateUserUploadedStatementDocument'
);
const deleteCitizenStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteCitizenStatementDocument');

describe('DocumentManagerController', () => {
  let fields;
  const documentManagerController = new DocumentManagerController(fields);
  const { req, res } = getMockRequestResponse();
  beforeEach(() => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    mockGet.mockResolvedValue('true');
    //jest.mock('getSystemUser', () => jest.fn());
  });
  afterEach(() => {
    jest.clearAllMocks();
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();

    //jest.mock('getSystemUser', () => jest.fn());
    partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'Sonali',
          lastName: 'Citizen',
          email: 'abc@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: {
            citizenFlags: {
              isAllegationOfHarmViewed: 'Yes',
            },
          },
        },
      },
    ];
    updateCaserMock.mockClear();
    retrieveByCaseIdMock.mockClear();
  });

  describe('fetch file FL401-Final-Document for applicant', () => {
    test('fetch an existing file - %o', async () => {
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/FL401-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'FL401FinalDocument.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-565.service.core-compute-preview.internal/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      });
    });
  });

  describe('fetch file FL401-Final-Document for applicant when file name is invalid', () => {
    test('fetch an existing file - %o', async () => {
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
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-565.service.core-compute-preview.internal/cases/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
      });
    });
  });

  describe('fetch file witness-statement-Final-Document for applicant with invalid document_binary_url', () => {
    test('fetch an existing file - %o', async () => {
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
  describe('test notifyBannerForNewDcoumentUploaded', () => {
    test('notifyBannerForNewDcoumentUploaded for CA respondent', async () => {
      const { req } = getMockRequestResponse();
      req.session.userCase.caseTypeOfApplication = 'C100';
      req.session.userCase.respondents = partyDetails;
      updateCaserMock.mockResolvedValue(req.session.userCase);
      const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
      documentManagerController.notifyBannerForNewDcoumentUploaded(
        req,
        req.session.userCase.id,
        client,
        req.session.user
      );
      expect(req.session.userCase.respondents[0].value.response.citizenFlags.isAllDocumentsViewed).toEqual('No');
    });
    test('notifyBannerForNewDcoumentUploaded for CA applicant', async () => {
      const { req } = getMockRequestResponse();
      req.session.userCase.caseTypeOfApplication = 'C100';
      req.session.userCase.applicants = partyDetails;
      updateCaserMock.mockResolvedValue(req.session.userCase);
      const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
      documentManagerController.notifyBannerForNewDcoumentUploaded(
        req,
        req.session.userCase.id,
        client,
        req.session.user
      );
      expect(req.session.userCase.applicants[0].value.response.citizenFlags.isAllDocumentsViewed).toEqual('No');
    });
    test('notifyBannerForNewDcoumentUploaded for DA respondent', async () => {
      const { req } = getMockRequestResponse();
      req.session.userCase.caseTypeOfApplication = 'fl401';
      req.session.userCase.respondentsFL401 = partyDetails[0].value;
      updateCaserMock.mockResolvedValue(req.session.userCase);
      const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
      documentManagerController.notifyBannerForNewDcoumentUploaded(
        req,
        req.session.userCase.id,
        client,
        req.session.user
      );
      expect(req.session.userCase.respondentsFL401.response.citizenFlags.isAllDocumentsViewed).toEqual('No');
    });
    test('notifyBannerForNewDcoumentUploaded for DA applicant', async () => {
      const { req } = getMockRequestResponse();
      req.session.userCase.caseTypeOfApplication = 'fl401';
      req.session.userCase.applicantsFL401 = partyDetails[0].value;
      updateCaserMock.mockResolvedValue(req.session.userCase);
      const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
      documentManagerController.notifyBannerForNewDcoumentUploaded(
        req,
        req.session.userCase.id,
        client,
        req.session.user
      );
      expect(req.session.userCase.applicantsFL401.response.citizenFlags.isAllDocumentsViewed).toEqual('No');

  describe('check Allegation of Harm property saved without Response', () => {
    test('check Allegation of Harm property saved', async () => {
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.respondents = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            user: {
              idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
              email: 'test@example.net',
            },
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

      await documentManagerController.get(req, res);

      expect(req.session.userCase.respondents[0].value.response.citizenFlags.isAllegationOfHarmViewed).toEqual('Yes');
    });
  });

  describe('check Allegation of Harm property saved with Response', () => {
    test('check Allegation of Harm property saved', async () => {
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.respondents = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            user: {
              idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
              email: 'test@example.net',
            },
            response: {
              citizenFlags: {
                isApplicationViewed: 'Yes',
              },
            },
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

      await documentManagerController.get(req, res);

      expect(req.session.userCase.respondents[0].value.response.citizenFlags.isAllegationOfHarmViewed).toEqual('Yes');
    });
  });

  describe('check document uploaded sucesfully from text area', () => {
    test('check document uploaded sucesfully from text area for respondent', async () => {
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.respondents = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            user: {
              idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
              email: 'test@example.net',
            },
          },
        },
      ];
      const documentDetail = {
        status: 200,
        documentId: '9813df11-41bf-4b46-a602-86766b5e3547',
        documentName: 'uploaded.pdf',
      };
      req.query.isApplicant = 'No';
      generateUserUploadedStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generatePdf(req, res);

      expect(req.session.userCase.respondentUploadFiles[0].name).toEqual('uploaded.pdf');
    });
  });

  describe('check citizen document uploaded', () => {
    test('check document uploaded sucesfully from text area for respondent', async () => {
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.respondents = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            user: {
              idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
              email: 'test@example.net',
            },
          },
        },
      ];
      const documentDetail = {
        status: 200,
        documentId: '9813df11-41bf-4b46-a602-86766b5e3547',
        documentName: 'uploaded.pdf',
      };
      req.query.isApplicant = 'No';
      generateUserUploadedStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generatePdf(req, res);

      expect(req.session.userCase.respondentUploadFiles[0].name).toEqual('uploaded.pdf');
    });
    test('check document uploaded sucesfully from text area for applicant', async () => {
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.applicants = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            user: {
              idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
              email: 'test@example.net',
            },
          },
        },
      ];
      const documentDetail = {
        status: 200,
        documentId: '9813df11-41bf-4b46-a602-86766b5e3547',
        documentName: 'uploaded.pdf',
      };
      req.query.isApplicant = 'Yes';
      generateUserUploadedStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generatePdf(req, res);

      expect(req.session.userCase.applicantUploadFiles[0].name).toEqual('uploaded.pdf');
    });
    test('failed to uploaded document from text area', async () => {
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.session.userCase.applicants = [
        {
          id: '9813df99-41bf-4b46-a602-86676b5e3547',
          value: {
            user: {
              idamId: '9813df99-41bf-4b46-a602-86676b5e3547',
              email: 'test@example.net',
            },
          },
        },
      ];
      const documentDetail = {
        status: 400,
      };
      req.query.isApplicant = 'Yes';
      generateUserUploadedStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generatePdf(req, res);

      expect(req.session.errors[0].errorType).toEqual('Document could not be uploaded');
    });
  });

  describe('check delete document feature', () => {
    test('check delete document feature for applicant', async () => {
      const uploadedFiles = [
        {
          id: '9813df11-41bf-4b46-a602-86766b5e3547',
          documentName: 'uploaded1.pdf',
        },
        {
          id: '9813df11-41bf-4aaa-a602-86766b5e3547',
          documentName: 'uploaded2.pdf',
        },
      ];
      req.query.isApplicant = 'Yes';
      req.session.userCase.applicantUploadFiles = uploadedFiles;
      req.params.documentId = '9813df11-41bf-4b46-a602-86766b5e3547';
      deleteCitizenStatementDocumentMock.mockResolvedValue('SUCCESS');
      await documentManagerController.deleteDocument(req, res);

      expect(req.session.userCase.applicantUploadFiles).toHaveLength(1);
    });
    test('check delete document feature for respondent', async () => {
      const uploadedFiles = [
        {
          id: '9813df11-41bf-4b46-a602-86766b5e3547',
          documentName: 'uploaded1.pdf',
        },
        {
          id: '9813df11-41bf-4aaa-a602-86766b5e3547',
          documentName: 'uploaded2.pdf',
        },
      ];
      req.query.isApplicant = 'No';
      req.session.userCase.respondentUploadFiles = uploadedFiles;
      req.params.documentId = '9813df11-41bf-4b46-a602-86766b5e3547';
      deleteCitizenStatementDocumentMock.mockResolvedValue('SUCCESS');
      await documentManagerController.deleteDocument(req, res);

      expect(req.session.userCase.respondentUploadFiles).toHaveLength(1);
    });
    test('fail to delete citizen document', async () => {
      const uploadedFiles = [
        {
          id: '9813df11-41bf-4b46-a602-86766b5e3547',
          documentName: 'uploaded1.pdf',
        },
        {
          id: '9813df11-41bf-4aaa-a602-86766b5e3547',
          documentName: 'uploaded2.pdf',
        },
      ];
      req.query.isApplicant = 'No';
      req.session.userCase.respondentUploadFiles = uploadedFiles;
      req.params.documentId = '9813df11-41bf-4b46-a602-86766b5e3547';
      deleteCitizenStatementDocumentMock.mockResolvedValue('FAILURE');
      await documentManagerController.deleteDocument(req, res);

      expect(req.session.errors[0].errorType).toEqual('Document could not be deleted');
    });
  });
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
