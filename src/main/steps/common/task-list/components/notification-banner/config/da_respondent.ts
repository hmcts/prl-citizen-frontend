import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, notificationBanner } from '../utils';

export const DA_RESPONDENT: NotificationBannerProps[] = [
  {
    ...notificationBanner[BannerNotification.NEW_DOCUMENT],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return !!(
        caseData &&
        caseData?.respondentsFL401?.user?.idamId === userDetails.id &&
        caseData?.respondentsFL401?.response?.citizenFlags?.isAllDocumentsViewed === YesOrNo.NO
      );
    },
  },
  {
    ...notificationBanner[BannerNotification.NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state !== State.CASE_CLOSED && !!caseData?.orderCollection?.length;
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
