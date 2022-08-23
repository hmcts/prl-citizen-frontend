import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  hwfGuidanceTitle: 'You need to apply for help with your child arrangements application fee',
  hwfApplyLinkHint1: 'You need to',
  hwfApplyLinkHint2: 'before you continue with this child arrangements application.',
  applyForHwf: 'apply for help with fees (opens in a new tab)',
  hwfGuidanceC100Hint: "Enter 'C100' when you are asked for your court or tribunal form number.",
  hwfGuidanceHint2: `After you have applied for help with fees, you will receive a reference number.
  Add this reference number below to proceed with the child arrangements application.`,
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C',
  errors: {
    hwfGuidanceRefNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
  },
};

const cy = {
  hwfGuidanceTitle: 'You need to apply for help with your child arrangements application fee - welsh',
  hwfApplyLinkHint1: 'You need to - welsh',
  hwfApplyLinkHint2: 'before you continue with this child arrangements application. - welsh',
  applyForHwf: 'apply for help with fees (opens in a new tab) - welsh',
  hwfGuidanceC100Hint: "Enter 'C100' when you are asked for your court or tribunal form number. - welsh",
  hwfGuidanceHint2: `After you have applied for help with fees, you will receive a reference number.
  Add this reference number below to proceed with the child arrangements application. - welsh`,
  hwfReferenceNumberLabel: 'Enter your help with fees reference number - welsh',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C - welsh',
  errors: {
    hwfGuidanceRefNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('help with fess > hwf guidance', () => {
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
    const applyingWithField = fields.hwfGuidanceRefNumber as FormOptions;
    expect(applyingWithField.type).toBe('text');
    (applyingWithField.validator as Function)('test text');
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
