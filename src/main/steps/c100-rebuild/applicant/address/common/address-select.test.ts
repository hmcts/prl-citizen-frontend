import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../../../app/form/Form';
import { isAddressSelected } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './address-select';

jest.mock('../../../../../app/form/validation');

const enContent = {
  postcode: 'Current postcode',
  selectAddress: 'Select an address',
  cannotFindAddress: 'I cannot find the address in the list',
  enterAddressManually: 'Or enter address manually',
  changePostCodeUrl: '#',
  cantFindAddressUrl: '#',
};

const cyContent = {
  postcode: 'Current postcode - welsh',
  selectAddress: 'Select an address - welsh',
  cannotFindAddress: 'I cannot find the address in the list - welsh',
  enterAddressManually: 'Or enter address manually - welsh',
  changePostCodeUrl: '#',
  cantFindAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('common > components > address-select', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));

    expect(generatedContent.options).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('#');
    expect(generatedContent.cantFindAddressUrl).toEqual('#');
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));

    generatedContent = generateContent({ ...commonContent, language: 'cy', addresses: undefined });
    expect(generatedContent.options).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found - welsh', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('#');
    expect(generatedContent.cantFindAddressUrl).toEqual('#');
  });

  describe('when there is one address in session', () => {
    test('should create correct options for selectAddress field', () => {
      generatedContent = generateContent({ ...commonContent, addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }] });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found', value: -1 },
        { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
      ]);
    });

    test('should create correct options for selectAddress field (welsh)', () => {
      generatedContent = generateContent({
        ...commonContent,
        language: 'cy',
        addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }],
      });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found - welsh', value: -1 },
        { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
      ]);
    });
  });

  describe('when there addresses is undefined in session', () => {
    test('should create correct options for selectAddress field', () => {
      generatedContent = generateContent({ ...commonContent, addresses: undefined });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
      ]);
    });

    test('should create correct options for selectAddress field (welsh)', () => {
      generatedContent = generateContent({ ...commonContent, language: 'cy', addresses: undefined });
      expect(generatedContent.options).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found - welsh', value: -1 },
      ]);
    });
  });

  test('should contain selectAddress field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const selectAddressField = fields.selectAddress as FormOptions;

    expect(selectAddressField.type).toBe('select');
    expect((selectAddressField.label as Function)(generatedContent)).toBe('Select an address');
    expect(selectAddressField.labelSize).toBe(null);
    expect(selectAddressField.validator).toBe(isAddressSelected);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain saveAndComeBackLatter button', () => {
    expect((form.saveAndComeLater.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and come back later');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
