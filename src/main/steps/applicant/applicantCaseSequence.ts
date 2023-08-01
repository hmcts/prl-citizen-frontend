import { applyParms } from '../../steps/common/url-parser';
import { Case } from '../../app/case/case';
import { CaseType } from '../../app/case/definition';
import HearingsGetController from '../../steps/common/yourhearings/hearings/HearingsGetController';
import { Sections, Step } from '../constants';
import {
  ALLEGATION_OF_HARM_VOILENCE_DOC,
  APPLICANT,
  APPLICANT_ADDRESS_CONFIRMATION,
  APPLICANT_ADDRESS_DETAILS,
  APPLICANT_ADDRESS_HISTORY,
  APPLICANT_ADDRESS_LOOKUP,
  APPLICANT_ATTENDING_THE_COURT,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_CONTACT_DETAILS,
  APPLICANT_CONTACT_DETAILS_SAVE,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_FIND_ADDRESS,
  APPLICANT_KEEP_DETAILS_PRIVATE_SAVE,
  APPLICANT_MANUAL_ADDRESS,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_PERSONAL_DETAILS,
  APPLICANT_POSTAL_ADDRESS_DETAILS,
  APPLICANT_PRIVATE_DETAILS_CONFIRMED,
  APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  APPLICANT_SELECT_ADDRESS,
  APPLICANT_START_ALTERNATIVE,
  APPLICANT_TASKLIST_CONTACT_EMAIL,
  APPLICANT_TASKLIST_CONTACT_EMAIL_SUCCESS,
  APPLICANT_TASKLIST_CONTACT_POST,
  APPLICANT_TASKLIST_CONTACT_POST_SUCCESS,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES_SAVE,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_UPLOAD_DOCUMENT,
  APPLICANT_UPLOAD_DOCUMENT_LIST_START_URL,
  APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_UPLOAD_DOCUMENT_SUCCESS,
  // APPLICANT_START_ALTERNATIVE,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_WITNESS_STATEMENTS_DA,
  APPLICANT_YOURHEARINGS_HEARINGS,
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DIGITAL_DOWNLOADS,
  DOCUMENTS_SUPPORT,
  DRUG_ALCOHOL_TESTS,
  LANGUAGE_REQUIREMENTS,
  LETTER_FROM_SCHOOL,
  MEDICAL_RECORDS,
  MEDICAL_REPORTS,
  OTHER_DOCUMENTS,
  OTHER_PEOPLE_WITNESS_STATEMENTS,
  PATERNITY_TEST_REPORTS,
  POLICE_DISCLOSURE,
  POSITION_STATEMENTS,
  PREVIOUS_ORDERS_SUBMITTED,
  REASONABLE_ADJUSTMENTS,
  RESPONDENT_RISK_ASSESSMENT,
  RESPONDENT_SAFEGUARDING_LETTER,
  RESPONDENT_SECTION37_REPORT,
  RESPONDENT_SECTION7_REPORT,
  RESPOND_TO_OTHERS_ALLEGATION_OF_HARM_VOILENCE_DOC,
  SAFETY_ARRANGEMENTS,
  SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  SUPPORT_YOU_NEED_DURING_CASE_SUMMARY_SAVE,
  TASK_LIST_APPLICANT_URL,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  TRAVELLING_TO_COURT,
  UNABLE_TO_TAKE_COURT_PROCEEDINGS,
  WITNESS_AVAILABILITY,
  YOUR_WITNESS_STATEMENTS,
  // eslint-disable-next-line sort-imports
  C100_APPLICANT_TASKLIST,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  PageLink,
} from '../urls';

