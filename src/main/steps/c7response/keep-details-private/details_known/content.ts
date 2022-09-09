import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as detailsKnownGenerateContent } from '../../../common/keep-details-private/details_known/content';

export { form } from '../../../common/keep-details-private/details_known/content';
export const generateContent: TranslationFn = content => {
  const detailsKnownContent = detailsKnownGenerateContent(content);
  return {
    ...detailsKnownContent,
  };
};
