/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../../app/case/case';
import { applyParms } from '../../../../../steps/common/url-parser';
import { interpolate } from '../../../string-parser';

import { CaseType, PartyType, State } from './../../../../../app/case/definition';
import { C100_WITHDRAW_CASE } from './../../../../urls';
import { languages as content } from './content';

enum BannerNotification {
  APPLICATION_NOT_STARTED = 'applicationNotStarted',
  APPLICATION_IN_PROGRESS = 'applicationInProgress',
  APPLICATION_SUBMITTED = 'applicationSubmitted',
  APPLICATION_WITHDRAWN = 'applicationWithdrawn',
  WITHDRAWAL_REQ_IN_PROGRESS = 'withdrawalRequestInProgress',
  WITHDRAWAL_REQ_REJECTED = 'withdrawalRequestRejected',
}

const getContent = (notfication: BannerNotification, caseType: CaseType, language: string) => {
  const translation = content[language];

  return {
    title: translation.title,
    ...translation?.[caseType]?.['notifications']?.[notfication],
  };
};

const notificationBanner = {
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
  [BannerNotification.WITHDRAWAL_REQ_IN_PROGRESS]: {
    id: BannerNotification.WITHDRAWAL_REQ_IN_PROGRESS,
    content: getContent.bind(null, BannerNotification.WITHDRAWAL_REQ_IN_PROGRESS),
    show: () => false,
  },
  [BannerNotification.WITHDRAWAL_REQ_REJECTED]: {
    id: BannerNotification.WITHDRAWAL_REQ_REJECTED,
    content: getContent.bind(null, BannerNotification.WITHDRAWAL_REQ_REJECTED),
    show: () => false,
  },
};

const notificationBannerConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: [
      {
        ...notificationBanner.applicationNotStarted,
        show: (caseData: Partial<CaseWithId>): boolean => {
          return !caseData;
        },
      },
      {
        ...notificationBanner.applicationInProgress,
        show: (caseData: Partial<CaseWithId>): boolean => {
          return caseData?.state === State.AwaitingSubmissionToHmcts;
        },
      },
      {
        ...notificationBanner.applicationSubmitted,
        show: (caseData: Partial<CaseWithId>): boolean => {
          return caseData?.state === State.SUBMITTED_PAID || caseData?.state === State.SUBMITTED_NOT_PAID;
        },
      },
      {
        ...notificationBanner.applicationWithdrawn,
        show: (caseData: Partial<CaseWithId>): boolean => {
          return caseData?.state === State.Withdrawn;
        },
      },
    ],
    [PartyType.RESPONDENT]: [],
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: [],
    [PartyType.RESPONDENT]: [],
  },
};

export const getNotificationBannerConfig = (
  caseData: Partial<CaseWithId>,
  partyType: PartyType,
  language: string
): Record<string, any>[] => {
  let caseType = caseData?.caseTypeOfApplication;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return notificationBannerConfig[caseType!][partyType]
    .map(config => {
      const { id, show } = config;

      if (show(caseData)) {
        const _content = config.content(caseType, language);
        return {
          id,
          ..._content,
          links: _content?.links?.map(link => ({
            text: link.text,
            href: interpolate(link.href, {
              c100RebuildReturnUrl: caseData?.c100RebuildReturnUrl ?? '#caseData.c100RebuildReturnUrl',
              withdrawCase: applyParms(C100_WITHDRAW_CASE, { caseId: caseData.id! }),
            }),
          })),
          contents: _content?.contents?.map(blueboxContent => ({
            text: interpolate(blueboxContent.text, {
              noOfDaysRemainingToSubmitCase:
                caseData?.noOfDaysRemainingToSubmitCase ?? 'caseData.noOfDaysRemainingToSubmitCase',
            }),
          })),
        };
      }

      return null;
    })
    .filter(config => {
      return config !== null;
    });
};
