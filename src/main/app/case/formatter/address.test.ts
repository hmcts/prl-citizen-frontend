import { FieldPrefix } from '../case';

import { getFormattedAddress } from './address';

describe('address', () => {
  describe('getFormattedAddress', () => {
    test.each([
      {
        data: {},
        expected: '',
      },
    ])('should return correct formatted address', ({ data, expected }) => {
      expect(getFormattedAddress(data, FieldPrefix.APPLICANT1)).toEqual(expected);
    });
  });
});
