import { CaseWithId } from '../../../../../../app/case/case';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationID, NotificationType } from '../definitions';
import { findNotification, getBannerContentForRespondent, showNotification } from '../utils';

export const DA_APPLICANT_CONFIG = (): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICANT_TO_PERSONALLY_SERVE_DA_RESPONDENT,
    show: showNotification,
  },
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT,
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
        order1: notification?.multiple ? commonContent.orders1 : commonContent.order1,
        respondent,
      });
    },
  },
  {
    id: NotificationType.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE_TO_DA_APPLICANT,
    show: showNotification,
  },
  {
    id: NotificationType.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT,
    show: showNotification,
  },
];
