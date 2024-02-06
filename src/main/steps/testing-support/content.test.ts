import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Testing support',
  deleteDrafts: 'Delete Drafts',
  createDraft: 'Create Drafts',
};

const cy: typeof en = {
  title: 'Testing support {in welsh}',
  deleteDrafts: 'Delete Drafts',
  createDraft: 'Create Drafts',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('testingsupport create draft', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Testing support');
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
