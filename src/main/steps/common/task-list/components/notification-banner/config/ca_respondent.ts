import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, isPartyServed, notificationBanner } from '../utils';

export const CA_RESPONDENT: NotificationBannerProps[] = [
  {
    ...notificationBanner[BannerNotification.NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    ...notificationBanner[BannerNotification.FINAL_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData.state === State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    ...notificationBanner[BannerNotification.CA_RESPONDENT_SERVED],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && isPartyServed(caseData, userDetails);
    },
  },
  {
    ...notificationBanner[BannerNotification.SUMBIT_FM5],
    show: (caseData: Partial<CaseWithId>): boolean => {
      const notification = caseData?.citizenNotifications?.find(
        citizenNotification => citizenNotification.id === 'CAN_10'
      );

      return notification?.show ?? false;
    },
  },
];
