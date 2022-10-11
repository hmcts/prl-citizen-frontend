import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Do you have a written agreement with the other people in the case, that you want the court to review?',
  writtenAgreementDetails:
    'A written agreement between the parties that is made legally binding by the court is called a consent order.',
  approvalDetails: 'If you have a draft consent order, the court will review it and may give approval.',
  one: 'Yes',
  two: 'No',
  infoDetail: 'You will be asked to upload the draft consent order later in the application.',
  errors: {
    writtenAgreement: {
      required:
        'Select yes if you have a written agreement with the other people in the case, that you want the court to review',
    },
  },
};

const cy = {
  title:
    'Do you have a written agreement with the other people in the case, that you want the court to review? - welsh',
  writtenAgreementDetails:
    'A written agreement between the parties that is made legally binding by the court is called a consent order. - welsh',
  approvalDetails: 'If you have a draft consent order, the court will review it and may give approval. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  infoDetail: 'You will be asked to upload the draft consent order later in the application. - welsh',
  errors: {
    writtenAgreement: {
      required:
        'Select yes if you have a written agreement with the other people in the case, that you want the court to review - welsh',
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
    const applyingWithField = fields.writtenAgreement as FormOptions;
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
