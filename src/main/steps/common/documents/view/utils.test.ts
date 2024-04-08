import { CaseWithId } from '../../../../app/case/case';
import { PartyType, State } from '../../../../app/case/definition';
import { DocumentCategory, DocumentLabelCategory, DocumentSectionId } from '../definitions';

import { getDocuments, getViewDocumentCategoryList, hasAnyDocumentForPartyType, hasOrders } from './utils';

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

describe('documents > view > utils', () => {
  describe('hasOrders', () => {
    test('should return true if citizenOrders present', () => {
      expect(
        hasOrders({
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
      expect(hasOrders({} as CaseWithId)).toBe(false);
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
            documentDownloadUrl: '#',
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
            documentDownloadUrl: '#',
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
            documentDownloadUrl: '#',
            uploadedBy: 'test user',
          },
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            documentDownloadUrl: '#',
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
});
