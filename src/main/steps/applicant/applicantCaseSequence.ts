import { CaseWithId } from '../../app/case/case';
import { PartyType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { UploadDocumentCategory } from '../../steps/common/documents/definitions';
import { applyParms } from '../../steps/common/url-parser';
import ContactPreferenceNavigationController from '../common/contact-preference/navigationController';
import KeepDetailsPrivateNavigationController from '../common/keep-details-private/navigationController';
import RemoveLegalRepresentativeNavigationController from '../common/remove-legal-representative/navigationController';
import { Sections, Step } from '../constants';
import {
  APPLICANT_ADDRESS_CONFIRMATION,
  APPLICANT_ADDRESS_DETAILS,
  APPLICANT_ADDRESS_HISTORY,
  APPLICANT_ADDRESS_LOOKUP,
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_CONTACT_DETAILS,
  APPLICANT_FIND_ADDRESS,
  APPLICANT_MANUAL_ADDRESS,
  APPLICANT_PERSONAL_DETAILS,
  APPLICANT_SELECT_ADDRESS,
  APPLICANT_YOURHEARINGS_HEARINGS,
  CHOOSE_CONTACT_PREFERENCE,
  CONTACT_PREFERENCE_CONFIRMATION,
  DETAILS_KNOWN,
  FETCH_CASE_DETAILS,
  PRIVATE_DETAILS_CONFIRMED,
  PRIVATE_DETAILS_NOT_CONFIRMED,
  PageLink,
  REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  REMOVE_LEGAL_REPRESENTATIVE_START,
  REVIEW_CONTACT_PREFERENCE,
  START_ALTERNATIVE,
  STATEMENT_OF_SERVICE_REVIEW,
  STATEMENT_OF_SERVICE_SUCCESS,
  STATEMENT_OF_SERVICE_WHO_WAS_SERVED,
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
  UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT,
  UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT,
  UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
  UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS,
  UPLOAD_STATEMENT_OF_SERVICE,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
  VIEW_APPLICATION_PACK_DOCUMENTS,
  VIEW_DOCUMENTS,
} from '../urls';

export const applicantCaseSequence: Step[] = [
  {
    url: DETAILS_KNOWN,
    subDir: '/common',
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(DETAILS_KNOWN, caseData, req!),
  },
  {
    url: START_ALTERNATIVE,
    subDir: '/common',
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(START_ALTERNATIVE, caseData, req!),
  },
  {
    url: PRIVATE_DETAILS_CONFIRMED,
    subDir: '/common',
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(PRIVATE_DETAILS_CONFIRMED, caseData, req!),
  },
  {
    url: PRIVATE_DETAILS_NOT_CONFIRMED,
    subDir: '/common',
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      KeepDetailsPrivateNavigationController.getNextPageUrl(PRIVATE_DETAILS_NOT_CONFIRMED, caseData, req!),
  },
  {
    url: APPLICANT_CHECK_ANSWERS,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => '/',
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
    url: APPLICANT_YOURHEARINGS_HEARINGS,
    showInSection: Sections.AboutApplicantCase,
    // getController: HearingsGetController,
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
  {
    url: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
  {
    //80
    url: REMOVE_LEGAL_REPRESENTATIVE_START,
    subDir: '/common',
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      RemoveLegalRepresentativeNavigationController.getNextPageUrl(REMOVE_LEGAL_REPRESENTATIVE_START, caseData, req!),
  },
  {
    url: REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
    subDir: '/common',
    showInSection: Sections.AboutApplicantCase,
    getNextStep: (caseData, req) =>
      RemoveLegalRepresentativeNavigationController.getNextPageUrl(REMOVE_LEGAL_REPRESENTATIVE_CONFIRM, caseData, req!),
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
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
  {
    url: UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(
        req?.params.docCategory === UploadDocumentCategory.FM5_DOCUMENT
          ? UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS
          : UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS,
        {
          partyType: req!.params.partyType,
          docCategory: req!.params.docCategory,
        }
      ) as PageLink,
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
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: String(caseData?.id) }) as PageLink,
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
    url: STATEMENT_OF_SERVICE_WHO_WAS_SERVED,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(UPLOAD_STATEMENT_OF_SERVICE, {
        partyType: PartyType.APPLICANT,
        context: req?.params?.context ?? 'personal-service',
      }) as PageLink,
  },
  {
    url: UPLOAD_STATEMENT_OF_SERVICE,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: (caseData, req) =>
      applyParms(STATEMENT_OF_SERVICE_REVIEW, {
        partyType: PartyType.APPLICANT,
        context: req?.params?.context ?? 'personal-service',
      }) as PageLink,
  },
  {
    url: STATEMENT_OF_SERVICE_REVIEW,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: () => applyParms(STATEMENT_OF_SERVICE_SUCCESS, { partyType: PartyType.APPLICANT }) as PageLink,
  },
  {
    url: STATEMENT_OF_SERVICE_SUCCESS,
    showInSection: Sections.AboutApplicantCase,
    subDir: '/common',
    getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData?.id as string }) as PageLink,
  },
];
