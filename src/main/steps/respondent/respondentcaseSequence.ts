import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  CONSENT_SUMMARY,
  CONSENT_TO_APPLICATION,
  COURT_PROCEEDINGS_SUMMARY,
  DIGITAL_DOWNLOADS,
  DOMESTIC_ABUSE_RISK,
  DOMESTIC_ABUSE_RISK_NO,
  DRUG_ALCOHOL_TESTS,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  INTERNATIONAL_FACTORS_SUMMARY,
  LETTER_FROM_SCHOOL,
  MEDICAL_RECORDS,
  MEDICAL_REPORTS,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  OTHER_PEOPLE_WITNESS_STATEMENTS,
  PATERNITY_TEST_REPORTS,
  PHOTOGRAPHIC_EVIDENCE,
  POLICE_DISCLOSURE,
  POSITION_STATEMENTS,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  RESPONDENT,
  RESPONDENT_ADDRESS_BLANK,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_LOOKUP_CONT,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_PERSONAL_DETAILS,
  RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_START_ALTERNATIVE,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  SAFETY_MAIN_PAGE,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  WITNESS_AVAILABILITY,
  YOUR_SAFETY,
  YOUR_WITNESS_STATEMENTS,
} from '../urls';

export const respondentCaseSequence: Step[] = [
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
    url: RESPONDENT_DETAILS_KNOWN,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_START_ALTERNATIVE,
  },
  {
    url: RESPONDENT_START_ALTERNATIVE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: data =>
      data.startAlternative === YesOrNo.YES
        ? RESPONDENT_PRIVATE_DETAILS_CONFIRMED
        : RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
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
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ORDERS_FROM_THE_COURT,
  },
  {
    url: RESPONDENT_ORDERS_FROM_THE_COURT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
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
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${YOUR_WITNESS_STATEMENTS}`,
  },
  {
    url: `${RESPONDENT}${YOUR_WITNESS_STATEMENTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${POSITION_STATEMENTS}`,
  },
  {
    url: `${RESPONDENT}${POSITION_STATEMENTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${LETTER_FROM_SCHOOL}`,
  },
  {
    url: `${RESPONDENT}${LETTER_FROM_SCHOOL}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${DIGITAL_DOWNLOADS}`,
  },
  {
    url: `${RESPONDENT}${DIGITAL_DOWNLOADS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${DRUG_ALCOHOL_TESTS}`,
  },
  {
    url: `${RESPONDENT}${DRUG_ALCOHOL_TESTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${MEDICAL_RECORDS}`,
  },
  {
    url: `${RESPONDENT}${MEDICAL_RECORDS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${MEDICAL_REPORTS}`,
  },
  {
    url: `${RESPONDENT}${MEDICAL_REPORTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${OTHER_PEOPLE_WITNESS_STATEMENTS}`,
  },
  {
    url: `${RESPONDENT}${OTHER_PEOPLE_WITNESS_STATEMENTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${PATERNITY_TEST_REPORTS}`,
  },
  {
    url: `${RESPONDENT}${PATERNITY_TEST_REPORTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${PHOTOGRAPHIC_EVIDENCE}`,
  },
  {
    url: `${RESPONDENT}${PHOTOGRAPHIC_EVIDENCE}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${POLICE_DISCLOSURE}`,
  },
  {
    url: `${RESPONDENT}${POLICE_DISCLOSURE}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${WITNESS_AVAILABILITY}`,
  },
  {
    url: `${RESPONDENT}${WITNESS_AVAILABILITY}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${TENANCY_AND_MORTGAGE_AVAILABILITY}`,
  },
  {
    url: `${RESPONDENT}${TENANCY_AND_MORTGAGE_AVAILABILITY}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${APPLICATION_MADE_IN_THESE_PRCEEDINGS}`,
  },
  {
    url: `${RESPONDENT}${APPLICATION_MADE_IN_THESE_PRCEEDINGS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
];
