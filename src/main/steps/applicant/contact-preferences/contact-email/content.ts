import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactEmailGenerateContent } from '../../../common/contact-preferences/contact-email/content';

export { form } from '../../../common/contact-preferences/contact-email/content';
export const generateContent: TranslationFn = content => {
  const contactEmail = contactEmailGenerateContent(content);
  return {
    ...contactEmail,
  };
};

console.info('** FOR SONAR **');
