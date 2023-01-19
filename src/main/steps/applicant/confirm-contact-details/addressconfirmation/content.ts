import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressConfirmationGenerateContent } from '../../../common/confirm-contact-details/addressconfirmation/content';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
export { form } from '../../../common/confirm-contact-details/addressconfirmation/content';

export const generateContent: TranslationFn = content => {
  const addressConfirmationContent = addressConfirmationGenerateContent(content);

  return {
    ...addressConfirmationContent,
    pagetitle: typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, true),
  };
};
