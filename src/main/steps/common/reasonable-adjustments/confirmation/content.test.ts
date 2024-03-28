import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  successText: 'You have submitted your request to the court',
  content1: 'What happens next',
  content2: 'Your support needs have been sent to the court. They’ll be reviewed by HMCTS staff or a judge.',
  content3: 'We’ll contact you if we need more information or we cannot provide the support you’ve requested.',
  content4: 'If your hearing is within 2 days',
  content5:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing.',
  closeAndReturn: 'Close and return to case overview',
};

const cy = {
  successText: 'You have submitted your request to the court - welsh',
  content1: 'What happens next - welsh',
  content2: 'Your support needs have been sent to the court. They’ll be reviewed by HMCTS staff or a judge. - welsh',
  content3: 'We’ll contact you if we need more information or we cannot provide the support you’ve requested. - welsh',
  content4: 'If your hearing is within 2 days - welsh',
  content5:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing. - welsh',
  closeAndReturn: 'Close and return to case overview - welsh',
};

describe('RA > confirmation > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/confirmation',
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(
        generatePageContent({ language: 'en', pageContent: generateContent }) as Record<string, never>
      )
    ).toBe(en.closeAndReturn);
  });
});
