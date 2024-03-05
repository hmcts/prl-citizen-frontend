import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  title: 'Your support - Guidelines',
  startNowButtonText: 'Start now',
};

const cy = {
  title: 'Your support - Guidelines -  welsh',
  startNowButtonText: 'Start now - welsh',
};

describe('RA > guidance > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/guidance',
      },
    },
  } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
