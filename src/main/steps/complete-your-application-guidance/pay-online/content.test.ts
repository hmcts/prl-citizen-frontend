import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Do you agree to pay the court fee online using a debit or credit card?',
  paragraph:
    "If you've applied for help with paying court fees, you'll be given a reference number. You can provide this at the end of the process instead of making a payment.",
  one: 'Yes',
  two: 'No',
};

const cy = {
  title: 'Do you agree to pay the court fee online using a debit or credit card? -welsh',
  paragraph:
    "If you've applied for help with paying court fees, you'll be given a reference number. You can provide this at the end of the process instead of making a payment. -welsh",
  one: 'Yes -welsh',
  two: 'No -welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('complete your application guidance > pay-online > content', () => {
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

  test('should contain complete your application guidance -> pay-online fields', () => {
    const applicationGuidancePayOnline = fields.applicationGuidancePayOnline as FormOptions;
    expect(applicationGuidancePayOnline.type).toBe('radios');
    (applicationGuidancePayOnline.validator as Function)('applicationGuidancePayOnline');
    expect((applicationGuidancePayOnline.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applicationGuidancePayOnline.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
