import { Case, CaseWithId } from '../../app/case/case';
import { CaseType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import ContactPreferenceNavigationController from '../common/contact-preference/navigationController';
import { Sections, Step } from '../constants';
import {
  APPLICANT_ADDRESS_CONFIRMATION,
  APPLICANT_ADDRESS_DETAILS,
  APPLICANT_ADDRESS_HISTORY,
  APPLICANT_ADDRESS_LOOKUP,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_CONTACT_DETAILS,
  APPLICANT_CONTACT_DETAILS_SAVE,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_FIND_ADDRESS,
  APPLICANT_KEEP_DETAILS_PRIVATE_SAVE,
  APPLICANT_MANUAL_ADDRESS,
  APPLICANT_PERSONAL_DETAILS,
  APPLICANT_POSTAL_ADDRESS_DETAILS,
  APPLICANT_PRIVATE_DETAILS_CONFIRMED,
  APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  APPLICANT_SELECT_ADDRESS,
  APPLICANT_START_ALTERNATIVE,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_YOURHEARINGS_HEARINGS,
  // eslint-disable-next-line sort-imports
  C100_APPLICANT_TASKLIST,
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  APPLICANT_STATEMENT_OF_SERVICE,
  APPLICANT_STATEMENT_OF_SERVICE_NEXT,
  APPLICANT_STATEMENT_OF_SERVICE_SUMMARY,
  PageLink,
  CHOOSE_CONTACT_PREFERENCE,
  CONTACT_PREFERENCE_CONFIRMATION,
  REVIEW_CONTACT_PREFERENCE,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_DOCUMENTS,
  UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
  UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE,
  UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
  UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
  UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT,
  UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT,
  FETCH_CASE_DETAILS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_ALL_ORDERS,
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
    //10
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
    url: APPLICANT_YOURHEARINGS_HEARINGS,
    showInSection: Sections.AboutApplicantCase,
    // getController: HearingsGetController,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_YOURHEARINGS_HEARINGS,
  },
  {
    url: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    //80
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
  {
    url: UPLOAD_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(
        caseData?.hasCourtAskedForThisDoc === YesOrNo.NO
          ? UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE
          : UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
        {
          partyType: req!.params.partyType,
          docCategory: req!.params.docCategory,
        }
      ) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS, {
        partyType: req!.params.partyType,
        docCategory: req!.params.docCategory,
      }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(
        caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES
          ? UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT
          : UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS,
        {
          partyType: req!.params.partyType,
          docCategory: req!.params.docCategory,
        }
      ) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
        partyType: req!.params.partyType,
        docCategory: req!.params.docCategory,
      }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_DOCUMENT_SUCCESS, {
        partyType: req!.params.partyType,
        docCategory: req!.params.docCategory,
      }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_ALL_DOCUMENT_TYPES,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_APPLICATION_PACK_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_ALL_ORDERS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: UPLOAD_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(
        caseData?.hasCourtAskedForThisDoc === YesOrNo.NO
          ? UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE
          : UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
        {
          partyType: req!.params.partyType,
          docCategory: req!.params.docCategory,
        }
      ) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS, {
        partyType: req!.params.partyType,
        docCategory: req!.params.docCategory,
      }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(
        caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES
          ? UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT
          : UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS,
        {
          partyType: req!.params.partyType,
          docCategory: req!.params.docCategory,
        }
      ) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
        partyType: req!.params.partyType,
        docCategory: req!.params.docCategory,
      }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_DOCUMENT_SUCCESS, {
        partyType: req!.params.partyType,
        docCategory: req!.params.docCategory,
      }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_ALL_DOCUMENT_TYPES,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_APPLICATION_PACK_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_ALL_ORDERS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: VIEW_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => '/',
  },
  {
    url: APPLICANT_TASK_LIST_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<CaseWithId>, req) =>
      applyParms(APPLICANT_STATEMENT_OF_SERVICE, { context: req!.params.context }) as PageLink,
  },
  {
    url: APPLICANT_STATEMENT_OF_SERVICE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (data: Partial<CaseWithId>, req) =>
      applyParms(APPLICANT_STATEMENT_OF_SERVICE_SUMMARY, { context: req!.params.context }) as PageLink,
  },
  {
    url: `${APPLICANT_STATEMENT_OF_SERVICE_SUMMARY}`,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_STATEMENT_OF_SERVICE_NEXT,
  },
  {
    url: APPLICANT_STATEMENT_OF_SERVICE_NEXT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id }) as PageLink,
  },
];
