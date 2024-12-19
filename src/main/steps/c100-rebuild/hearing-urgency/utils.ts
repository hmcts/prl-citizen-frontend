import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

export const cleanHearingUrgency = (caseData: CaseWithId, urgentHearingReasons: YesOrNo | undefined): CaseWithId => {
  if (urgentHearingReasons === YesOrNo.NO) {
    delete caseData.hu_reasonOfUrgentHearing;
    delete caseData.hu_otherRiskDetails;
    delete caseData.hu_timeOfHearingDetails;
    delete caseData.hu_hearingWithNext48HrsDetails;
    delete caseData.hu_hearingWithNext48HrsMsg;
  }

  return caseData;
};
