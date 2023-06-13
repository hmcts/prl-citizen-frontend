import { AWPApplicationReason, AWPApplicationType, CaseType, PartyType } from '../../app/case/definition';
import { AppSession } from '../../app/controller/AppRequest';

import { languages as applicationReasonTranslation } from './content';

interface AWPApplicationTypesConfig {
  applicationType: AWPApplicationType;
  applicationReasons: ApplicationReason[];
  applicationFee: Partial<Record<CaseType, string>>;
}

interface ApplicationReason {
  reason: AWPApplicationReason;
  applicableCaseTypes: CaseType[];
  applicablePartyType: Partial<Record<CaseType, PartyType[]>>;
}

interface ApplicationDetails {
  applicationType: AWPApplicationType;
  applicationReason: AWPApplicationReason;
  applicationFee: string;
  reasonText: string;
}

const applicationTypesConfiguration: AWPApplicationTypesConfig[] = [
  {
    applicationType: AWPApplicationType.C2,
    applicationReasons: [
      {
        reason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.REQUEST_MORE_TIME,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.PROHIBITED_STEPS_ORDER,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.SPECIFIC_ISSUE_ORCDER,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.JOIN_OR_LEAVE_CASE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.PERMISSION_FOR_APPLICATION,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£167',
      FL401: '£167',
    },
  },
  {
    applicationType: AWPApplicationType.C1,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£232',
    },
  },
  {
    applicationType: AWPApplicationType.C3,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ORDER_AUTHORISING_SEARCH,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£245',
    },
  },
  {
    applicationType: AWPApplicationType.C4,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£232',
    },
  },
  {
    applicationType: AWPApplicationType.C79,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFee: {
      C100: '£232',
    },
  },
  {
    applicationType: AWPApplicationType.D89,
    applicationReasons: [
      {
        reason: AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFee: {
      C100: '£45',
      FL401: '£0',
    },
  },
  {
    applicationType: AWPApplicationType.EX740,
    applicationReasons: [
      {
        reason: AWPApplicationReason.YOU_ACCUSED_SOMEONE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£0',
      FL401: '£0',
    },
  },
  {
    applicationType: AWPApplicationType.EX741,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ACCUSED_BY_SOMEONE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£0',
      FL401: '£0',
    },
  },
  {
    applicationType: AWPApplicationType.FP25,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£53',
      FL401: '£53',
    },
  },
  {
    applicationType: AWPApplicationType.FC600,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT],
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFee: {
      C100: '£167',
      FL401: '£167',
    },
  },
  {
    applicationType: AWPApplicationType.N161,
    applicationReasons: [
      {
        reason: AWPApplicationReason.APPEAL_COURT_ORDER,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFee: {
      C100: '£215',
      FL401: '£125',
    },
  },
  {
    applicationType: AWPApplicationType.FL403,
    applicationReasons: [
      {
        reason: AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER,
        applicableCaseTypes: [CaseType.FL401],
        applicablePartyType: {
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFee: {
      C100: '£0',
      FL401: '£0',
    },
  },
  {
    applicationType: AWPApplicationType.FL407,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT,
        applicableCaseTypes: [CaseType.FL401],
        applicablePartyType: {
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFee: {
      C100: '£0',
      FL401: '£0',
    },
  },
];

export const getApplicationDetails = (
  applicationType: AWPApplicationType,
  applicationReason: AWPApplicationReason,
  caseType: CaseType,
  partyType: PartyType,
  language: string,
  appSettings: AppSession['applicationSettings'] | undefined
): ApplicationDetails | undefined => {
  const awpDetails = appSettings?.awpSelectedApplicationDetails;

  if (
    awpDetails?.language === language &&
    awpDetails?.applicationType === applicationType &&
    awpDetails?.applicationReason === applicationReason
  ) {
    return appSettings!.awpSelectedApplicationDetails;
  }

  let appDetails;
  const application = applicationTypesConfiguration.find(config => config.applicationType === applicationType);

  if (application) {
    const reason = application.applicationReasons.find(reasons => reasons.reason === applicationReason);

    if (
      reason?.applicableCaseTypes?.includes(caseType) &&
      reason.applicablePartyType?.[caseType]?.includes(partyType)
    ) {
      appDetails = {
        applicationType: application.applicationType,
        applicationReason: reason.reason,
        reasonText: applicationReasonTranslation[language][reason.reason]['reasonText'],
        applicationFee: application.applicationFee[caseType],
      };
    }
  }

  return appDetails;
};
