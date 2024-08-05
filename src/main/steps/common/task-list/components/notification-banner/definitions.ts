/* eslint-disable @typescript-eslint/no-shadow */
import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

export enum NotificationType {
  APPLICATION_NOT_STARTED = 'applicationNotStarted',
  APPLICATION_IN_PROGRESS = 'applicationInProgress',
  APPLICATION_SUBMITTED = 'applicationSubmitted',
  APPLICATION_WITHDRAWN = 'applicationWithdrawn',
  WITHDRAWAL_REQ_REJECTED = 'withdrawalRequestRejected',
  APPLICATION_SENT_TO_LOCAL_COURT = 'applicationSentToLocalCourt',
  APPLICATION_SENT_TO_GATE_KEEPING = 'applicationSentToGateKeeping',
  APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE = 'applicationServedByCourtPersonalNonPersonalService',
  APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE_TO_DA_APPLICANT = 'applicationServedByCourtPersonalNonPersonalServiceToDAApplicant',
  APPLICATION_SERVED_BY_COURT_TO_RESPONDENT = 'applicationServedByCourtToRespondent',
  VIEW_RESPONSE_TO_APPLICATION = 'viewResponseToApplication',
  APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT = 'applicantToPersonallyServeRespondent',
  APPLICATION_SERVED_BY_SOLICITOR_BAILIFF_TO_RESPONDENT = 'applicationServedBySolictorBailiffToRespondent',
  APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE = 'applicationIssuedByCourtPersonalService',
  SUMBIT_FM5 = 'submitFM5',
  APPLICATION_CLOSED = 'applicationClosed',
  NEW_ORDER = 'newOrder',
  NEW_DOCUMENT = 'newDocument',
  FINAL_ORDER = 'finalOrder',
  DA_RESPONDENT_BANNER = 'daRespondentBanner',
  CAFFCASS = 'cafcass',
  ORDER_NON_PERSONAL_SERVICE = 'orderNonPersonalService',
  ORDER_PERSONAL_SERVICE = 'orderPersonalService',
}

export type NotificationBannerProps = {
  id: NotificationType;
  content?: (
    notificationType: NotificationType,
    caseType: CaseType,
    language: string,
    partyType: PartyType
  ) => NotificationBannerContent;
  interpolateContent?: (
    content: string,
    commonContent: NotificationBannerContent['common'],
    caseData: CaseWithId,
    userDetails: UserDetails
  ) => string;
  show?: (notificationType: NotificationType, caseData: CaseWithId, userDetails: UserDetails) => boolean;
};

export type NotificationBannerContentConfig = {
  [key in NotificationType]?: {
    heading: string;
    interpolateHeading?: (
      content: string,
      commonContent: NotificationBannerContent['common'],
      caseData: CaseWithId,
      userDetails: UserDetails
    ) => string;
    sections: NotificationSection[];
  };
};

export type NotificationBannerContentBaseConfig = {
  title: string;
  common: Record<string, string>;
} & {
  [key in CaseType]: {
    [key in PartyType]?: NotificationBannerContentConfig;
  };
};

export type NotificationBannerContent = {
  title: string;
  common: Record<string, string>;
  heading: string;
  interpolateHeading?: (
    content: string,
    commonContent: NotificationBannerContent['common'],
    caseData: CaseWithId,
    userDetails: UserDetails
  ) => string;
  sections: NotificationSection[];
};

export type NotificationSection = {
  contents: {
    text: string;
    show?: (caseData: CaseWithId) => boolean;
  }[];
  links?: {
    text: string;
    href?: string;
    interpolateLinkText?: (
      content: string,
      commonContent: NotificationBannerContent['common'],
      caseData: CaseWithId
    ) => string;
    interpolateHref?: (content: string, caseData: CaseWithId) => string;
    show?: (caseData: CaseWithId) => boolean;
    external?: boolean;
  }[];
};

export type NotificationContent = {
  id: NotificationType;
  heading: string;
  sections: {
    contents: {
      text: string;
    }[];
    links:
      | {
          text: string;
          href?: string;
          external?: boolean;
        }[]
      | [];
  }[];
};

export enum NotificationID {
  APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE = 'CAN4_SOA_PERS_NONPERS_APPLICANT',
  APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE_TO_DA_APPLICANT = 'DN1_SOA_PERSONAL_NON_PERSONAL_APPLICANT',
  APPLICATION_SERVED_BY_COURT_TO_RESPONDENT = 'CAN5_SOA_RESPONDENT',
  VIEW_RESPONSE_TO_APPLICATION = 'CAN6_VIEW_RESPONSE_APPLICANT',
  APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT = 'CAN7_SOA_PERSONAL_APPLICANT',
  APPLICATION_SERVED_BY_SOLICITOR_BAILIFF_TO_RESPONDENT = 'CAN8_SOS_PERSONAL_APPLICANT',
  APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE = 'CAN9_SOA_PERSONAL_APPLICANT',
  SUMBIT_FM5 = 'CAN10_FM5',
  DA_RESPONDENT_BANNER = 'DN3_SOA_RESPONDENT',
  ORDER_NON_PERSONAL_SERVICE = 'CRNF2_APPLICANT_RESPONDENT',
  ORDER_PERSONAL_SERVICE = 'CRNF3_PERS_SERV_APPLICANT',
}
