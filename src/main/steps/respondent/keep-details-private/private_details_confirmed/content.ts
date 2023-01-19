import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as privateDetailsConfirmedGenerateContent } from '../../../common/keep-details-private/private_details_confirmed/content';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
export { form } from '../../../common/keep-details-private/private_details_confirmed/content';
export const generateContent: TranslationFn = content => {
  const privateDetailsConfirmedContent = privateDetailsConfirmedGenerateContent(content);
  return {
    ...privateDetailsConfirmedContent,
    pagetitle: typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false),
  };
};
