import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactPreferencesGenerateContent } from '../../../common/contact-preferences/contact-preferences/content';

export { form } from '../../../common/contact-preferences/contact-preferences/content';
export const generateContent: TranslationFn = content => {
  const contactPreferences = contactPreferencesGenerateContent(content);
  return {
    ...contactPreferences,
  };
};

console.info('** FOR SONAR **');
