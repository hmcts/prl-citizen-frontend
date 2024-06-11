/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { isCaseWithdrawn } from '../../../../../../steps/common/task-list/utils';
import { interpolate } from '../../../../string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationID, NotificationType } from '../definitions';
import { findC7ResponseDocument, findNotification, showNotification, showPreDashBoardNotification } from '../utils';

export const CA_APPLICANT_CONFIG = (userCase: CaseWithId): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICATION_NOT_STARTED,
    show: showPreDashBoardNotification,
  },
  {
    id: NotificationType.APPLICATION_IN_PROGRESS,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      return interpolate(content, {
        noOfDaysRemainingToSubmitCase: caseData?.noOfDaysRemainingToSubmitCase ?? '',
      });
    },
    show: showPreDashBoardNotification,
  },
  {
    id: NotificationType.APPLICATION_SUBMITTED,
    show: showPreDashBoardNotification,
  },
  {
    id: NotificationType.APPLICATION_WITHDRAWN,
    show: showPreDashBoardNotification,
  },
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE,
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
    id: NotificationType.ORDER_PERSONAL_SERVICE,
    show: showNotification,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);

      return interpolate(content, {
        final: notification?.final ? ` ${commonContent.final}` : '',
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        tell: notification?.multiple ? commonContent.tell : commonContent.tells,
      });
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
