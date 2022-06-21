import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as addressHistoryGenerateContent } from '../../../common/components/common/address-history';

export const generateContent: TranslationFn = content => {
  const addressHistoryContent = addressHistoryGenerateContent(content);

  return {
    ...addressHistoryContent,
  };
};
