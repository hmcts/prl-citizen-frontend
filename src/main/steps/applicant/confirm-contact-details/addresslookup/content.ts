import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressLookupGenerateContent } from '../../../common/confirm-contact-details/addresslookup/content';

export const generateContent: TranslationFn = content => {
  const addressLookupContent = addressLookupGenerateContent(content);
  return {
    ...addressLookupContent,
  };
};
