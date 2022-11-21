/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * import {
  cy as contentjurdisictionCy,
  en as contentjurdisictionEn,
} from '../../international-elements/jurisdiction/content';
 */
//import { cy as feeAppliedCy, en as feeAppliedEn } from '../../help-with-fees/fees-applied/content';
import { cy as hwfGuidanceCy, en as hwfGuidanceEn } from '../../help-with-fees/hwf-guidance/content';
import { cy as needHelpCy, en as needHelpEn } from '../../help-with-fees/need-help-with-fees/content';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const HelpWithFeeContent = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        doRequireHelpwithFee: needHelpEn().headingTitle, //headingTitle
        hwfApplication: hwfGuidanceEn().hwfReferenceNumberLabel, //hwfReferenceNumberLabel,
        errors: '',
      };
    },
    cy: () => {
      return {
        doRequireHelpwithFee: needHelpCy().headingTitle,
        hwfApplication: hwfGuidanceCy().hwfReferenceNumberLabel,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
