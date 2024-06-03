import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent, languages } from './content';

describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    userCase: {
      c100ApplicationFees: '255.00',
    },
  } as CommonContent;

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
});
