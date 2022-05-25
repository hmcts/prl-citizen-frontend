import { Sections, Step } from '../constants';
import { DETAILS_KNOWN, RESPONDENT_TASK_LIST_URL, START_ALTERNATIVE } from '../urls';

export const repondentCaseSequence: Step[] = [
  {
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: DETAILS_KNOWN,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => START_ALTERNATIVE,
  },
  {
    url: START_ALTERNATIVE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: MIAM_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep:  data =>
    data.miamStart === YesOrNo.NO
      ? MIAM_ATTEND_WILLINGNESS
      : RESPONDENT_TASK_LIST_URL,
  },
  {
    url: MIAM_ATTEND_WILLINGNESS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
];
