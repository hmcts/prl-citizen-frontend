/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { isCaseWithdrawn } from '../../../../../../steps/common/task-list/utils';
import { interpolate } from '../../../../string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationID, NotificationType } from '../definitions';
import {
  findC1ADocument,
  findC7ResponseDocument,
  findNotification,
  findResponseToC1ADocument,
  getBannerContentForRespondent,
  showNotification,
  showPreDashBoardNotification,
} from '../utils';

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
  ...generateRespondentRelatedNotifications(userCase, NotificationType.VIEW_RESPONSE_TO_APPLICATION),
  ...generateRespondentRelatedNotifications(userCase, NotificationType.VIEW_RESPONDENT_AOH),
  ...generateRespondentRelatedNotifications(userCase, NotificationType.VIEW_RESPONDENT_RESPONSE_AOH),
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
    id: NotificationType.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF,
    show: showNotification,
  },
  {
    id: NotificationType.APPLICATION_CLOSED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.ALL_FINAL_ORDERS_ISSUED && !isCaseWithdrawn(caseData);
    },
  },
  {
    id: NotificationType.ORDER_NON_PERSONAL_SERVICE,
    show: showNotification,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      const notification = findNotification(caseData, NotificationID.ORDER_NON_PERSONAL_SERVICE);

      return interpolate(content, {
        final: notification?.final ? ` ${commonContent.final}` : '',
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        tell: notification?.multiple ? commonContent.tell : commonContent.tells,
        order1: notification?.multiple ? commonContent.orders1 : commonContent.order1,
      });
    },
  },
  {
    id: NotificationType.ORDER_PERSONAL_SERVICE,
    show: showNotification,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);
      const { respondent, has } = getBannerContentForRespondent(caseData, commonContent);
      return interpolate(content, {
        final: notification?.final ? ` ${commonContent.final}` : '',
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        tell: notification?.multiple ? commonContent.tell : commonContent.tells,
        order1: notification?.multiple ? commonContent.orders1 : commonContent.order1,
        respondent,
        has,
      });
    },
  },
];

const generateRespondentRelatedNotifications = (
  caseData: CaseWithId,
  notificationId: NotificationType
): NotificationBannerProps[] | [] => {
  const responseDocumentMap = {
    [NotificationType.VIEW_RESPONSE_TO_APPLICATION]: findC7ResponseDocument,
    [NotificationType.VIEW_RESPONDENT_AOH]: findC1ADocument,
    [NotificationType.VIEW_RESPONDENT_RESPONSE_AOH]: findResponseToC1ADocument,
  };

  if (!caseData?.respondents?.length || !_.isFunction(responseDocumentMap?.[notificationId])) {
    return [];
  }

  const notifications: NotificationBannerProps[] = [];

  caseData.respondents.forEach(respondent => {
    notifications.push({
      id: notificationId,
      interpolateContent: (content: string, commonContent: NotificationBannerContent['common']) => {
        const document = responseDocumentMap[notificationId](caseData, respondent);

        return interpolate(content, {
          respondent:
            document && document?.partyName
              ? `${commonContent.titleRespondentName} ${document.partyName}`.trim()
              : commonContent.theRespondent,
        });
      },
      show: (notificationType: NotificationType): boolean => {
        return (
          showNotification(notificationType, caseData) && !!responseDocumentMap[notificationId](caseData, respondent)
        );
      },
    });
  });

  return notifications;
};
