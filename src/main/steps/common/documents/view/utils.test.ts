import { CaseWithId } from '../../../../app/case/case';
import { PartyType, State } from '../../../../app/case/definition';
import {
  CitizenApplicationPacks,
  CitizenOrders,
  DocumentCategory,
  DocumentLabelCategory,
  ViewDocumentsSectionId,
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
            applicantDocuments: [
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
            respondentDocuments: [
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
            respondentDocuments: [
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
    test('should get correct documents with partyId', () => {
      expect(
        getDocuments(
          [
            {
              partyId: '1',
              partyType: 'respondent' as PartyType,
              partyName: 'testname1',

              categoryId: 'applicantStatements' as DocumentCategory,
              uploadedBy: 'test user',
              uploadedDate: '2024-01-01T16:24:33.122506',
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
              uploadedDate: '2024-01-01T16:24:33.122506',
              reviewedDate: null,
              documentWelsh: {
                document_url: 'MOCK_DOCUMENT_URL_welsh',
                document_binary_url: 'MOCK_DOCUMENT_welsh_BINARY_URL',
                document_filename: 'MOCK_FILENAME_welsh',
                document_hash: null,
                category_id: 'positionStatements' as DocumentCategory,
                document_creation_date: '01/01/2024',
              },
              document: null,
            },
          ],
          PartyType.RESPONDENT,
          'en'
        )
      ).toStrictEqual([
        {
          createdDate: '01 Jan 2024',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          uploadedBy: 'test user',
        },
        {
          createdDate: '01 Jan 2024',
          documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL_welsh/MOCK_FILENAME_welsh',
          documentId: 'MOCK_DOCUMENT_URL_welsh',
          documentName: 'MOCK_FILENAME_welsh',
          uploadedBy: 'test user2',
        },
      ]);
    });

    test('should get correct english documents without partyId', () => {
      expect(
        getDocuments(
          [
            {
              partyId: '1',
              partyType: 'respondent' as PartyType,
              partyName: 'testname1',
              categoryId: 'applicantStatements' as DocumentCategory,
              uploadedBy: 'test user',
              uploadedDate: '2024-01-01T16:24:33.122506',
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
              uploadedDate: '2024-01-01T16:24:33.122506',
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
          'en'
        )
      ).toStrictEqual([
        {
          createdDate: '01 Jan 2024',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          uploadedBy: 'test user',
        },
        {
          createdDate: '01 Jan 2024',
          documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          uploadedBy: 'test user2',
        },
      ]);
    });
  });

  describe('getViewDocumentCategoryList', () => {
    test('should get correct applicant documents', () => {
      expect(
        getViewDocumentCategoryList(
          'applicantsDocuments' as ViewDocumentsSectionId,
          {
            applicantDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-01-01T16:24:33.122506',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
          'applicant' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '01 Jan 2024',
            text: '',
            url: '/applicant/documents/view/applicant/doc',
          },
        },
      ]);
    });
    test('should show no date if applicant documents is empty', () => {
      expect(
        getViewDocumentCategoryList(
          'applicantsDocuments' as ViewDocumentsSectionId,
          {
            applicantDocuments: [],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'applicant' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '',
            text: '',
            url: '/applicant/documents/view/applicant/doc',
          },
        },
      ]);
    });

    test('should get correct respondent documents', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as ViewDocumentsSectionId,

          {
            respondentDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-01-01T16:24:33.122506',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '01 Jan 2024',
            text: '',
            url: '/respondent/documents/view/respondent/doc',
          },
        },
      ]);
    });
    test('should show no date if respondent documents is empty', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as ViewDocumentsSectionId,

          {
            respondentDocuments: [],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '',
            text: '',
            url: '/respondent/documents/view/respondent/doc',
          },
        },
      ]);
    });
    test('should get correct other documents', () => {
      expect(
        getViewDocumentCategoryList(
          'otherDocuments' as ViewDocumentsSectionId,

          {
            citizenOtherDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-01-01T16:24:33.122506',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '01 Jan 2024',
            text: '',
            url: '/respondent/documents/view/other/doc',
          },
        },
      ]);
    });
    test('should show no date if other documents is empty', () => {
      expect(
        getViewDocumentCategoryList(
          'otherDocuments' as ViewDocumentsSectionId,

          {
            citizenOtherDocuments: [],
          } as unknown as CaseWithId,
          documentCategoryLabels,
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '',
            text: '',
            url: '/respondent/documents/view/other/doc',
          },
        },
      ]);
    });

    test('should not get documents when sectionId is not applicant or respondent documents', () => {
      expect(
        getViewDocumentCategoryList(
          'ordersFromTheCourt' as ViewDocumentsSectionId,
          {
            respondentDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-01-01T16:24:33.122506',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([]);
    });

    test('should add documents for same category with different party ids', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as ViewDocumentsSectionId,
          {
            respondentDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'applicantStatements' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-01-01T16:24:33.122506',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            //openInAnotherTab: false,
            serveDate: '01 Jan 2024',
            text: '',
            url: '/respondent/documents/view/respondent/doc',
          },
        },
      ]);
    });

    test('should only get one document for other categories', () => {
      expect(
        getViewDocumentCategoryList(
          'respondentsDocuments' as ViewDocumentsSectionId,

          {
            respondentDocuments: [
              {
                partyId: '1',
                partyType: 'respondent' as PartyType,
                categoryId: 'medicalReports' as DocumentCategory,
                uploadedBy: 'test user',
                uploadedDate: '2024-01-01T16:24:33.122506',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
          'respondent' as PartyType,
          'en'
        )
      ).toStrictEqual([
        {
          link: {
            serveDate: '01 Jan 2024',
            text: '',
            url: '/respondent/documents/view/respondent/doc',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
            serveDate: '01 Jan 2024',
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
                uploadedDate: '2024-01-01T16:24:33.122506',
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
            serveDate: '01 Jan 2024',
            url: '/applicant/documents/view/application-pack-documents',
          },
        },
        {
          link: {
            text: '',
            serveDate: '01 Jan 2024',
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
          'to-be-served',
          'en'
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
          'other-context',
          'en'
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
          'other-context',
          'en'
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
