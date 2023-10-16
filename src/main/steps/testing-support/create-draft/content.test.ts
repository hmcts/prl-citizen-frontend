import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Testing support - create drafts',
  createC100Draft: 'Create C100 Draft',
  createC100ResponseDraft: 'Create C100 Response Draft',
};

const cy: typeof en = {
  title: 'Testing support - create drafts (in welsh)',
  createC100Draft: 'Create C100 Draft (in welsh)',
  createC100ResponseDraft: 'Create C100 Response Draft (in welsh)',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('testingsupport create draft', () => {
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
