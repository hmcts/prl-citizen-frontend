import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressConfirmationGenerateContent } from '../../../common/confirm-contact-details/addressconfirmation/content';

export const generateContent: TranslationFn = content => {
  const addressConfirmationContent = addressConfirmationGenerateContent(content);

  return {
    ...addressConfirmationContent,
  };
};
