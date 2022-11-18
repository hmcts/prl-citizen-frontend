/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * import {
  cy as contentjurdisictionCy,
  en as contentjurdisictionEn,
} from '../../international-elements/jurisdiction/content';
 */
import { cy as addressManualCy, en as addressManualEn } from '../../applicant/address/common/address-manual';
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
import { cy as personalDetailsCy, en as personalDetailsEn } from '../../child-details/personal-details/content';
import { cy as contentChildLivesCy, en as contentChildLivesEn } from '../../childaddress/content';
import { cy as opersonDetailsCy, en as opersonDetailsEn } from '../../other-person-details/other-person-check/content';
import {
  cy as constentAgreementCy,
  en as constentAgreementEn,
} from '../../screening-questions/consent-agreement/content';
import {
  cy as contentLRACy,
  en as contentLRAEn,
} from '../../screening-questions/legal-representation-application/content';
import { cy as contentLRCy, en as contentLREn } from '../../screening-questions/legal-representation/content';
import { cy as contentPermissionCy, en as contentPermissionEn } from '../../screening-questions/permission/content';
import { cy as contentPRCy, en as contentPREn } from '../../screening-questions/permissions-request/content';
import {
  cy as contentPermissionWhyCy,
  en as contentPermissionWhyEn,
} from '../../screening-questions/permissions-why/content';
//consent-agreement

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
        anyotherPersonYouwantList: opersonDetailsEn().title,
        anyOtherPeopleKnowDetails: contentDetailKnownEn().headingTitle,
        doYouWantToKeep: contentStartEn().headingTitle,
        haveLivedMore: addressManualEn().addressHistoryLabel,
        otherGender: personalDetailsEn().other,
        whereDoChildLive: contentChildLivesEn().headingTitle,
        writtenAgreement: constentAgreementEn().title,
        willYoubeUsingLegalRespresentator: contentLREn().title,
        doyouWantLegalRespresentatorToCompleteApplication: contentLRAEn().title,
        whyCourtGrantSubmittingPermission: contentPREn().title,
        reasonPermissionRequired: contentPermissionEn().title,
        whyPermissionRequiredFromCourt: contentPermissionWhyEn().title,
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentContactCy(),
        ...contentPersonalDetailsCy(),
        ...opersonDetailsEn(),
        anyotherPersonYouwantList: opersonDetailsCy().title,
        anyOtherPeopleKnowDetails: contentDetailKnownCy().headingTitle,
        doYouWantToKeep: contentStartCy().headingTitle,
        haveLivedMore: addressManualCy().addressHistoryLabel,
        otherGender: personalDetailsCy().other,
        whereDoChildLive: contentChildLivesCy().headingTitle,
        writtenAgreement: constentAgreementCy().title,
        willYoubeUsingLegalRespresentator: contentLRCy().title,
        doyouWantLegalRespresentatorToCompleteApplication: contentLRACy().title,
        whyCourtGrantSubmittingPermission: contentPRCy().title,
        reasonPermissionRequired: contentPermissionCy().title,
        whyPermissionRequiredFromCourt: contentPermissionWhyCy().title,
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
