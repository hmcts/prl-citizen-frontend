import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as respondentContactEmailGenerateContent } from '../../../common/contact-preferences/contact-email/content';

export { form } from '../../../common/contact-preferences/contact-email/content';

export const generateContent: TranslationFn = content => {
  return {
    ...respondentContactEmailGenerateContent(content),
  };
};
