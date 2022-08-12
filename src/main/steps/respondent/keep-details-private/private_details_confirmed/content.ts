import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as privateDetailsConfirmedGenerateContent } from '../../../common/keep-details-private/private_details_confirmed/content';

export { form } from '../../../common/keep-details-private/private_details_confirmed/content';
export const generateContent: TranslationFn = content => {
  const privateDetailsConfirmedContent = privateDetailsConfirmedGenerateContent(content);
  return {
    ...privateDetailsConfirmedContent,
  };
};
