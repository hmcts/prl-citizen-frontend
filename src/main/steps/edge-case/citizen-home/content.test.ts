import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toEqual('Select Jurisdiction');
    expect(generatedContent.one).toEqual('Family');
    expect(generatedContent.two).toEqual('Tribunals');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.label).toEqual('Select Jurisdiction (in welsh)');
    expect(generatedContent.one).toEqual('Family (in welsh)');
    expect(generatedContent.two).toEqual('Tribunals (in welsh)');
  });

  test('should contain Select Jurisdiction field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const selectJurisdictionField = fields.selectJurisdiction as FormOptions;
    expect(selectJurisdictionField.type).toBe('radios');
    expect(selectJurisdictionField.classes).toBe('govuk-radios');
    expect((selectJurisdictionField.label as Function)(generatedContent)).toBe('Select Jurisdiction');
    expect((selectJurisdictionField.values[0].label as Function)(generatedContent)).toBe('Family');
    expect((selectJurisdictionField.values[1].label as Function)(generatedContent)).toBe('Tribunals');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
