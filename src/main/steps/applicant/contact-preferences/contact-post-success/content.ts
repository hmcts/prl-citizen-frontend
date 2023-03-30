import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactPostSuccessGenerateContent } from '../../../common/contact-preferences/contact-post-success/content';

export { form } from '../../../common/contact-preferences/contact-email-success/content';
export const generateContent: TranslationFn = content => {
  const contactPostSuccess = contactPostSuccessGenerateContent(content);
  return {
    ...contactPostSuccess,
  };
};
