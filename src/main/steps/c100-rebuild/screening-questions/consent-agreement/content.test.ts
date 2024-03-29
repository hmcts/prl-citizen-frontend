import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Do you have a written agreement with the other people in the case that you want the court to review?',
  writtenAgreementDetails:
    'A written agreement between the parties that is made legally binding by the court is called a consent order.',
  approvalDetails: 'If you have a draft consent order, the court will review it and may give approval.',
  one: 'Yes',
  two: 'No',
  infoDetail: 'You will be asked to upload the draft consent order later in the application.',
  findOut: 'Find out more about alternative routes of reaching an agreement.',
  errors: {
    sq_writtenAgreement: {
      required:
        'Select yes if you have a written agreement with the other people in the case, that you want the court to review',
    },
  },
};

const cy = {
  title: "A oes gennych chi gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, yr ydych am i'r llys ei adolygu?",
  writtenAgreementDetails:
    "Gelwir cytundeb ysgrifenedig rhwng y partïon sy'n cael ei wneud yn gyfreithiol rwymol gan y llys yn orchymyn cydsynio.",
  approvalDetails:
    'Os oes gennych orchymyn cydsynio drafft, bydd y llys yn ei adolygu ac efallai y bydd yn ei gymeradwyo.',
  one: 'Oes',
  two: 'Nac oes',
  infoDetail: "Gofynnir i chi lwytho'r gorchymyn cydsynio drafft yn nes ymlaen yn y cais.",
  findOut: 'Gwybodaeth am ffyrdd eraill o ddod i gytundeb.',
  errors: {
    sq_writtenAgreement: {
      required:
        "Dewiswch ‘oes’, os oes gennych gytundeb ysgrifenedig gyda'r bobl eraill yn yr achos, a’ch bod am i'r llys adolygu",
    },
  },
};

describe('screeing questions', () => {
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
  test('should contain screening question fields', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.sq_writtenAgreement as FormOptions;
    const applyingWithFieldLabel = applyingWithField.values[0].subFields?.infoText as FormInput;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithFieldLabel?.textAndHtml as LanguageLookup)(generatedContent)).toBe(en.infoDetail);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    (applyingWithField.validator as Validator)('YES');
    expect(isFieldFilledIn).toHaveBeenCalledWith('YES');
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
