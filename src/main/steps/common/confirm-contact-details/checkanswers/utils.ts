import _ from 'lodash';

import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';

export const isMandatoryFieldsFilled = (caseData: Partial<CaseWithId>): boolean => {
  return !(caseData?.isCitizenLivingInRefuge === YesOrNo.YES && _.isEmpty(caseData?.refugeDocument));
};
