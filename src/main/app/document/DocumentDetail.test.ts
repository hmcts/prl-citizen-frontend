import { DocumentDetail } from './DocumentDetail';

describe('UploadedDocumentRequest', () => {
  const request = new DocumentDetail(1234567890, 'documentId', 'documentName');

  test('should extend UploadedDocumentRequest', async () => {
    expect(request).toBeInstanceOf(DocumentDetail);
  });
});
