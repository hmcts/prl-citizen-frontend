/* eslint-disable jest/expect-expect */
import { TranslationFn } from '../../../main/app/controller/GetController';
import { CommonContent } from '../../../main/steps/common/common.content';

export default (language: 'en' | 'cy', languageContent: Record<string, unknown>, generateFn: TranslationFn): void => {
  const generatedContent = generateFn({ language } as CommonContent);

  Object.entries(languageContent).forEach(([key, value]) => {
    expect(generatedContent[key]).toEqual(value);
  });
};
