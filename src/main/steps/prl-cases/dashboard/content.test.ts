import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

/* eslint-disable @typescript-eslint/ban-types */
describe('service-type content', () => {
  // , userCase: { applyingWith: 'alone'
  const commonContent = { language: 'en', userCaseList: [{}, {}] } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'en' });
    expect(generatedContent.title).toEqual('Your private law account');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.title).toEqual('Your private law account (welsh)');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
