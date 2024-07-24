import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { interpolate } from '../../../../../../steps/common/string-parser';
import { NotificationBannerContent, NotificationBannerProps, NotificationID, NotificationType } from '../definitions';
import { findNotification, getBannerContentForRespondent, showNotification } from '../utils';

export const DA_APPLICANT_CONFIG = (): NotificationBannerProps[] => [
  {
    id: NotificationType.NEW_ORDER,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    id: NotificationType.FINAL_ORDER,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.ALL_FINAL_ORDERS_ISSUED;
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
];
