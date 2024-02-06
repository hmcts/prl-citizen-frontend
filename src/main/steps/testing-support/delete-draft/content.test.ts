import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Testing support - create drafts',
  deleteC100Draft: 'Delete C100 Draft/s',
};

const cy: typeof en = {
  title: 'Testing support - create drafts (in welsh)',
  deleteC100Draft: 'Delete C100 Draft/s (in welsh)',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('testingsupport delete draft', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Testing support - create drafts');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
