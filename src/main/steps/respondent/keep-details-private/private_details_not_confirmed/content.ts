import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as privateDetailsNotConfirmedGenerateContent } from '../../../common/keep-details-private/private_details_not_confirmed/content';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
export { form } from '../../../common/keep-details-private/private_details_not_confirmed/content';
export const generateContent: TranslationFn = content => {
  const privateDetailsNotConfirmedContent = privateDetailsNotConfirmedGenerateContent(content);
  return {
    ...privateDetailsNotConfirmedContent,
    pagetitle: typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false),
  };
};
