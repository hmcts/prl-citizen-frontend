/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cy as hwfGuidanceCy, en as hwfGuidanceEn } from '../../help-with-fees/hwf-guidance/content';
import { cy as needHelpCy, en as needHelpEn } from '../../help-with-fees/need-help-with-fees/content';

export const HelpWithFeeContent = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        doRequireHelpwithFee: needHelpEn().headingTitle,
        hwfApplication: hwfGuidanceEn().hwfReferenceNumberLabel,
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
