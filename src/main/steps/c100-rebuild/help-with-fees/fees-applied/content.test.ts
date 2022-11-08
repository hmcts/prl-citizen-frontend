import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  feesAppliedDetailsTitle: 'Have you already applied for help with your application fee?',
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberHint: `You received this number when you applied for help with fees.<br/>
  For example, HWF-A1B-23C`,
  one: 'Yes',
  two: 'No',
  errors: {
    hwf_feesAppliedDetails: {
      required: 'Select yes if you already applied for help with your application fee',
    },
    helpWithFeesReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
  },
};

const cy = {
  feesAppliedDetailsTitle: 'Have you already applied for help with your application fee? - welsh',
  hwfReferenceNumberLabel: 'Enter your help with fees reference number - welsh',
  hwfReferenceNumberHint: `You received this number when you applied for help with fees - welsh.<br/>
  For example, HWF-A1B-23C - welsh`,
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    hwf_feesAppliedDetails: {
      required: 'Select yes if you already applied for help with your application fee - welsh',
    },
    helpWithFeesReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('help with fess > fees applied', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
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
    const applyingWithField = fields.hwf_feesAppliedDetails as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    const applyTextField = applyingWithField.values[0].subFields!.helpWithFeesReferenceNumber;
    expect(applyTextField.type).toBe('text');
    expect((applyTextField.label as LanguageLookup)(generatedContent)).toBe(en.hwfReferenceNumberLabel);
    expect((applyTextField.hint as LanguageLookup)(generatedContent)).toBe(en.hwfReferenceNumberHint);
    (applyTextField.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');
  });

  test('should contain onlycontinue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
