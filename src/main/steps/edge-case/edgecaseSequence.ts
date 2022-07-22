import { Sections, Step } from '../constants';
import { CITIZEN_HOME_URL, DASHBOARD_URL } from '../urls';

export const edgecaseSequence: Step[] = [
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
];
