import { CaseWithId } from '../../../../app/case/case';

import { isMandatoryFieldsFilled } from './utils';

describe('confirm contact details -> check answers -> utils', () => {
  describe('isMandatoryFieldsFilled', () => {
    test('should return false if living in refuge is yes and no document uploaded', () => {
      expect(isMandatoryFieldsFilled({ isCitizenLivingInRefuge: 'Yes' } as unknown as CaseWithId)).toBe(false);
    });

    test('should return true if living in refuge is yes and document uploaded', () => {
      expect(
        isMandatoryFieldsFilled({
          isCitizenLivingInRefuge: 'Yes',
          refugeDocument: {
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_url: 'MOCK_URL',
          },
        } as unknown as CaseWithId)
      ).toBe(true);
    });

    test('should return true if living in refuge is no', () => {
      expect(isMandatoryFieldsFilled({ isCitizenLivingInRefuge: 'No' } as unknown as CaseWithId)).toBe(true);
    });
  });
});
