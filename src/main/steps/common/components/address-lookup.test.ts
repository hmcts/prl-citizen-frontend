//import { hasUncaughtExceptionCaptureCallback } from 'process';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './address-lookup';

jest.mock('../../../app/form/validation');

const enContent = {
  citizenUserAddressPostcode: 'Your current postcode',
  findAddress: 'Find address',
  enterAddressManually: 'I live outisde the UK',
  errors: {
    citizenUserAddressPostcode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
};

const cyContent = {
  citizenUserAddressPostcode: 'Your current postcode (in welsh)',
  findAddress: 'Find address (in welsh)',
  enterAddressManually: 'I live outisde the UK (in welsh)',
  errors: {
    citizenUserAddressPostcode: {
      required: 'Enter a real postcode (in welsh)',
      invalid: 'Enter a real postcode (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  const commonContentcy = { language: 'cy', userCase: {} } as CommonContent;
  let generatedContent;
  let generatedContentcy;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    generatedContentcy = generateContent(commonContentcy);
  });

  test('should return correct english content', () => {
    expect(generatedContent.citizenUserAddressPostcode).toEqual(enContent.citizenUserAddressPostcode);
    expect(generatedContent.enterAddressManually).toEqual(enContent.enterAddressManually);
    expect(generatedContent.errors).toEqual(enContent.errors);
    expect(generatedContent.manualAddressUrl).toEqual('#');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.citizenUserAddressPostcode).toEqual(cyContent.citizenUserAddressPostcode);
    expect(generatedContent.enterAddressManually).toEqual(cyContent.enterAddressManually);
    expect(generatedContent.errors).toEqual(cyContent.errors);
    expect(generatedContent.manualAddressUrl).toEqual('#');
  });

  test('should contain citizenUserAddressPostcode field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;

    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.citizenUserAddressPostcode);
    expect(addressPostcodeField.labelSize).toBe('m');
    expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');

  });
  
  test('should contain citizenUserAddressPostcode field with welsh', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;

    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContentcy)).toBe(cyContent.citizenUserAddressPostcode);
    expect(addressPostcodeField.labelSize).toBe('m');
    expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
    expect((form.submit?.text as Function)(generatedContentcy)).toBe('Continue (in welsh)');

  });
    
});
/* eslint-enable @typescript-eslint/ban-types */
