/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
export const internationElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        liveOutSideUk: '',
        basedOutSideEnglandOrWales: contentRequestEn.liveOutSideUk,
        anotherPersonSameOrder: '',
        otherCountryRequestInfo: '',
      };
    },
    cy: () => {
      return {
        liveOutSideUk: '',
        basedOutSideEnglandOrWales: '',
        anotherPersonSameOrder: contentRequestCy.liveOutSideUk,
        otherCountryRequestInfo: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
