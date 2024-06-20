import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactPostGenerateContent } from '../../../common/contact-preferences/contact-post/content';

export { form } from '../../../common/contact-preferences/contact-email/content';
export const generateContent: TranslationFn = content => {
  const contactPost = contactPostGenerateContent(content);
  return {
    ...contactPost,
  };
};

console.info('** FOR SONAR **');
