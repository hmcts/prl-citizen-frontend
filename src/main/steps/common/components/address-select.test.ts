import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './address-select';

jest.mock('../../../app/form/validation');

const enContent = {
  line1:
    "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
  postcode: 'Current postcode',
  citizenUserSelectAddress: 'Select an address',
  cannotFindAddress: 'I cannot find the address in the list',
  errors: {
    citizenUserSelectAddress: {
      notSelected: 'Select an address',
    },
  },
  changePostCodeUrl: '#',
  cantFindAddressUrl: '#',
};

const cyContent = {
  line1:
    "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
  postcode: 'Current postcode (in welsh)',
  citizenUserSelectAddress: 'Select an address (in welsh)',
  cannotFindAddress: 'I cannot find the address in the list (in welsh)',
  errors: {
    citizenUserSelectAddress: {
      notSelected: 'Select an address (in welsh)',
    },
  },
  changePostCodeUrl: '#',
  cantFindAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('common > components > address-select', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.postcode).toEqual(enContent.postcode);
    expect(generatedContent.citizenUserSelectAddress).toEqual(enContent.citizenUserSelectAddress);
    expect(generatedContent.cannotFindAddress).toEqual(enContent.cannotFindAddress);

    expect(generatedContent.errors).toEqual({
      citizenUserSelectAddress: {
        notSelected: 'Select an address',
      },
    });

    expect(generatedContent.options).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('#');
    expect(generatedContent.cantFindAddressUrl).toEqual('#');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.postcode).toEqual(cyContent.postcode);
    expect(generatedContent.citizenUserSelectAddress).toEqual(cyContent.citizenUserSelectAddress);
    expect(generatedContent.cannotFindAddress).toEqual(cyContent.cannotFindAddress);

    expect(generatedContent.errors).toEqual({
      citizenUserSelectAddress: {
        notSelected: 'Select an address (in welsh)',
      },
    });

    expect(generatedContent.options).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found (in welsh)', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('#');
    expect(generatedContent.cantFindAddressUrl).toEqual('#');
  });

  describe('when there is one address in session', () => {
    test('should create correct options for citizenUserSelectAddress field', () => {
      generatedContent = generateContent({ ...commonContent, addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }] });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found', value: -1 },
        { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
      ]);
    });

    test('should create correct options for citizenUserSelectAddress field (welsh)', () => {
      generatedContent = generateContent({
        ...commonContent,
        language: 'cy',
        addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }],
      });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found (in welsh)', value: -1 },
        { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
      ]);
    });
  });

  describe('when there addresses is undefined in session', () => {
    test('should create correct options for citizenUserSelectAddress field', () => {
      generatedContent = generateContent({ ...commonContent, addresses: undefined });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
      ]);
    });

    test('should create correct options for citizenUserSelectAddress field (welsh)', () => {
      generatedContent = generateContent({ ...commonContent, language: 'cy', addresses: undefined });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found (in welsh)', value: -1 },
      ]);
    });
  });

  test('should contain citizenUserSelectAddress field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const selectAddressField = fields.citizenUserSelectAddress as FormOptions;

    expect(selectAddressField.type).toBe('select');
    expect((selectAddressField.label as Function)(generatedContent)).toBe('Select an address');
    expect(selectAddressField.validator).toBe(isAddressSelected);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
