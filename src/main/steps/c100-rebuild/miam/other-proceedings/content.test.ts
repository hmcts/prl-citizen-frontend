import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? ',
  localAuthority: 'These will usually involve a local authority.',
  one: 'Yes',
  two: 'No',
};

const cy = {
  title:
    'A yw’r plant ynghlwm ag unrhyw achos diogelu, gofal neu oruchwyliaeth brys (neu a fuont ynghlwm ag achosion o’r fath)?',
  localAuthority: 'Fel arfer, bydd y rhain yn cynnwys awdurdod lleol.',
  one: 'Ydyn',
  two: 'Nac ydyn',
};

describe('miam->Are the children involved in any emergency protection, care or supervision proceedings', () => {
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
    const applyingWithField = fields.miam_otherProceedings as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.hint as LanguageLookup)(generatedContent)).toBe(en.localAuthority);
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect(applyingWithField.values[0].value).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect(applyingWithField.values[1].value).toBe(en.two);
    (applyingWithField.validator as Validator)(YesOrNo.YES);
    expect(isFieldFilledIn).toHaveBeenCalledWith(YesOrNo.YES);
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
