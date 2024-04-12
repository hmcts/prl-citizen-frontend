import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  title: 'Sorry, there is a problem with the service',
  content1: 'Try again later.',
  content2:
    'If you have urgent support needs, contact the court. Find the court dealing with your case on <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">GOV.UK (opens in a new tab).</a>',
  returnToCaseView: 'Return to case view',
};

const cy = {
  title: 'Sorry, there is a problem with the service - welsh',
  content1: 'Try again later. - welsh',
  content2:
    'If you have urgent support needs, contact the court. Find the court dealing with your case on <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">GOV.UK (opens in a new tab).</a> - welsh',
  returnToCaseView: 'Return to case view - welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('RA > error > content', () => {
  const commonContent = {
    language: 'en',
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
    ).toBe(en.returnToCaseView);
  });
});
