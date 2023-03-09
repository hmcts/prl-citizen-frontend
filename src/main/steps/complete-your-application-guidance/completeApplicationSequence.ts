import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE,
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_14,
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_CONTACT,
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAPER_FORM,
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAY_ONLINE,
} from '../urls';

export const completeApplicationSequence: Step[] = [
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: () => C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAY_ONLINE,
  },
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAY_ONLINE,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: data =>
      data.applicationGuidancePayOnline === YesOrNo.YES
        ? C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE
        : C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAPER_FORM,
  },
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: data =>
      data.applicationGuidanceLegalRepresentative === YesOrNo.YES
        ? C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_14
        : C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE,
  },
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAPER_FORM,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: () => C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAPER_FORM,
  },
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_14,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: data =>
      data.applicationFillupLegalRepresentative === YesOrNo.YES
        ? C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_CONTACT
        : C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_14,
  },
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_CONTACT,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: () => C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_LEGAL_REPRESENTATIVE_CONTACT,
  },
];
