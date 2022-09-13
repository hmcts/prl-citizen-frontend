//import axios, { AxiosInstance } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICANT_TASK_LIST_URL } from '../../steps/urls';
//import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import * as oidc from '../auth/user/oidc';

import { DocumentManagerController } from './DocumentManagementController';
//import { CosApiClient } from '../case/CosApiClient';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');
jest.mock('../document/DocumentManagementClient');
jest.mock('../../app/auth/user/oidc');
const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
//const mockGetServiceAuthToken = getServiceAuthToken as jest.Mocked<jest.Mock>;
//const getCaseDetails = jest.spyOn(cosApiClient, CosApiClient, 'retrieveByCaseId')

//const fn = jest.fn();when(cosApiClient.retrieveByCaseId).calledWith(1).mockReturnValue('yay!');

///START/////
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;
// const mockPost = jest.fn().mockResolvedValue({ data: { documents: ['a-document'] } });
// mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);
// //const mockCosApiClient: jest.Mocked<cosApiClient.CosApiClient> = {};

// const returnvalue = jest.fn();
// jest.mock('../case/CosApiClient', () => {
//   return jest.fn().mockImplementation(() => {
//     return {retrieveByCaseId: returnvalue};
//   });
// });
///////END////////
// jest.mock('CosApiClient');
// const mockCosApiClient1 = CosApiClient as jest.Mocked<typeof CosApiClient>;
// mockCosApiClient1.

// let userid = 'dummy-userid';
// let userdetails = {
//   accessToken: 'accessToken',
//   id: 'id',
//   email: 'email',
//   givenName: 'givenName',
//   familyName: 'familyName',
// }
// mockCosApiClient.retrieveByCaseId(userid, userdetails).

// jest.spyOn(cosApiClient, 'retrieveByCaseId')
// .mockImplementation({id:'sdfsdf'})

//const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
describe('DocumentManagerController', () => {
  let fields;
  const documentManagerController = new DocumentManagerController(fields);
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();
    //jest.mock('getSystemUser', () => jest.fn());
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });

    const mockReturnValue = jest.fn();
    jest.mock('../case/CosApiClient', () => {
      return jest.fn().mockImplementation(() => {
        return { retrieveByCaseId: mockReturnValue };
      });
    });

    const mockReturnValueCreate = jest.fn();
    jest.mock('../../app/document/DocumentManagementClient', () => {
      return jest.fn().mockImplementation(() => {
        return { create: mockReturnValueCreate };
      });
    });

    const mockReturnValueGet = jest.fn();
    jest.mock('../../app/document/DocumentManagementClient', () => {
      return jest.fn().mockImplementation(() => {
        return { get: mockReturnValueGet };
      });
    });
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

      // expect(mockGet).toHaveBeenCalledWith({
      //   url: 'https://ccd-case-document-am-api-prl-ccd-definitions-pr-541.service.core-compute-preview.internal/cases/documents/95f7c1be-f880-49db-b192-6632f43742b4/binary',
      // });

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

    test('download pdf document check application', async () => {
      const { req, res } = getMockRequestResponse();

      req.originalUrl = 'http://localhost:3001/yourdocuments/alldocuments/cadafinaldocumentrequest';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/14da4df3-c671-4d8d-ab96-a91050a1bdc1',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/14da4df3-c671-4d8d-ab96-a91050a1bdc1/binary',
        document_filename: 'C100FinalDocument.pdf',
        document_hash: null,
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(false);
    });

    test('download pdf document check application with invalid test data', async () => {
      const { req, res } = getMockRequestResponse();

      req.originalUrl = 'http://localhost:3001/yourdocuments/alldocuments/cadafinaldocumentrequest';
      req.headers.accept = 'application/pdf';
      req.session.userCase.finalDocument = {
        document_url: '',
        document_binary_url: '',
        document_filename: '',
        document_hash: null,
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(true);
    });

    test('download pdf document miamcertificate', async () => {
      const { req, res } = getMockRequestResponse();

      req.originalUrl = 'http://localhost:3001/yourdocuments/alldocuments/miamcertificate';
      req.headers.accept = 'application/pdf';
      req.session.userCase.miamCertificationDocumentUpload = {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/14da4df3-c671-4d8d-ab96-a91050a1abc1',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/14da4df3-c671-4d8d-ab96-a91050a1abc1/binary',
        document_filename: 'miamcertificate.pdf',
        document_hash: null,
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(false);
    });

    test('download pdf document miamcertificate with invalid input data', async () => {
      const { req, res } = getMockRequestResponse();

      req.originalUrl = 'http://localhost:3001/yourdocuments/alldocuments/miamcertificate';
      req.headers.accept = 'application/pdf';
      req.session.userCase.miamCertificationDocumentUpload = {
        document_url: '',
        document_binary_url: '',
        document_filename: '',
        document_hash: null,
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(true);
    });

    test('download pdf document aohviolence', async () => {
      const { req, res } = getMockRequestResponse();

      req.originalUrl = 'http://localhost:3001/yourdocuments/alldocuments/aohviolence';
      req.headers.accept = 'application/pdf';
      req.session.userCase.c1ADocument = {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/9524d774-6d23-45f6-a291-af436221b028',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/9524d774-6d23-45f6-a291-af436221b028/binary',
        document_filename: 'C1A_Document.pdf',
        document_hash: null,
      };

      let flag = false;
      try {
        await documentManagerController.get(req, res);
      } catch (err) {
        flag = true;
      }
      expect(flag).toBe(false);
    });

    test('download pdf document aohviolence with invalid input data', async () => {
      const { req, res } = getMockRequestResponse();

      req.originalUrl = 'http://localhost:3001/yourdocuments/alldocuments/aohviolence';
      req.headers.accept = 'application/pdf';
      req.session.userCase.c1ADocument = {
        document_url: '',
        document_binary_url: '',
        document_filename: '',
        document_hash: null,
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
});

function getMockRequestResponse() {
  const req = mockRequest();
  const res = mockResponse();
  return { req, res };
}
