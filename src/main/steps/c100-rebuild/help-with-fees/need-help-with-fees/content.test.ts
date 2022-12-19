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
    hwf_needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee',
    },
  },
};

const cy = {
  serviceName: 'Trefniadau plant',
  headingTitle: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
  paragraph1: 'Cost y cais hwn £',
  paragraph2:
    '. You may be able to get help with paying the fee if \n you have little or no savings, and either: - welsh',
  line1: 'cael budd-daliadau penodol',
  line2: 'ar incwm isel',
  seeEligbilityHyperLink:
    '<a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" target="_blank" aria-label="See if you are eligible for Help with Fees.">Gweld a ydych yn gymwys i gael help i dalu ffioedd.</a>',
  select_all_apply: 'Dewiswch bob un sy’n berthnasol',
  yesNeedHelpWithFeesPaying: 'Oes, rwyf eisiau help i dalu’r ffi',
  noNeedHelpWithFeesPaying: 'Nac oes, ni wyf eisiau help',
  errors: {
    hwf_needHelpWithFees: {
      required: 'Dewiswch oes os ydych chi eisiau help i dalu’r ffi am y cais hwn',
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
    const needHelpWithFees = fields.hwf_needHelpWithFees as FormOptions;
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
