import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressHistoryGenerateContent } from '../../../common/confirm-contact-details/addresshistory/content';

export const generateContent: TranslationFn = content => {
  const addressHistoryContent = addressHistoryGenerateContent(content);
  return {
    ...addressHistoryContent,
  };
};
