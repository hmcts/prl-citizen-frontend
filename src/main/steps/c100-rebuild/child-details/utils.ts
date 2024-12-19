import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

export const cleanOtherChildrenDetails = (caseData: CaseWithId, hasOtherChildren: YesOrNo | undefined): CaseWithId => {
  if (hasOtherChildren === YesOrNo.NO) {
    delete caseData.ocd_otherChildren;
  }

  return caseData;
};
