import { NotificationBannerProps, NotificationType } from '../definitions';
import { showNotification } from '../utils';

export const CA_RESPONDENT_CONFIG = (): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_TO_RESPONDENT,
    show: showNotification,
  },
  {
    id: NotificationType.SUMBIT_FM5,
    show: showNotification,
  },
  {
    id: NotificationType.CRNF2_NEW_ORDER,
    show: showNotification,
  },
];
