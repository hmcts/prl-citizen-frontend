import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as respondentContactPreferencesGenerateContent } from '../../../common/contact-preferences/choose-a-contact-preference/content';

export { form } from '../../../common/contact-preferences/choose-a-contact-preference/content';

export const generateContent: TranslationFn = content => {
  return {
    ...respondentContactPreferencesGenerateContent(content),
  };
};
