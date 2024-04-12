import config from 'config';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../case/CosApiClient';
import { YesOrNo } from '../case/definition';
import { Form } from '../form/Form';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');
jest.mock('../document/DocumentManagementClient');
jest.mock('../../app/auth/user/oidc');

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

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
    req.params.docContext = undefined;
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
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/FL401-Final-Document.pdf';
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
      req.params.docContext = 'update-case';
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

    test('check isAllegationOfHarmViewed property works when set as no', async () => {
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
                isAllegationOfHarmViewed: 'No',
              },
            },
          },
        },
      ];
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/aohviolence.pdf/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.docContext = 'update-case';
      req.session.userCase.finalDocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toBeCalled;
      expect(req.session.userCase.respondents[0].value.response.citizenFlags).toStrictEqual({
        isAllegationOfHarmViewed: 'Yes',
        isApplicationViewed: 'No',
      });
    });

    test('check isApplicationViewed property functions properly for aohviolence file', async () => {
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
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/aohviolence.pdf/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.docContext = 'update-case';
      req.session.userCase.finalDocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toBeCalled;
      expect(req.session.userCase.respondents[0].value.response.citizenFlags).toStrictEqual({
        isAllegationOfHarmViewed: 'Yes',
        isApplicationViewed: 'Yes',
      });
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
      req.params.docContext = 'update-case';
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
      req.params.docContext = 'update-case';
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

    test('check isApplicationViewed property works when set as no', async () => {
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
                isApplicationViewed: 'No',
              },
            },
          },
        },
      ];
      req.originalUrl = 'http://localhost:8080/applicant/public/docs/aohviolence.pdf/Yes?';
      req.headers.accept = 'application/pdf';
      req.params.docContext = 'update-case';
      req.session.userCase.finalDocument = {
        document_url: config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e',
        document_binary_url:
          config.get('services.documentManagement.url') + '/documents/2db656fc-2c9e-494a-a1ca-1605e1ac8d5e/binary',
        document_filename: 'C100.pdf',
        document_hash: null,
      };

      await documentManagerController.get(req, res);

      expect(mockGet).toBeCalled;
      expect(req.session.userCase.respondents[0].value.response.citizenFlags).toStrictEqual({
        isAllegationOfHarmViewed: 'Yes',
        isApplicationViewed: 'No',
      });
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
      req.params.docContext = 'update-case';
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
      req.body = { ...req.body, statementText: 'testStatement' };

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
      req.session.userCase.respondentsFL401 = partyDetails[0].value;
      req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
      req.session.userCase.caseInvites = [
        {
          id: '1234',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'MOCK_EMAIL',
            accessCode: '1234',
            invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            expiryDate: 'MOCK_DATE',
            isApplicant: 'No',
          },
        },
      ];
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
      req.session.errors = !req.session.errors;
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
    test('clearUploadDocumentFormData for applicant tasklist', async () => {
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

    test('fetch c7 final document', async () => {
      mockGet.mockResolvedValue({
        responseType: 'array',
        headers: {
          'content-type': 'application/pdf',
        },
      });
      req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
      req.originalUrl = 'http://localhost:8080/yourdocuments/doc/generate-c7-final';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
        document_filename: 'finalDocument.pdf',
        document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
      };
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
      req.session.userCase.citizenResponseC7DocumentList = [
        {
          id: '1234',
          value: {
            partyName: 'MOCK_NAME',
            createdBy: '9813df99-41bf-4b46-a602-86676b5e3547',
            dateCreated: new Date(),
            citizenDocument: {
              document_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/',
              document_filename: '9813df99-41bf-4b46-a602-86676b5e3547',
              document_binary_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
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

    test('error when c7 final document binary url not present', async () => {
      req.originalUrl = 'http://localhost:8080/yourdocuments/doc/generate-c7-final';
      req.headers.accept = 'application/pdf';
      req.session.userCase.citizenResponseC7DocumentList = [
        {
          id: '1234',
          value: {
            partyName: 'MOCK_NAME',
            createdBy: '9813df99-41bf-4b46-a602-86676b5e3547',
            dateCreated: new Date(),
            citizenDocument: {
              document_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/',
              document_filename: '9813df99-41bf-4b46-a602-86676b5e3547',
              document_binary_url: undefined,
            },
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

  test('fetch citizen uploaded document', async () => {
    mockGet.mockResolvedValue({
      responseType: 'array',
      headers: {
        'content-type': 'application/pdf',
      },
    });
    req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
    req.originalUrl = 'http://localhost:8080/alldocuments/downloadCitizenDocument/6bb61ec7-df31-4c14-b11d-48379307aa8c';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
      document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
    };
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
    req.session.userCase.citizenUploadedDocumentList = [
      {
        id: '1234',
        value: {
          partyName: 'MOCK_NAME',
          createdBy: 'MOCK_VALUE',
          dateCreated: new Date(),
          citizenDocument: {
            document_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
            document_filename: '6bb61ec7-df31-4c14-b11d-48379307aa8c',
            document_binary_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
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

  test('fetch citizen uploaded document should fail when missing binary url', async () => {
    mockGet.mockResolvedValue({
      responseType: 'array',
      headers: {
        'content-type': 'application/pdf',
      },
    });
    req.session.user.id = '9813df99-41bf-4b46-a602-86676b5e3547';
    req.originalUrl = 'http://localhost:8080/alldocuments/downloadCitizenDocument/6bb61ec7-df31-4c14-b11d-48379307aa8c';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
    };
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
    req.session.userCase.citizenUploadedDocumentList = [
      {
        id: '1234',
        value: {
          partyName: 'MOCK_NAME',
          createdBy: 'MOCK_VALUE',
          dateCreated: new Date(),
          citizenDocument: {
            document_url: '/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
            document_filename: '6bb61ec7-df31-4c14-b11d-48379307aa8c',
          },
        },
      },
    ];
    req.session.applicationSettings = { docToView: { partyName: 'MOCK_NAME' } };

    let flag = false;
    let error;
    try {
      await documentManagerController.get(req, res);
    } catch (err) {
      flag = true;
      error = err;
    }
    expect(error.message).toBe('Binary URL is not found for citizenUploadedDocumentList:citizenDocument');
    expect(flag).toBe(true);
  });

  test('fetch finalDocument should fail when missing binary url', async () => {
    mockGet.mockResolvedValue({
      responseType: 'array',
      headers: {
        'content-type': 'application/pdf',
      },
    });
    req.originalUrl = 'http://localhost:8080/yourdocuments/alldocuments/cadafinaldocumentrequest';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
    };
    req.session.userCase.citizenResponseC7DocumentList = [
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
            },
          },
        },
      },
    ];
    req.session.applicationSettings = { docToView: { partyName: 'MOCK_NAME' } };

    let flag = false;
    let error;
    try {
      await documentManagerController.get(req, res);
    } catch (err) {
      flag = true;
      error = err;
    }
    expect(error.message).toBe('binary url is not found for finalDocument.pdf');
    expect(flag).toBe(true);
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

  test('should redirect to applicant task list if generated document not found for applicant', async () => {
    mockGet.mockResolvedValue(undefined);
    req.originalUrl = 'http://localhost:8080/applicant/public/docs/FL401-Final-Document.pdf';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
      document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
    };

    await documentManagerController.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/task-list');
  });

  test('should redirect to respondent task list if generated document not found for respondent', async () => {
    mockGet.mockResolvedValue(undefined);
    req.originalUrl = 'http://localhost:8080/respondent/public/docs/FL401-Final-Document.pdf';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
      document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
    };

    await documentManagerController.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/respondent/task-list');
  });

  test('should throw error if error when saving session', async () => {
    mockGet.mockResolvedValueOnce(undefined);
    req.originalUrl = 'http://localhost:8080/respondent/public/docs/FL401-Final-Document.pdf';
    req.headers.accept = 'application/pdf';
    req.session.userCase.finalDocument = {
      document_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c',
      document_filename: 'finalDocument.pdf',
      document_binary_url: 'http://dm-store:8080/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
    };
    req.session.save = jest.fn(done => done('MOCK_ERROR'));

    let flag = false;
    let error;
    try {
      await documentManagerController.get(req, res);
    } catch (err) {
      flag = true;
      error = err;
    }
    expect(flag).toBe(true);
    expect(error).toBe('MOCK_ERROR');
  });

  test('check delete document feature when no documents uploaded', async () => {
    const uploadedFiles = [];
    req.query.isApplicant = 'Yes';
    req.session.userCase.applicantUploadFiles = uploadedFiles;
    req.params.documentId = '9813df11-41bf-4b46-a602-86766b5e3547';
    req.session.save = jest.fn(done => done());
    req.session.user = {
      accessToken: 'mock-user-access-token',
      name: 'test',
      givenName: 'First name',
      familyName: 'Last name',
      email: 'test@example.com',
    };
    deleteCitizenStatementDocumentMock.mockResolvedValue('SUCCESS');
    await documentManagerController.deleteDocument(req, res);

    expect(req.session.userCase.applicantUploadFiles).toBeUndefined();
  });

  describe('generate document function', () => {
    let request;
    let response;
    fields = '';
    const generateDocumentManagerController = new DocumentManagerController(fields);

    beforeEach(() => {
      request = mockRequest({
        query: { documentCategory: 'witnessstatements', documentType: 'positionstatements' },
      });
      response = mockResponse();
    });

    test('should generate document', async () => {
      request.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      request.body = { ...request.body, statementText: 'testStatement' };
      generateStatementDocumentMock.mockResolvedValue({
        status: 'Success',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      });

      await generateDocumentManagerController.generateDocument(request, response);
      expect(request.session.userCase.applicantUploadFiles).toStrictEqual([
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      ]);
      expect(request.session.errors).toStrictEqual([]);
      expect(response.redirect).toHaveBeenCalledWith(
        '/applicant/upload-document/upload-your-documents/witnessstatements/positionstatements'
      );
    });

    test('should handle error when generateStatementDocument throws error', async () => {
      request.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      request.body = { ...request.body, statementText: 'testStatement' };
      generateStatementDocumentMock.mockRejectedValueOnce({
        status: 'Failure',
      });

      await generateDocumentManagerController.generateDocument(request, response);
      expect(request.session.errors).toStrictEqual([
        { errorType: 'uploadError', propertyName: 'uploadDocumentFileUpload' },
      ]);
      expect(response.redirect).toHaveBeenCalledWith(
        '/applicant/upload-document/upload-your-documents/witnessstatements/positionstatements'
      );
    });
  });

  describe('upload document function', () => {
    let request;
    let response;
    fields = '';
    const uploadDocumentManagerController = new DocumentManagerController(fields);

    beforeEach(() => {
      request = mockRequest({
        query: { documentCategory: 'witnessstatements', documentType: 'positionstatements' },
      });
      response = mockResponse();
    });

    test('should upload document', async () => {
      request.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue({
        status: 'Success',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      });

      await uploadDocumentManagerController.uploadDocument(request, response);
      expect(request.session.userCase.applicantUploadFiles).toStrictEqual([
        {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      ]);
      expect(request.session.errors).toStrictEqual([]);
      expect(response.redirect).toHaveBeenCalledWith(
        '/applicant/upload-document/upload-your-documents/witnessstatements/positionstatements'
      );
    });

    test('should handle error when response status not success', async () => {
      request.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      uploadDocumentListFromCitizenMock.mockResolvedValue({
        status: 'Failure',
        document: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
          document_hash: 'string',
          document_creation_date: 'string',
        },
      });

      await uploadDocumentManagerController.uploadDocument(request, response);
      expect(request.session.errors).toStrictEqual([
        { errorType: 'uploadError', propertyName: 'uploadDocumentFileUpload' },
      ]);
      expect(response.redirect).toHaveBeenCalledWith(
        '/applicant/upload-document/upload-your-documents/witnessstatements/positionstatements'
      );
    });

    test('should handle error when uploadStatementDocument throws error', async () => {
      request.files = {
        statementDocument: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
      };
      uploadDocumentListFromCitizenMock.mockRejectedValueOnce({
        status: 'Failure',
      });

      await uploadDocumentManagerController.uploadDocument(request, response);
      expect(request.session.errors).toStrictEqual([
        { errorType: 'uploadError', propertyName: 'uploadDocumentFileUpload' },
      ]);
      expect(response.redirect).toHaveBeenCalledWith(
        '/applicant/upload-document/upload-your-documents/witnessstatements/positionstatements'
      );
    });

    test('should redirect correctly when no files present', async () => {
      await documentManagerController.uploadDocument(request, response);
      expect(response.redirect).toHaveBeenCalledWith(
        '/applicant/upload-document/upload-your-documents/witnessstatements/positionstatements'
      );
    });
  });

  describe('redirect functions', () => {
    let request;
    let response;

    beforeEach(() => {
      request = mockRequest();
      response = mockResponse();
    });

    test('redirectToCaseView for fl401 applicant', async () => {
      await documentManagerController.redirectToCaseView(request, response);
      expect(response.redirect).toHaveBeenCalledWith('/case/1234');
    });

    test('redirectToCaseView for c100 applicant', async () => {
      request.session.userCase.caseTypeOfApplication = 'C100';
      await documentManagerController.redirectToCaseView(request, response);
      expect(response.redirect).toHaveBeenCalledWith('/case/1234');
    });

    test('redirectToCaseView for respondent', async () => {
      request.session.userCase.respondentsFL401 = partyDetails[0].value;
      request.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
      request.session.userCase.caseInvites = [
        {
          id: '1234',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'MOCK_EMAIL',
            accessCode: '1234',
            invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            expiryDate: 'MOCK_DATE',
            isApplicant: 'No',
          },
        },
      ];

      await documentManagerController.redirectToCaseView(request, response);
      expect(response.redirect).toHaveBeenCalledWith('/case/1234');
    });

    test('redirectToUploadDocument for applicant', async () => {
      await documentManagerController.redirectToUploadDocument(request, response);
      expect(response.redirect).toHaveBeenCalledWith('/applicant/upload-document');
    });

    test('redirectToUploadDocument for respondent', async () => {
      request.session.userCase.respondentsFL401 = partyDetails[0].value;
      request.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
      request.session.userCase.caseInvites = [
        {
          id: '1234',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'MOCK_EMAIL',
            accessCode: '1234',
            invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            expiryDate: 'MOCK_DATE',
            isApplicant: 'No',
          },
        },
      ];

      await documentManagerController.redirectToUploadDocument(request, response);
      expect(response.redirect).toHaveBeenCalledWith('/respondent/upload-document');
    });
  });
});

describe('error logger', () => {
  test('should log error when getting file details', async () => {
    retrieveByCaseIdMock.mockClear();
    const req = mockRequest();
    const res = mockResponse();
    req.locals.logger = mockLogger;
    req.session.save = jest.fn(done => done('MOCK_SAVE_ERROR'));

    let fields;
    const documentManagerController = new DocumentManagerController(fields);
    retrieveByCaseIdMock.mockRejectedValue('MOCK_RETRIEVE_ERROR');

    let flag = false;
    try {
      await documentManagerController.get(req, res);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(true);
    expect(mockLogger.error).toHaveBeenCalledWith('MOCK_RETRIEVE_ERROR');
  });
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
