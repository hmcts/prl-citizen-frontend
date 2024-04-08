import { CommonContent } from '../../../common.content';

import { generateContent } from './content';

describe('documents > view > application-pack-documents > content', () => {
  test('generateContent should get correct documents', () => {
    const content = generateContent({
      language: 'en',
      additionalData: {
        req: {
          params: {
            documentPartyId: 1234,
            documentPartyType: 'respondent',
            documentCategory: 'positionStatements',
          },
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
                  document: {
                    document_url: 'MOCK_DOCUMENT_URL',
                    document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                    document_filename: 'MOCK_FILENAME',
                    document_hash: null,
                    category_id: 'positionStatements',
                    document_creation_date: '01/01/2024',
                  },
                  documentWelsh: null,
                },
              ],
            },
          },
        },
      },
    } as unknown as CommonContent);
    expect(content.documents).toStrictEqual([
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
    expect(content.pageHeading).toBe("test user's position statements");
  });
});
