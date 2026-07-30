import { Sections, Step } from '../../../steps/constants';
import { REFUGE_KEEPING_SAFE, STAYING_IN_REFUGE } from '../../../steps/urls';

import RefugeNavigationController from './navigationController';

export class RefugeSequence {
  getSequence(): Step[] {
    return [
      {
        url: STAYING_IN_REFUGE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(STAYING_IN_REFUGE, caseData, req!);
        },
      },
      {
        url: REFUGE_KEEPING_SAFE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(REFUGE_KEEPING_SAFE, caseData, req!);
        },
      },
    ];
  }
}

export const C8RefugeSequence = new RefugeSequence();
