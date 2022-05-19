import { Sections, Step } from '../constants';
import { DASHBOARD_URL, details_known, RESPONDENT, START_ALTERNATIVE } from '../urls';

export const repondentCaseSequence: Step[] = [
  {
    url: RESPONDENT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT,
  },
  {
    url: details_known,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => START_ALTERNATIVE,
  },
  {
    url: START_ALTERNATIVE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => DASHBOARD_URL,
  },

];
