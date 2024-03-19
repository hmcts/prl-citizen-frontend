/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from './../../../../../app/case/case';
import { CaseType, PartyType, Respondent } from './../../../../../app/case/definition';
import { DocumentCategory } from './../../../../../steps/common/documents/definitions';
import { languages as content } from './content';

export enum BannerNotification {
  APPLICATION_NOT_STARTED = 'applicationNotStarted',
  APPLICATION_IN_PROGRESS = 'applicationInProgress',
  APPLICATION_SUBMITTED = 'applicationSubmitted',
  APPLICATION_WITHDRAWN = 'applicationWithdrawn',
  WITHDRAWAL_REQ_REJECTED = 'withdrawalRequestRejected',
  APPLICATION_SENT_TO_LOCAL_COURT = 'applicationSentToLocalCourt',
  APPLICATION_SENT_TO_GATE_KEEPING = 'applicationSentToGateKeeping',
  APPLICATION_SERVED_LINKED = 'applicationServedAndLinked',
  APPLICATION_CLOSED = 'applicationClosed',
  NEW_ORDER = 'newOrder',
  NEW_DOCUMENT = 'newDocument',
  FINAL_ORDER = 'finalOrder',
  DA_RESPONDENT_BANNER = 'daRespondentBanner',
  CA_RESPONDENT_SERVED = 'caRespondentServed',
  CAFFCASS = 'cafcass',
  RESPONSE_SUBMITTED = 'responseSubmitted',
}

const getContent = (notfication: BannerNotification, caseType: CaseType, language: string, partyType: PartyType) => {
  const translation = content[language];

  return {
    title: translation.title,
    ...translation?.[caseType]?.[partyType]?.['notifications']?.[notfication],
  };
};

export const notificationBanner = {
  [BannerNotification.APPLICATION_NOT_STARTED]: {
    id: BannerNotification.APPLICATION_NOT_STARTED,
    content: getContent.bind(null, BannerNotification.APPLICATION_NOT_STARTED),
    show: () => false,
  },
  [BannerNotification.APPLICATION_IN_PROGRESS]: {
    id: BannerNotification.APPLICATION_IN_PROGRESS,
    content: getContent.bind(null, BannerNotification.APPLICATION_IN_PROGRESS),
    show: () => false,
  },
  [BannerNotification.APPLICATION_SUBMITTED]: {
    id: BannerNotification.APPLICATION_SUBMITTED,
    content: getContent.bind(null, BannerNotification.APPLICATION_SUBMITTED),
    show: () => false,
  },
  [BannerNotification.APPLICATION_WITHDRAWN]: {
    id: BannerNotification.APPLICATION_WITHDRAWN,
    content: getContent.bind(null, BannerNotification.APPLICATION_WITHDRAWN),
    show: () => false,
  },
  [BannerNotification.WITHDRAWAL_REQ_REJECTED]: {
    id: BannerNotification.WITHDRAWAL_REQ_REJECTED,
    content: getContent.bind(null, BannerNotification.WITHDRAWAL_REQ_REJECTED),
    show: () => false,
  },
  [BannerNotification.APPLICATION_SENT_TO_LOCAL_COURT]: {
    id: BannerNotification.APPLICATION_SENT_TO_LOCAL_COURT,
    content: getContent.bind(null, BannerNotification.APPLICATION_SENT_TO_LOCAL_COURT),
    show: () => false,
  },
  [BannerNotification.APPLICATION_SENT_TO_GATE_KEEPING]: {
    id: BannerNotification.APPLICATION_SENT_TO_GATE_KEEPING,
    content: getContent.bind(null, BannerNotification.APPLICATION_SENT_TO_GATE_KEEPING),
    show: () => false,
  },
  [BannerNotification.APPLICATION_SERVED_LINKED]: {
    id: BannerNotification.APPLICATION_SERVED_LINKED,
    content: getContent.bind(null, BannerNotification.APPLICATION_SERVED_LINKED),
    show: () => false,
  },
  [BannerNotification.APPLICATION_CLOSED]: {
    id: BannerNotification.APPLICATION_CLOSED,
    content: getContent.bind(null, BannerNotification.APPLICATION_CLOSED),
    show: () => false,
  },
  [BannerNotification.NEW_ORDER]: {
    id: BannerNotification.NEW_ORDER,
    content: getContent.bind(null, BannerNotification.NEW_ORDER),
    show: () => false,
  },
  [BannerNotification.NEW_DOCUMENT]: {
    id: BannerNotification.NEW_DOCUMENT,
    content: getContent.bind(null, BannerNotification.NEW_DOCUMENT),
    show: () => false,
  },
  [BannerNotification.FINAL_ORDER]: {
    id: BannerNotification.FINAL_ORDER,
    content: getContent.bind(null, BannerNotification.FINAL_ORDER),
    show: () => false,
  },
  [BannerNotification.DA_RESPONDENT_BANNER]: {
    id: BannerNotification.DA_RESPONDENT_BANNER,
    content: getContent.bind(null, BannerNotification.DA_RESPONDENT_BANNER),
    show: () => false,
  },
  [BannerNotification.RESPONSE_SUBMITTED]: {
    id: BannerNotification.RESPONSE_SUBMITTED,
    content: getContent.bind(null, BannerNotification.RESPONSE_SUBMITTED),
    show: () => false,
  },
};

export const hasResponseBeenSubmitted = (caseData: Partial<CaseWithId>, respondent: Respondent): boolean => {
  return (
    caseData.citizenDocuments?.filter(
      document =>
        document.partyId === respondent.id &&
        document.categoryId === DocumentCategory.RESPONDENT_APPLICATION &&
        document.reviewedDate !== null
    ).length !== 0
  );
};
