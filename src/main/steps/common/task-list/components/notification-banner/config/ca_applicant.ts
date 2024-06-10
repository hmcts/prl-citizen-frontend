/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { isCaseWithdrawn } from '../../../../../../steps/common/task-list/utils';
import { interpolate } from '../../../../string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationType } from '../definitions';
import { findC7ResponseDocument, showNotification } from '../utils';

export const CA_APPLICANT_CONFIG = (userCase: CaseWithId): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICATION_NOT_STARTED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return !caseData;
    },
  },
  {
    id: NotificationType.APPLICATION_IN_PROGRESS,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      return interpolate(content, {
        noOfDaysRemainingToSubmitCase: caseData?.noOfDaysRemainingToSubmitCase ?? '',
      });
    },
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.CASE_DRAFT;
    },
  },
  {
    id: NotificationType.APPLICATION_SUBMITTED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.CASE_SUBMITTED_PAID || caseData?.state === State.CASE_SUBMITTED_NOT_PAID;
    },
  },
  {
    id: NotificationType.APPLICATION_WITHDRAWN,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return isCaseWithdrawn(caseData);
    },
  },
  {
    id: NotificationType.APPLICATION_SERVED_FOR_APPLICANT,
    show: showNotification,
  },
  ...generateC7ResponseNotifications(userCase),
  {
    id: NotificationType.APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT,
    show: showNotification,
  },
  {
    id: NotificationType.APPLICATION_SERVED_BY_SOLICITOR_BAILIFF_TO_RESPONDENT,
    show: showNotification,
  },
  {
    id: NotificationType.APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE,
    show: showNotification,
  },
  {
    id: NotificationType.SUMBIT_FM5,
    show: showNotification,
  },
  {
    id: NotificationType.APPLICATION_CLOSED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.ALL_FINAL_ORDERS_ISSUED && !isCaseWithdrawn(caseData);
    },
  },
  {
    id: NotificationType.NEW_ORDER,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData);
    },
  },
];

const generateC7ResponseNotifications = (caseData: CaseWithId): NotificationBannerProps[] | [] => {
  if (!caseData?.respondents?.length) {
    return [];
  }

  const notifications: NotificationBannerProps[] = [];

  caseData.respondents?.forEach(respondent => {
    const C7ResponseDocument = findC7ResponseDocument(caseData, respondent);

    notifications.push({
      id: NotificationType.VIEW_RESPONSE_TO_APPLICATION,
      interpolateContent: (content: string, commonContent: NotificationBannerContent['common']) => {
        return interpolate(content, {
          respondent: C7ResponseDocument?.partyName ?? commonContent.theRespondent,
        });
      },
      show: (notificationType: NotificationType): boolean => {
        return showNotification(notificationType, caseData) && !!C7ResponseDocument;
      },
    });
  });

  return notifications;
};
