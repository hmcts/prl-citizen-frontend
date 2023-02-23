/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as abductionChildLocationCy, en as abductionChildLocationEn } from '../../abduction/child-location/content';
import { cy as passportAmountCy, en as passportAmountEn } from '../../abduction/passport-amount/content';
import {
  cy as passportOfficeNotifiedCy,
  en as passportOfficeNotifiedEn,
} from '../../abduction/passport-office-notified/content';
import { cy as passportOfficeCy, en as passportOfficeEn } from '../../abduction/passport-office/content';
import { cy as previousAbductionCy, en as previousAbductionEn } from '../../abduction/previousabductions/content';
import { cy as abducionThreatsCy, en as abducionThreatsEn } from '../../abduction/threats/content';
import { cy as concernAboutCy, en as concernAboutEn } from '../../check-answers-yes/content';
import { cy as concernForChildSafetyCy, en as concernForChildSafetyEn } from '../../child/concerns-about/content';
import { cy as reportAbuseCy, en as reportAbuseEn } from '../../child/report-abuse/content';
import { cy as courtActionCy, en as courtActionEn } from '../../orders-required/court-action/content';
import { cy as unsupervisedCy, en as unsupervisedEn } from '../../orders-required/unsupervised/content';
import { cy as otherConcernsCy, en as otherConcernsEn } from '../../other-concerns/drugs/content';
import { cy as otherIssuesCy, en as otherIssuesEn } from '../../other-concerns/other-issues/content';
import { cy as concernForSafetyCy, en as concernForSafetyEn } from '../../your-or-child-safety-concerns/content';

import { SafetyConcernContentElements } from './safetyConcerns.util';

const SafetyConcernTestContentElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...concernForChildSafetyEn(),
        ...reportAbuseEn(),
        ...previousAbductionEn(),
        ...passportAmountEn(),
        doYouHaveSafetyConcerns: concernForSafetyEn().headingTitle,
        whoAreConcernsAbout: concernAboutEn().headingTitle,
        select_all_relevant: concernAboutEn().select_all_relevant,
        children: concernAboutEn().childrenInThisApplication,
        applicant: concernAboutEn().yourself,
        childConcerns: concernForChildSafetyEn().headingTitle,
        applicantConcerns: concernForChildSafetyCy().headingTitle,
        abduction: concernForChildSafetyEn().abductionAbuse,
        childDrugAbuse: otherConcernsEn().title,
        otherWellBeingIssues: otherIssuesEn().title,
        doWantCourtToAction: courtActionEn().title,
        selectSupervisionAgreementLabel: unsupervisedEn().selectSupervisionAgreementLabel,
        supervisionAgreementOtherWaysLabel: unsupervisedEn().supervisionAgreementOtherWaysLabel,
        childLocation: abductionChildLocationEn().title,
        childsCurrentLocationText: abductionChildLocationEn().childsCurrentLocationText,
        passportOffice: passportOfficeEn().title,
        haspassportOfficeNotified: passportOfficeNotifiedEn().title,
        abducionThreats: abducionThreatsEn().title,
        previousAbduction: previousAbductionEn().title,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...concernForChildSafetyEn(),
        ...reportAbuseCy(),
        ...previousAbductionCy(),
        ...passportAmountCy(),
        doYouHaveSafetyConcerns: concernForSafetyCy().headingTitle,
        whoAreConcernsAbout: concernAboutCy().headingTitle,
        select_all_relevant: concernAboutCy().select_all_relevant,
        children: concernAboutCy().childrenInThisApplication,
        applicant: concernAboutCy().yourself,
        childConcerns: concernForChildSafetyCy().headingTitle,
        applicantConcerns: concernForChildSafetyCy().headingTitle,
        abduction: concernForChildSafetyCy().abductionAbuse,
        childDrugAbuse: otherConcernsCy().title,
        otherWellBeingIssues: otherIssuesCy().title,
        doWantCourtToAction: courtActionCy().title,
        selectSupervisionAgreementLabel: unsupervisedCy().selectSupervisionAgreementLabel,
        supervisionAgreementOtherWaysLabel: unsupervisedCy().supervisionAgreementOtherWaysLabel,
        childLocation: abductionChildLocationCy().title,
        childsCurrentLocationText: abductionChildLocationCy().childsCurrentLocationText,
        passportOffice: passportOfficeCy().title,
        haspassportOfficeNotified: passportOfficeNotifiedCy().title,
        abducionThreats: abducionThreatsCy().title,
        previousAbduction: previousAbductionCy().title,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

describe('Testing SaftetyConcerns contents', () => {
  test('english', () => {
    expect(SafetyConcernContentElements('en').toString()).toEqual(SafetyConcernTestContentElements('en').toString());
  });
  test('other', () => {
    expect(SafetyConcernContentElements('cy').toString()).toEqual(SafetyConcernTestContentElements('cy').toString());
  });
});
