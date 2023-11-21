import { Sections, Step } from '../../steps/constants';
import { REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE } from '../../steps/urls';

export class ReasonableAdjustementsSequence {
  getSequence(): Step[] {
    return [
      {
        url: REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
        showInSection: Sections.RA,
        getNextStep: () => '/',
      },
    ];
  }
}

export const RASequence = new ReasonableAdjustementsSequence();
