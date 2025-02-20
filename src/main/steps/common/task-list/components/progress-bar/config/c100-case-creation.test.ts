import { CaseWithId } from '../../../../../../app/case/case';

import { getC100CaseCreationConfig } from './c100-case-creation';

describe('c100-case-creation', () => {
  describe('getC100CaseCreationConfig', () => {
    test('should have correct config for legal represntation selected', () => {
      const config = getC100CaseCreationConfig({ sq_legalRepresentationApplication: 'Yes' } as CaseWithId);
      expect(config).toHaveLength(2);
      expect(config[0].id).toBe('childrenPostCode');
      expect(config[1].id).toBe('screeningSection');
    });

    test('config for consent order flow should be the correct length', () => {
      expect(getC100CaseCreationConfig({ sq_writtenAgreement: 'Yes' } as CaseWithId)).toHaveLength(11);
    });

    test.each([
      { sectionId: 'childrenPostCode', index: 0 },
      { sectionId: 'screeningSection', index: 1 },
      { sectionId: 'typeOfOrder', index: 2 },
      { sectionId: 'consentOrder', index: 3 },
      { sectionId: 'urgencyAndWithoutNotice', index: 4 },
      { sectionId: 'people', index: 5 },
      { sectionId: 'otherProceedings', index: 6 },
      { sectionId: 'safetyConcerns', index: 7 },
      { sectionId: 'internationalElements', index: 8 },
      { sectionId: 'reasonableAdjustments', index: 9 },
      { sectionId: 'helpWithFees', index: 10 },
    ])('config for consent order flow should have the correct sections', ({ sectionId, index }) => {
      expect(getC100CaseCreationConfig({ sq_writtenAgreement: 'Yes' } as CaseWithId)[index].id).toBe(sectionId);
    });

    test('config for miam other proceedings flow should be the correct length', () => {
      expect(getC100CaseCreationConfig({ miam_otherProceedings: 'Yes' } as CaseWithId)).toHaveLength(11);
    });

    test.each([
      { sectionId: 'childrenPostCode', index: 0 },
      { sectionId: 'screeningSection', index: 1 },
      { sectionId: 'miam', index: 2 },
      { sectionId: 'otherProceedings', index: 3 },
      { sectionId: 'typeOfOrder', index: 4 },
      { sectionId: 'urgencyAndWithoutNotice', index: 5 },
      { sectionId: 'people', index: 6 },
      { sectionId: 'safetyConcerns', index: 7 },
      { sectionId: 'internationalElements', index: 8 },
      { sectionId: 'reasonableAdjustments', index: 9 },
      { sectionId: 'helpWithFees', index: 10 },
    ])('config for miam other proceedings flow should have the correct sections', ({ sectionId, index }) => {
      expect(getC100CaseCreationConfig({ miam_otherProceedings: 'Yes' } as CaseWithId)[index].id).toBe(sectionId);
    });

    test('config for miam urgency flow should be the correct length', () => {
      expect(
        getC100CaseCreationConfig({
          miam_nonAttendanceReasons: ['urgentHearing'],
          miam_urgency: 'freedomPhysicalSafety',
        } as CaseWithId)
      ).toHaveLength(11);
    });

    test.each([
      { sectionId: 'childrenPostCode', index: 0 },
      { sectionId: 'screeningSection', index: 1 },
      { sectionId: 'miam', index: 2 },
      { sectionId: 'urgencyAndWithoutNotice', index: 3 },
      { sectionId: 'typeOfOrder', index: 4 },
      { sectionId: 'people', index: 5 },
      { sectionId: 'otherProceedings', index: 6 },
      { sectionId: 'safetyConcerns', index: 7 },
      { sectionId: 'internationalElements', index: 8 },
      { sectionId: 'reasonableAdjustments', index: 9 },
      { sectionId: 'helpWithFees', index: 10 },
    ])('config for miam urgency flow should have the correct sections', ({ sectionId, index }) => {
      expect(
        getC100CaseCreationConfig({
          miam_nonAttendanceReasons: ['urgentHearing'],
          miam_urgency: 'freedomPhysicalSafety',
        } as CaseWithId)[index].id
      ).toBe(sectionId);
    });

    test('config for miam default flow should be the correct length', () => {
      expect(getC100CaseCreationConfig({} as CaseWithId)).toHaveLength(11);
    });

    test.each([
      { sectionId: 'childrenPostCode', index: 0 },
      { sectionId: 'screeningSection', index: 1 },
      { sectionId: 'miam', index: 2 },
      { sectionId: 'typeOfOrder', index: 3 },
      { sectionId: 'urgencyAndWithoutNotice', index: 4 },
      { sectionId: 'people', index: 5 },
      { sectionId: 'otherProceedings', index: 6 },
      { sectionId: 'safetyConcerns', index: 7 },
      { sectionId: 'internationalElements', index: 8 },
      { sectionId: 'reasonableAdjustments', index: 9 },
      { sectionId: 'helpWithFees', index: 10 },
    ])('config for miam urgency flow should have the correct sections', ({ sectionId, index }) => {
      expect(getC100CaseCreationConfig({} as CaseWithId)[index].id).toBe(sectionId);
    });
  });
});
