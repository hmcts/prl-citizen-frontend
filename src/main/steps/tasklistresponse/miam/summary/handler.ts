import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { MIAM_ATTEND_WILLINGNESS, MIAM_START } from '../../../../steps/urls';

import { urls } from './content';

export function updateContent(userCase: Partial<CaseWithId>): void {
  if (userCase.miamStart) {
    Object.assign(urls, { miamStart: MIAM_START });
  }

  if (userCase.miamWillingness) {
    Object.assign(urls, { miamWillingness: MIAM_ATTEND_WILLINGNESS });
  }

  if (userCase.miamNotWillingExplnation) {
    Object.assign(urls, { miamNotWillingExplnation: MIAM_ATTEND_WILLINGNESS });
  }
  if (userCase.miamStart === YesOrNo.YES) {
    // delete userCase.miamWillingness;
    // delete userCase.miamNotWillingExplnation;
    userCase.miamWillingness = '';
    userCase.miamNotWillingExplnation = '';
  }
  if (userCase.miamWillingness === YesOrNo.YES) {
    //delete userCase.miamNotWillingExplnation;
    userCase.miamNotWillingExplnation = '';
  }
}
