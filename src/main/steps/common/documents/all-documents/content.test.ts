import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  title: 'All documents',
  caseNumber: 'Case number',
  documentSectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    applicantsDocuments: "Applicant's documents",
    respondentsDocuments: "Respondent's documents",
    attendingTheHearing: 'Attending the hearing',
  },
  documentCategoryLabels: {
    positionStatements: "{partyName}'s position statements",
    witnessStatements: "{partyName}'s witness statements",
    otherPeopleWitnessStatements: "Other people's witness statements",
    medicalRecords: 'Medical records',
    medicalReports: 'Medical reports',
    DNAReports: 'DNA reports',
    drugAndAlcoholTests: 'Drug and alcohol tests (toxicology)',
    policeReports: 'Police reports',
  },
};

const cy: typeof en = {
  title: 'Pob dogfen',
  caseNumber: 'Rhif yr achos',
  documentSectionTitles: {
    ordersFromTheCourt: 'Gorchmynion gan y llys',
    applicantsDocuments: 'Dogfennau’r Ceisydd',
    respondentsDocuments: "Dogfennau'r Atebydd",
    attendingTheHearing: 'Mynychu’r gwrandawiad',
  },
  documentCategoryLabels: {
    positionStatements: 'Datganiadau safbwynt {partyName}',
    witnessStatements: 'Datganiadau tyst {partyName}',
    otherPeopleWitnessStatements: 'Datganiadau tyst pobl eraill',
    medicalRecords: 'Cofnodion meddygol',
    medicalReports: 'Adroddiadau meddygol',
    DNAReports: 'Adroddiadau DNA',
    drugAndAlcoholTests: 'Profion cyffuriau ag alcohol (tocsicoleg)',
    policeReports: 'Adroddiadau gan yr heddlu',
  },
};

describe('common > documents > all-documents > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          user: {
            id: '1234',
          },
          userCase: {},
        },
      },
    },
  } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('generateContent should get correct document sections', () => {
    expect(
      generateContent({
        language: 'en',
        additionalData: {
          req: {
            session: {
              user: {
                id: '1234',
              },
              userCase: {
                citizenDocuments: [
                  {
                    partyId: 1234,
                    partyName: null,
                    partyType: 'respondent',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                  {
                    partyId: 2,
                    partyName: null,
                    partyType: 'applicant',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user2',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                ],
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
              },
            },
          },
        },
      } as unknown as CommonContent).sections
    ).toStrictEqual([
      {
        id: 'ordersFromTheCourt',
        items: [],
        title: 'Orders from the court',
      },
      {
        id: 'applicantsDocuments',
        items: [
          {
            categoryId: 'positionStatements',
            link: {
              openInAnotherTab: false,
              text: "test user2's position statements",
              url: '/applicant/documents/list/positionStatements/applicant/2?',
            },
          },
        ],
        title: "Applicant's documents",
      },
      {
        id: 'respondentsDocuments',
        items: [
          {
            categoryId: 'positionStatements',
            link: {
              openInAnotherTab: false,
              text: "test user's position statements",
              url: '/applicant/documents/list/positionStatements/respondent/1234?',
            },
          },
        ],
        title: "Respondent's documents",
      },
    ]);
  });
});
