import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title:
    'Has any application been made for a care order, a supervision order, an emergency protection order or an order requiring someone to disclose where a child is or to deliver the child to another person and which:\n' +
    'a) is still going on? or\n' +
    'b) has finished but the order is still in place?\n' +
    '\n',
  localAuthority: 'These will usually involve a local authority.',
  one: 'Yes',
  two: 'No',
};

const cy = {
  title:
    "A oes unrhyw gais wedi'i wneud ar gyfer gorchymyn gofal, gorchymyn goruchwylio, gorchymyn amddiffyn brys neu orchymyn sy'n ei wneud yn ofynnol i rywun ddatgelu lleoliad plentyn neu i gludo'r plentyn i rywun arall ac sydd:\n" +
    'a) dal i fynd rhagddo? neu\n' +
    "b) wedi dod i ben ond mae'r gorchymyn dal mewn grym?\n" +
    '\n',
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
    expect(applyingWithField.labelHidden).toBe(true);
    expect((applyingWithField.label as LanguageLookup)(generatedContent)).toBe(en.title);
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
