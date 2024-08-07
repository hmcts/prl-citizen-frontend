import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  title: 'Do any of the children have a passport?',
  caption: 'Safety concerns',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_passportOffice: {
      required: 'Select yes if any of the children have a passport',
    },
  },
};

const cy = {
  title: "A oes gan unrhyw un o'r plant basbort?",
  caption: 'Pryderon diogelwch',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    c1A_passportOffice: {
      required: "Dewiswch oes os oes gan unrhyw un o'r plant basbort",
    },
  },
};

describe('safetyconcerns > abduction > passport-office', () => {
  let commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  commonContent = {
    ...commonContent,
    additionalData: {
      req: {
        originalUrl: 'c100-rebuild',
      },
    },
  };
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  //eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.c1A_passportOffice as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
