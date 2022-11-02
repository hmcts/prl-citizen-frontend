
import { UploadedDocumentRequest } from "./UploadedDocumentRequest";
jest.mock('autobind-decorator');


describe('UploadedDocumentRequest', () => {
    let request;

    request = new UploadedDocumentRequest('caseid',{}, 'parentdoc','doctype','partyName','partyID','isApplicant');
  
    test('should extend UploadedDocumentRequest', async () => {
      expect(request).toBeInstanceOf(UploadedDocumentRequest);
    });
  });