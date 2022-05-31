import { Sections, Step } from '../constants';
import { DETAILS_KNOWN, RESPONDENT_TASK_LIST_URL, START_ALTERNATIVE, MIAM_START, MIAM_ATTEND_WILLINGNESS,CHECK_ANSWERS,PERSONAL_DETAILS, CONTACT_DETAILS,ADDRESS_DETAILS,ADDRESS_LOOKUP, ADDRESS_LOOKUP_CONT,RESPONDENT_FIND_ADDRESS,ADDRESS_CONFIRMATION,ADDRESS_BLANK } from '../urls';
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
  {
    url: CHECK_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: PERSONAL_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: CONTACT_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: ADDRESS_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => ADDRESS_LOOKUP,
  },
  {
    url: ADDRESS_LOOKUP,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => ADDRESS_LOOKUP_CONT,
  },
  {
    url: ADDRESS_LOOKUP_CONT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => ADDRESS_CONFIRMATION,
  },
  {
    url: RESPONDENT_FIND_ADDRESS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => ADDRESS_CONFIRMATION,
  },
  {
    url: ADDRESS_CONFIRMATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: ADDRESS_BLANK,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },

];
