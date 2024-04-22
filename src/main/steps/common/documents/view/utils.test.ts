import { CaseWithId } from '../../../../app/case/case';
import { PartyType, State } from '../../../../app/case/definition';
import {
  CitizenApplicationPacks,
  CitizenOrders,
  DocumentCategory,
  DocumentLabelCategory,
  DocumentSectionId,
} from '../definitions';

import {
  getApplicationPackDocuments,
  getApplicationPacksCategoryList,
  getDocuments,
  getViewDocumentCategoryList,
  hasAnyDocumentForPartyType,
  hasOrders,
} from './utils';

const documentCategoryLabels = {
  positionStatements: "{partyName}'s position statements",
  witnessStatements: "{partyName}'s witness statements",
  otherPeopleWitnessStatements: "Other people's witness statements",
  respondentResponseToApplication: "{partyName}'s response to the request for child arrangements",
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
            } as unknown as CitizenOrders,
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
              partyName: 'testname1',

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
              partyName: 'testname2',
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
          PartyType.RESPONDENT,
          'respondent' as PartyType,
          '1'
        )
      ).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
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
              partyName: 'testname1',
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
              partyName: 'testname2',
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
          PartyType.RESPONDENT,
          'respondent' as PartyType
        )
      ).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
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

  describe('getApplicationPacksCategoryList', () => {
    test('should return correct section list when applicant soa pack present', () => {
      expect(
        getApplicationPacksCategoryList(
          {
            citizenApplicationPacks: [
              {
                servedParty: 'applicant',
                partyId: 1234,
                partyName: null,
                partyType: 'applicant',
                categoryId: 'undefined',
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                applicantSoaPack: [
                  {
                    document_url: 'MOCK_DOCUMENT_URL',
                    document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                    document_filename: 'MOCK_FILENAME',
                    document_hash: null,
                    category_id: 'positionStatements',
                    document_creation_date: '01/01/2024',
                  },
                ],
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'applicant' as PartyType
        )
      ).toStrictEqual([
        {
          link: {
            text: '',
            url: '/applicant/documents/view/application-pack-documents',
          },
        },
      ]);
    });

    test('should return correct section list when respondent soa pack present', () => {
      expect(
        getApplicationPacksCategoryList(
          {
            citizenApplicationPacks: [
              {
                servedParty: 'applicant',
                partyId: 1234,
                partyName: null,
                partyType: 'applicant',
                categoryId: 'undefined',
                uploadedBy: 'test user',
                uploadedDate: '2024-03-11T16:24:33.122506',
                reviewedDate: null,
                respondentSoaPack: [
                  {
                    document_url: 'MOCK_DOCUMENT_URL',
                    document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                    document_filename: 'MOCK_FILENAME',
                    document_hash: null,
                    category_id: 'positionStatements',
                    document_creation_date: '01/01/2024',
                  },
                ],
                documentWelsh: null,
              },
            ],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'applicant' as PartyType
        )
      ).toStrictEqual([
        {
          link: {
            text: '',
            url: '/applicant/documents/view/application-pack-documents',
          },
        },
        {
          link: {
            text: '',
            url: '/applicant/documents/view/application-pack-documents/to-be-served?',
          },
        },
      ]);
    });

    test('should return correct section list when no soa packs present', () => {
      expect(
        getApplicationPacksCategoryList({} as unknown as CaseWithId, documentCategoryLabels, 'applicant' as PartyType)
      ).toStrictEqual([]);
    });
  });

  describe('getApplicationPackDocuments', () => {
    test('should get respondent soa pack for applicant when the respondent is to be served', () => {
      expect(
        getApplicationPackDocuments(
          [
            {
              servedParty: 'applicant',
              partyId: 1234,
              partyName: null,
              partyType: 'applicant',
              categoryId: 'undefined',
              uploadedBy: 'test user',
              uploadedDate: '01/01/2024',
              reviewedDate: null,
              applicantSoaPack: [
                {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements',
                  document_creation_date: '01/01/2024',
                  uploadedDate: '01/01/2024',
                },
              ],
              respondentSoaPack: [
                {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements',
                  document_creation_date: '01/01/2024',
                  uploadedDate: '01/01/2024',
                },
              ],
              documentWelsh: null,
            },
          ] as unknown as CitizenApplicationPacks[],
          'applicant' as PartyType,
          'to-be-served'
        )
      ).toStrictEqual([
        {
          documentDownloadUrl: '/applicant/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          servedDate: '01 Jan 2024',
        },
      ]);
    });

    test('should get applicant soa pack when applicant is logged in party type', () => {
      expect(
        getApplicationPackDocuments(
          [
            {
              servedParty: 'applicant',
              partyId: 1234,
              partyName: null,
              partyType: 'applicant',
              categoryId: 'undefined',
              uploadedBy: 'test user',
              uploadedDate: '01/01/2024',
              reviewedDate: null,
              applicantSoaPack: [
                {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements',
                  document_creation_date: '01/01/2024',
                  uploadedDate: '01/01/2024',
                },
              ],
              respondentSoaPack: [
                {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements',
                  document_creation_date: '01/01/2024',
                  uploadedDate: '01/01/2024',
                },
              ],
              documentWelsh: null,
            },
          ] as unknown as CitizenApplicationPacks[],
          'applicant' as PartyType,
          'other-context'
        )
      ).toStrictEqual([
        {
          documentDownloadUrl: '/applicant/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          servedDate: '01 Jan 2024',
        },
      ]);
    });

    test('should get respondent soa pack when respondent is logged in party type', () => {
      expect(
        getApplicationPackDocuments(
          [
            {
              servedParty: 'applicant',
              partyId: 1234,
              partyName: null,
              partyType: 'applicant',
              categoryId: 'undefined',
              uploadedBy: 'test user',
              uploadedDate: '01/01/2024',
              reviewedDate: null,
              applicantSoaPack: [
                {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements',
                  document_creation_date: '01/01/2024',
                  uploadedDate: '01/01/2024',
                },
              ],
              respondentSoaPack: [
                {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                  document_filename: 'MOCK_FILENAME',
                  document_hash: null,
                  category_id: 'positionStatements',
                  document_creation_date: '01/01/2024',
                  uploadedDate: '01/01/2024',
                },
              ],
              documentWelsh: null,
            },
          ] as unknown as CitizenApplicationPacks[],
          'respondent' as PartyType,
          'other-context'
        )
      ).toStrictEqual([
        {
          documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          servedDate: '01 Jan 2024',
        },
      ]);
    });
  });
});
