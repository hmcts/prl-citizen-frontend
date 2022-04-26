/* eslint-disable jest/expect-expect */
import { TranslationFn } from '../../../app/controller/GetController';
import { CommonContent } from '../common.content';

export const languageAssertions = (
  language: 'en' | 'cy',
  languageContent: Record<string, unknown>,
  generateFn: TranslationFn
): void => {
  const generatedContent = generateFn({ language } as CommonContent);

  Object.entries(languageContent).forEach(([key, value]) => {
    expect(generatedContent[key]).toEqual(value);
  });
};
