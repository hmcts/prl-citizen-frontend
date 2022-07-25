import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  ADDRESS_BLANK,
  ADDRESS_CONFIRMATION,
  ADDRESS_DETAILS,
  ADDRESS_HISTORY,
  ADDRESS_LOOKUP,
  ADDRESS_LOOKUP_CONT,
  CHECK_ANSWERS,
  CONTACT_DETAILS,
  CONSENT_SUMMARY,
  CONSENT_TO_APPLICATION,
  DETAILS_KNOWN,
  DOMESTIC_ABUSE_RISK,
  DOMESTIC_ABUSE_RISK_NO,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  INTERNATIONAL_FACTORS_SUMMARY,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  PERSONAL_DETAILS,
  PRIVATE_DETAILS_CONFIRMED,
  PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_TASK_LIST_URL,
  SAFETY_MAIN_PAGE,
  START_ALTERNATIVE,
  YOUR_SAFETY,
} from '../urls';

export const repondentCaseSequence: Step[] = [
  {
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: CONSENT_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CONSENT_SUMMARY,
  },
  {
    url: CONSENT_SUMMARY,
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
  {
    url: ADDRESS_HISTORY,
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
    url: SAFETY_MAIN_PAGE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => YOUR_SAFETY,
  },
  {
    url: YOUR_SAFETY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => DOMESTIC_ABUSE_RISK,
  },
  {
    url: DOMESTIC_ABUSE_RISK,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => DOMESTIC_ABUSE_RISK_NO,
  },
  {
    url: DOMESTIC_ABUSE_RISK_NO,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
];
