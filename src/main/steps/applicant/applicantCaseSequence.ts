import { Case, CaseWithId } from '../../app/case/case';
import { CaseType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import DocumentUploadPostController from '../../steps/common/upload-document/DocumentUploadPostController';
import { applyParms } from '../../steps/common/url-parser';
import ContactPreferenceNavigationController from '../common/contact-preference/navigationController';
import { Sections, Step } from '../constants';
import {
  ALLEGATION_OF_HARM_VOILENCE_DOC,
  APPLICANT,
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
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_PERSONAL_DETAILS,
  APPLICANT_POSTAL_ADDRESS_DETAILS,
  APPLICANT_PRIVATE_DETAILS_CONFIRMED,
  APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  APPLICANT_SELECT_ADDRESS,
  APPLICANT_START_ALTERNATIVE,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_UPLOAD_DOCUMENT,
  APPLICANT_UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
  APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_UPLOAD_DOCUMENT_SUCCESS,
  // APPLICANT_START_ALTERNATIVE,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_WITNESS_STATEMENTS_DA,
  APPLICANT_YOURHEARINGS_HEARINGS,
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  DIGITAL_DOWNLOADS,
  DRUG_ALCOHOL_TESTS,
  LETTER_FROM_SCHOOL,
  MEDICAL_RECORDS,
  MEDICAL_REPORTS,
  OTHER_DOCUMENTS,
  OTHER_PEOPLE_WITNESS_STATEMENTS,
  PATERNITY_TEST_REPORTS,
  POLICE_DISCLOSURE,
  POSITION_STATEMENTS,
  PREVIOUS_ORDERS_SUBMITTED,
  RESPONDENT_RISK_ASSESSMENT,
  RESPONDENT_SAFEGUARDING_LETTER,
  RESPONDENT_SECTION37_REPORT,
  RESPONDENT_SECTION7_REPORT,
  RESPOND_TO_OTHERS_ALLEGATION_OF_HARM_VOILENCE_DOC,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  WITNESS_AVAILABILITY,
  YOUR_WITNESS_STATEMENTS,
  // eslint-disable-next-line sort-imports
  C100_APPLICANT_TASKLIST,
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  APPLICANT_UPLOAD_DOCUMENT_PERMISSION_TO_SUBMIT_EXTRA_EVIDENCE,
  PageLink,
  CHOOSE_CONTACT_PREFERENCE,
  CONTACT_PREFERENCE_CONFIRMATION,
  REVIEW_CONTACT_PREFERENCE,
  APPLICANT_UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
  APPLICANT_UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT,
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
    //20
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
    //30
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
    //40
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
    getNextStep: () => APPLICANT_UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      caseData?.hasCourtAskedForThisDoc === YesOrNo.NO
        ? APPLICANT_UPLOAD_DOCUMENT_PERMISSION_TO_SUBMIT_EXTRA_EVIDENCE
        : (applyParms(APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL, {
            docCategory: req!.params.docCategory,
            docType: req!.params.docType,
          }) as PageLink),
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_PERMISSION_TO_SUBMIT_EXTRA_EVIDENCE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      applyParms(APPLICANT_UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS, {
        docCategory: req!.params.docCategory,
        docType: req!.params.docType,
      }) as PageLink,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      applyParms(
        caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES
          ? APPLICANT_UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT
          : APPLICANT_UPLOAD_DOCUMENT,
        {
          docCategory: req!.params.docCategory,
          docType: req!.params.docType,
        }
      ) as PageLink,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      applyParms(APPLICANT_UPLOAD_DOCUMENT, {
        docCategory: req!.params.docCategory,
        docType: req!.params.docType,
      }) as PageLink,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT,
    showInSection: Sections.AboutApplicantCase,
    postController: DocumentUploadPostController,
    getNextStep: () => APPLICANT_UPLOAD_DOCUMENT_SUCCESS,
  },
  {
    url: APPLICANT_UPLOAD_DOCUMENT_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => APPLICANT_TASK_LIST_URL,
  },
  {
    //50
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
    // getController: HearingsGetController,
    getNextStep: (data: Partial<Case>) =>
      data.caseTypeOfApplication === CaseType.C100 ? C100_APPLICANT_TASKLIST : APPLICANT_TASK_LIST_URL,
  },
  {
    url: APPLICANT_VIEW_ALL_DOCUMENTS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => `${APPLICANT}${RESPONDENT_SAFEGUARDING_LETTER}`,
  },
  {
    //60
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
    //70
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
    postController: DocumentUploadPostController,
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
    postController: DocumentUploadPostController,
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
];
