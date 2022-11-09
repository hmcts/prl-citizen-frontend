/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * import {
  cy as contentjurdisictionCy,
  en as contentjurdisictionEn,
} from '../../international-elements/jurisdiction/content';
 */
import {
  cy as contentDetailKnownCy,
  en as contentDetailKnownEn,
} from '../../applicant/confidentiality/details-know/content';
import { cy as contentStartCy, en as contentStartEn } from '../../applicant/confidentiality/start/content';
import { cy as contentContactCy, en as contentContactEn } from '../../applicant/contact-detail/content';
import {
  cy as contentPersonalDetailsCy,
  en as contentPersonalDetailsEn,
} from '../../applicant/personal-details/content';



/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const ApplicantElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...contentContactEn(),
        ...contentPersonalDetailsEn(),
        anyOtherPeopleKnowDetails: contentDetailKnownEn().headingTitle,
        doYouWantToKeep: contentStartEn().headingTitle,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentContactCy(),
        ...contentPersonalDetailsCy(),
        anyOtherPeopleKnowDetails: contentDetailKnownCy().headingTitle,
        doYouWantToKeep: contentStartCy().headingTitle,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
