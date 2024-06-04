import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent, languages } from './content';

describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    userCase: {
      c100ApplicationFees: '255.00',
    },
  } as CommonContent;
  const generatedContent = generateContent(commonContent);
  const form = generatedContent.form as FormContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions(
      'en',
      {
        ...languages.en,
      },
      () => generateContent({ ...commonContent, language: 'en' })
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      {
        ...languages.cy,
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });
  test('should contain Save and continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
