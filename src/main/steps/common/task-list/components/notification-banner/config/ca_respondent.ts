import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps, NotificationType } from '../definitions';
import { showNotification } from '../utils';

export const CA_RESPONDENT_CONFIG = (): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICATION_SERVED_FOR_RESPONDENT,
    show: showNotification,
  },
  {
    id: NotificationType.NEW_ORDER,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    id: NotificationType.FINAL_ORDER,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData.state === State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    id: NotificationType.SUMBIT_FM5,
    show: showNotification,
  },
];
