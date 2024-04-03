import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import { PartyType, State } from '../../../app/case/definition';

import { DocumentCategory, DocumentLabelCategory, DocumentSectionId } from './definitions';
import {
  deleteDocument,
  getDocuments,
  getViewDocumentCategoryList,
  hasAnyDocumentForPartyType,
  isOrdersFromTheCourtPresent,
} from './util';

const documentCategoryLabels = {
  positionStatements: "{partyName}'s position statements",
  witnessStatements: "{partyName}'s witness statements",
  otherPeopleWitnessStatements: "Other people's witness statements",
  medicalRecords: 'Medical records',
  medicalReports: 'Medical reports',
  DNAReports: 'DNA reports',
  drugAndAlcoholTests: 'Drug and alcohol tests (toxicology)',
  policeReports: 'Police reports',
} as Record<Partial<DocumentLabelCategory>, string>;

const deleteCitizenStatementDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteCitizenStatementDocument');

describe('common > documents > util', () => {
  describe('isOrdersFromTheCourtPresent', () => {
    test('should return true if citizenOrders present', () => {
      expect(
        isOrdersFromTheCourtPresent({
          citizenOrders: [
            {
              partyId: '1234',
              partyType: 'applicant',
              categoryId: 'policeReport',
              uploadedBy: 'test user',
              uploadedDate: '01/01/2024',
              reviewedDate: '01/01/2024',
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'policeReport',
                document_creation_date: '01/01/2024',
              },
              documentWelsh: null,
            },
          ],
          id: '123',
          state: 'Draft' as State,
        })
      ).toBe(true);
    });

    test('should return false if citizenOrders not present', () => {
      expect(isOrdersFromTheCourtPresent({} as CaseWithId)).toBe(false);
    });
  });

  describe('hasAnyDocumentForPartyType', () => {
    test('should return true if citizenDocuments present for applicant', () => {
      expect(
        hasAnyDocumentForPartyType(
          'applicant' as PartyType,
          {
            citizenDocuments: [
              {
                partyId: '1234',
                partyType: 'applicant',
                categoryId: 'policeReport',
                uploadedBy: 'test user',
                uploadedDate: '01/01/2024',
                reviewedDate: '01/01/2024',
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'policeReport',
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
            id: '123',
            state: 'Draft' as State,
          } as CaseWithId
        )
      ).toBe(true);
    });

    test('should return true if citizenDocuments present for respondent', () => {
      expect(
        hasAnyDocumentForPartyType(
          'respondent' as PartyType,
          {
            citizenDocuments: [
              {
                partyId: '1234',
                partyType: 'respondent',
                categoryId: 'policeReport',
                uploadedBy: 'test user',
                uploadedDate: '01/01/2024',
                reviewedDate: '01/01/2024',
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'policeReport',
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
            id: '123',
            state: 'Draft' as State,
          } as CaseWithId
        )
      ).toBe(true);
    });

    test('should return false if partyTypes dont match for citizenDocuments', () => {
      expect(
        hasAnyDocumentForPartyType(
          'applicant' as PartyType,
          {
            citizenDocuments: [
              {
                partyId: '1234',
                partyType: 'respondent',
                categoryId: 'policeReport',
                uploadedBy: 'test user',
                uploadedDate: '01/01/2024',
                reviewedDate: '01/01/2024',
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'policeReport',
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
            id: '123',
            state: 'Draft' as State,
          } as CaseWithId
        )
      ).toBe(false);
    });
  });

  describe('getDocuments', () => {
    test('should get correct english documents with partyId', () => {
      expect(
        getDocuments(
          'applicantStatements' as DocumentCategory,
          [
            {
              partyId: '1',
              partyType: 'respondent' as PartyType,
              categoryId: 'applicantStatements' as DocumentCategory,
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: null,
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'applicantStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              documentWelsh: null,
            },
            {
              partyId: '2',
              partyType: 'applicant' as PartyType,
              categoryId: 'positionStatements' as DocumentCategory,
              uploadedBy: 'test user2',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: null,
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              documentWelsh: null,
            },
          ],
          'respondent' as PartyType,
          '1'
        )
      ).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user',
          },
        },
      ]);
    });

    test('should get correct english documents without partyId', () => {
      expect(
        getDocuments(
          'applicantStatements' as DocumentCategory,
          [
            {
              partyId: '1',
              partyType: 'respondent' as PartyType,
              categoryId: 'applicantStatements' as DocumentCategory,
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: null,
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'applicantStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              documentWelsh: null,
            },
            {
              partyId: '2',
              partyType: 'applicant' as PartyType,
              categoryId: 'positionStatements' as DocumentCategory,
              uploadedBy: 'test user2',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: null,
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              documentWelsh: null,
            },
          ],
          'respondent' as PartyType
        )
      ).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user',
          },
        },
      ]);
    });

    test('should get correct welsh documents', () => {
      expect(
        getDocuments(
          'applicantStatements' as DocumentCategory,
          [
            {
              partyId: '1',
              partyType: 'respondent' as PartyType,
              categoryId: 'applicantStatements' as DocumentCategory,
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: null,
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'applicantStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              documentWelsh: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'applicantStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
            },
            {
              partyId: '2',
              partyType: 'applicant' as PartyType,
              categoryId: 'positionStatements' as DocumentCategory,
              uploadedBy: 'test user2',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: null,
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              documentWelsh: null,
            },
          ],
          'respondent' as PartyType,
          '1'
        )
      ).toStrictEqual([
        {
          document_cy: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user',
          },
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user',
          },
        },
      ]);
    });
  });

  describe('getViewDocumentCategoryList', () => {
    test('should get correct applicant documents', () => {
      expect(
        getViewDocumentCategoryList(
          'applicantsDocuments' as DocumentSectionId,
          {
            citizenDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
              {
                partyId: '2',
                partyType: 'applicant' as PartyType,
                categoryId: 'positionStatements' as DocumentCategory,
                uploadedBy: 'test user2',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'applicant' as PartyType
        )
      ).toStrictEqual([
        {
          categoryId: 'positionStatements',
          link: {
            openInAnotherTab: false,
            text: "test user2's position statements",
            url: '/applicant/documents/view/positionStatements/applicant/2?',
          },
        },
      ]);
    });

    test('should get correct respondent documents', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as DocumentSectionId,

          {
            citizenDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
              {
                partyId: '2',
                partyType: 'applicant' as PartyType,
                categoryId: 'positionStatements' as DocumentCategory,
                uploadedBy: 'test user2',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'respondent' as PartyType
        )
      ).toStrictEqual([
        {
          categoryId: 'applicantStatements',
          link: {
            openInAnotherTab: false,
            text: "test user's witness statements",
            url: '/respondent/documents/view/applicantStatements/respondent/1?',
          },
        },
      ]);
    });

    test('should not get documents when sectionId is not applicant or respondent documents', () => {
      expect(
        getViewDocumentCategoryList(
          'ordersFromTheCourt' as DocumentSectionId,
          {
            citizenDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
              {
                partyId: '2',
                partyType: 'applicant' as PartyType,
                categoryId: 'positionStatements' as DocumentCategory,
                uploadedBy: 'test user2',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'respondent' as PartyType
        )
      ).toStrictEqual([]);
    });

    test('should add documents for same category with different party ids', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as DocumentSectionId,
          {
            citizenDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
              {
                partyId: '2',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user2',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL_DUPLICATE',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'respondent' as PartyType
        )
      ).toStrictEqual([
        {
          categoryId: 'applicantStatements',
          link: {
            openInAnotherTab: false,
            text: "test user's witness statements",
            url: '/respondent/documents/view/applicantStatements/respondent/1?',
          },
        },
        {
          categoryId: 'applicantStatements',
          link: {
            openInAnotherTab: false,
            text: "test user2's witness statements",
            url: '/respondent/documents/view/applicantStatements/respondent/2?',
          },
        },
      ]);
    });

    test('should only get one document for other categories', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as DocumentSectionId,

          {
            citizenDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'medicalReports' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
              {
                partyId: '2',
                partyType: 'respondent' as PartyType,
                categoryId: 'medicalReports' as DocumentCategory,
                uploadedBy: 'test user2',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                document: {
                  document_url: 'MOCK_DOCUMENT_URL2',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'applicantStatements' as DocumentCategory,
                  document_creation_date: '01/01/2024',
                },
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'respondent' as PartyType
        )
      ).toStrictEqual([
        {
          categoryId: 'medicalReports',
          link: {
            openInAnotherTab: false,
            text: 'Medical reports',
            url: '/respondent/documents/view/medicalReports/respondent',
          },
        },
      ]);
    });
  });

  describe('deleteDocuments', () => {
    test('should remove document from upload files list', async () => {
      const req = mockRequest({
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
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      });
      const res = mockResponse();
      deleteCitizenStatementDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.userCase.applicantUploadFiles).toStrictEqual(undefined);
    });

    test('should add error to session when deleteCitizenStatementDocument fails', async () => {
      const req = mockRequest({
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
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      });
      const res = mockResponse();
      deleteCitizenStatementDocumentMock.mockRejectedValue('500');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        { errorType: 'donwloadError', propertyName: 'uploadDocumentFileUpload' },
      ]);
    });
  });
});
