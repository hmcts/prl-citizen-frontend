import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Safety concerns',
  title: 'Have the children been abducted or kept outside the UK without your consent before?',
  one: 'Yes',
  two: 'No',
  errors: {
    PRL_c1A_childAbductedBefore: {
      required: 'Select yes if the children have been abducted or kept outside the UK without your consent before',
    },
  },
};

const cy = {
  caption: 'Pryderon diogelwch',
  title: "Ydy'r plant wedi cael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd o'r blaen?",
  one: 'Ydyn',
  two: 'Nac ydyn',
  errors: {
    PRL_c1A_childAbductedBefore: {
      required:
        "Dewiswch ydyn os yw'r plant wedi cael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd o'r blaen",
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
    const applyingWithField = fields.PRL_c1A_childAbductedBefore as FormOptions;
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
