/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NotificationType } from '../definitions';
import { getNotificationContent } from '../utils';

export const NOTIFICATION_BASE_CONFIG = [
  {
    id: NotificationType.APPLICATION_NOT_STARTED,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_NOT_STARTED),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_IN_PROGRESS,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_IN_PROGRESS),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SUBMITTED,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_SUBMITTED),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_WITHDRAWN,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_WITHDRAWN),
    show: () => false,
  },
  {
    id: NotificationType.WITHDRAWAL_REQ_REJECTED,
    content: getNotificationContent.bind(null, NotificationType.WITHDRAWAL_REQ_REJECTED),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SENT_TO_LOCAL_COURT,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_SENT_TO_LOCAL_COURT),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SENT_TO_GATE_KEEPING,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_SENT_TO_GATE_KEEPING),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SERVED_FOR_APPLICANT,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_SERVED_FOR_APPLICANT),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_CLOSED,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_CLOSED),
    show: () => false,
  },
  {
    id: NotificationType.NEW_ORDER,
    content: getNotificationContent.bind(null, NotificationType.NEW_ORDER),
    show: () => false,
  },
  {
    id: NotificationType.FINAL_ORDER,
    content: getNotificationContent.bind(null, NotificationType.FINAL_ORDER),
    show: () => false,
  },
  {
    id: NotificationType.DA_RESPONDENT_BANNER,
    content: getNotificationContent.bind(null, NotificationType.DA_RESPONDENT_BANNER),
    show: () => false,
  },
  {
    id: NotificationType.GIVE_RESPONDENT_THEIR_DOCUMENTS,
    content: getNotificationContent.bind(null, NotificationType.GIVE_RESPONDENT_THEIR_DOCUMENTS),
    show: () => false,
  },
  {
    id: NotificationType.CA_PERSONAL_SERVICE,
    content: getNotificationContent.bind(null, NotificationType.CA_PERSONAL_SERVICE),
    show: () => false,
  },
  {
    id: NotificationType.RESPONSE_SUBMITTED,
    content: getNotificationContent.bind(null, NotificationType.RESPONSE_SUBMITTED),
    show: () => false,
  },
  {
    id: NotificationType.APPLICATION_SERVED_FOR_RESPONDENT,
    content: getNotificationContent.bind(null, NotificationType.APPLICATION_SERVED_FOR_RESPONDENT),
    show: () => false,
  },
  {
    id: NotificationType.SUMBIT_FM5,
    content: getNotificationContent.bind(null, NotificationType.SUMBIT_FM5),
    show: () => false,
  },
  {
    id: NotificationType.CRNF2_NEW_ORDER,
    content: getNotificationContent.bind(null, NotificationType.CRNF2_NEW_ORDER),
    show: () => false,
  },
];
