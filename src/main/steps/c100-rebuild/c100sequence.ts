import { Sections, Step } from '../constants';
import { C100_CONFIDENTIALITY_DETAILS_KNOW } from '../urls';

export const C100Sequence: Step[] = [
  {
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
];
