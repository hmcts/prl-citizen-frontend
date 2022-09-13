import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  C7_RESPONSE_START,
  CONSENT_SUMMARY,
  CONSENT_TO_APPLICATION,
  COURT_PROCEEDINGS_SUMMARY,
  DOMESTIC_ABUSE_RISK,
  DOMESTIC_ABUSE_RISK_NO,
  EMOTIONAL_ABUSE,
  EMOTIONAL_ABUSE_DESCRIPTION,
  FINANCIAL_ABUSE,
  FINANCIAL_ABUSE_DESCRIPTION,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  INTERNATIONAL_FACTORS_SUMMARY,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  PHYSICAL_ABUSE,
  PHYSICAL_ABUSE_DESCRIPTION,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_START,
  PSYCHOLOGICAL_ABUSE,
  PSYCHOLOGICAL_ABUSE_DESCRIPTION,
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
  RESPONDENT_PERSONAL_DETAILS,
  RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_START_ALTERNATIVE,
  RESPONDENT_UPLOAD_DOCUMENT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_UPLOAD_DOCUMENT_SUCCESS,
  SAFETY_MAIN_PAGE,
  SEXUAL_ABUSE,
  SEXUAL_ABUSE_DESCRIPTION,
  YOUR_SAFETY,
} from '../urls';

export const responseCaseSequence: Step[] = [
  {
    url: C7_RESPONSE_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: CONSENT_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CONSENT_SUMMARY,
  },
  {
    url: CONSENT_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: RESPONDENT_CHECK_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: RESPONDENT_PERSONAL_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: RESPONDENT_CONTACT_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: RESPONDENT_ADDRESS_BLANK,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: RESPONDENT_ADDRESS_HISTORY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: data => SEXUAL_ABUSE,
  },
  {
    url: SEXUAL_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => SEXUAL_ABUSE_DESCRIPTION,
  },
  {
    url: SEXUAL_ABUSE_DESCRIPTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PHYSICAL_ABUSE,
  },
  {
    url: PHYSICAL_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PHYSICAL_ABUSE_DESCRIPTION,
  },
  {
    url: PHYSICAL_ABUSE_DESCRIPTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => FINANCIAL_ABUSE,
  },
  {
    url: FINANCIAL_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => FINANCIAL_ABUSE_DESCRIPTION,
  },
  {
    url: FINANCIAL_ABUSE_DESCRIPTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PSYCHOLOGICAL_ABUSE,
  },
  {
    url: PSYCHOLOGICAL_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PSYCHOLOGICAL_ABUSE_DESCRIPTION,
  },
  {
    url: PSYCHOLOGICAL_ABUSE_DESCRIPTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => EMOTIONAL_ABUSE,
  },
  {
    url: EMOTIONAL_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => EMOTIONAL_ABUSE_DESCRIPTION,
  },
  {
    url: EMOTIONAL_ABUSE_DESCRIPTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: SEXUAL_ABUSE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => SEXUAL_ABUSE_DESCRIPTION,
  },
  {
    url: SEXUAL_ABUSE_DESCRIPTION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
  },
  {
    url: DOMESTIC_ABUSE_RISK_NO,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: () => C7_RESPONSE_START,
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
    getNextStep: () => C7_RESPONSE_START,
  },
];
