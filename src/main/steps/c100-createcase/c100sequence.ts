import { Sections, Step } from '../constants';
import { C100_CONFIDENTIALITY_START_ALTERNATIVE } from '../urls';

export const C100Sequence: Step[] = [
  {
    url: C100_CONFIDENTIALITY_START_ALTERNATIVE,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_START_ALTERNATIVE,
  },
];
