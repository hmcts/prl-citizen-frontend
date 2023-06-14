import { Sections, Step } from './constants';
import { APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE } from './urls';

export const applicationWithinProceedingsSequence: Step[] = [
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: () => APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
  },
];
