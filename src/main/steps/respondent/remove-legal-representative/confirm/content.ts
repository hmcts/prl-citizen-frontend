import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as removeLegalRepresentativeContent } from '../../../common/remove-legal-representative/confirm/content';

export { form } from '../../../common/confirm-contact-details/addressdetails/content';

export const generateContent: TranslationFn = content => {
  const removeLegalRepresentativeGenerateContent = removeLegalRepresentativeContent(content);
  return {
    ...removeLegalRepresentativeGenerateContent,
  };
};
