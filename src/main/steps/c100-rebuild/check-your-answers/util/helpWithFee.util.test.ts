/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cy as hwfGuidanceCy, en as hwfGuidanceEn } from '../../help-with-fees/hwf-guidance/content';
import { cy as needHelpCy, en as needHelpEn } from '../../help-with-fees/need-help-with-fees/content';

import { HelpWithFeeContent } from './helpWithFee.util';
const HelpWithFeeTestContent = SystemLanguage => {
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

describe('testing contents of help with fee', () => {
  test('english', () => {
    expect(HelpWithFeeContent('en').toString()).toEqual(HelpWithFeeTestContent('en').toString());
  });
  test('other', () => {
    expect(HelpWithFeeContent('cy').toString()).toEqual(HelpWithFeeContent('cy').toString());
  });
});
