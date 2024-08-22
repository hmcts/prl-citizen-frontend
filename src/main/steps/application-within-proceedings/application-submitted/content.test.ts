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
  title: "Cais wedi'i gyflwyno",
  updatesFromCourt: 'Byddwch yn cael diweddariadau gan y llys am gynnydd eich cais.',
  next: 'Beth fydd yn digwydd nesaf',
  courtConsider:
    'Bydd y llys yn adolygu eich dogfennau ac yn cysylltu â chi i roi gwybod i chi beth fydd yn digwydd nesaf.',
  closeAndReturn: 'Cau a dychwelyd i drosolwg o’r achos',
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
