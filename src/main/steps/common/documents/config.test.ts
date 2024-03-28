import { documentSections } from './config';

describe('common > documents > config', () => {
  describe('documentSections', () => {
    test('should have correct documentSection ids', () => {
      expect(documentSections).toHaveLength(4);
      expect(documentSections[0].documentSectionId).toBe('ordersFromTheCourt');
      expect(documentSections[1].documentSectionId).toBe('applicantsDocuments');
      expect(documentSections[2].documentSectionId).toBe('respondentsDocuments');
      expect(documentSections[3].documentSectionId).toBe('attendingTheHearing');
    });
  });
});
