import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as respondentContactEmailSuccessGenerateContent } from '../../../common/contact-preferences/contact-email-success/content';

export { form } from '../../../common/contact-preferences/contact-email-success/content';

export const generateContent: TranslationFn = content => {
  return {
    ...respondentContactEmailSuccessGenerateContent(content),
  };
};
