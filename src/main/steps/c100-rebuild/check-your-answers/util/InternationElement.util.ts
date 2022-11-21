/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * import {
  cy as contentjurdisictionCy,
  en as contentjurdisictionEn,
} from '../../international-elements/jurisdiction/content';
 */
import {
  cy as contentjurdisictionCy,
  en as contentjurdisictionEn,
} from '../../international-elements/jurisdiction/content';
import { cy as contentParentCy, en as contentParentEn } from '../../international-elements/parents/content';
import { cy as contentRequestCy, en as contentRequestEn } from '../../international-elements/request/content';
import { cy as contentStartCy, en as contentStartEn } from '../../international-elements/start/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const InternationElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        liveOutSideUk: contentStartEn().title,
        basedOutSideEnglandOrWales: contentParentEn().title,
        anotherPersonSameOrder: contentjurdisictionEn().title,
        otherCountryRequestInfo: contentRequestEn().title,
      };
    },
    cy: () => {
      return {
        liveOutSideUk: contentStartCy().title,
        basedOutSideEnglandOrWales: contentParentCy().title,
        anotherPersonSameOrder: contentjurdisictionCy().title,
        otherCountryRequestInfo: contentRequestCy().title,
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
