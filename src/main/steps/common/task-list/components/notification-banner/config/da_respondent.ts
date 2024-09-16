import { CaseWithId } from '../../../../../../app/case/case';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationID, NotificationType } from '../definitions';
import { findNotification, showNotification } from '../utils';

export const DA_RESPONDENT_CONFIG = (): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_TO_DA_RESPONDENT,
    show: showNotification,
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
];
