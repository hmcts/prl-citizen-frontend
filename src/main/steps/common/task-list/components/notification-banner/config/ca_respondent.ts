import { CaseWithId } from '../../../../../../app/case/case';
import { CitizenNotificationId, State } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, isPartyServed, notificationBanner } from '../utils';

export const CA_RESPONDENT: NotificationBannerProps[] = [
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
        citizenNotification => citizenNotification.id === CitizenNotificationId.CAN10_FM5
      );

      return notification?.show ?? false;
    },
  },
  {
    ...notificationBanner[BannerNotification.CRNF2_NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      const notification = caseData?.citizenNotifications?.find(
        citizenNotification => citizenNotification.id === CitizenNotificationId.CRNF2_APPLICANT_RESPONDENT
      );

      return notification?.show ?? false;
    },
  },
];
