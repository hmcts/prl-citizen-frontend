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
  APPLICATION_SERVED_FOR_APPLICANT = 'applicationServedForApplicant',
  APPLICATION_SERVED_FOR_RESPONDENT = 'applicationServedForRespondent',
  APPLICATION_CLOSED = 'applicationClosed',
  NEW_ORDER = 'newOrder',
  NEW_DOCUMENT = 'newDocument',
  FINAL_ORDER = 'finalOrder',
  DA_RESPONDENT_BANNER = 'daRespondentBanner',
  CAFFCASS = 'cafcass',
  RESPONSE_SUBMITTED = 'responseSubmitted',
  GIVE_RESPONDENT_THEIR_DOCUMENTS = 'giveRespondentTheirDocuments',
  CA_PERSONAL_SERVICE = 'caPersonalService',
  SUMBIT_FM5 = 'submitFM5',
}

export type NotificationBannerProps = {
  id: NotificationType;
  content?: (caseType: CaseType, language: string, partyType: PartyType) => NotificationBannerContent;
  show?: (notificationType: NotificationType, caseData: CaseWithId, userDetails: UserDetails) => boolean;
};

export type NotificationBannerContent = {
  title: string;
} & {
  [key in CaseType]: {
    [key in PartyType]?: {
      [key in NotificationType]?: {
        heading: string;
        sections: NotificationSection[];
      };
    };
  };
};

export type NotificationSection = {
  contents: {
    text: string;
    show?: (caseData: CaseWithId) => boolean;
  }[];
  links?: {
    text: string;
    href?: string;
    show?: (caseData: CaseWithId) => boolean;
    external?: boolean;
  }[];
};

export enum NotificationID {
  APPLICATION_SERVED_FOR_APPLICANT = 'CAN4_SOA_PERS_NONPERS_APPLICANT',
  APPLICATION_SERVED_FOR_RESPONDENT = 'CAN5_SOA_RESPONDENT',
  SUMBIT_FM5 = 'CAN10_FM5',
}
