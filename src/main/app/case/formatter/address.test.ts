import { FieldPrefix } from '../case';

import { getFormattedAddress } from './address';

describe('address', () => {
  describe('getFormattedAddress', () => {
    test.each([
      {
        data: {},
        expected: '',
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1Address2: 'MOCK_ADDRESS_2',
          applicant1AddressTown: 'MOCK_ADDRESS_TOWN',
          applicant1AddressCounty: 'MOCK_ADDRESS_COUNTY',
          applicant1AddressPostcode: 'MOCK_ADDRESS_POSTCODE',
        },
        expected:
          'MOCK_ADDRESS_1<br>MOCK_ADDRESS_2<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_COUNTY<br>MOCK_ADDRESS_POSTCODE',
      },
    ])('should return correct formatted address', ({ data, expected }) => {
      expect(getFormattedAddress(data, FieldPrefix.APPLICANT1)).toEqual(expected);
    });
  });
});
