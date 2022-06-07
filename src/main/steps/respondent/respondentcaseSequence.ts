import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  RESPONDENT_ADDRESS_BLANK,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_LOOKUP_CONT,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS,
  DETAILS_KNOWN,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  RESPONDENT_PERSONAL_DETAILS,
  PRIVATE_DETAILS_CONFIRMED,
  PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_TASK_LIST_URL,
  START_ALTERNATIVE,
} from '../urls';

export const respondentCaseSequence: Step[] = [
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
    url: RESPONDENT_CHECK_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_PERSONAL_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_CONTACT_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_ADDRESS_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_LOOKUP,
  },
  {
    url: RESPONDENT_ADDRESS_LOOKUP,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_LOOKUP_CONT,
  },
  {
    url: RESPONDENT_ADDRESS_LOOKUP_CONT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_CONFIRMATION,
  },
  {
    url: RESPONDENT_FIND_ADDRESS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_CONFIRMATION,
  },
  {
    url: RESPONDENT_ADDRESS_CONFIRMATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_ADDRESS_BLANK,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_ADDRESS_HISTORY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
];
