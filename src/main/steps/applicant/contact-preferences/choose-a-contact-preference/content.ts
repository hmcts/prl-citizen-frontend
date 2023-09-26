import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactPreferencesGenerateContent } from '../../../common/contact-preferences/choose-a-contact-preference/content';

export { form } from '../../../common/contact-preferences/choose-a-contact-preference/content';
export const generateContent: TranslationFn = content => {
  const contactPreferences = contactPreferencesGenerateContent(content);
  return {
    ...contactPreferences,
  };
};
