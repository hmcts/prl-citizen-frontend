import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Enter Case Name',
  caseNameHint: 'Enter the eldest child’s full name. For example, John Smith',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
};

const cy = {
  title: 'Enter Case Name - welsh',
  caseNameHint: 'Enter the eldest child’s full name. For example, John Smith - welsh',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required - welsh',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only. -Welsh',
    },
  },
};
describe('applicant personal details > applying-with > content', () => {
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

  test('should contain applyingWith field', () => {
    const applyingWithField = fields.applicantCaseName as FormOptions;
    expect(applyingWithField.type).toBe('text');
    // eslint-disable-next-line @typescript-eslint/ban-types
    expect((applyingWithField.hint as Function)(generatedContent)).toBe(en.caseNameHint);
    expect(applyingWithField.classes).toBe('govuk-input--width-20');
    expect(applyingWithField.labelSize).toBe(null);
  });
  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
