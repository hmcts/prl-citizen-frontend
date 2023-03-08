import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Completing your application',
  paragraphs: [
    'You can complete this application online or by post.',
    'At the end of the application process you will need to pay a court fee of £232.',
    'The payment will be taken at the end of the process, when you submit your application.',
  ],
  helpPayingCourtFeesSubHeading: 'Get help paying court fees',
  courtFeesParagraphs: [
    'You may be able to get help with some or all of your court fees depending on your savings, income and benefits.',
    'If you apply for help with fees a payment will not be taken when you submit the application.',
    "<p class='govuk-body'> Check the <a href='https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a' class='govuk-link' rel='external' target='_blank'>help with fees guidance on GOV.UK</a> to find out if you meet the criteria and apply for support.</p>",
  ],
};

const cy = {
  title: 'Completing your application -welsh',
  paragraphs: [
    'You can complete this application online or by post. -welsh',
    'At the end of the application process you will need to pay a court fee of £232. -welsh',
    'The payment will be taken at the end of the process, when you submit your application. -welsh',
  ],
  helpPayingCourtFeesSubHeading: 'Get help paying court fees -welsh',
  courtFeesParagraphs: [
    'You may be able to get help with some or all of your court fees depending on your savings, income and benefits. -welsh',
    'If you apply for help with fees a payment will not be taken when you submit the application. -welsh',
    "<p class='govuk-body'> Check the <a href='https://get.adobe.com/uk/reader/' class='govuk-link' rel='external' target='_blank'>help with fees guidance on GOV.UK</a> to find out if you meet the criteria and apply for support. -welsh </p>",
  ],
};

describe('complete your application guidance > complete-application > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
