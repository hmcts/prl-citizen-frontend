import { CommonContent } from '../../../common.content';

import { generateContent } from './content';

describe('documents > view > orders-from-the-court > content', () => {
  test('generateContent should get correct documents for applicant', () => {
    const content = generateContent({
      language: 'en',
      additionalData: {
        req: {
          params: {
            documentPartyId: 1234,
            documentPartyType: 'respondent',
            documentCategory: 'positionStatements',
            type: 'applicant',
          },
          session: {
            user: {
              id: '1234',
            },
            userCase: {
              applicantDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
              respondentDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
              citizenOtherDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
          documentDownloadUrl: '/applicant/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          uploadedBy: 'test user',
        },
      },
    ]);
  });
  test('generateContent should get correct documents for respondent', () => {
    const content = generateContent({
      language: 'en',
      additionalData: {
        req: {
          params: {
            documentPartyId: 1234,
            documentPartyType: 'respondent',
            documentCategory: 'positionStatements',
            type: 'respondent',
          },
          session: {
            user: {
              id: '1234',
            },
            userCase: {
              applicantDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
              respondentDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
              citizenOtherDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
          documentDownloadUrl: '/applicant/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          uploadedBy: 'test user',
        },
      },
    ]);
  });
  test('generateContent should get correct documents for other', () => {
    const content = generateContent({
      language: 'en',
      additionalData: {
        req: {
          params: {
            documentPartyId: 1234,
            documentPartyType: 'respondent',
            documentCategory: 'positionStatements',
            type: 'other',
          },
          session: {
            user: {
              id: '1234',
            },
            userCase: {
              applicantDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
              respondentDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
              citizenOtherDocuments: [
                {
                  partyId: 1234,
                  partyName: null,
                  partyType: 'respondent',
                  categoryId: 'positionStatements',
                  uploadedBy: 'test user',
                  uploadedDate: '2024-01-01T16:24:33.122506',
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
          documentDownloadUrl: '/applicant/documents/download/MOCK_DOCUMENT_URL/MOCK_FILENAME',
          documentId: 'MOCK_DOCUMENT_URL',
          documentName: 'MOCK_FILENAME',
          uploadedBy: 'test user',
        },
      },
    ]);
  });
});
