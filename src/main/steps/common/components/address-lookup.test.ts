import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './address-lookup';

jest.mock('../../../app/form/validation');

const enContent = {
  line1: 'Your current postcode',
  addressPostcode: 'Postcode',
  findAddress: 'Find address',
  enterAddressManually: 'I live outisde the UK',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
};

const cyContent = {
  line1: 'Your current postcode (in welsh)',
  addressPostcode: 'Postcode (in welsh)',
  findAddress: 'Find address (in welsh)',
  enterAddressManually: 'I live outisde the UK (in welsh)',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode (in welsh)',
      invalid: 'Enter a real postcode (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.enterAddressManually).toEqual(enContent.enterAddressManually);
    expect(generatedContent.errors).toEqual(enContent.errors);
    expect(generatedContent.manualAddressUrl).toEqual('#');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.enterAddressManually).toEqual(cyContent.enterAddressManually);
    expect(generatedContent.errors).toEqual(cyContent.errors);
    expect(generatedContent.manualAddressUrl).toEqual('#');
  });

  test('should contain addressPostcode field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addressPostcodeField = fields.addressPostcode as FormOptions;

    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect(addressPostcodeField.labelSize).toBe('m');
    expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
