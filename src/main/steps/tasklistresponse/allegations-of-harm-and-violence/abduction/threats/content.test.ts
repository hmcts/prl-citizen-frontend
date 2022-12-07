import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent } from '../../../../c100-rebuild/safety-concerns/abduction/threats/content';
import { CommonContent } from '../../../../common/common.content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Safety concerns',
  title: 'Have the children been abducted or kept outside the UK without your consent before?',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_childAbductedBefore: {
      required: 'Select yes if the children have been abducted or kept outside the UK without your consent before',
    },
  },
};

const cy = {
  caption: 'Safety concerns - welsh',
  title: 'Have the children been abducted or kept outside the UK without your consent before? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    c1A_childAbductedBefore: {
      required:
        'Select yes if the children have been abducted or kept outside the UK without your consent before - welsh',
    },
  },
};

describe('miam->have document signed by mediator or not', () => {
  let form;
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.c1A_childAbductedBefore as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);

    (applyingWithField.validator as Validator)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  // test('should contain Continue button', () => {
  //   expect(
  //     (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
  //   ).toBe('Continue');
  // });
});
