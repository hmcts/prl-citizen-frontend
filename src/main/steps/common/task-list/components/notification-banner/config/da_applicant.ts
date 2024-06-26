import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, notificationBanner } from '../utils';

export const DA_APPLICANT: NotificationBannerProps[] = [
  {
    ...notificationBanner[BannerNotification.NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    ...notificationBanner[BannerNotification.FINAL_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.ALL_FINAL_ORDERS_ISSUED;
    },
  },
];
