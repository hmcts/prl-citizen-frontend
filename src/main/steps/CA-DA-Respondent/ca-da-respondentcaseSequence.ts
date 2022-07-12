import { Sections, Step } from '../constants';
import {
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_LANGUAGE_REQUIREMENTS,
  CA_DA_REASONABLE_ADJUSTMENTS,
  CA_DA_RESPONDENT_TASK_LIST_URL,
  CA_DA_SAFETY_ARRANGEMENTS,
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE,
  CA_DA_TRAVELLING_TO_COURT,
  CA_DA_UNABLE_TO_TAKE_COURT_PROCEEDINGS,
} from '../urls';

export const respondentCaseSequence: Step[] = [
  {
    url: CA_DA_RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_RESPONDENT_TASK_LIST_URL,
  },
  {
    url: CA_DA_SUPPORT_YOU_NEED_DURING_CASE,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_LANGUAGE_REQUIREMENTS,
  },
  {
    url: CA_DA_LANGUAGE_REQUIREMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_REASONABLE_ADJUSTMENTS,
  },
  {
    url: CA_DA_REASONABLE_ADJUSTMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_DOCUMENTS_SUPPORT,
  },
  {
    url: CA_DA_DOCUMENTS_SUPPORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_COMMUNICATION_HELP,
  },
  {
    url: CA_DA_COMMUNICATION_HELP,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_COURT_HEARING_SUPPORT,
  },
  {
    url: CA_DA_COURT_HEARING_SUPPORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_COURT_HEARING_COMFORT,
  },
  {
    url: CA_DA_COURT_HEARING_COMFORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_TRAVELLING_TO_COURT,
  },
  {
    url: CA_DA_TRAVELLING_TO_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_UNABLE_TO_TAKE_COURT_PROCEEDINGS,
  },
  {
    url: CA_DA_UNABLE_TO_TAKE_COURT_PROCEEDINGS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_SAFETY_ARRANGEMENTS,
  },
  {
    url: CA_DA_SAFETY_ARRANGEMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_RESPONDENT_TASK_LIST_URL,
  },
];
