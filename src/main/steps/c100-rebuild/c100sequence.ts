import { Sections, Step } from '../constants';
import { C100_CONFIDENTIALITY_DETAILS_KNOW, C100_CONFIDENTIALITY_FEEDBACK } from '../urls';

export const C100Sequence: Step[] = [
  {
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_FEEDBACK,
  },
  {
    url: C100_CONFIDENTIALITY_FEEDBACK,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
];
