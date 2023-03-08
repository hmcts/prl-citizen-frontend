import { Sections, Step } from '../constants';
import {
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
  C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAY_ONLINE,
} from '../urls';

export const completeApplicationSequence: Step[] = [
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: () => C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_COMPLETE_APPLICATION,
  },
  {
    url: C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAY_ONLINE,
    showInSection: Sections.CompleteYourApplication,
    getNextStep: () => C100_COMPLETE_YOUR_APPLICATION_GUIDANCE_PAY_ONLINE,
  },

  // ! need to change below
  // {
  //   url: DASHBOARD_URL,
  //   showInSection: Sections.AboutEdgeCase,
  //   getNextStep: () => DASHBOARD_URL,
  // },
];
