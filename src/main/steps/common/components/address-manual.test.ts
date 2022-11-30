import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../common.content';

import { generateContent } from './address-manual';

jest.mock('../../../app/form/validation');

const enContent = {
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  errors: {
    citizenUserManualAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserManualAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserManualAddressPostcode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
};

const cyContent = {
  addressLine1: 'Building and street (in welsh)',
  town: 'Town or city (in welsh)',
  county: 'County (in welsh)',
  postcode: 'Postcode (in welsh)',
  enterInternationalAddress: 'Enter an international address (in welsh)',
  errors: {
    citizenUserManualAddress1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    citizenUserManualAddressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    citizenUserManualAddressPostcode: {
      required: 'Enter a real postcode (in welsh)',
      invalid: 'Enter a real postcode (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > manual-address > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.citizenUserManualAddress1).toEqual(enContent.addressLine1);
    expect(generatedContent.citizenUserManualAddressTown).toEqual(enContent.town);
    expect(generatedContent.citizenUserManualAddressCounty).toEqual(enContent.county);
    expect(generatedContent.citizenUserManualAddressPostcode).toEqual(enContent.postcode);
    expect(generatedContent.enterInternationalAddress).toEqual(enContent.enterInternationalAddress);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.citizenUserManualAddress1).toEqual(cyContent.addressLine1);
    expect(generatedContent.citizenUserManualAddressTown).toEqual(cyContent.town);
    expect(generatedContent.citizenUserManualAddressCounty).toEqual(cyContent.county);
    expect(generatedContent.citizenUserManualAddressPostcode).toEqual(cyContent.postcode);
    expect(generatedContent.enterInternationalAddress).toEqual(cyContent.enterInternationalAddress);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain citizenUserManualAddress1 field', () => {
    const address1Field = fields.citizenUserManualAddress1 as FormOptions;
    expect(address1Field.type).toBe('text');
    expect(address1Field.classes).toBe('govuk-label');
    expect((address1Field.label as Function)(generatedContent)).toBe(enContent.addressLine1);
    expect(address1Field.labelSize).toBe(null);
    expect(address1Field.validator).toBe(isFieldFilledIn);
  });

  test('should contain citizenUserManualAddress2 field', () => {
    const address2Field = fields.citizenUserManualAddress2 as FormOptions;
    expect(address2Field.type).toBe('text');
    expect(address2Field.classes).toBe('govuk-label');
    expect((address2Field.label as Function)(generatedContent)).toBeUndefined();
    expect(address2Field.labelSize).toBe(null);
  });

  test('should contain citizenUserManualAddressTown field', () => {
    const addressTownField = fields.citizenUserManualAddressTown as FormOptions;
    expect(addressTownField.type).toBe('text');
    expect(addressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressTownField.label as Function)(generatedContent)).toBe(enContent.town);
    expect(addressTownField.labelSize).toBe(null);
    // expect(addressTownField.validator).toBe(isFieldFilledIn);
  });

  test('should contain citizenUserManualAddressCounty field', () => {
    const addressCountyField = fields.citizenUserManualAddressCounty as FormOptions;
    expect(addressCountyField.type).toBe('text');
    expect(addressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressCountyField.label as Function)(generatedContent)).toBe(enContent.county);
    expect(addressCountyField.labelSize).toBe(null);
  });

  test('should contain citizenUserAddressPostcode field', () => {
    const addressPostcodeField = fields.citizenUserManualAddressPostcode as FormOptions;
    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.postcode);
    expect(addressPostcodeField.labelSize).toBe(null);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
