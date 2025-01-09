import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

export const cleanHearingWithoutNotice = (caseData: CaseWithId, hearingPart1: YesOrNo | undefined): CaseWithId => {
  if (hearingPart1 === YesOrNo.NO) {
    delete caseData.hwn_reasonsForApplicationWithoutNotice;
    delete caseData.hwn_doYouNeedAWithoutNoticeHearing;
    delete caseData.hwn_doYouNeedAWithoutNoticeHearingDetails;
    delete caseData.hwn_doYouRequireAHearingWithReducedNotice;
    delete caseData.hwn_doYouRequireAHearingWithReducedNoticeDetails;
  }

  return caseData;
};

export const cleanHearingWithoutNoticePart2 = (
  caseData: CaseWithId,
  doYouNeedAWithoutNoticeHearing: YesOrNo | undefined,
  doYouRequireAHearingWithReducedNotice: YesOrNo | undefined
): CaseWithId => {
  if (doYouNeedAWithoutNoticeHearing !== YesOrNo.YES) {
    delete caseData.hwn_doYouNeedAWithoutNoticeHearingDetails;
  }
  if (doYouRequireAHearingWithReducedNotice !== YesOrNo.YES) {
    delete caseData.hwn_doYouRequireAHearingWithReducedNoticeDetails;
  }

  return caseData;
};
