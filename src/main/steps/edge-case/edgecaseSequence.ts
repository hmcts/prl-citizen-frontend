import { Sections, Step } from '../constants';
import { CITIZEN_HOME_URL, SERVICE_TYPE } from '../urls';

export const edgecaseSequence: Step[] = [
  {
    url: CITIZEN_HOME_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => SERVICE_TYPE,
  },
];
