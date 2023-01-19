import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_AMOUNT,
  C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_OFFICE,
  C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFIED,
  C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS,
  C1A_SAFETY_CONCERNS_ABDUCTION_THREATS,
  C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS,
  C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS_SAVE,
  C7_ATTENDING_THE_COURT,
  C7_COMMUNICATION_HELP,
  C7_COURT_HEARING_COMFORT,
  C7_COURT_HEARING_SUPPORT,
  C7_DOCUMENTS_SUPPORT,
  C7_LANGUAGE_REQUIREMENTS,
  C7_REASONABLE_ADJUSTMENTS,
  C7_SPECIAL_ARRANGEMENTS,
  C7_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
  C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  C7_TRAVELLING_TO_COURT,
  CONSENT_SAVE,
  CONSENT_SUMMARY,
  CONSENT_TO_APPLICATION,
  COURT_PROCEEDINGS_SUMMARY,
  DOMESTIC_ABUSE_RISK,
  DOMESTIC_ABUSE_RISK_NO,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_SAVE,
  INTERNATIONAL_FACTORS_START,
  INTERNATIONAL_FACTORS_SUMMARY,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_SAVE,
  MIAM_START,
  MIAM_SUMMARY,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
  PRL_C1A_SAFETY_CONCERNS_NOFEEDBACK,
  PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_COURT_ACTION,
  PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_OTHER,
  PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_UNSUPERVISED,
  PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_MANUAL,
  RESPONDENT_ADDRESS_SELECT,
  RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CHECK_ANSWERS_NO,
  RESPONDENT_CHECK_ANSWERS_YES,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_PERSONAL_DETAILS,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_UPLOAD_DOCUMENT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  RESPONDENT_YOUR_CHILD_CONCERNS,
  RESPOND_TO_APPLICATION,
  SAFETY_MAIN_PAGE,
  YOUR_SAFETY,
} from '../urls';

import SafteyConcernsNavigationController from './allegations-of-harm-and-violence/navigationController';
import ReasonableAdjustmentsNavigationController from './support-you-need-during-case/navigationController';

export const responseCaseSequence: Step[] = [
  {
    url: CONSENT_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CONSENT_SUMMARY,
  },
  {
    url: CONSENT_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CONSENT_SAVE,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
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
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: RESPONDENT_PERSONAL_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: RESPONDENT_CONTACT_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
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
    getNextStep: () => RESPOND_TO_APPLICATION,
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
    getNextStep: () => INTERNATIONAL_FACTORS_SAVE,
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
    getNextStep: () => RESPOND_TO_APPLICATION,
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
    getNextStep: () => RESPOND_TO_APPLICATION,
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
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: C7_ATTENDING_THE_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => C7_LANGUAGE_REQUIREMENTS,
  },
  {
    url: C7_LANGUAGE_REQUIREMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => C7_SPECIAL_ARRANGEMENTS,
  },
  {
    url: C7_SPECIAL_ARRANGEMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => C7_REASONABLE_ADJUSTMENTS,
  },
  {
    url: C7_REASONABLE_ADJUSTMENTS,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(C7_REASONABLE_ADJUSTMENTS, caseData),
  },
  {
    url: C7_DOCUMENTS_SUPPORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(C7_DOCUMENTS_SUPPORT, caseData),
  },
  {
    url: C7_COMMUNICATION_HELP,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(C7_COMMUNICATION_HELP, caseData),
  },
  {
    url: C7_COURT_HEARING_SUPPORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(C7_COURT_HEARING_SUPPORT, caseData),
  },
  {
    url: C7_COURT_HEARING_COMFORT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(C7_COURT_HEARING_COMFORT, caseData),
  },
  {
    url: C7_TRAVELLING_TO_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: caseData => ReasonableAdjustmentsNavigationController.getNextUrl(C7_TRAVELLING_TO_COURT, caseData),
  },
  {
    url: C7_TRAVELLING_TO_COURT,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  },
  {
    url: C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
    showInSection: Sections.AboutCaAndDaRespondentCase,
    getNextStep: () => C7_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
  },
  {
    url: RESPOND_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  },
  {
    url: RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_YOUR_CHILD_CONCERNS,
  },
  {
    url: RESPONDENT_YOUR_CHILD_CONCERNS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: data =>
      data.PRL_c1A_haveSafetyConcerns === YesOrNo.NO ? RESPONDENT_CHECK_ANSWERS_NO : RESPONDENT_CHECK_ANSWERS_YES,
  },
  {
    url: RESPONDENT_CHECK_ANSWERS_YES,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(RESPONDENT_CHECK_ANSWERS_YES, caseData, req?.params),
  },
  {
    url: RESPONDENT_CHECK_ANSWERS_NO,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPOND_TO_APPLICATION,
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
        caseData,
        req?.params
      ),
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
        caseData,
        req?.params
      ),
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, req?.params),
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE,
        caseData,
        req?.params
      ),
  },
  {
    url: C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
    showInSection: Sections.C100,
    getNextStep: () => C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_OFFICE,
  },
  {
    url: C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_OFFICE,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.PRL_c1A_passportOffice === YesOrNo.YES
        ? C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_AMOUNT
        : C1A_SAFETY_CONCERNS_ABDUCTION_THREATS,
  },
  {
    url: C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_PASSPORT_AMOUNT,
    showInSection: Sections.C100,
    getNextStep: () => C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFIED,
  },
  {
    url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFIED,
    showInSection: Sections.C100,
    getNextStep: () => C1A_SAFETY_CONCERNS_ABDUCTION_THREATS,
  },
  {
    url: C1A_SAFETY_CONCERNS_ABDUCTION_THREATS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      caseData.PRL_c1A_childAbductedBefore === YesOrNo.YES
        ? C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS
        : SafteyConcernsNavigationController.getNextUrl(C1A_SAFETY_CONCERNS_ABDUCTION_THREATS, caseData, req?.params),
  },
  {
    url: C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS,
        caseData,
        req?.params
      ),
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_OTHER,
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_OTHER,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_COURT_ACTION,
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_COURT_ACTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_UNSUPERVISED,
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_UNSUPERVISED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS,
  },
  {
    url: C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS_SAVE,
  },
  {
    url: PRL_C1A_SAFETY_CONCERNS_NOFEEDBACK,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  },
];
