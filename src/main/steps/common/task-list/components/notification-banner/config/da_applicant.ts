import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps, NotificationType } from '../definitions';

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
      id: NotificationType.DA_APPLICANT_AFTER_COURT_SERVES_ORDER_TO_RESPONDENT_PERSONALLY,
      show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
        return caseData?.state === State.CASE_ISSUED;
      },
    },
];
