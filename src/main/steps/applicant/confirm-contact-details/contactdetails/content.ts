import { TranslationFn } from '../../../../app/controller/GetController';
import {
  generateContent as contactDetailsGenerateContent
} from '../../../common/confirm-contact-details/contactdetails/content'

export const generateContent: TranslationFn = content => {
  const contactDetailsContent = contactDetailsGenerateContent(content);
  return {
    ...contactDetailsContent
  };
};
