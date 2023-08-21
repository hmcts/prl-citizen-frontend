import { YesOrNo } from '../../app/case/definition';
import DocumentUploadPostController from '../../steps/common/upload-document/DocumentUploadPostController';
import { applyParms } from '../../steps/common/url-parser';
import { Sections, Step } from '../constants';
import {
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  CA_DA_ATTENDING_THE_COURT,
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_LANGUAGE_REQUIREMENTS,
  CA_DA_REASONABLE_ADJUSTMENTS,
  CA_DA_SPECIAL_ARRANGEMENTS,
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  CA_DA_TRAVELLING_TO_COURT,
  CA_RESPONDENT_RESPONSE_CONFIRMATION,
  CA_RESPONDENT_RESPONSE_SUBMIT,
  DIGITAL_DOWNLOADS,
  DRUG_ALCOHOL_TESTS,
  LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
  LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
  LEGAL_REPRESENTATION_START,
  LETTER_FROM_SCHOOL,
  MEDICAL_RECORDS,
  MEDICAL_REPORTS,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_SAVE,
  MIAM_START,
  MIAM_SUMMARY,
  OTHER_DOCUMENTS,
  OTHER_PEOPLE_WITNESS_STATEMENTS,
  PATERNITY_TEST_REPORTS,
  POLICE_DISCLOSURE,
  POSITION_STATEMENTS,
  PREVIOUS_ORDERS_SUBMITTED,
  PageLink,
  RESPNDT_TO_APPLICATION_SUMMARY,
  RESPONDENT,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_MANUAL,
  RESPONDENT_ADDRESS_SELECT,
  RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_CONTACT_DETAILS_SAVE,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_KEEP_DETAILS_PRIVATE_SAVE,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_PERSONAL_DETAILS,
  RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_START,
  RESPONDENT_RISK_ASSESSMENT,
  RESPONDENT_SAFEGUARDING_LETTER,
  RESPONDENT_SECTION37_REPORT,
  RESPONDENT_SECTION7_REPORT,
  RESPONDENT_START_ALTERNATIVE,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT_PERMISSION_TO_SUBMIT_EXTRA_EVIDENCE,
  RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPONDENT_YOURHEARINGS_HEARINGS,
  RESPOND_TO_APPLICATION,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  WITNESS_AVAILABILITY,
  YOUR_WITNESS_STATEMENTS,
} from '../urls';

import ReasonableAdjustmentsNavigationController from './task-list/navigationController';

