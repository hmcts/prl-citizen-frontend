import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactEmailSuccessGenerateContent } from '../../../common/contact-preferences/contact-email-success/content';

export { form } from '../../../common/contact-preferences/contact-email-success/content';
export const generateContent: TranslationFn = content => {
  const contactEmailSuccess = contactEmailSuccessGenerateContent(content);
  return {
    ...contactEmailSuccess,
  };
};

console.info('** FOR SONAR **');
