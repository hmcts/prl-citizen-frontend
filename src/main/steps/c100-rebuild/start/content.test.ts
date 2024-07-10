import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';
import { interpolate } from '../../common/string-parser';

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
        content6: interpolate(languages.en.content6, { applicationFee: commonContent.userCase!.c100ApplicationFees! }),
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
        content6: interpolate(languages.cy.content6, { applicationFee: commonContent.userCase!.c100ApplicationFees! }),
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });
});
