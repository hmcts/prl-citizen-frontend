import { GenerateAndUploadDocumentRequest } from './GenerateAndUploadDocumentRequest';

describe('GenerateAndUploadDocumentRequest', () => {
  const request = new GenerateAndUploadDocumentRequest(Object);

  test('should extend UploadedDocumentRequest', async () => {
    expect(request).toBeInstanceOf(GenerateAndUploadDocumentRequest);
  });
});
