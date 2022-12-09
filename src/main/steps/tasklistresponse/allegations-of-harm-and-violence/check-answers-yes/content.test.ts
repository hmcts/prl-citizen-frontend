import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';
const en = {
  section: 'Safety concerns',
  title: 'Who are you concerned about?',
  optionHint: 'Select all options that are relevant to you.',
  summaryText: 'Contacts for help',
  childconcern: 'The children in this application',
  selfconcern: 'Yourself',
  continue: 'Continue',
  errors: {
    c1A_safetyConernAbout: {
      required: 'Specify who you are concerned about',
    },
  },
};
const cy: typeof en = {
  section: 'Safety concerns - in welsh',
  title: 'Who are you concerned about? - in welsh',
  optionHint: 'Select all options that are relevant to you. - in welsh',
  summaryText: 'Contacts for help - in welsh',
  childconcern: 'The children in this application - in welsh',
  selfconcern: 'Yourself - in welsh',
  continue: 'Continue - in welsh',
  errors: {
    c1A_safetyConernAbout: {
      required: 'Specify who you are concerned about - in welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('your or child safety concerns > content', () => {
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
