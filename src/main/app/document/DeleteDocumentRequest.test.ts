import { DeleteDocumentRequest } from './DeleteDocumentRequest';

describe('DeleteDocumentRequest', () => {
  const request = new DeleteDocumentRequest(Object);

  test('should extend UploadedDocumentRequest', async () => {
    expect(request).toBeInstanceOf(DeleteDocumentRequest);
  });
});
