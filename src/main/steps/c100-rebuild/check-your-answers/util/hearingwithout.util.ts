/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  cy as contentHearingWithoutCy,
  en as contentHearingWithoutEn,
} from '../../hearing-without-notice/hearing-part2/content';

export const hearingDetailsContents = SystemLanguage => {
  const opContents = {
    en: () => {
      return { ...contentHearingWithoutEn(), hearingWithoutLine1Field: contentHearingWithoutEn().subTitle, errors: '' };
    },
    cy: () => {
      return { ...contentHearingWithoutCy(), hearingWithoutLine1Field: contentHearingWithoutCy().subTitle, errors: '' };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