export const respondentCaseSequence: Step[] = [
  {
    url: RESPONDENT_TASK_LIST_URL,
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
    getNextStep: () => RESPONDENT_KEEP_DETAILS_PRIVATE_SAVE,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (_caseData, req) =>
      req?.session.applicationSettings?.navfromRespondToApplication ? RESPOND_TO_APPLICATION : RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (_caseData, req) =>
      req?.session.applicationSettings?.navfromRespondToApplication ? RESPOND_TO_APPLICATION : RESPONDENT_TASK_LIST_URL,
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
    getNextStep: () => MIAM_SAVE,
  },
  {
    url: RESPONDENT_CHECK_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CONTACT_DETAILS_SAVE,
  },
  {
    url: RESPONDENT_PERSONAL_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CHECK_ANSWERS,
  },
  {
    url: RESPONDENT_CONTACT_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CHECK_ANSWERS,
  },
  {
    url: RESPONDENT_ADDRESS_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_LOOKUP,
  },
  {
    url: RESPONDENT_ADDRESS_LOOKUP,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_SELECT,
  },
  {
    url: RESPONDENT_ADDRESS_SELECT,
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
    getNextStep: () => RESPONDENT_ADDRESS_HISTORY,
  },
  {
    url: RESPONDENT_ADDRESS_MANUAL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_HISTORY,
  },
  {
    url: RESPONDENT_ADDRESS_HISTORY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CHECK_ANSWERS,
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
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      caseData.start === YesOrNo.NO
        ? RESPONDENT_UPLOAD_DOCUMENT_PERMISSION_TO_SUBMIT_EXTRA_EVIDENCE
        : (applyParms(RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL, {
            docCategory: req?.params?.docCategory,
            docType: req?.params?.docType,
          }) as PageLink),
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      applyParms(RESPONDENT_UPLOAD_DOCUMENT, {
        docCategory: req?.params?.docCategory,
        docType: req?.params?.docType,
      }) as PageLink,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT,
    showInSection: Sections.AboutRespondentCase,
    postController: DocumentUploadPostController,
    getNextStep: (caseData, req) =>
      applyParms(RESPONDENT_UPLOAD_DOCUMENT_SUCCESS, {
        docCategory: req?.params?.docCategory,
        docType: req?.params?.docType,
      }) as PageLink,
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
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${RESPONDENT}${PREVIOUS_ORDERS_SUBMITTED}`,
  },
  {
    url: `${RESPONDENT}${PREVIOUS_ORDERS_SUBMITTED}`,
    showInSection: Sections.AboutApplicantCase,
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
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${OTHER_DOCUMENTS}`,
  },
  {
    url: `${RESPONDENT}${OTHER_DOCUMENTS}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: RESPOND_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPNDT_TO_APPLICATION_SUMMARY,
  },
  {
    url: RESPNDT_TO_APPLICATION_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CA_RESPONDENT_RESPONSE_SUBMIT,
  },
  {
    url: CA_RESPONDENT_RESPONSE_CONFIRMATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_ATTENDING_THE_COURT,
  },
  {
    url: CA_DA_ATTENDING_THE_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_LANGUAGE_REQUIREMENTS,
  },
  {
    url: CA_DA_LANGUAGE_REQUIREMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_SPECIAL_ARRANGEMENTS,
  },
  {
    url: CA_DA_SPECIAL_ARRANGEMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_REASONABLE_ADJUSTMENTS,
  },
  {
    url: CA_DA_REASONABLE_ADJUSTMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData =>
      ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_REASONABLE_ADJUSTMENTS, caseData),
  },
  {
    url: CA_DA_DOCUMENTS_SUPPORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_DOCUMENTS_SUPPORT, caseData),
  },
  {
    url: CA_DA_COMMUNICATION_HELP,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_COMMUNICATION_HELP, caseData),
  },
  {
    url: CA_DA_COURT_HEARING_SUPPORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData =>
      ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_COURT_HEARING_SUPPORT, caseData),
  },
  {
    url: CA_DA_COURT_HEARING_COMFORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData =>
      ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_COURT_HEARING_COMFORT, caseData),
  },
  {
    url: CA_DA_TRAVELLING_TO_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(CA_DA_TRAVELLING_TO_COURT, caseData),
  },
  {
    url: CA_DA_TRAVELLING_TO_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  },
  {
    url: CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
  },
  {
    url: RESPOND_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => LEGAL_REPRESENTATION_START,
  },
  {
    url: LEGAL_REPRESENTATION_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
  },
  {
    url: LEGAL_REPRESENTATION_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
  },
  {
    url: LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: RESPONDENT_YOURHEARINGS_HEARINGS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${RESPONDENT_SAFEGUARDING_LETTER}`,
  },
  {
    url: `${RESPONDENT}${RESPONDENT_SAFEGUARDING_LETTER}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${RESPONDENT_SECTION7_REPORT}`,
  },
  {
    url: `${RESPONDENT}${RESPONDENT_SECTION7_REPORT}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${RESPONDENT_SECTION37_REPORT}`,
  },
  {
    url: `${RESPONDENT}${RESPONDENT_SECTION37_REPORT}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${RESPONDENT_RISK_ASSESSMENT}`,
  },
  {
    url: `${RESPONDENT}${RESPONDENT_RISK_ASSESSMENT}`,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  },
  {
    url: RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_PERMISSION_TO_SUBMIT_EXTRA_EVIDENCE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
];
