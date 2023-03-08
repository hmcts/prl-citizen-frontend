import { Sections, Step } from '../constants';
import { C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION } from '../urls';

export const completeApplicationSequence: Step[] = [
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: () => C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
  },

  // ! need to change below
  // {
  //   url: DASHBOARD_URL,
  //   showInSection: Sections.AboutEdgeCase,
  //   getNextStep: () => DASHBOARD_URL,
  // },
];
