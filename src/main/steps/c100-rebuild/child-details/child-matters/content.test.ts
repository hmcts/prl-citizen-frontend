import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to',
  hintText: 'Select all that apply.',
  labelText: 'Decide who theylive with',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision',
    },
  },
};

const cy = {
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to - welsh',
  hintText: 'Select all that apply. - welsh',
  labelText: 'Decide who theylive with - welsh',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision  - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > child-matters', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
