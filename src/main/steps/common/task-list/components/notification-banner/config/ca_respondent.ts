import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { BannerNotification, notificationBanner } from '../utils';

export const CA_RESPONDENT = [
  {
    ...notificationBanner[BannerNotification.NEW_DOCUMENT],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return (
        caseData &&
        !!caseData?.respondents?.find(
          respondent =>
            respondent?.value?.user?.idamId === userDetails.id &&
            respondent?.value.response?.citizenFlags?.isAllDocumentsViewed === YesOrNo.NO
        )
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
      return !!caseData?.orderCollection?.length && caseData.state === State.ALL_FINAL_ORDERS_ISSUED;
    },
  },
];
