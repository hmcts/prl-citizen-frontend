import { Sections, Step } from '../constants';
import { DASHBOARD_URL, PIN_ACTIVATION_CASE_ACTIVATED_URL, PIN_ACTIVATION_ENTER_PIN_URL } from '../urls';

export const citizenSequence: Step[] = [
  {
    url: DASHBOARD_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => DASHBOARD_URL,
  },
  {
    url: PIN_ACTIVATION_ENTER_PIN_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PIN_ACTIVATION_CASE_ACTIVATED_URL,
  },
  {
    url: PIN_ACTIVATION_CASE_ACTIVATED_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PIN_ACTIVATION_CASE_ACTIVATED_URL,
  },
];
