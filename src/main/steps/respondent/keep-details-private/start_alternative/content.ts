import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as startAlternativeGenerateContent } from '../../../common/keep-details-private/start_alternative/content';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
export { form } from '../../../common/keep-details-private/start_alternative/content';
export const generateContent: TranslationFn = content => {
  const startAlternativeContent = startAlternativeGenerateContent(content);
  return {
    ...startAlternativeContent,
    pagetitle: typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false),
  };
};
