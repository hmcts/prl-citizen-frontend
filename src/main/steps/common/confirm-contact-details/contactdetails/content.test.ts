import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Your contact details',
  citizenUserPhoneNumber: 'UK telephone number',
  citizenUserEmailAddress: 'Email address',
  citizenUserSafeToCall: 'When it is safe to call you (optional)',
  safeToCallHint: 'Give a time between 9am and 5pm when it is safe to call you',
  continue: 'Continue',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Enter a valid UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
    citizenUserEmailAddress: {
      required: 'Enter a valid email address',
      invalid: 'Enter a valid email address, like name@example.com',
    },
    citizenUserSafeToCall: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
};

const cy: typeof en = {
  title: 'Eich manylion cyswllt',
  citizenUserPhoneNumber: 'Rhif ffôn y DU',
  citizenUserEmailAddress: 'Cyfeiriad ebost',
  citizenUserSafeToCall: 'When it is safe to call you (optional)',
  safeToCallHint: 'Give a time between 9am and 5pm when it is safe to call you',
  continue: 'Continue',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Rhowch rif ffôn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
    citizenUserEmailAddress: {
      required: 'Rhowch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
    citizenUserSafeToCall: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.(in Welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('address history > content', () => {
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
