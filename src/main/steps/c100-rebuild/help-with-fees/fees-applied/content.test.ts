import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  feesAppliedDetailsTitle: 'Have you already applied for help with your application fee?',
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberBody: 'You received this number when you applied for help with fees.',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C',
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
  feesAppliedDetailsTitle: 'A ydych chi eisoes wedi gwneud cais am help i dalu ffi’r cais?',
  hwfReferenceNumberLabel: 'Rhowch eich cyfeirnod help i dalu ffioedd',
  hwfReferenceNumberBody: 'Cawsoch y rhif hwn pan wnaethoch gais am help i dalu ffioedd.',
  hwfReferenceNumberHint: 'Er enghraifft, HWF-A1B-23C',
  one: 'Do',
  two: 'Naddo',
  errors: {
    hwf_feesAppliedDetails: {
      required: 'Dewiswch do os ydych eisoes wedi gwneud cais am help i dalu ffi eich cais',
    },
    helpWithFeesReferenceNumber: {
      required: 'Nodwch y cyfeirnod Help i dalu Ffioedd a gawsoch pan wnaethoch chi wneud cais am Help i dalu Ffioedd',
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
    expect((applyTextField.hint as LanguageLookup)(generatedContent)).toBe(
      `<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-1">${en.hwfReferenceNumberBody}</p><p class="govuk-hint govuk-!-margin-top-0">${en.hwfReferenceNumberHint}</p>`
    );
    expect((applyTextField.label as LanguageLookup)(generatedContent)).toBe(en.hwfReferenceNumberLabel);
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
