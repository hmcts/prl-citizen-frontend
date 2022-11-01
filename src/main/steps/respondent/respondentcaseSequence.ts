import { YesOrNo } from '../../app/case/definition';
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
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  CA_DA_TRAVELLING_TO_COURT,
  CA_RESPONDENT_RESPONSE_CONFIRMATION,
  CA_RESPONDENT_RESPONSE_SUBMIT,
  CONSENT_SAVE,
  CONSENT_SUMMARY,
  CONSENT_TO_APPLICATION,
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
  RESPNDT_TO_APPLICATION_SUMMARY,
  RESPONDENT,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_MANUAL,
  RESPONDENT_ADDRESS_SELECT,
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
  RESPONDENT_START_ALTERNATIVE,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPOND_TO_APPLICATION,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  WITNESS_AVAILABILITY,
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
    url: CONSENT_SUMMARY,  //3
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CONSENT_SAVE,
  },
  {
    url: RESPONDENT_DETAILS_KNOWN,              //4
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_START_ALTERNATIVE,
  },
  {
    url: RESPONDENT_START_ALTERNATIVE,        //5
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_KEEP_DETAILS_PRIVATE_SAVE,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_CONFIRMED,      //6
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,    //7
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: MIAM_START,                              //8
    showInSection: Sections.AboutRespondentCase,
    getNextStep: data => (data.miamStart === YesOrNo.NO ? MIAM_ATTEND_WILLINGNESS : MIAM_SUMMARY),
  },
  {
    url: MIAM_ATTEND_WILLINGNESS,               //9
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => MIAM_SUMMARY,
  },
  {
    url: MIAM_SUMMARY,                          //10
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => MIAM_SAVE,
  },
  {
    url: RESPONDENT_CHECK_ANSWERS,            //11
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CONTACT_DETAILS_SAVE,
  },
  {
    url: RESPONDENT_PERSONAL_DETAILS,       //12
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CHECK_ANSWERS,
  },
  {
    url: RESPONDENT_CONTACT_DETAILS,        //13
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CHECK_ANSWERS,
  },
  {
    url: RESPONDENT_ADDRESS_DETAILS,        //14
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_LOOKUP,
  },
  {
    url: RESPONDENT_ADDRESS_LOOKUP,       //15
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_SELECT,
  },
  {
    url: RESPONDENT_ADDRESS_SELECT,         //16
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_CONFIRMATION,
  },
  {
    url: RESPONDENT_FIND_ADDRESS,       //17
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_CONFIRMATION,
  },
  {
    url: RESPONDENT_ADDRESS_CONFIRMATION,   //18
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_HISTORY,
  },
  {
    url: RESPONDENT_ADDRESS_MANUAL,     //19
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ADDRESS_HISTORY,
  },
  {
    url: RESPONDENT_ADDRESS_HISTORY,      //20
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_CHECK_ANSWERS,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,      //21
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ORDERS_FROM_THE_COURT,
  },
  {
    url: RESPONDENT_ORDERS_FROM_THE_COURT,    //22
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,      //23
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,     //24
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,     //25
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,   //26
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,   //27
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT,      //28
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  },
  {
    url: RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,      //29
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,       //30
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${YOUR_WITNESS_STATEMENTS}`,
  },
  {
    url: `${RESPONDENT}${YOUR_WITNESS_STATEMENTS}`,   //31
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,               //32
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${POSITION_STATEMENTS}`,
  },
  {
    url: `${RESPONDENT}${POSITION_STATEMENTS}`,         //33
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,               //34
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${LETTER_FROM_SCHOOL}`,
  },
  {
    url: `${RESPONDENT}${LETTER_FROM_SCHOOL}`,        //35
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,         //36
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${DIGITAL_DOWNLOADS}`,
  },
  {
    url: `${RESPONDENT}${DIGITAL_DOWNLOADS}`,     //37
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,         //38
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${DRUG_ALCOHOL_TESTS}`,
  },
  {
    url: `${RESPONDENT}${DRUG_ALCOHOL_TESTS}`,      //39
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,           //40
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${MEDICAL_RECORDS}`,
  },
  {
    url: `${RESPONDENT}${MEDICAL_RECORDS}`,       //41
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,           //42
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${MEDICAL_REPORTS}`,
  },
  {
    url: `${RESPONDENT}${MEDICAL_REPORTS}`,       //43
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,           //44
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${OTHER_PEOPLE_WITNESS_STATEMENTS}`,
  },
  {
    url: `${RESPONDENT}${OTHER_PEOPLE_WITNESS_STATEMENTS}`,   //45
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,           //46
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${PATERNITY_TEST_REPORTS}`,
  },
  {
    url: `${RESPONDENT}${PATERNITY_TEST_REPORTS}`,    //47
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,       //48
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${POLICE_DISCLOSURE}`,
  },
  {
    url: `${RESPONDENT}${POLICE_DISCLOSURE}`,     //49
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,       //50
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${WITNESS_AVAILABILITY}`,
  },
  {
    url: `${RESPONDENT}${WITNESS_AVAILABILITY}`,    //51
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,       //52
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${TENANCY_AND_MORTGAGE_AVAILABILITY}`,
  },
  {
    url: `${RESPONDENT}${TENANCY_AND_MORTGAGE_AVAILABILITY}`,   //53
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,         //54
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${RESPONDENT}${PREVIOUS_ORDERS_SUBMITTED}`,
  },
  {
    url: `${RESPONDENT}${PREVIOUS_ORDERS_SUBMITTED}`,     //55
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,       //56
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${APPLICATION_MADE_IN_THESE_PRCEEDINGS}`,
  },
  {
    url: `${RESPONDENT}${APPLICATION_MADE_IN_THESE_PRCEEDINGS}`,    //57
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_VIEW_ALL_DOCUMENTS,         //58
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => `${RESPONDENT}${OTHER_DOCUMENTS}`,
  },
  {
    url: `${RESPONDENT}${OTHER_DOCUMENTS}`,     //59
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,        //60
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: RESPOND_TO_APPLICATION,    //61
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPNDT_TO_APPLICATION_SUMMARY,
  },
  {
    url: RESPNDT_TO_APPLICATION_SUMMARY,    //62
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CA_RESPONDENT_RESPONSE_SUBMIT,
  },
  {
    url: CA_RESPONDENT_RESPONSE_CONFIRMATION,   //63
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,      //64
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
  },
  {
    url: RESPONDENT_TASK_LIST_URL,        //65
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_ATTENDING_THE_COURT,
  },
  {
    url: CA_DA_ATTENDING_THE_COURT,       //66
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_LANGUAGE_REQUIREMENTS,
  },
  {
    url: CA_DA_LANGUAGE_REQUIREMENTS,     //67
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_SPECIAL_ARRANGEMENTS,
  },
  {
    url: CA_DA_SPECIAL_ARRANGEMENTS,      //68
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_REASONABLE_ADJUSTMENTS,
  },
  {
    url: CA_DA_REASONABLE_ADJUSTMENTS,    //69
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => CA_DA_DOCUMENTS_SUPPORT,
  },
  {
    url: CA_DA_DOCUMENTS_SUPPORT,       //70
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
    getNextStep: () => CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  },
  {
    url: CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => RESPONDENT_TASK_LIST_URL,
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
];
