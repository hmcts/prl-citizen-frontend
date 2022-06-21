import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  COURT_PROCEEDINGS_SUMMARY,
  DETAILS_KNOWN,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  INTERNATIONAL_FACTORS_SUMMARY,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  PRIVATE_DETAILS_CONFIRMED,
  PRIVATE_DETAILS_NOT_CONFIRMED,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  RESPONDENT_TASK_LIST_URL,
  START_ALTERNATIVE,
} from '../urls';

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
      data.startAlternative === YesOrNo.YES ? PRIVATE_DETAILS_CONFIRMED : PRIVATE_DETAILS_NOT_CONFIRMED,
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
    getNextStep: data => (data.miamStart === YesOrNo.NO ? MIAM_ATTEND_WILLINGNESS : MIAM_SUMMARY),
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
    url: INTERNATIONAL_FACTORS_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => INTERNATIONAL_FACTORS_PARENTS,
  },
  {
    url: INTERNATIONAL_FACTORS_PARENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => INTERNATIONAL_FACTORS_JURISDICTION,
  },
  {
    url: INTERNATIONAL_FACTORS_JURISDICTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => INTERNATIONAL_FACTORS_REQUEST,
  },
  {
    url: INTERNATIONAL_FACTORS_REQUEST,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => INTERNATIONAL_FACTORS_SUMMARY,
  },
  {
    url: INTERNATIONAL_FACTORS_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: PROCEEDINGS_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: data =>
      data.proceedingsStart === YesOrNo.YES || data.proceedingsStartOrder === YesOrNo.YES
        ? PROCEEDINGS_COURT_PROCEEDINGS
        : COURT_PROCEEDINGS_SUMMARY,
  },
  {
    url: PROCEEDINGS_COURT_PROCEEDINGS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => COURT_PROCEEDINGS_SUMMARY,
  },
  {
    url: COURT_PROCEEDINGS_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
];
