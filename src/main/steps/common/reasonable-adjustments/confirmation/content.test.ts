import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  title: 'Your support - Confirmation',
  continue: 'Continue to next step',
};

const cy = {
  title: 'Your support - Confirmation -  welsh',
  continue: 'Continue to next step - welsh',
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
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});
