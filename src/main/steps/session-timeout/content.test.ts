import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'You were signed out to protect your privacy',
  signInButton: 'Sign in',
};

const cy = {
  title: 'Cawsoch eich allgofnodi i amddiffyn eich preifatrwydd',
  signInButton: 'Mewngofnodi',
};

describe('session-timeout > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct English content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct Welsh content', () => {
    const commonContentWelsh = generatePageContent({
      language: 'cy',
      userCase: {},
    }) as CommonContent;

    languageAssertions('cy', cy, () => generateContent(commonContentWelsh));
  });
});
