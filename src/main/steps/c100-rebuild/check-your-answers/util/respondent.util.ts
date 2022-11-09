/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as contentAddressCy, en as contentAddressEn } from '../../respondent-details/address/common/address-manual';
import { cy as personalDetailsCy, en as personalDetailsEn } from '../../respondent-details/personal-details/content';
/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const RespondentsElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...contentAddressEn(),
        ...personalDetailsEn(),
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentAddressCy(),
        ...personalDetailsCy(),
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
