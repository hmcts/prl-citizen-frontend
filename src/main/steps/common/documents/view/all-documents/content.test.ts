import { CommonContent } from '../../../common.content';

import { generateContent } from './content';

describe('documents > view > all-documents > content', () => {
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
              url: '/applicant/documents/view/positionStatements/applicant/2?',
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
              url: '/applicant/documents/view/positionStatements/respondent/1234?',
            },
          },
        ],
        title: "Respondent's documents",
      },
    ]);
  });
});
