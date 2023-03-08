import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Will you be using a legal representative in these proceedings?',
  one: 'Yes',
  two: 'No',
};

const cy = {
  title: 'Will you be using a legal representative in these proceedings? -welsh',
  one: 'Yes -welsh',
  two: 'No -welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('complete your application guidance > legal-representative > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain complete your application guidance -> legal-representative fields', () => {
    const applicationGuidanceLegalRepresentative = fields.applicationGuidanceLegalRepresentative as FormOptions;
    expect(applicationGuidanceLegalRepresentative.type).toBe('radios');
    (applicationGuidanceLegalRepresentative.validator as Function)('applicationGuidancePayOnline');
    expect((applicationGuidanceLegalRepresentative.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applicationGuidanceLegalRepresentative.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
