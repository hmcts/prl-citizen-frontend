import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType, State } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { BannerNotification, isPartyServed, notificationBanner } from '../utils';

export const CA_RESPONDENT: NotificationBannerProps[] = [
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
  {
    ...notificationBanner[BannerNotification.CA_RESPONDENT_SERVED],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return caseData?.state !== State.CASE_CLOSED && isPartyServed(caseData, userDetails, PartyType.RESPONDENT);
    },
  },
];
