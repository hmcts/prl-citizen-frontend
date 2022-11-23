/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  cy as contentHearingWithout1Cy,
  en as contentHearingWithout1En,
} from '../../hearing-without-notice/hearing-part1/content';
import {
  cy as contentHearingWithoutCy,
  en as contentHearingWithoutEn,
} from '../../hearing-without-notice/hearing-part2/content';

export const hearingDetailsContents = SystemLanguage => {
  const opContents = {
    en: () => {
      return { ...contentHearingWithoutEn(), hearingWithoutLine1Field: contentHearingWithout1En().title, errors: '' };
    },
    cy: () => {
      return { ...contentHearingWithoutCy(), hearingWithoutLine1Field: contentHearingWithout1Cy().title, errors: '' };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
