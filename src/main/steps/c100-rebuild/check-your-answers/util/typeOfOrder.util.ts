/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as contentHearing2Cy, en as contentHearing2En } from '../../typeoforder/select-courtorder/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const typeOfCourtOrderContents = SystemLanguage => {
  const opContents = {
    en: () => {
      delete contentHearing2En['errors'];
      return { ...contentHearing2En() };
    },
    cy: () => {
      delete contentHearing2Cy['errors'];
      return { ...contentHearing2Cy() };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
