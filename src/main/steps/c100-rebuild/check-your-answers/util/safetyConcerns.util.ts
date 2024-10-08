/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  cy as abductionChildLocationCy,
  en as abductionChildLocationEn,
} from '../../../common/safety-concerns/abduction/child-location/content';
import {
  cy as passportAmountCy,
  en as passportAmountEn,
} from '../../../common/safety-concerns/abduction/passport-amount/content';
import {
  cy as havePassportCy,
  en as havePassportEn,
} from '../../../common/safety-concerns/abduction/passport-office/content';
import {
  cy as passportOfficeNotifiedCy,
  en as passportOfficeNotifiedEn,
  cy as previousAbductionCy,
  en as previousAbductionEn,
} from '../../../common/safety-concerns/abduction/passport-office-notified/content';
import {
  cy as passportOfficeCy,
  en as passportOfficeEn,
} from '../../../common/safety-concerns/abduction/previousabductions/content';
import {
  cy as abducionThreatsCy,
  en as abducionThreatsEn,
} from '../../../common/safety-concerns/abduction/threats/content';
import {
  cy as concernForChildSafetyCy,
  en as concernForChildSafetyEn,
} from '../../../common/safety-concerns/child/concerns-about/content';
import { cy as reportAbuseCy, en as reportAbuseEn } from '../../../common/safety-concerns/child/report-abuse/content';
import { cy as concernAboutCy, en as concernAboutEn } from '../../../common/safety-concerns/concern-about/content';
import {
  cy as concernForSafetyCy,
  en as concernForSafetyEn,
} from '../../../common/safety-concerns/concerns-for-safety/content';
import {
  cy as courtActionCy,
  en as courtActionEn,
} from '../../../common/safety-concerns/orders-required/court-action/content';
import {
  cy as unsupervisedCy,
  en as unsupervisedEn,
} from '../../../common/safety-concerns/orders-required/unsupervised/content';
import {
  cy as otherConcernsCy,
  en as otherConcernsEn,
} from '../../../common/safety-concerns/other-concerns/drugs/content';
import {
  cy as otherIssuesCy,
  en as otherIssuesEn,
} from '../../../common/safety-concerns/other-concerns/other-issues/content';

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
        detailsofAbduction: passportOfficeEn().title,
        doAnyOfTheChildHavePassport: havePassportEn().title,
        haspassportOfficeNotified: passportOfficeNotifiedEn().title,
        abducionThreats: abducionThreatsEn().title,
        previousAbduction: previousAbductionEn().title,
        c1A_policeOrInvestigatorInvolved: passportOfficeEn().c1A_policeOrInvestigatorInvolved,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...concernForChildSafetyCy(),
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
        detailsofAbduction: passportOfficeCy().title,
        haspassportOfficeNotified: passportOfficeNotifiedCy().title,
        abducionThreats: abducionThreatsCy().title,
        previousAbduction: previousAbductionCy().title,
        c1A_policeOrInvestigatorInvolved: passportOfficeCy().c1A_policeOrInvestigatorInvolved,
        doAnyOfTheChildHavePassport: havePassportCy().title,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
