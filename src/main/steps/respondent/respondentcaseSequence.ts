import { Sections, Step } from '../constants';
import { DETAILS_KNOWN, RESPONDENT_TASK_LIST_URL, START_ALTERNATIVE, MIAM_START, MIAM_ATTEND_WILLINGNESS, PRIVATE_DETAILS_CONFIRMED, PRIVATE_DETAILS_NOT_CONFIRMED, MIAM_SUMMARY, CHECK_ANSWERS } from '../urls';
import { YesOrNo } from 'app/case/definition';

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
    getNextStep: data =>
    data.startAlternative === YesOrNo.YES
      ? PRIVATE_DETAILS_CONFIRMED
      : PRIVATE_DETAILS_NOT_CONFIRMED,
  },
  {
    url: PRIVATE_DETAILS_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: PRIVATE_DETAILS_NOT_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: MIAM_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep:  data =>
    data.miamStart === YesOrNo.NO
      ? MIAM_ATTEND_WILLINGNESS
      : MIAM_SUMMARY,
  },
  {
    url: MIAM_ATTEND_WILLINGNESS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => MIAM_SUMMARY,
  },
  {
    url: MIAM_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: CHECK_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
];
