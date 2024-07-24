/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseType, PartyType } from '../../../../../../app/case/definition';
import { languages as content } from '../content/base.content';
import { NotificationBannerContent, NotificationType } from '../definitions';

const getNotificationContent = (
  notficationType: NotificationType,
  caseType: CaseType,
  language: string,
  partyType: PartyType
): NotificationBannerContent => {
  const translation = content[language];

  return {
    title: translation.title,
    common: translation.common,
    ...translation?.[caseType]?.[partyType]?.[notficationType],
  };
};

export const NOTIFICATION_BASE_CONFIG = [
  {
    id: NotificationType.APPLICATION_NOT_STARTED,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_IN_PROGRESS,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SUBMITTED,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_WITHDRAWN,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_TO_RESPONDENT,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.VIEW_RESPONSE_TO_APPLICATION,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.SUMBIT_FM5,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_CLOSED,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.NEW_ORDER,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.FINAL_ORDER,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.DA_RESPONDENT_BANNER,
    content: getNotificationContent,
    show: () => false,
  },
  {
    id: NotificationType.ORDER_PERSONAL_SERVICE,
    content: getNotificationContent,
    show: () => false,
  },
  {
      id: NotificationType.DA_APPLICANT_AFTER_COURT_SERVES_ORDER_TO_RESPONDENT_PERSONALLY,
      content: getNotificationContent,
      show: () => false,
    },
];