import ApplicantReasonableAdjustmentsNavigationController from './task-list/navigationController';

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
    getNextStep: () => APPLICANT_KEEP_DETAILS_PRIVATE_SAVE,
  },
  {
    url: APPLICANT_PRIVATE_DETAILS_CONFIRMED,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_CHECK_ANSWERS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_CONTACT_DETAILS_SAVE,
  },
  {
    url: APPLICANT_PERSONAL_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_CHECK_ANSWERS,
  },
  {
    url: APPLICANT_CONTACT_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_CHECK_ANSWERS,
  },
  {
    url: APPLICANT_ADDRESS_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ADDRESS_LOOKUP,
  },
  {
    url: APPLICANT_ADDRESS_LOOKUP,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_SELECT_ADDRESS,
  },
  {
    url: APPLICANT_SELECT_ADDRESS,
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
    getNextStep: () => APPLICANT_ADDRESS_HISTORY,
  },
  {
    url: APPLICANT_MANUAL_ADDRESS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ADDRESS_HISTORY,
  },
  {
    url: APPLICANT_ADDRESS_HISTORY,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_CHECK_ANSWERS,
  },
  {
    url: APPLICANT_POSTAL_ADDRESS_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ATTENDING_THE_COURT,
  },
  {
    url: APPLICANT_ATTENDING_THE_COURT,
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
    getNextStep: caseData =>
      ApplicantReasonableAdjustmentsNavigationController.getNextUrl(REASONABLE_ADJUSTMENTS, caseData),
  },
  {
    url: DOCUMENTS_SUPPORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData => ApplicantReasonableAdjustmentsNavigationController.getNextUrl(DOCUMENTS_SUPPORT, caseData),
  },
  {
    url: COMMUNICATION_HELP,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData =>
      ApplicantReasonableAdjustmentsNavigationController.getNextUrl(COMMUNICATION_HELP, caseData),
  },
  {
    url: COURT_HEARING_SUPPORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData =>
      ApplicantReasonableAdjustmentsNavigationController.getNextUrl(COURT_HEARING_SUPPORT, caseData),
  },
  {
    url: COURT_HEARING_COMFORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData =>
      ApplicantReasonableAdjustmentsNavigationController.getNextUrl(COURT_HEARING_COMFORT, caseData),
  },
  {
    url: TRAVELLING_TO_COURT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData =>
      ApplicantReasonableAdjustmentsNavigationController.getNextUrl(TRAVELLING_TO_COURT, caseData),
  },
  {
    url: UNABLE_TO_TAKE_COURT_PROCEEDINGS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData =>
      ApplicantReasonableAdjustmentsNavigationController.getNextUrl(UNABLE_TO_TAKE_COURT_PROCEEDINGS, caseData),
  },
  {
    url: SAFETY_ARRANGEMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  },
  {
    url: SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => SUPPORT_YOU_NEED_DURING_CASE_SUMMARY_SAVE,
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
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_VIEW_ALL_DOCUMENTS,
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
    getNextStep: () => `${APPLICANT}${MEDICAL_REPORTS}`,
  },
  {
    url: `${APPLICANT}${MEDICAL_REPORTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${DIGITAL_DOWNLOADS}`,
  },
  {
    url: `${APPLICANT}${DIGITAL_DOWNLOADS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${LETTER_FROM_SCHOOL}`,
  },
  {
    url: `${APPLICANT}${LETTER_FROM_SCHOOL}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${MEDICAL_RECORDS}`,
  },
  {
    url: `${APPLICANT}${MEDICAL_RECORDS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${PREVIOUS_ORDERS_SUBMITTED}`,
  },
  {
    url: `${APPLICANT}${PREVIOUS_ORDERS_SUBMITTED}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${WITNESS_AVAILABILITY}`,
  },
  {
    url: `${APPLICANT}${WITNESS_AVAILABILITY}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${PATERNITY_TEST_REPORTS}`,
  },
  {
    url: `${APPLICANT}${PATERNITY_TEST_REPORTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${DRUG_ALCOHOL_TESTS}`,
  },
  {
    url: `${APPLICANT}${DRUG_ALCOHOL_TESTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${POLICE_DISCLOSURE}`,
  },
  {
    url: `${APPLICANT}${POLICE_DISCLOSURE}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_UPLOAD_DOCUMENT_LIST_START_URL,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_LIST_START_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) => applyParms(APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL, {docCategory: req?.params?.docCategory, docType: req?.params?.docType})  as PageLink,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) => applyParms(APPLICANT_UPLOAD_DOCUMENT, {docCategory: req?.params?.docCategory, docType: req?.params?.docType})  as PageLink,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) => applyParms(APPLICANT_UPLOAD_DOCUMENT_SUCCESS, {docCategory: req?.params?.docCategory})  as PageLink,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${TENANCY_AND_MORTGAGE_AVAILABILITY}`,
  },
  {
    url: `${APPLICANT}${TENANCY_AND_MORTGAGE_AVAILABILITY}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${APPLICATION_MADE_IN_THESE_PRCEEDINGS}`,
  },
  {
    url: `${APPLICANT}${APPLICATION_MADE_IN_THESE_PRCEEDINGS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${OTHER_DOCUMENTS}`,
  },
  {
    url: `${APPLICANT}${OTHER_DOCUMENTS}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_WITNESS_STATEMENTS_DA,
  },
  {
    url: APPLICANT_WITNESS_STATEMENTS_DA,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_YOURHEARINGS_HEARINGS,
    showInSection: Sections.AboutApplicantCase,
    getController: HearingsGetController,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_ATTENDING_THE_COURT,
  },
  {
    url: APPLICANT_ATTENDING_THE_COURT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${RESPONDENT_SAFEGUARDING_LETTER}`,
  },
  {
    url: `${APPLICANT}${RESPONDENT_SAFEGUARDING_LETTER}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${RESPONDENT_SECTION7_REPORT}`,
  },
  {
    url: `${APPLICANT}${RESPONDENT_SECTION7_REPORT}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${RESPONDENT_SECTION37_REPORT}`,
  },
  {
    url: `${APPLICANT}${RESPONDENT_SECTION37_REPORT}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${RESPONDENT_RISK_ASSESSMENT}`,
  },
  {
    url: `${APPLICANT}${RESPONDENT_RISK_ASSESSMENT}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${ALLEGATION_OF_HARM_VOILENCE_DOC}`,
  },
  {
    url: `${APPLICANT}${ALLEGATION_OF_HARM_VOILENCE_DOC}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${RESPOND_TO_OTHERS_ALLEGATION_OF_HARM_VOILENCE_DOC}`,
  },
  {
    url: `${APPLICANT}${RESPOND_TO_OTHERS_ALLEGATION_OF_HARM_VOILENCE_DOC}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: APPLICANT_TASKLIST_CONTACT_PREFERENCES,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  },
  {
    url: APPLICANT_TASKLIST_CONTACT_PREFERENCES,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASKLIST_CONTACT_PREFERENCES_SAVE,
  },
  {
    url: APPLICANT_TASKLIST_CONTACT_EMAIL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASKLIST_CONTACT_EMAIL_SUCCESS,
  },
  {
    url: APPLICANT_TASKLIST_CONTACT_POST,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASKLIST_CONTACT_POST_SUCCESS,
  },
  {
    url: APPLICANT_TASKLIST_CONTACT_EMAIL_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => TASK_LIST_APPLICANT_URL,
  },
  {
    url: APPLICANT_TASKLIST_CONTACT_POST_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => TASK_LIST_APPLICANT_URL,
  },
  {
    url: APPLICANT_TASKLIST_HEARING_NEEDS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASKLIST_HEARING_NEEDS,
  },
  {
    url: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  },
  {
    url: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
];
