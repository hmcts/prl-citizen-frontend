import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  // userCase: { applyingWith: 'alone' }
  const commonContent = { language: 'en' } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toEqual('Type of application');
    expect(generatedContent.one).toEqual('C100 Child Arrangements Application');
    expect(generatedContent.two).toEqual('FL401 Non-Molestation &/or Occupation Order Application');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.label).toEqual('Type of application');
    expect(generatedContent.one).toEqual('C100 Child Arrangements Application');
    expect(generatedContent.two).toEqual('FL401 Non-Molestation &/or Occupation Order Application');
  });

  test('should contain Type of application field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const selectJurisdictionField = fields.selectJurisdiction as FormOptions;
    expect(selectJurisdictionField.type).toBe('radios');
    expect(selectJurisdictionField.classes).toBe('govuk-radios');
    expect((selectJurisdictionField.label as Function)(generatedContent)).toBe('Type of application');
    expect((selectJurisdictionField.values[0].label as Function)(generatedContent)).toBe('C100 Child Arrangements Application');
    expect((selectJurisdictionField.values[1].label as Function)(generatedContent)).toBe('FL401 Non-Molestation &/or Occupation Order Application');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
