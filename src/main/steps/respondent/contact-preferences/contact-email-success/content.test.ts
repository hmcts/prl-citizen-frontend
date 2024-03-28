import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');
let caseNumber;

const en = {
  caption: `Case number ${caseNumber}`,
  title: 'Contact preferences updated',
  text: 'You will receive digital updates about the case.',
  continue: 'Continue',
  warningText: "If you cannot find the emails in your inbox, check your 'spam' folder.",
};

const cy = {
  caption: `Rhif yr achos ${caseNumber}`,
  title: 'Dewisiadau cyswllt wedi’u diweddaru',
  text: 'Byddwch yn cael diweddariadau digidol am yr achos',
  continue: 'Parhau',
  warningText: "Os na allwch weld y negeseuon e-bost yn eich mewnflwch, gwiriwch eich ffolder 'spam'.",
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
