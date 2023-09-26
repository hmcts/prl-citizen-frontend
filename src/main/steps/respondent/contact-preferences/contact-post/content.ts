import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as respondentContactPostGenerateContent } from '../../../common/contact-preferences/contact-post/content';

export { form } from '../../../common/contact-preferences/contact-email/content';

export const generateContent: TranslationFn = content => {
  return {
    ...respondentContactPostGenerateContent(content),
  };
};
