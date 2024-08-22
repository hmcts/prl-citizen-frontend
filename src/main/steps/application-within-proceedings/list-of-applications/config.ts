import { AWPApplicationReason, AWPApplicationType } from '../../../app/case/definition';
import { APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE, PageLink } from '../../../steps/urls';

interface ListOfApplicationLink {
  applicationType: AWPApplicationType;
  reason: AWPApplicationReason;
  textMappingKey?: string;
  isLinkEmbeded?: boolean;
  url?: PageLink;
}
export interface ListOfApplication {
  contentMappingKey: string;
  links: ListOfApplicationLink[];
}

export const listOfApplications: ListOfApplication[] = [
  {
    contentMappingKey: 'delayOrCancelHearing',
    links: [
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'requestMoreTime',
    links: [
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.REQUEST_MORE_TIME,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'orderRelatingToChild',
    links: [
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME,
        textMappingKey: 'childArragementslinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.PROHIBITED_STEPS_ORDER,
        textMappingKey: 'prohibitedlinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.SPECIFIC_ISSUE_ORCDER,
        textMappingKey: 'specificIssuelinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'enforceChildArrangementsOrder',
    links: [
      {
        applicationType: AWPApplicationType.C79,
        reason: AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'extendCancelNonMolestationOccupationOrder',
    links: [
      {
        applicationType: AWPApplicationType.FL403,
        reason: AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'otherRequestsToCourt',
    links: [
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED,
        textMappingKey: 'submitEvidenceLinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE,
        textMappingKey: 'shareDocLinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.JOIN_OR_LEAVE_CASE,
        textMappingKey: 'joinLeaveCaseLinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION,
        textMappingKey: 'withdrawLinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT,
        textMappingKey: 'appointExpertLinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
      {
        applicationType: AWPApplicationType.C2,
        reason: AWPApplicationReason.PERMISSION_FOR_APPLICATION,
        textMappingKey: 'permissionForApplLinkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'requestParentalResponsibility',
    links: [
      {
        applicationType: AWPApplicationType.C1,
        reason: AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'requestGuardian',
    links: [
      {
        applicationType: AWPApplicationType.C1,
        reason: AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'deliverPapersToOtherParty',
    links: [
      {
        applicationType: AWPApplicationType.D89,
        reason: AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'orderToKnowAboutChild',
    links: [
      {
        applicationType: AWPApplicationType.C4,
        reason: AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'appealCourtOrder',
    links: [
      {
        applicationType: AWPApplicationType.N161,
        reason: AWPApplicationReason.APPEAL_COURT_ORDER,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'courtToPreventAccusations',
    links: [
      {
        applicationType: AWPApplicationType.EX740,
        reason: AWPApplicationReason.YOU_ACCUSED_SOMEONE,
        isLinkEmbeded: true,
      },
      {
        applicationType: AWPApplicationType.EX741,
        reason: AWPApplicationReason.ACCUSED_BY_SOMEONE,
        isLinkEmbeded: true,
      },
    ],
  },
  {
    contentMappingKey: 'authorisingSearchOrder',
    links: [
      {
        applicationType: AWPApplicationType.C3,
        reason: AWPApplicationReason.ORDER_AUTHORISING_SEARCH,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'requestForOrderWitness',
    links: [
      {
        applicationType: AWPApplicationType.FP25,
        reason: AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'courtToActDuringDisobey',
    links: [
      {
        applicationType: AWPApplicationType.FC600,
        reason: AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
  {
    contentMappingKey: 'requestForArrestWarrent',
    links: [
      {
        applicationType: AWPApplicationType.FL407,
        reason: AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT,
        textMappingKey: 'linkText',
        url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
      },
    ],
  },
];
