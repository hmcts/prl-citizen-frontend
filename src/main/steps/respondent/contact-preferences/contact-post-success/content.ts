import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as respondentContactPostSuccessGenerateContent } from '../../../common/contact-preferences/contact-post-success/content';

export { form } from '../../../common/contact-preferences/contact-email-success/content';

export const generateContent: TranslationFn = content => {
  return {
    ...respondentContactPostSuccessGenerateContent(content),
  };
};
