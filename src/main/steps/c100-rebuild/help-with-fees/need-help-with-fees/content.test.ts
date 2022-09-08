import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  headingTitle: 'Do you need help with paying the fee for this application?',
  paragraph1: 'This application costs £',
  paragraph2: '. You may be able to get help with paying the fee if \n you have little or no savings, and either:',
  line1: 'get certain benefits',
  line2: 'are on a low income',
  seeEligbilityHyperLink:
    '<a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" target="_blank" aria-label="See if you are eligible for Help with Fees.">See if you are eligible for Help with Fees.</a>',
  select_all_apply: 'Select all that apply',
  yesNeedHelpWithFeesPaying: 'Yes, I need help with paying the fee',
  noNeedHelpWithFeesPaying: 'No, I do not need help',
  errors: {
    needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  headingTitle: 'Do you need help with paying the fee for this application? - welsh',
  paragraph1: 'This application costs £',
  paragraph2:
    '. You may be able to get help with paying the fee if \n you have little or no savings, and either: - welsh',
  line1: 'get certain benefits - welsh',
  line2: 'are on a low income - welsh',
  seeEligbilityHyperLink:
    '<a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" target="_blank" aria-label="See if you are eligible for Help with Fees.">See if you are eligible for Help with Fees. - welsh</a>',
  select_all_apply: 'Select all that apply - welsh',
  yesNeedHelpWithFeesPaying: 'Yes, I need help with paying the fee - welsh',
  noNeedHelpWithFeesPaying: 'No, I do not need help - welsh',
  errors: {
    needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee - welsh',
    },
  },
};

describe('help-with-fees > need-help-with-fees', () => {
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

  test('should select needHelpWithFees field', () => {
    const needHelpWithFees = fields.needHelpWithFees as FormOptions;
    expect(needHelpWithFees.type).toBe('radios');
    expect(needHelpWithFees.classes).toBe('govuk-radios');
    expect((needHelpWithFees.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yesNeedHelpWithFeesPaying);
    expect((needHelpWithFees.values[1].label as LanguageLookup)(generatedContent)).toBe(en.noNeedHelpWithFeesPaying);

    // eslint-disable-next-line @typescript-eslint/ban-types
    (needHelpWithFees.validator as Function)();
    expect(isFieldFilledIn).toHaveBeenCalledWith();
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
