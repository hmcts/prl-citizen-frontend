/* eslint-disable @typescript-eslint/no-shadow */

import { CaseWithId } from '../../../../../app/case/case';
import { PartyType } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

export type QuickLinksBaseConfigProps = {
  id: string;
  getLinkHref: (caseData: CaseWithId, partyType: PartyType) => string;
  show: (caseData: CaseWithId, userDetails: UserDetails, partyType: PartyType) => boolean;
  target?: '_blank' | '_self';
};

export type QuickLinkContentProps = {
  [key in QuickLinks]: {
    linkText: string;
  };
};

export type QuickLinksProps = {
  id: string;
  linkHref: string;
  linkText: string;
  target: '_blank' | '_self';
};

export enum QuickLinks {
  WHAT_TO_EXPECT_COMING_TO_COURT = 'whatToExpectComingToCourt',
  ADD_LEGAL_REPRESENTATIVE = 'addLegalRep',
  REMOVE_LEGAL_REPRESENTATIVE = 'removeLegalRep',
  MAKE_APPLICATION_ABOUT_YOUR_CASE = 'makeApplicationAboutYourCase',
  KNOW_ABOUT_DOMESTIC_ABUSE = 'knowAboutDomesticAbuse',
  KNOW_ABOUT_CHILD_ARRANGEMENTS = 'knowAboutChildArrangements',
  KNOW_ABOUT_ATTENDING_COURT = 'knowAboutAttendingCourt',
  UNDERSTAND_MIAM = 'understandMIAM',
  ELIGIBLE_FOR_LEGAL_AID = 'eligibleForLegalAid',
  ELIGIBLE_FOR_HWF = 'eligibleForHWF',
  FAMILY_MEDIATION_VOUCHER_SCHEME = 'familyMediationVoucherScheme',
  FIND_LEGAL_ADVICE = 'findLegalAdvice',
  HOW_TO_REPRESENT_IN_COURT = 'howToRepresentInCourt',
  INFORMARTION_ABOUT_COURT = 'informationAboutCourt',
  SET_ASIDE_OR_CHANGE_APPLICATION = 'setAsideOrChangeApplication',
}
