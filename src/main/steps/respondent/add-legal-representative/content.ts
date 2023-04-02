import { TranslationFn } from '../../../app/controller/GetController';
import { generateContent as addLegalRepresentativeContent } from '../../common/add-legal-representative/content';

export { form } from '../../common/confirm-contact-details/addressdetails/content';

export const generateContent: TranslationFn = content => {
  const addLegalRepresentativeGenerateContent = addLegalRepresentativeContent(content);
  return {
    ...addLegalRepresentativeGenerateContent,
  };
};
