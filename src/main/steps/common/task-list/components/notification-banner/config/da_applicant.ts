import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseLinked } from '../../../../../../steps/common/task-list/utils';
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
  {
    ...notificationBanner[BannerNotification.SOA_SERVED_DA],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return (
        isCaseLinked(caseData, userDetails) &&
        YesOrNo.YES === caseData?.applicantsFL401?.response?.citizenFlags?.isApplicationToBeServed
      );
    },
  },
];
