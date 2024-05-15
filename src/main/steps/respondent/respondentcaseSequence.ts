import { CaseWithId } from '../../app/case/case';
import { PartyType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import ContactPreferenceNavigationController from '../common/contact-preference/navigationController';
import KeepDetailsPrivateNavigationController from '../common/keep-details-private/navigationController';
import { Sections, Step } from '../constants';
import {
  CA_RESPONDENT_RESPONSE_CONFIRMATION,
  CHOOSE_CONTACT_PREFERENCE,
  CONTACT_PREFERENCE_CONFIRMATION,
  DETAILS_KNOWN,
  FETCH_CASE_DETAILS,
  LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
  LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
  LEGAL_REPRESENTATION_START,
  MIAM_ATTEND_WILLINGNESS,
  MIAM_START,
  MIAM_SUMMARY,
  PRIVATE_DETAILS_CONFIRMED,
  PRIVATE_DETAILS_NOT_CONFIRMED,
  PageLink,
  REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  REMOVE_LEGAL_REPRESENTATIVE_START,
  RESPONDENT_ADDRESS_CONFIRMATION,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_ADDRESS_HISTORY,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_ADDRESS_MANUAL,
  RESPONDENT_ADDRESS_SELECT,
  RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS,
  RESPONDENT_FIND_ADDRESS,
  RESPONDENT_PERSONAL_DETAILS,
  RESPONDENT_YOURHEARINGS_HEARINGS,
  RESPOND_TO_APPLICATION,
  REVIEW_CONTACT_PREFERENCE,
  START_ALTERNATIVE,
  TASKLIST_RESPONDENT,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_DOCUMENTS,
} from '../urls';

export const respondentCaseSequence: Step[] = [
  {
    url: DETAILS_KNOWN,
    subDir: '/common',
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(DETAILS_KNOWN, caseData, req!),
  },
  {
    url: START_ALTERNATIVE,
    subDir: '/common',
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => '/',
  },
  {
    url: PRIVATE_DETAILS_CONFIRMED,
    subDir: '/common',
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(PRIVATE_DETAILS_CONFIRMED, caseData, req!),
  },
  {
    url: PRIVATE_DETAILS_NOT_CONFIRMED,
    subDir: '/common',
    showInSection: Sections.AboutRespondentCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(PRIVATE_DETAILS_NOT_CONFIRMED, caseData, req!),
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
    url: RESPONDENT_CHECK_ANSWERS,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => '/',
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
    url: CA_RESPONDENT_RESPONSE_CONFIRMATION,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => TASKLIST_RESPONDENT,
  },
  {
    url: LEGAL_REPRESENTATION_START,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => '/',
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
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
  {
    url: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
    showInSection: Sections.AboutRespondentCase,
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
  {
    url: REMOVE_LEGAL_REPRESENTATIVE_START,
    subDir: '/common',
    showInSection: Sections.AboutRespondentCase,
    getNextStep: () => applyParms(REMOVE_LEGAL_REPRESENTATIVE_CONFIRM, { partyType: PartyType.RESPONDENT }) as PageLink,
  },
  {
    url: REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
    subDir: '/common',
    showInSection: Sections.AboutRespondentCase,
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
  {
    url: VIEW_ALL_DOCUMENT_TYPES,
    showInSection: Sections.AboutRespondentCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_APPLICATION_PACK_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_ALL_ORDERS,
    showInSection: Sections.AboutRespondentCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_DOCUMENTS,
    showInSection: Sections.AboutRespondentCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: CHOOSE_CONTACT_PREFERENCE,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest) =>
      ContactPreferenceNavigationController.getNextPageUrl(CHOOSE_CONTACT_PREFERENCE, caseData, req!),
  },
  {
    url: REVIEW_CONTACT_PREFERENCE,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest) =>
      ContactPreferenceNavigationController.getNextPageUrl(REVIEW_CONTACT_PREFERENCE, caseData, req!),
  },
  {
    url: CONTACT_PREFERENCE_CONFIRMATION,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest) =>
      ContactPreferenceNavigationController.getNextPageUrl(CONTACT_PREFERENCE_CONFIRMATION, caseData, req!),
  },
];
