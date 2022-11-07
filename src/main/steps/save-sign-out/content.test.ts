import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Your application has been saved',
  applicationSentTo: 'A link to your application has been sent to:',
  applicationSavedFor6Months: 'Your application will be saved for 6 months.',
  beenSignedOut: 'You have been signed out.',
  signBackIn: 'Sign back in and continue',
};

const cy: typeof en = {
  title: 'Mae eich cais wedi cael ei gadw',
  applicationSentTo: 'Anfonwyd dolen sy’n arwain at eich cais i:',
  applicationSavedFor6Months: 'Bydd eich cais yn cael ei gadw am 6 mis.',
  beenSignedOut: 'Rydych wedi cael eich allgofnodi.',
  signBackIn: 'Mewngofnodi eto a pharhau',
};

describe('save-sign-out', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
