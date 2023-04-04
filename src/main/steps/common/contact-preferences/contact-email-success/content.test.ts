import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');
let caseNumber;

const en = {
  caption: `Case number #${caseNumber}`,
  title: 'Contact preferences updated',
  text: 'You will receive digital updates about the case.',
  continue: 'Continue',
  warningText: "If you cannot find the emails in your inbox, check your 'spam' folder.",
};

const cy = {
  caption: `Case number - welsh #${caseNumber}`,
  title: 'Contact preferences updated- welsh',
  text: 'You will receive digital updates about the case. - welsh',
  continue: 'Continue - welsh',
  warningText: "If you cannot find the emails in your inbox, check your 'spam' folder. -welsh",
};

describe('contact email common content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});
