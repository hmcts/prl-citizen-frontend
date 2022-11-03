/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  cy as concernForChildSafetyCy,
  en as concernForChildSafetyEn,
} from '../../safety-concerns/child/concerns-about/content';
import { cy as reportAbuseCy, en as reportAbuseEn } from '../../safety-concerns/child/report-abuse/content';
import { cy as concernAboutCy, en as concernAboutEn } from '../../safety-concerns/concern-about/content';
import { cy as concernForSafetyCy, en as concernForSafetyEn } from '../../safety-concerns/concerns-for-safety/content';
//safety-concerns/concern-about

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const SafetyConcernContentElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...concernForChildSafetyEn(),
        ...reportAbuseEn(),
        doYouHaveSafetyConcerns: concernForSafetyEn().headingTitle,
        whoAreConcernsAbout: concernAboutEn().headingTitle,
        select_all_relevant: concernAboutEn().select_all_relevant,
        children: concernAboutEn().childrenInThisApplication,
        applicant: concernAboutEn().yourself,
        childConcerns: concernForChildSafetyEn().headingTitle,
        applicantConcerns: concernForChildSafetyCy().headingTitle,
        abduction: concernForChildSafetyEn().abductionAbuse,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...concernForChildSafetyEn(),
        ...reportAbuseCy(),
        doYouHaveSafetyConcerns: concernForSafetyCy().headingTitle,
        whoAreConcernsAbout: concernAboutCy().headingTitle,
        select_all_relevant: concernAboutCy().select_all_relevant,
        children: concernAboutCy().childrenInThisApplication,
        applicant: concernAboutCy().yourself,
        childConcerns: concernForChildSafetyCy().headingTitle,
        applicantConcerns: concernForChildSafetyCy().headingTitle,
        abduction: concernForChildSafetyCy().abductionAbuse,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
