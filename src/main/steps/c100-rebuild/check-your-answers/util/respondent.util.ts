/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as contentAddressCy, en as contentAddressEn } from '../..//address/manual/content';
import { C100UrlPartyType } from '../../address/definitions';
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
        ...contentAddressEn()[C100UrlPartyType.RESPONDENT],
        ...personalDetailsEn(),
        respondentAddressLabel: contentAddressEn()[C100UrlPartyType.RESPONDENT].addressHistoryLabel,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentAddressCy()[C100UrlPartyType.RESPONDENT],
        ...personalDetailsCy(),
        respondentAddressLabel: contentAddressCy()[C100UrlPartyType.RESPONDENT].addressHistoryLabel,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
