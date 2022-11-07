import { UploadedDocumentRequest } from './UploadedDocumentRequest';

describe('UploadedDocumentRequest', () => {
  const request = new UploadedDocumentRequest(
    'caseid',
    {},
    'parentdoc',
    'doctype',
    'partyName',
    'partyID',
    'isApplicant'
  );

  test('should extend UploadedDocumentRequest', async () => {
    expect(request).toBeInstanceOf(UploadedDocumentRequest);
  });
});
