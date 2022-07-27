import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  C100_CONFIDENTIALITY_DETAILS_KNOW,
  C100_CONFIDENTIALITY_FEEDBACK,
  C100_CONFIDENTIALITY_FEEDBACK_NO,
  C100_CONFIDENTIALITY_START,
  C100_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_INTERNATIONAL_ELEMENTS_START,
} from '../urls';

export const C100Sequence: Step[] = [
  {
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.detailsKnown === YesOrNo.YES ? C100_CONFIDENTIALITY_START_ALTERNATIVE : C100_CONFIDENTIALITY_START,
  },
  {
    url: C100_CONFIDENTIALITY_FEEDBACK,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_CONFIDENTIALITY_FEEDBACK_NO,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_CONFIDENTIALITY_START,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.start === YesOrNo.YES ? C100_CONFIDENTIALITY_FEEDBACK : C100_CONFIDENTIALITY_FEEDBACK_NO,
  },
  {
    url: C100_CONFIDENTIALITY_START_ALTERNATIVE,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.startAlternative === YesOrNo.YES ? C100_CONFIDENTIALITY_FEEDBACK : C100_CONFIDENTIALITY_FEEDBACK_NO,
  },
  {
    url: C100_INTERNATIONAL_ELEMENTS_START,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_START,
  },
];
