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
import { ApplicantElements } from './applicant.util';
/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
const ApplicantTestElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...contentContactEn(),
        ...contentPersonalDetailsEn(),
        anyOtherPeopleKnowDetails: contentDetailKnownEn().headingTitle,
        doYouWantToKeep: contentStartEn().headingTitle,
        haveLivedMore: addressManualEn().addressHistoryLabel,
        otherGender: personalDetailsEn().other,
        whereDoChildLive: contentChildLivesEn().title,
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
        anyOtherPeopleKnowDetails: contentDetailKnownCy().headingTitle,
        doYouWantToKeep: contentStartCy().headingTitle,
        haveLivedMore: addressManualCy().addressHistoryLabel,
        otherGender: personalDetailsCy().other,
        whereDoChildLive: contentChildLivesCy().title,
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

describe('Testing applicant contents', () => {
  test('english', () => {
    expect(ApplicantElements('en').toString()).toEqual(ApplicantTestElements('en').toString());
  });
  test('other', () => {
    expect(ApplicantElements('cy').toString()).toEqual(ApplicantTestElements('cy').toString());
  });
});
