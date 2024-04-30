import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, notificationBanner } from '../utils';

export const DA_RESPONDENT: NotificationBannerProps[] = [
  {
    ...notificationBanner[BannerNotification.NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state !== State.CASE_CLOSED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    ...notificationBanner[BannerNotification.FINAL_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.CASE_CLOSED;
    },
  },
  {
    ...notificationBanner[BannerNotification.DA_RESPONDENT_BANNER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      // banners.length === 0 && (revisit latter)
      return caseData.orderWithoutGivingNoticeToRespondent?.orderWithoutGivingNotice === YesOrNo.YES;
    },
  },
];
