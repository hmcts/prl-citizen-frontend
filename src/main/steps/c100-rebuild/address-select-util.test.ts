import { getAddress } from './address-select-util';

test('should create correct options for selectAddress field', () => {
  const generatedContent = getAddress('en', [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }]);
  expect(generatedContent).toEqual([
    { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found', value: -1 },
    { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
  ]);
});

test('should create correct options for selectAddress field (welsh)', () => {
  const generatedContent = getAddress('cy', [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }]);
  expect(generatedContent).toEqual([
    {
      attributes: { id: 'totalAddressesFound' },
      selected: true,
      text: 'Daethpwyd o hyd i 1 cyfeiriad',
      value: -1,
    },
    { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
  ]);
});
