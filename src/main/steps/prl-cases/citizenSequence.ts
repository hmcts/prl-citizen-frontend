import { Sections, Step } from '../constants';
import { CITIZEN_HOME_URL, DASHBOARD_URL, PIN_ACTIVATION_URL } from '../urls';

export const citizenSequence: Step[] = [
  {
    url: CITIZEN_HOME_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => DASHBOARD_URL,
  },
  {
    url: DASHBOARD_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => DASHBOARD_URL,
  },
  {
    url: PIN_ACTIVATION_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PIN_ACTIVATION_URL,
  },
];
