import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressDetailsGenerateContent } from '../../../common/confirm-contact-details/addressdetails/content';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
export { form } from '../../../common/confirm-contact-details/addressdetails/content';

export const generateContent: TranslationFn = content => {
  const addressDetailsContent = addressDetailsGenerateContent(content);
  return {
    ...addressDetailsContent,
    pagetitle: typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false),
  };
};
