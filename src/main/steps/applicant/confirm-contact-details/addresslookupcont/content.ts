import { TranslationFn } from '../../../../app/controller/GetController';
import {
  generateContent as addressLookupContGenerateContent
} from '../../../common/confirm-contact-details/addresslookupcont/content'

export const generateContent: TranslationFn = content => {
  const addressLookupContContent = addressLookupContGenerateContent(content);
  return {
    ...addressLookupContContent
  };
};
