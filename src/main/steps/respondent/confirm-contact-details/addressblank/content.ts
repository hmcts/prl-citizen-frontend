import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressBlankGenerateContent } from '../../../common/confirm-contact-details/addressblank/content';

export { form } from '../../../common/confirm-contact-details/addressblank/content';

export const generateContent: TranslationFn = content => {
  const addressBlank = addressBlankGenerateContent(content);

  return {
    ...addressBlank,
  };
};
