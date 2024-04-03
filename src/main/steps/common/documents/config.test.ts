import { PartyType } from '../../../app/case/definition';

import { uploadDocumentSections, viewDocumentsCategoryListConfig, viewDocumentsSections } from './config';
import { DocumentCategory, DocumentLabelCategory } from './definitions';

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

describe('common > documents > config', () => {
  describe('viewDocumentsSections', () => {
    test('should have correct sectionId ids', () => {
      expect(viewDocumentsSections).toHaveLength(4);
      expect(viewDocumentsSections[0].sectionId).toBe('ordersFromTheCourt');
      expect(viewDocumentsSections[1].sectionId).toBe('applicantsDocuments');
      expect(viewDocumentsSections[2].sectionId).toBe('respondentsDocuments');
      expect(viewDocumentsSections[3].sectionId).toBe('attendingTheHearing');
    });
  });

  describe('viewDocumentsCategoryListConfig', () => {
    const documents = [
      {
        partyId: '1',
        partyType: 'respondent' as PartyType,
        categoryId: 'positionStatements' as DocumentCategory,
        uploadedBy: 'test user',
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
      {
        partyId: '2',
        partyType: 'applicant' as PartyType,
        categoryId: 'applicantStatements' as DocumentCategory,
        uploadedBy: 'test user2',
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
        partyId: '3',
        partyType: 'respondent' as PartyType,
        categoryId: 'respondentStatements' as DocumentCategory,
        uploadedBy: 'test user',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          category_id: 'respondentStatements' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
      {
        partyId: '4',
        partyType: 'respondent' as PartyType,
        categoryId: 'otherWitnessStatements' as DocumentCategory,
        uploadedBy: 'test user2',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          category_id: 'otherWitnessStatements' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
      {
        partyId: '5',
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
          category_id: 'medicalReports' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
      {
        partyId: '6',
        partyType: 'respondent' as PartyType,
        categoryId: 'medicalRecords' as DocumentCategory,
        uploadedBy: 'test user2',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          category_id: 'medicalRecords' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
      {
        partyId: '7',
        partyType: 'respondent' as PartyType,
        categoryId: 'DNAReports_expertReport' as DocumentCategory,
        uploadedBy: 'test user',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          category_id: 'DNAReports_expertReport' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
      {
        partyId: '8',
        partyType: 'respondent' as PartyType,
        categoryId: 'DRUG_AND_ALCOHOL_TESTS' as DocumentCategory,
        uploadedBy: 'test user2',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          category_id: 'DRUG_AND_ALCOHOL_TESTS' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
      {
        partyId: '8',
        partyType: 'respondent' as PartyType,
        categoryId: 'policeReport' as DocumentCategory,
        uploadedBy: 'test user2',
        uploadedDate: '2024-03-11T16:24:33.122506',
        reviewedDate: null,
        document: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          category_id: 'policeReport' as DocumentCategory,
          document_creation_date: '01/01/2024',
        },
        documentWelsh: null,
      },
    ];

    test('should have correct categoryId ids', () => {
      expect(viewDocumentsCategoryListConfig).toHaveLength(9);
      expect(viewDocumentsCategoryListConfig[0].categoryId).toBe('positionStatements');
      expect(viewDocumentsCategoryListConfig[0].documents(documents, 'respondent' as PartyType, '1')).toStrictEqual([
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
      expect(viewDocumentsCategoryListConfig[0].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
        "testName's position statements"
      );

      expect(viewDocumentsCategoryListConfig[1].categoryId).toBe('applicantStatements');
      expect(viewDocumentsCategoryListConfig[1].documents(documents, 'respondent' as PartyType, '2')).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user2',
          },
        },
      ]);
      expect(viewDocumentsCategoryListConfig[1].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
        "testName's witness statements"
      );

      expect(viewDocumentsCategoryListConfig[2].categoryId).toBe('respondentStatements');
      expect(viewDocumentsCategoryListConfig[2].documents(documents, 'respondent' as PartyType, '3')).toStrictEqual([
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
      expect(viewDocumentsCategoryListConfig[2].documentCategoryLabel(documentCategoryLabels, 'testName')).toBe(
        "testName's witness statements"
      );

      expect(viewDocumentsCategoryListConfig[3].categoryId).toBe('otherWitnessStatements');
      expect(viewDocumentsCategoryListConfig[3].documents(documents, 'respondent' as PartyType, '4')).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user2',
          },
        },
      ]);
      expect(viewDocumentsCategoryListConfig[3].documentCategoryLabel(documentCategoryLabels)).toBe(
        "Other people's witness statements"
      );

      expect(viewDocumentsCategoryListConfig[4].categoryId).toBe('medicalRecords');
      expect(viewDocumentsCategoryListConfig[4].documents(documents, 'respondent' as PartyType, '5')).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user2',
          },
        },
      ]);
      expect(viewDocumentsCategoryListConfig[4].documentCategoryLabel(documentCategoryLabels)).toBe('Medical records');

      expect(viewDocumentsCategoryListConfig[5].categoryId).toBe('medicalReports');
      expect(viewDocumentsCategoryListConfig[5].documents(documents, 'respondent' as PartyType, '6')).toStrictEqual([
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
      expect(viewDocumentsCategoryListConfig[5].documentCategoryLabel(documentCategoryLabels)).toBe('Medical reports');

      expect(viewDocumentsCategoryListConfig[6].categoryId).toBe('DNAReports_expertReport');
      expect(viewDocumentsCategoryListConfig[6].documents(documents, 'respondent' as PartyType, '7')).toStrictEqual([
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
      expect(viewDocumentsCategoryListConfig[6].documentCategoryLabel(documentCategoryLabels)).toBe('DNA reports');

      expect(viewDocumentsCategoryListConfig[7].categoryId).toBe('DRUG_AND_ALCOHOL_TESTS');
      expect(viewDocumentsCategoryListConfig[7].documents(documents, 'respondent' as PartyType, '8')).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user2',
          },
        },
      ]);
      expect(viewDocumentsCategoryListConfig[7].documentCategoryLabel(documentCategoryLabels)).toBe(
        'Drug and alcohol tests (toxicology)'
      );

      expect(viewDocumentsCategoryListConfig[8].categoryId).toBe('policeReport');
      expect(viewDocumentsCategoryListConfig[8].documents(documents, 'respondent' as PartyType, '9')).toStrictEqual([
        {
          document_en: {
            createdDate: '01 Jan 2024',
            documentId: 'MOCK_DOCUMENT_URL',
            documentName: 'MOCK_FILENAME',
            downloadLink: '/yourdocuments/alldocuments/downloadCitizenDocument/MOCK_DOCUMENT_URL',
            uploadedBy: 'test user2',
          },
        },
      ]);
      expect(viewDocumentsCategoryListConfig[8].documentCategoryLabel(documentCategoryLabels)).toBe('Police reports');
    });
  });

  describe('uploadDocumentSections', () => {
    test('should have correct sectionId ids', () => {
      expect(uploadDocumentSections).toHaveLength(4);
      expect(uploadDocumentSections[0].sectionId).toBe('witnessStatementsAndEvidence');
      expect(uploadDocumentSections[1].sectionId).toBe('applications');
      expect(uploadDocumentSections[2].sectionId).toBe('expertReports');
      expect(uploadDocumentSections[3].sectionId).toBe('otherDocuments');
    });

    test('witnessStatementsAndEvidence should have correct document categories', () => {
      const witnessCategoryList = uploadDocumentSections[0].documentCategoryList;
      expect(witnessCategoryList).toHaveLength(7);
      expect(witnessCategoryList[0].categoryId).toBe('your-position-statements');
      expect(witnessCategoryList[1].categoryId).toBe('your-witness-statements');
      expect(witnessCategoryList[2].categoryId).toBe('other-people-witness-statement');
      expect(witnessCategoryList[3].categoryId).toBe('media-files');
      expect(witnessCategoryList[4].categoryId).toBe('medical-records');
      expect(witnessCategoryList[5].categoryId).toBe('letters-from-school');
      expect(witnessCategoryList[6].categoryId).toBe('tenancy-and-mortgage-agreements');
    });

    test('applications should have correct document categories', () => {
      const applicationsCategoryList = uploadDocumentSections[1].documentCategoryList;
      expect(applicationsCategoryList).toHaveLength(1);
      expect(applicationsCategoryList[0].categoryId).toBe('previous-orders');
    });

    test('expertReports should have correct document categories', () => {
      const expertReportsCategoryList = uploadDocumentSections[2].documentCategoryList;
      expect(expertReportsCategoryList).toHaveLength(4);
      expect(expertReportsCategoryList[0].categoryId).toBe('medical-reports');
      expect(expertReportsCategoryList[1].categoryId).toBe('paternity-test-reports');
      expect(expertReportsCategoryList[2].categoryId).toBe('drug-and-alcohol-tests');
      expect(expertReportsCategoryList[3].categoryId).toBe('police-disclosures');
    });

    test('otherDocuments should have correct document categories', () => {
      const otherDocumentsCategoryList = uploadDocumentSections[3].documentCategoryList;
      expect(otherDocumentsCategoryList).toHaveLength(1);
      expect(otherDocumentsCategoryList[0].categoryId).toBe('other-documents');
    });
  });
});
