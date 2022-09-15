import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressDetailsGenerateContent } from '../../../common/confirm-contact-details/addressdetails/content';

export { form } from '../../../common/confirm-contact-details/addressdetails/content';

export const generateContent: TranslationFn = content => {
  const addressDetailsContent = addressDetailsGenerateContent(content);
  return {
    ...addressDetailsContent,
  };
};
