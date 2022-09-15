import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as contactDetailsGenerateContent } from '../../../common/confirm-contact-details/addresslookup/content';

export { form } from '../../../common/confirm-contact-details/addresslookup/content';

export const generateContent: TranslationFn = content => {
  const contactDetailsContent = contactDetailsGenerateContent(content);
  return {
    ...contactDetailsContent,
  };
};
