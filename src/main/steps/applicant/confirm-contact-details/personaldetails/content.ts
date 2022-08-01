import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as personalDetailsGenerateContent } from '../../../common/confirm-contact-details/personaldetails/content';

export const generateContent: TranslationFn = content => {
  const personalDetailsContent = personalDetailsGenerateContent(content);
  return {
    ...personalDetailsContent,
  };
};
