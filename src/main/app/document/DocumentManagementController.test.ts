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

describe('DocumentManagerController', () => {
  let fields;
  const documentManagerController = new DocumentManagerController(fields);
  beforeEach(() => {
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
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-580.service.core-compute-preview.internal/cases/documents/6bb61ec7-df31-4c14-b11d-48379307aa8c/binary',
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
        url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-580.service.core-compute-preview.internal/cases/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
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
    });
  });
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
