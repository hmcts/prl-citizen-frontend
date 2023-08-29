import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../case/CosApiClient';
import { YesOrNo } from '../case/definition';
import { Form } from '../form/Form';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');
jest.mock('../document/DocumentManagementClient');
jest.mock('../../app/auth/user/oidc');

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
let partyDetails;
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
const generateStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'generateStatementDocument');
const deleteCitizenStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteCitizenStatementDocument');

const uploadDocumentListFromCitizenMock = jest.spyOn(CosApiClient.prototype, 'uploadStatementDocument');

const formGetParsedBodyMock = jest.spyOn(Form.prototype, 'getParsedBody');
const formGetErrorsMock = jest.spyOn(Form.prototype, 'getErrors');
describe('DocumentManagerController', () => {
  test('dummy', () => {
    expect(1).toEqual(1);
  });

  let fields;
  const documentManagerController = new DocumentManagerController(fields);
  const { req, res } = getMockRequestResponse();
  beforeEach(() => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    mockGet.mockResolvedValue('true');
    req.params.updateCase = undefined;
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
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/cadafinaldocumentrequest.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'finalDocument.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };

      await documentManagerController.get(req, res);
      expect(mockGet).toHaveBeenCalledWith({
        url:
          config.get('services.documentManagement.url') +
          '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
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
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/witness-statement-Final-Document.pdf';
      req.headers.accept = 'application/pdf';
      req.session.userCase.fl401UploadWitnessDocuments = [
        {
          id: '2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
          value: {
            document_url:
              config.get('services.documentManagement.url') + '/documents/95f7c1be-f880-49db-b192-6632f43742b4',
            document_binary_url:
              config.get('services.documentManagement.url') + '/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
            document_filename: 'FL401C8Document.pdf',
            document_hash: null,
          },
        },
      ];

      await documentManagerController.get(req, res);
      expect(mockGet).toHaveBeenCalledWith({
        url:
          config.get('services.documentManagement.url') +
          '/cases/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
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
    });
  });
  describe('check Allegation of Harm property saved without Response', () => {
    test('check Allegation of Harm property saved', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
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
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(req.session.userCase.respondents[0].value.user.email).toEqual('test@example.net');
    });
  });

  describe('check Allegation of Harm property saved with Response', () => {
    test('check Allegation of Harm property saved', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
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
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ];
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/aohviolence.pdf/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.updateCase = 'Yes';
      req.session.userCase.c1ADocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(req.session.userCase.respondents[0].value.response.citizenFlags.isAllegationOfHarmViewed).toEqual('Yes');
    });

    test('check file downloaded when flag viewed for cadafinaldocumentrequest', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
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
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/cadafinaldocumentrequest.pdf/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.updateCase = 'Yes';
      req.session.userCase.finalDocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'finalDocument.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(req.session.userCase.respondents[0].value.response.citizenFlags.isApplicationViewed).toEqual('Yes');
      expect(mockGet).toHaveBeenCalledWith({
        url:
          config.get('services.documentManagement.url') +
          '/cases/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
      });
    });
  });

  describe('check isApplicationViewed property saved with Response - value is No', () => {
    test('check isApplicationViewed property saved', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
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
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ];
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/cadafinaldocumentrequest/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.updateCase = 'Yes';
      req.session.userCase.finalDocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toBeCalled;
    });
  });

  describe('check isApplicationViewed property saved with Response - value is null', () => {
    test('check isApplicationViewed property saved', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
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
                isApplicationViewed: null,
              },
            },
          },
        },
      ];
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/cadafinaldocumentrequest.pdf/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.updateCase = 'Yes';
      req.session.userCase.finalDocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toBeCalled;
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
      req.session.userCase.respondentUploadFiles = [
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      ];
      const documentDetail = {
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      req.query.isApplicant = 'No';
      generateStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generateDocument(req, res);

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
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      req.query.isApplicant = 'No';
      generateStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generateDocument(req, res);

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
      req.session.userCase.applicantUploadFiles = [
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      ];
      const documentDetail = {
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      req.query.isApplicant = 'Yes';
      generateStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generateDocument(req, res);

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
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      req.query.isApplicant = 'Yes';
      generateStatementDocumentMock.mockResolvedValue(documentDetail);
      await documentManagerController.generateDocument(req, res);

      expect(req.session.errors[0].errorType).toEqual('uploadError');
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

      expect(req.session.userCase.applicantUploadFiles).toHaveLength(2);
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

      expect(req.session.userCase.respondentUploadFiles).toHaveLength(2);
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

      expect(req.session.errors[0].errorType).toEqual('uploadError');
    });
  });
  describe('check citizen document uploaded with file', () => {
    test('check document uploaded sucesfully with file for applicant', async () => {
      req.query.isApplicant = 'Yes';
      req.session.userCase.start = 'Yes';
      req.query.parentDocumentType = 'Medical Records';
      req.query.documentType = 'Medical Records';
      req.session.user.id = '12345678';
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];
      const formData = { _csrf: 'abcedfg' };
      formGetParsedBodyMock.mockReturnValueOnce(formData);
      formGetErrorsMock.mockReturnValueOnce([]);
      req.session.userCase.applicantUploadFiles = [
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded-file.jpg',
        },
      ];
      const documentDetail = {
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);
      await documentManagerController.post(req, res);
      expect(req.session.userCase.applicantUploadFiles[0].name).toEqual('uploaded-file.jpg');
    });
    test('check document uploaded sucesfully with file for respondent', async () => {
      req.query.isApplicant = 'No';
      req.session.userCase.start = 'Yes';
      req.query.parentDocumentType = 'Medical Records';
      req.query.documentType = 'Medical Records';
      req.session.user.id = '12345678';
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];
      const formData = { _csrf: 'abcedfg' };
      formGetParsedBodyMock.mockReturnValueOnce(formData);
      formGetErrorsMock.mockReturnValueOnce([]);
      const documentDetail = {
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      req.session.userCase.respondentUploadFiles = [
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
          name: 'uploaded.pdf',
        },
      ];
      uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);
      await documentManagerController.post(req, res);
      expect(req.session.userCase.respondentUploadFiles[0].name).toEqual('uploaded.pdf');
    });
    test('fail to upload document with file', async () => {
      req.query.isApplicant = 'No';
      req.session.userCase.start = 'Yes';
      req.query.parentDocumentType = 'Medical Records';
      req.session.errors = [
        {
          errorType: 'Document could not be uploaded',
        },
      ];
      req.query.documentType = 'Medical Records';
      req.session.user.id = '12345678';
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];
      const formData = { _csrf: 'abcedfg' };
      formGetParsedBodyMock.mockReturnValueOnce(formData);
      formGetErrorsMock.mockReturnValueOnce([]);
      const documentDetail = {
        status: '200',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue(documentDetail);
      await documentManagerController.post(req, res);
      expect(req.session.documentType).toBe(undefined);
    });
  });
  describe('clearUploadDocumentFormData', () => {
    test('clearUploadDocumentFormData for applicant', async () => {
      req.query.isApplicant = 'Yes';
      req.session.userCase.start = 'Yes';
      req.query.isContinue = YesOrNo.YES;
      await documentManagerController.deleteDocument(req, res);
      expect(req.session.userCase.start).toEqual('Yes');
    });
    test('clearUploadDocumentFormData for respondent', async () => {
      req.query.isApplicant = 'No';
      req.session.userCase.start = 'Yes';
      req.query.isContinue = YesOrNo.NO;
      await documentManagerController.deleteDocument(req, res);
      expect(req.session.userCase.start).toEqual('Yes');
    });
  });

  describe('fetch respondentDocsList documents', () => {
    test('fetch c7 document', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
      req.originalUrl = 'http://localhost:8080/yourdocuments/alldocuments/responsetoca';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'finalDocument.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };
      req.session.userCase.respondentDocsList = [
        {
          id: '1234',
          value: {
            c7Document: {
              partyName: 'MOCK_NAME',
              createdBy: 'MOCK_VALUE',
              dateCreated: new Date(),
              citizenDocument: {
                document_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/',
                document_filename: 'C7_document',
                document_binary_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
              },
            },
          },
        },
      ];
      req.session.applicationSettings = { docToView: { partyName: 'MOCK_NAME' } };

      await documentManagerController.get(req, res);
      expect(mockGet).toHaveBeenCalledWith({
        url:
          config.get('services.documentManagement.url') +
          '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      });
    });
  });

  test('fetch c1a document', async () => {
    mockGet.mockResolvedValue({
      responseType: 'array',
      headers: {
        'content-type': 'application/pdf',
      },
    });
    req.originalUrl = 'http://localhost:8080/yourdocuments/alldocuments/aohtoca';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
      document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
    };
    req.session.userCase.respondentDocsList = [
      {
        id: '1234',
        value: {
          c1aDocument: {
            partyName: 'MOCK_NAME',
            createdBy: 'MOCK_VALUE',
            dateCreated: new Date(),
            citizenDocument: {
              document_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/',
              document_filename: 'C1a_document',
              document_binary_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
            },
          },
        },
      },
    ];
    req.session.applicationSettings = { docToView: { partyName: 'MOCK_NAME' } };

    await documentManagerController.get(req, res);
    expect(mockGet).toHaveBeenCalledWith({
      url:
        config.get('services.documentManagement.url') + '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
    });
  });
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
