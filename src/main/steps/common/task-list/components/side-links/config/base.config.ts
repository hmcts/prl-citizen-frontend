/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import {
  isCaseClosed,
  isCaseLinked,
  isCaseSubmitted,
  isDraftCase,
  isRepresentedBySolicotor,
} from '../../../../../../steps/common/task-list/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import {
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  REMOVE_LEGAL_REPRESENTATIVE_START,
  RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
} from '../../../../../../steps/urls';
import { QuickLinks, QuickLinksBaseConfigProps } from '../definitions';

export const QUICKLINKS_BASE_CONFIG: QuickLinksBaseConfigProps[] = [
  {
    id: QuickLinks.WHAT_TO_EXPECT_COMING_TO_COURT,
    getLinkHref: () => 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
    show: (caseData: CaseWithId, userDetails: UserDetails) => isCaseLinked(caseData, userDetails),
    target: '_blank',
  },
  {
    id: QuickLinks.ADD_LEGAL_REPRESENTATIVE,
    getLinkHref: (caseData: CaseWithId, partyType: PartyType) => {
      return partyType === PartyType.APPLICANT
        ? APPLICANT_ADD_LEGAL_REPRESENTATIVE
        : RESPONDENT_ADD_LEGAL_REPRESENTATIVE;
    },
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      isCaseLinked(caseData, userDetails) &&
      !isCaseClosed(caseData) &&
      !isRepresentedBySolicotor(caseData, userDetails.id),
  },
  {
    id: QuickLinks.REMOVE_LEGAL_REPRESENTATIVE,
    getLinkHref: (caseData: CaseWithId, partyType: PartyType) => {
      return applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType });
    },
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      isCaseLinked(caseData, userDetails) &&
      !isCaseClosed(caseData) &&
      isRepresentedBySolicotor(caseData, userDetails.id),
  },
  {
    id: QuickLinks.MAKE_APPLICATION_ABOUT_YOUR_CASE,
    getLinkHref: () => '#',
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      isCaseLinked(caseData, userDetails) && caseData.caseTypeOfApplication === CaseType.FL401,
    target: '_blank',
  },
  {
    id: QuickLinks.KNOW_ABOUT_DOMESTIC_ABUSE,
    getLinkHref: () => 'https://www.gov.uk/injunction-domestic-violence',
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      isCaseLinked(caseData, userDetails) && caseData.caseTypeOfApplication === CaseType.FL401,
    target: '_blank',
  },
  {
    id: QuickLinks.KNOW_ABOUT_CHILD_ARRANGEMENTS,
    getLinkHref: (caseData: CaseWithId, partyType: PartyType) =>
      partyType === PartyType.APPLICANT
        ? 'https://helpwithchildarrangements.service.justice.gov.uk'
        : 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court-other-parent',
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      !(isCaseLinked(caseData, userDetails) && caseData.caseTypeOfApplication === CaseType.FL401),
    target: '_blank',
  },
  {
    id: QuickLinks.KNOW_ABOUT_ATTENDING_COURT,
    getLinkHref: () => 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
    show: (caseData: CaseWithId, userDetails: UserDetails, partyType: PartyType) =>
      !(
        isCaseLinked(caseData, userDetails) &&
        caseData.caseTypeOfApplication === CaseType.FL401 &&
        partyType === PartyType.APPLICANT
      ),
    target: '_blank',
  },
  {
    id: QuickLinks.UNDERSTAND_MIAM,
    getLinkHref: () => 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam',
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      !caseData || isDraftCase(caseData) || (isCaseSubmitted(caseData) && !isCaseLinked(caseData, userDetails)),
    target: '_blank',
  },
  {
    id: QuickLinks.ELIGIBLE_FOR_LEGAL_AID,
    getLinkHref: () => 'https://www.gov.uk/check-legal-aid',
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      !(isCaseLinked(caseData, userDetails) && caseData.caseTypeOfApplication === CaseType.FL401),
    target: '_blank',
  },
  {
    id: QuickLinks.ELIGIBLE_FOR_HWF,
    getLinkHref: () => 'https://www.gov.uk/get-help-with-court-fees',
    show: (caseData: CaseWithId) => !caseData || isDraftCase(caseData) || isCaseSubmitted(caseData),
    target: '_blank',
  },
  {
    id: QuickLinks.FAMILY_MEDIATION_VOUCHER_SCHEME,
    getLinkHref: () => 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
    show: (caseData: CaseWithId, userDetails: UserDetails) =>
      !(isCaseLinked(caseData, userDetails) && caseData.caseTypeOfApplication === CaseType.FL401),
    target: '_blank',
  },
  {
    id: QuickLinks.FIND_LEGAL_ADVICE,
    getLinkHref: () => 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
    show: () => true,
    target: '_blank',
  },
  {
    id: QuickLinks.HOW_TO_REPRESENT_IN_COURT,
    getLinkHref: () => 'https://www.gov.uk/represent-yourself-in-court',
    show: () => true,
    target: '_blank',
  },
  {
    id: QuickLinks.INFORMARTION_ABOUT_COURT,
    getLinkHref: () => 'https://www.gov.uk/find-court-tribunal',
    show: (caseData: CaseWithId, userDetails: UserDetails) => isCaseLinked(caseData, userDetails),
    target: '_blank',
  },
  {
    id: QuickLinks.SET_ASIDE_OR_CHANGE_APPLICATION,
    getLinkHref: () =>
      'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
    show: (caseData: CaseWithId, userDetails: UserDetails, partyType: PartyType) =>
      isCaseLinked(caseData, userDetails) &&
      caseData.caseTypeOfApplication === CaseType.FL401 &&
      partyType === PartyType.RESPONDENT,
    target: '_blank',
  },
];
