/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Application submitted',
  updatesFromCourt: 'You will get updates from the court about the progress of your application.',
  next: 'What happens next',
  courtConsider: 'The court will consider your application and will be in touch to let you know what happens next.',
  closeAndReturn: 'Close and return to case overview',
};

const cy: typeof en = {
  title: 'Application submitted (welsh)',
  updatesFromCourt: 'You will get updates from the court about the progress of your application. (welsh)',
  next: 'What happens next (welsh)',
  courtConsider:
    'The court will consider your application and will be in touch to let you know what happens next. (welsh)',
  closeAndReturn: 'Close and return to case overview (welsh)',
};

describe('application submitted content', () => {
  const commonContent = { language: 'en' } as unknown as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
