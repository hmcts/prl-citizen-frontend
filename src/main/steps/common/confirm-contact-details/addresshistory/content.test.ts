import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  continue: 'Continue',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Enter your details known',
    },
    citizenUserAddressHistory: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
    },
  },
};

const cy: typeof en = {
  title: 'Ydych chi wedi byw yn y cyfeiriad hwn am fwy na 5 mlynedd?',
  one: 'Ydw',
  two: 'Nac ydw',
  explainNoLabel:
    'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan gychwyn gyda’r diweddaraf',
  continue: 'Parhau',
  errors: {
    isAtAddressLessThan5Years: {
      required: 'Rhowch eich manylion hysbys',
    },
    citizenUserAddressHistory: {
      required:
        'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan gychwyn gyda’r diweddaraf',
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
