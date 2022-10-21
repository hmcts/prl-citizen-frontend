import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './address-manual';

jest.mock('../../../../../app/form/validation');

const enContent = {
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years',
  explainNoHint: 'Start with your most recent'
};

const cyContent = {
  addressLine1: 'Building and street - welsh',
  town: 'Town or city - welsh',
  county: 'County - welsh',
  postcode: 'Postcode - welsh',
  enterInternationalAddress: 'Enter an international address - welsh',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years - welsh',
  explainNoHint: 'Start with your most recent - welsh'
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain address1 field', () => {
    const address1Field = fields.address1 as FormOptions;
    expect(address1Field.type).toBe('text');
    expect(address1Field.classes).toBe('govuk-label');
    expect((address1Field.label as Function)(generatedContent)).toBe(enContent.addressLine1);
    expect(address1Field.labelSize).toBe(null);
    expect(address1Field.validator).toBe(isFieldFilledIn);
  });

  test('should contain address2 field', () => {
    const address2Field = fields.address2 as FormOptions;
    expect(address2Field.type).toBe('text');
    expect(address2Field.classes).toBe('govuk-label');
    expect((address2Field.label as Function)(generatedContent)).toBeUndefined();
    expect(address2Field.labelSize).toBe(null);
  });

  test('should contain addressTown field', () => {
    const addressTownField = fields.addressTown as FormOptions;
    expect(addressTownField.type).toBe('text');
    expect(addressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressTownField.label as Function)(generatedContent)).toBe(enContent.town);
    expect(addressTownField.labelSize).toBe(null);
    // expect(addressTownField.validator).toBe(isFieldFilledIn);
  });

  test('should contain addressCounty field', () => {
    const addressCountyField = fields.addressCounty as FormOptions;
    expect(addressCountyField.type).toBe('text');
    expect(addressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressCountyField.label as Function)(generatedContent)).toBe(enContent.county);
    expect(addressCountyField.labelSize).toBe(null);
  });

  test('should contain addressPostcode field', () => {
    const addressPostcodeField = fields.addressPostcode as FormOptions;
    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.postcode);
    expect(addressPostcodeField.labelSize).toBe(null);
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
