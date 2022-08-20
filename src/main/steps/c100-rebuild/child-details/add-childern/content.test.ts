import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Enter the names of the children',
  subTitle: 'Only include the children you’re making this application about',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  errors: {
    'firstname-1': {
      required: 'Select first name',
    },
    'lastname-1': {
      required: 'Select last name',
    },
  },
};

const cy = {
  pageTitle: 'Enter the names of the children - welsh',
  subTitle: 'Only include the children you’re making this application about - welsh',
  firstName: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastName: 'Last name(s) - welsh',
  errors: {
    'firstname-1': {
      required: 'Select first name - welsh',
    },
    'lastname-1': {
      required: 'Select last name - welsh',
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
