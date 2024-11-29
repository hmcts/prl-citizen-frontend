import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

export const cleanOtherChildrenDetails = (caseData: CaseWithId, hasOtherChildren: YesOrNo | undefined): CaseWithId => {
  caseData.ocd_otherChildren = hasOtherChildren === YesOrNo.NO ? [] : caseData.ocd_otherChildren;
  return caseData;
};
