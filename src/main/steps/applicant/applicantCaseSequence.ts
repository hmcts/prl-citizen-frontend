import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  APPLICANT,
  APPLICANT_ADDRESS_BLANK,
  APPLICANT_ADDRESS_CONFIRMATION,
  APPLICANT_ADDRESS_DETAILS,
  APPLICANT_ADDRESS_HISTORY,
  APPLICANT_ADDRESS_LOOKUP,
  APPLICANT_ADDRESS_LOOKUP_CONT,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_CONTACT_DETAILS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_DIGITAL_DOWNLOADS,
  APPLICANT_FIND_ADDRESS,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_PERSONAL_DETAILS,
  APPLICANT_PHOTOGRAPHIC_EVIDENCE,
  APPLICANT_POSTAL_ADDRESS_DETAILS,
  APPLICANT_PRIVATE_DETAILS_CONFIRMED,
  APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  APPLICANT_START_ALTERNATIVE,
  APPLICANT_TASK_LIST_URL,
  // APPLICANT_START_ALTERNATIVE,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DOCUMENTS_SUPPORT,
  LANGUAGE_REQUIREMENTS,
  OTHER_PEOPLE_WITNESS_STATEMENTS,
  POSITION_STATEMENTS,
  REASONABLE_ADJUSTMENTS,
  SAFETY_ARRANGEMENTS,
  SUPPORT_YOU_NEED_DURING_CASE,
  SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  TRAVELLING_TO_COURT,
  UNABLE_TO_TAKE_COURT_PROCEEDINGS,
  YOUR_WITNESS_STATEMENTS,
} from '../urls';

export const applicantCaseSequence: Step[] = [
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_DETAILS_KNOWN,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_START_ALTERNATIVE,
  },
  {
    url: APPLICANT_START_ALTERNATIVE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: data =>
      data.startAlternative === YesOrNo.YES
        ? APPLICANT_PRIVATE_DETAILS_CONFIRMED
        : APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  },
  {
    url: APPLICANT_PRIVATE_DETAILS_CONFIRMED,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_CHECK_ANSWERS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_PERSONAL_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_CONTACT_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_ADDRESS_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ADDRESS_LOOKUP,
  },
  {
    url: APPLICANT_ADDRESS_LOOKUP,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ADDRESS_LOOKUP_CONT,
  },
  {
    url: APPLICANT_ADDRESS_LOOKUP_CONT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ADDRESS_CONFIRMATION,
  },
  {
    url: APPLICANT_FIND_ADDRESS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ADDRESS_CONFIRMATION,
  },
  {
    url: APPLICANT_ADDRESS_CONFIRMATION,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_ADDRESS_BLANK,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_ADDRESS_HISTORY,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_POSTAL_ADDRESS_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: SUPPORT_YOU_NEED_DURING_CASE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => LANGUAGE_REQUIREMENTS,
  },
  {
    url: LANGUAGE_REQUIREMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => REASONABLE_ADJUSTMENTS,
  },
  {
    url: REASONABLE_ADJUSTMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => DOCUMENTS_SUPPORT,
  },
  {
    url: DOCUMENTS_SUPPORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => COMMUNICATION_HELP,
  },
  {
    url: COMMUNICATION_HELP,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => COURT_HEARING_SUPPORT,
  },
  {
    url: COURT_HEARING_SUPPORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => COURT_HEARING_COMFORT,
  },
  {
    url: COURT_HEARING_COMFORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => TRAVELLING_TO_COURT,
  },
  {
    url: TRAVELLING_TO_COURT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => UNABLE_TO_TAKE_COURT_PROCEEDINGS,
  },
  {
    url: UNABLE_TO_TAKE_COURT_PROCEEDINGS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => SAFETY_ARRANGEMENTS,
  },
  {
    url: SAFETY_ARRANGEMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  },
  {
    url: SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${YOUR_WITNESS_STATEMENTS}`,
  },
  {
    url: `${APPLICANT}${YOUR_WITNESS_STATEMENTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ORDERS_FROM_THE_COURT,
  },
  {
    url: APPLICANT_ORDERS_FROM_THE_COURT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${POSITION_STATEMENTS}`,
  },
  {
    url: `${APPLICANT}${POSITION_STATEMENTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${OTHER_PEOPLE_WITNESS_STATEMENTS}`,
  },
  {
    url: `${APPLICANT}${OTHER_PEOPLE_WITNESS_STATEMENTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${YOUR_WITNESS_STATEMENTS}`,
  },
  {
    url: `${APPLICANT}${YOUR_WITNESS_STATEMENTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${APPLICANT_PHOTOGRAPHIC_EVIDENCE}`,
  },
  {
    url: `${APPLICANT}${APPLICANT_PHOTOGRAPHIC_EVIDENCE}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${APPLICANT_PHOTOGRAPHIC_EVIDENCE}`,
  },
  {
    url: `${APPLICANT}${APPLICANT_PHOTOGRAPHIC_EVIDENCE}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${APPLICANT_DIGITAL_DOWNLOADS}`,
  },
  {
    url: `${APPLICANT}${APPLICANT_DIGITAL_DOWNLOADS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
];
