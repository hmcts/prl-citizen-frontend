import { viewDocumentsSections } from './config';

describe('documents > view > config', () => {
  describe('viewDocumentsSections', () => {
    test('should have correct sectionId ids', () => {
      expect(viewDocumentsSections).toHaveLength(6);
      expect(viewDocumentsSections[0].sectionId).toBe('applicationPacks');
      expect(viewDocumentsSections[1].sectionId).toBe('ordersFromTheCourt');
      expect(viewDocumentsSections[2].sectionId).toBe('applicantsDocuments');
      expect(viewDocumentsSections[3].sectionId).toBe('respondentsDocuments');
      expect(viewDocumentsSections[4].sectionId).toBe('attendingTheHearing');
    });
  });
});
