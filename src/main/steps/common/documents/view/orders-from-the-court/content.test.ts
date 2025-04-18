import { CommonContent } from '../../../common.content';

import { generateContent } from './content';

describe('documents > view > orders-from-the-court > content', () => {
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
              citizenOrders: [
                {
                  madeDate: '2024-01-01T16:24:33.122506',
                  orderType: 'ORDER',
                  document: {
                    document_url: 'DOC_URL/1234',
                    document_filename: 'DOC_FILENAME',
                    document_binary_url: 'DOC_BINARY_URL',
                  },
                  documentWelsh: {
                    document_url: 'DOC_URL/1234',
                    document_filename: 'DOC_FILENAME',
                    document_binary_url: 'DOC_BINARY_URL',
                  },
                },
              ],
            },
          },
        },
      },
    } as unknown as CommonContent);
    expect(content.documents).toStrictEqual([
      {
        documentDownloadUrl: '/applicant/documents/download/1234/DOC_FILENAME',
        documentId: '1234',
        documentName: 'DOC_FILENAME',
        orderMadeDate: '01 Jan 2024',
      },
      {
        documentDownloadUrl: '/applicant/documents/download/1234/DOC_FILENAME',
        documentId: '1234',
        documentName: 'DOC_FILENAME',
        orderMadeDate: '01 Jan 2024',
      },
    ]);
  });
});
