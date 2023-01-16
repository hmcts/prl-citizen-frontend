import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressHistoryGenerateContent } from '../../../common/confirm-contact-details/addresshistory/content';
//import { typeofcaseuser } from '../../../../steps/typeofcaseuserutil';
export { form } from '../../../common/confirm-contact-details/addresshistory/content';

export const generateContent: TranslationFn = content => {
  const addressHistoryContent = addressHistoryGenerateContent(content);
  return {
    ...addressHistoryContent,
    // addressHistoryContent:{...addressHistoryContent,pagetitle:typeofcaseuser(content.language,content.userCase?.caseTypeOfApplication)}
  };
};
