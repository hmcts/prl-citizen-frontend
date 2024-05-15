import { Case } from '../../app/case/case';
import { RootContext, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import { Sections, Step } from '../constants';
import {
  C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  CA_RESPONDENT_RESPONSE_CONFIRMATION,
  CONSENT_SUMMARY,
  CONSENT_TO_APPLICATION,
  COURT_PROCEEDINGS_SUMMARY,
  DOMESTIC_ABUSE_RISK,
  DOMESTIC_ABUSE_RISK_NO,
  FETCH_CASE_DETAILS,
  INTERNATIONAL_FACTORS_JURISDICTION,
  INTERNATIONAL_FACTORS_PARENTS,
  INTERNATIONAL_FACTORS_REQUEST,
  INTERNATIONAL_FACTORS_START,
  INTERNATIONAL_FACTORS_SUMMARY,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_ORDER_DETAILS,
  PROCEEDINGS_START,
  PROCEEDINGS_SUMMARY,
  PageLink,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_MANUAL,
  RESPONDENT_ADDRESS_SELECT,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_PERSONAL_DETAILS,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_TO_APPLICATION_SUMMARY,
  RESPOND_TO_APPLICATION,
  SAFETY_MAIN_PAGE,
  YOUR_SAFETY,
} from '../urls';

import OtherProceedingsNavigationController from './proceedings/navigationController';

export const responseCaseSequence: Step[] = [
  {
    url: CONSENT_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CONSENT_SUMMARY,
  },
  {
    url: CONSENT_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => '/',
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
    getNextStep: () => '/',
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
    getNextStep: () => '/',
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
    getNextStep: (caseData: Partial<Case>): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(PROCEEDINGS_START, caseData);
    },
  },
  {
    url: PROCEEDINGS_COURT_PROCEEDINGS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData: Partial<Case>): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(PROCEEDINGS_COURT_PROCEEDINGS, caseData);
    },
  },
  {
    url: PROCEEDINGS_ORDER_DETAILS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(PROCEEDINGS_ORDER_DETAILS, caseData, req!.params);
    },
  },
  {
    url: OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, caseData, req!.params);
    },
  },
  {
    url: COURT_PROCEEDINGS_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => PROCEEDINGS_SUMMARY,
  },
  {
    url: PROCEEDINGS_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => '/',
  },
  {
    url: RESPOND_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { root: RootContext.RESPONDENT }) as PageLink,
  },
  {
    url: RESPOND_TO_APPLICATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => RESPONDENT_TO_APPLICATION_SUMMARY,
  },
  {
    url: RESPONDENT_TO_APPLICATION_SUMMARY,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => CA_RESPONDENT_RESPONSE_CONFIRMATION,
  },
  {
    url: CA_RESPONDENT_RESPONSE_CONFIRMATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
];
