import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './address-lookup';

jest.mock('../../../../../app/form/validation');

const en = {
  postcode: 'Current postcode',
  enterAddressManually: 'I live outside the UK',
  manualAddressUrl: '#',
};

const cy = {
  postcode: 'Current postcode - welsh',
  enterAddressManually: 'I live outside the UK - welsh',
  manualAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain addressPostcode field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addressPostcodeField = fields.addressPostcode as FormOptions;

    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe(en.postcode);
    expect(addressPostcodeField.labelSize).toBe(null);
    expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Continue');
  });

  test('should contain saveAndComeBackLatter button', () => {
    expect((form.saveAndComeLater.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and come back later');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
