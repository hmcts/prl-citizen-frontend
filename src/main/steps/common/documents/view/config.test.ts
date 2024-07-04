// import { PartyType } from '../../../../app/case/definition';
// import { CitizenDocuments, DocumentCategory, DocumentLabelCategory } from '../definitions';

import {
  //viewDocumentsCategoryListConfig,
  viewDocumentsSections,
} from './config';

// const documentCategoryLabels = {
//   positionStatements: "{partyName}'s position statements",
//   witnessStatements: "{partyName}'s witness statements",
//   otherPeopleWitnessStatements: "Other people's witness statements",
//   respondentResponseToApplication: "{partyName}'s response to the request for child arrangements",
//   medicalRecords: 'Medical records',
//   medicalReports: 'Medical reports',
//   DNAReports: 'DNA reports',
//   drugAndAlcoholTests: 'Drug and alcohol tests (toxicology)',
//   policeReports: 'Police reports',
// } as Record<Partial<DocumentLabelCategory>, string>;

describe('documents > view > config', () => {
  describe('viewDocumentsSections', () => {
    test('should have correct sectionId ids', () => {
      expect(viewDocumentsSections).toHaveLength(6);
      expect(viewDocumentsSections[0].sectionId).toBe('applicationPacks');
      expect(viewDocumentsSections[1].sectionId).toBe('ordersFromTheCourt');
      expect(viewDocumentsSections[2].sectionId).toBe('applicantsDocuments');
      expect(viewDocumentsSections[3].sectionId).toBe('respondentsDocuments');
      expect(viewDocumentsSections[4].sectionId).toBe('attendingTheHearing');
    });
  });

  describe.skip('viewDocumentsCategoryListConfig', () => {
    // const documents = [
    //   {
    //     partyId: '0',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'respondentApplication' as DocumentCategory,
    //     uploadedBy: 'test user',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'respondentApplication' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '1',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'positionStatements' as DocumentCategory,
    //     uploadedBy: 'test user',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'positionStatements' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '2',
    //     partyType: 'applicant' as PartyType,
    //     categoryId: 'applicantStatements' as DocumentCategory,
    //     uploadedBy: 'test user2',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'applicantStatements' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '3',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'respondentStatements' as DocumentCategory,
    //     uploadedBy: 'test user',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'respondentStatements' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '4',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'otherWitnessStatements' as DocumentCategory,
    //     uploadedBy: 'test user2',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'otherWitnessStatements' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '5',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'medicalReports' as DocumentCategory,
    //     uploadedBy: 'test user',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'medicalReports' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '6',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'medicalRecords' as DocumentCategory,
    //     uploadedBy: 'test user2',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'medicalRecords' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '7',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'DNAReports_expertReport' as DocumentCategory,
    //     uploadedBy: 'test user',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'DNAReports_expertReport' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '8',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'DRUG_AND_ALCOHOL_TESTS' as DocumentCategory,
    //     uploadedBy: 'test user2',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'DRUG_AND_ALCOHOL_TESTS' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    //   {
    //     partyId: '9',
    //     partyType: 'respondent' as PartyType,
    //     categoryId: 'policeReport' as DocumentCategory,
    //     uploadedBy: 'test user2',
    //     uploadedDate: '2024-03-11T16:24:33.122506',
    //     reviewedDate: null,
    //     document: {
    //       document_url: 'MOCK_DOCUMENT_URL',
    //       document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
    //       document_filename: 'MOCK_FILENAME',
    //       document_hash: null,
    //       category_id: 'policeReport' as DocumentCategory,
    //       document_creation_date: '01/01/2024',
    //     },
    //     documentWelsh: null,
    //   },
    // ] as unknown as CitizenDocuments[];
    // test.skip('should have correct categoryId ids', () => {
    //   expect(viewDocumentsCategoryListConfig).toHaveLength(10);
    //   expect(viewDocumentsCategoryListConfig[0].categoryId).toBe('respondentApplication');
    //   expect(
    //     viewDocumentsCategoryListConfig[0].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '0')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[0].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
    //     "testName's response to the request for child arrangements"
    //   );
    //   expect(viewDocumentsCategoryListConfig[1].categoryId).toBe('positionStatements');
    //   expect(
    //     viewDocumentsCategoryListConfig[1].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '1')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[1].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
    //     "testName's position statements"
    //   );
    //   expect(viewDocumentsCategoryListConfig[2].categoryId).toBe('applicantStatements');
    //   expect(
    //     viewDocumentsCategoryListConfig[2].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '2')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user2',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[2].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
    //     "testName's witness statements"
    //   );
    //   expect(viewDocumentsCategoryListConfig[3].categoryId).toBe('respondentStatements');
    //   expect(
    //     viewDocumentsCategoryListConfig[3].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '3')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[3].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
    //     "testName's witness statements"
    //   );
    //   expect(viewDocumentsCategoryListConfig[4].categoryId).toBe('otherWitnessStatements');
    //   expect(
    //     viewDocumentsCategoryListConfig[4].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '4')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user2',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[4].documentCategoryLabel(documentCategoryLabels)).toBe(
    //     "Other people's witness statements"
    //   );
    //   expect(viewDocumentsCategoryListConfig[5].categoryId).toBe('medicalRecords');
    //   expect(
    //     viewDocumentsCategoryListConfig[5].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '5')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user2',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[5].documentCategoryLabel(documentCategoryLabels)).toBe('Medical records');
    //   expect(viewDocumentsCategoryListConfig[6].categoryId).toBe('medicalReports');
    //   expect(
    //     viewDocumentsCategoryListConfig[6].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '6')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[6].documentCategoryLabel(documentCategoryLabels)).toBe('Medical reports');
    //   expect(viewDocumentsCategoryListConfig[7].categoryId).toBe('DNAReports_expertReport');
    //   expect(
    //     viewDocumentsCategoryListConfig[7].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '7')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[7].documentCategoryLabel(documentCategoryLabels)).toBe('DNA reports');
    //   expect(viewDocumentsCategoryListConfig[8].categoryId).toBe('DRUG_AND_ALCOHOL_TESTS');
    //   expect(
    //     viewDocumentsCategoryListConfig[8].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '8')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user2',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[8].documentCategoryLabel(documentCategoryLabels)).toBe(
    //     'Drug and alcohol tests (toxicology)'
    //   );
    //   expect(viewDocumentsCategoryListConfig[9].categoryId).toBe('policeReport');
    //   expect(
    //     viewDocumentsCategoryListConfig[9].documents(documents, PartyType.RESPONDENT, 'respondent' as PartyType, '9')
    //   ).toStrictEqual([
    //     {
    //       document_en: {
    //         createdDate: '01 Jan 2024',
    //         documentId: 'MOCK_DOCUMENT_URL',
    //         documentName: 'MOCK_FILENAME',
    //         documentDownloadUrl: '/respondent/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
    //         uploadedBy: 'test user2',
    //       },
    //     },
    //   ]);
    //   expect(viewDocumentsCategoryListConfig[9].documentCategoryLabel(documentCategoryLabels)).toBe('Police reports');
    // });
  });
});
