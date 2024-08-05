import { CaseWithId } from '../../../../../../app/case/case';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationID, NotificationType } from '../definitions';
import { findNotification, getBannerContentForRespondent, showNotification } from '../utils';

export const DA_APPLICANT_CONFIG = (): NotificationBannerProps[] => [
  {
    id: NotificationType.ORDER_NON_PERSONAL_SERVICE,
    show: showNotification,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      const notification = findNotification(caseData, NotificationID.ORDER_NON_PERSONAL_SERVICE);

      return interpolate(content, {
        final: notification?.final ? ` ${commonContent.final}` : '',
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        tell: notification?.multiple ? commonContent.tell : commonContent.tells,
      });
    },
  },
  {
    id: NotificationType.ORDER_PERSONAL_SERVICE,
    show: showNotification,
    interpolateContent: (content: string, commonContent: NotificationBannerContent['common'], caseData: CaseWithId) => {
      const notification = findNotification(caseData, NotificationID.ORDER_PERSONAL_SERVICE);
      const { respondent } = getBannerContentForRespondent(caseData, commonContent);

      return interpolate(content, {
        final: notification?.final ? ` ${commonContent.final}` : '',
        order: notification?.multiple ? commonContent.orders : commonContent.order,
        tell: notification?.multiple ? commonContent.tell : commonContent.tells,
        respondent,
      });
    },
  },
  {
    id: NotificationType.DA_APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE,
    show: showNotification,
  },
];
