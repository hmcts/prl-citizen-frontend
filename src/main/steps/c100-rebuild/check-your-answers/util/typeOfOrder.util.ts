/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as contentTypeOfOrderCy, en as contentTypeOfOrderEn } from '../../typeoforder/select-courtorder/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const typeOfCourtOrderContents = SystemLanguage => {
  const opContents = {
    en: () => {
      delete contentTypeOfOrderEn['errors'];
      return { ...contentTypeOfOrderEn() };
    },
    cy: () => {
      delete contentTypeOfOrderCy['errors'];
      return { ...contentTypeOfOrderCy() };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
