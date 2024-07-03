import { uploadDocumentSections } from './config';

describe('documents > upload > config', () => {
  describe('uploadDocumentSections', () => {
    test('should have correct sectionId ids', () => {
      expect(uploadDocumentSections).toHaveLength(4);
      expect(uploadDocumentSections[0].sectionId).toBe('witnessStatementsAndEvidence');
      expect(uploadDocumentSections[1].sectionId).toBe('applications');
      expect(uploadDocumentSections[2].sectionId).toBe('expertReports');
      expect(uploadDocumentSections[3].sectionId).toBe('otherDocuments');
    });

    test('witnessStatementsAndEvidence should have correct document categories', () => {
      const witnessCategoryList = uploadDocumentSections[0].documentCategoryList;
      expect(witnessCategoryList).toHaveLength(7);
      expect(witnessCategoryList[0].categoryId).toBe('your-position-statements');
      expect(witnessCategoryList[1].categoryId).toBe('your-witness-statements');
      expect(witnessCategoryList[2].categoryId).toBe('other-people-witness-statement');
      expect(witnessCategoryList[3].categoryId).toBe('media-files');
      expect(witnessCategoryList[4].categoryId).toBe('medical-records');
      expect(witnessCategoryList[5].categoryId).toBe('letters-from-school');
      expect(witnessCategoryList[6].categoryId).toBe('tenancy-and-mortgage-agreements');
    });

    test('applications should have correct document categories', () => {
      const applicationsCategoryList = uploadDocumentSections[1].documentCategoryList;
      expect(applicationsCategoryList).toHaveLength(1);
      expect(applicationsCategoryList[0].categoryId).toBe('previous-orders');
    });

    test('expertReports should have correct document categories', () => {
      const expertReportsCategoryList = uploadDocumentSections[2].documentCategoryList;
      expect(expertReportsCategoryList).toHaveLength(4);
      expect(expertReportsCategoryList[0].categoryId).toBe('medical-reports');
      expect(expertReportsCategoryList[1].categoryId).toBe('paternity-test-reports');
      expect(expertReportsCategoryList[2].categoryId).toBe('drug-and-alcohol-tests');
      expect(expertReportsCategoryList[3].categoryId).toBe('police-disclosures');
    });

    test('otherDocuments should have correct document categories', () => {
      const otherDocumentsCategoryList = uploadDocumentSections[3].documentCategoryList;
      expect(otherDocumentsCategoryList).toHaveLength(2);
      expect(otherDocumentsCategoryList[0].categoryId).toBe('fm5-document');
      expect(otherDocumentsCategoryList[1].categoryId).toBe('other-documents');
    });
  });
});
