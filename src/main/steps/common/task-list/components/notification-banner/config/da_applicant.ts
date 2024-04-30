import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, notificationBanner } from '../utils';

export const DA_APPLICANT: NotificationBannerProps[] = [
  {
    ...notificationBanner[BannerNotification.NEW_DOCUMENT],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return !!(
        caseData &&
        caseData?.applicantsFL401?.user?.idamId === userDetails.id &&
        caseData?.applicantsFL401?.response?.citizenFlags?.isAllDocumentsViewed === YesOrNo.NO
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
    ...notificationBanner[BannerNotification.SOA_SERVED_DA],
    show: (): boolean => {
      return true;
    },
  },
];
