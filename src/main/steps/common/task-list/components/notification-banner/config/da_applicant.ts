import { CaseWithId } from "../../../../../../app/case/case";
import { BannerNotification, notificationBanner } from "../utils";
import { UserDetails } from "../../../../../../app/controller/AppRequest";
import { State, YesOrNo } from "../../../../../../app/case/definition";


export const DA_APPLICANT = [
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
]