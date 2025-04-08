import {
  C100_WITHDRAW_CASE,
  C100_WITHDRAW_CASE_CONFIRMATION,
  PARTY_TASKLIST,
  // eslint-disable-next-line sort-imports
  C100_CHILD_ADDRESS,
  C100_CONFIDENTIALITY_DETAILS_KNOW,
  C100_CONFIDENTIALITY_FEEDBACK,
  C100_CONFIDENTIALITY_FEEDBACK_NO,
  C100_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_HEARING_WITHOUT_NOTICE_PART1,
  C100_HEARING_WITHOUT_NOTICE_PART2,
  C100_INTERNATIONAL_ELEMENTS_JURISDICTION,
  C100_INTERNATIONAL_ELEMENTS_PARENTS,
  C100_INTERNATIONAL_ELEMENTS_REQUEST,
  C100_INTERNATIONAL_ELEMENTS_START,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_START,
  C100_TYPE_ORDER_CAORDER,
  C100_TYPE_ORDER_SELECT_COURT_ORDER,
  C100_TYPE_ORDER_SHORT_STATEMENT,
  /** @C100 Help with Fees */
  // eslint-disable-next-line sort-imports
  C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
  C100_HELP_WITH_FEES_FEES_APPLIED,
  C100_HELP_WITH_FEES_HWF_GUIDANCE,
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_FURTHER_INFORMATION,
  C100_CONFIRMATIONPAGE,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,

  /** @MIAM MIAM */
  C100_MIAM_UPLOAD_CONFIRMATION,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_OTHER_PROCEEDINGS,
  C100_MIAM_MEDIATOR_DOCUMENT,
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_ATTENDANCE,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_MEDIATOR_CONFIRMAION,
  C100_MIAM_URGENCY,
  C100_MIAM_INFO,
  C100_MIAM_VALID_REASON,
  C100_MIAM_NONEED,
  C100_MIAM_OTHER,
  C100_MIAM_GENERAL_REASONS,
  C100_MIAM_GET_MEDIATOR,
  C100_MIAM_UPLOAD,
  C100_MIAM_GET_DOC,

  /** Hearing Urgency */
  C100_HEARING_URGENCY_URGENT,
  C100_HEARING_URGENCY_URGENT_DETAILS,
  C100_SCREENING_QUESTIONS_ALTERNATIVE_ROUTES,
  PageLink,
  C100_MIAM_EXCEMPTION_SUMMARY,

  /** Consent Order questions */
  C100_CONSENT_ORDER_UPLOAD,
  C100_CONSENT_ORDER_UPLOAD_CONFIRMATION,

  /** Screening Questions */
  C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT,
  C100_SCREENING_QUESTIONS_ALTERNATIVE_RESOLUTION,
  C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION,
  C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION,
  C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST,
  C100_SCREENING_QUESTIONS_PERMISSIONS_WHY,
  C100_SCREENING_QUESTIONS_COURT_PERMISSION,
  C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE,

  /** @C100 Applicant in people section */
  C100_APPLICANT_ADD_APPLICANTS,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
  C100_APPLICANT_ADDRESS_LOOKUP,
  C100_APPLICANT_ADDRESS_SELECT,
  C100_APPLICANT_ADDRESS_MANUAL,
  C100_APPLICANT_RELATIONSHIP_TO_CHILD,

  /** @C100 Other children in people section */
  C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
  C100_CHILDERN_DETAILS_OTHER_CHILDREN,
  C100_CHILDERN_OTHER_CHILDREN_NAMES,

  /** Respondent Details */
  C100_RESPONDENT_DETAILS_ADD,
  C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
  C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP,
  C100_RESPONDENT_DETAILS_ADDRESS_SELECT,
  C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
  C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
  C100_RESPONDENT_DETAILS_CONTACT_DETAILS,

  /** Other Person Details */
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_CHECK,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
  C100_APPLICANTS_PERSONAL_DETAILS,
  C100_APPLICANT_CONTACT_DETAIL,
  C100_CHECK_YOUR_ANSWER,
  C100_APPLICANT_CONTACT_PREFERENCES,
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  C100_CHILDERN_LIVING_ARRANGEMENTS,
  C100_CHILDERN_MAINLY_LIVE_WITH,
  C100_MIAM_NO_ACCESS_MEDIATOR,
  C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING,
  C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR,
  C100_MIAM_PROVIDING_DA_EVIDENCE,
  C100_MIAM_UPLOAD_DA_EVIDENCE,
  C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY,
} from './../urls';

/* eslint-disable import/order */
import { Case, CaseWithId } from '../../app/case/case';
import { MiamNonAttendReason, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Sections, Step } from '../constants';

import ChildrenDetailsNavigationController from './child-details/navigationController';
import OtherChildrenDetailsNavigationController from './child-details/other-children/navigationController';
import MIAMNavigationController from './miam/navigationController';
import OtherPersonsDetailsNavigationController from './other-person-details/navigationController';
import PreviousProceedingsNavigationController from './other-proceedings/navigationController';
import RespondentsDetailsNavigationController from './respondent-details/navigationController';
import ApplicantNavigationController from './applicant/navigationController';
import AddPeoplePostContoller from './people/AddPeoplePostContoller';
import ChildDetailsPostController from './child-details/childDetailPostController';
import ApplicantCommonConfidentialityController from './applicant/confidentiality/common/commonConfidentialityPostController';
import LookupAndManualAddressPostController from './people/LookupAndManualAddressPostController';
import UploadDocumentController from './uploadDocumentController';
import { applyParms } from '../../steps/common/url-parser';
import { RARootContext } from '../../modules/reasonable-adjustments/definitions';
import { isC100ApplicationValid } from './utils';

export const C100Sequence: Step[] = [
  {
    //0
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_START_ALTERNATIVE,
  },
  {
    url: C100_CONFIDENTIALITY_FEEDBACK,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_START,
  },
  {
    url: C100_CONFIDENTIALITY_FEEDBACK_NO,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_START,
  },
  {
    url: C100_CONFIDENTIALITY_START_ALTERNATIVE,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.startAlternative === YesOrNo.YES ? C100_CONFIDENTIALITY_FEEDBACK : C100_CONFIDENTIALITY_FEEDBACK_NO,
  },
  {
    url: C100_INTERNATIONAL_ELEMENTS_START,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_PARENTS,
  },
  {
    url: C100_INTERNATIONAL_ELEMENTS_PARENTS,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_JURISDICTION,
  },
  {
    url: C100_INTERNATIONAL_ELEMENTS_JURISDICTION,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_REQUEST,
  },
  {
    url: C100_INTERNATIONAL_ELEMENTS_REQUEST,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest) =>
      isC100ApplicationValid(caseData as CaseWithId, req!)
        ? C100_CHECK_YOUR_ANSWER
        : (applyParms(REASONABLE_ADJUSTMENTS_ATTENDING_COURT, { root: RARootContext.C100_REBUILD }) as PageLink),
  },
  {
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: () => C100_HEARING_WITHOUT_NOTICE_PART1,
  },
  {
    //10
    url: C100_HEARING_WITHOUT_NOTICE_PART1,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest): PageLink => {
      if (caseData.hwn_hearingPart1 === YesOrNo.YES) {
        return C100_HEARING_WITHOUT_NOTICE_PART2;
      } else if (isC100ApplicationValid(caseData as CaseWithId, req!)) {
        return C100_CHECK_YOUR_ANSWER;
      }

      return caseData.sq_writtenAgreement === YesOrNo.NO &&
        caseData.miam_validReason === YesOrNo.YES &&
        MIAMNavigationController.checkForAnyValidReason(caseData, MiamNonAttendReason.URGENT)
        ? C100_TYPE_ORDER_SELECT_COURT_ORDER
        : C100_CHILDERN_DETAILS_ADD;
    },
  },
  {
    url: C100_HEARING_WITHOUT_NOTICE_PART2,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest): PageLink => {
      if (isC100ApplicationValid(caseData as CaseWithId, req!)) {
        return C100_CHECK_YOUR_ANSWER;
      }
      return caseData.sq_writtenAgreement === YesOrNo.NO &&
        caseData.miam_validReason === YesOrNo.YES &&
        MIAMNavigationController.checkForAnyValidReason(caseData, MiamNonAttendReason.URGENT)
        ? C100_TYPE_ORDER_SELECT_COURT_ORDER
        : C100_CHILDERN_DETAILS_ADD;
    },
  },
  {
    url: C100_TYPE_ORDER_SELECT_COURT_ORDER,
    showInSection: Sections.C100,
    getNextStep: () => C100_TYPE_ORDER_CAORDER,
  },
  {
    url: C100_TYPE_ORDER_CAORDER,
    showInSection: Sections.C100,
    getNextStep: () => C100_TYPE_ORDER_SHORT_STATEMENT,
  },
  {
    url: C100_TYPE_ORDER_SHORT_STATEMENT,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest): PageLink => {
      if (isC100ApplicationValid(caseData as CaseWithId, req!)) {
        return C100_CHECK_YOUR_ANSWER;
      }

      if (caseData.sq_writtenAgreement === YesOrNo.YES) {
        return C100_CONSENT_ORDER_UPLOAD;
      }

      return caseData.miam_otherProceedings === YesOrNo.NO &&
        caseData.miam_validReason === YesOrNo.YES &&
        MIAMNavigationController.checkForAnyValidReason(caseData, MiamNonAttendReason.URGENT)
        ? C100_CHILDERN_DETAILS_ADD
        : C100_HEARING_URGENCY_URGENT;
    },
  },
  {
    url: C100_START,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHILD_ADDRESS,
  },
  {
    url: C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.hwf_needHelpWithFees === YesOrNo.YES ? C100_HELP_WITH_FEES_FEES_APPLIED : C100_CHECK_YOUR_ANSWER,
  },
  {
    url: C100_HELP_WITH_FEES_FEES_APPLIED,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.hwf_feesAppliedDetails === YesOrNo.YES ? C100_CHECK_YOUR_ANSWER : C100_HELP_WITH_FEES_HWF_GUIDANCE,
  },
  {
    url: C100_HELP_WITH_FEES_HWF_GUIDANCE,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHECK_YOUR_ANSWER,
  },
  {
    url: C100_CHILDERN_DETAILS_ADD,
    showInSection: Sections.C100,
    postController: AddPeoplePostContoller,
    getNextStep: caseData => ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_ADD, caseData),
  },
  {
    //20
    url: C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    postController: ChildDetailsPostController,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, caseData, req),
  },
  {
    url: C100_CHILDERN_DETAILS_CHILD_MATTERS,
    showInSection: Sections.C100,
    postController: ChildDetailsPostController,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_CHILD_MATTERS, caseData, req),
  },
  {
    url: C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
    showInSection: Sections.C100,
    postController: ChildDetailsPostController,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY, caseData, req),
  },
  {
    url: C100_CHILDERN_FURTHER_INFORMATION,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHILDERN_DETAILS_OTHER_CHILDREN,
  },
  {
    url: C100_CONFIRMATIONPAGE,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIRMATIONPAGE,
  },
  {
    url: C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      PreviousProceedingsNavigationController.getNextUrl(C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS, caseData, req),
  },
  {
    url: C100_OTHER_PROCEEDINGS_DETAILS,
    showInSection: Sections.C100,
    getNextStep: caseData =>
      PreviousProceedingsNavigationController.getNextUrl(C100_OTHER_PROCEEDINGS_DETAILS, caseData),
  },
  {
    url: C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest): PageLink => {
      return PreviousProceedingsNavigationController.getNextUrl(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, caseData, req);
    },
  },
  {
    url: C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest): PageLink => {
      return PreviousProceedingsNavigationController.getNextUrl(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, caseData, req);
    },
  },
  {
    url: C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      PreviousProceedingsNavigationController.getNextUrl(C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY, caseData, req),
  },
  {
    url: C100_CHILD_ADDRESS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      isC100ApplicationValid(caseData as CaseWithId, req!)
        ? C100_CHECK_YOUR_ANSWER
        : C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT,
  },
  {
    url: C100_MIAM_MEDIATOR_DOCUMENT,
    showInSection: Sections.C100,
    getNextStep: data => (data.miam_haveDocSigned === YesOrNo.YES ? C100_MIAM_UPLOAD : C100_MIAM_GET_DOC),
  },
  {
    url: C100_MIAM_OTHER_PROCEEDINGS,
    showInSection: Sections.C100,
    getNextStep: data => (data.miam_otherProceedings === YesOrNo.YES ? C100_MIAM_NONEED : C100_MIAM_INFO),
  },
  {
    //40
    url: C100_MIAM_ATTENDANCE,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_attendance === YesOrNo.YES ? C100_MIAM_MEDIATOR_DOCUMENT : C100_MIAM_VALID_REASON,
  },
  {
    url: C100_MIAM_MEDIATOR_CONFIRMAION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_mediatorDocument === YesOrNo.YES ? C100_MIAM_MEDIATOR_DOCUMENT : C100_MIAM_VALID_REASON,
  },
  {
    url: C100_MIAM_URGENCY,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_URGENCY, caseData),
  },
  {
    url: C100_MIAM_PREVIOUS_ATTENDANCE,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_PREVIOUS_ATTENDANCE, caseData),
  },
  {
    url: C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING, caseData),
  },
  {
    url: C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR, caseData),
  },
  {
    url: C100_MIAM_INFO,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_ATTENDANCE,
  },
  {
    url: C100_MIAM_VALID_REASON,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_validReason === YesOrNo.YES ? C100_MIAM_GENERAL_REASONS : C100_MIAM_GET_MEDIATOR,
  },
  {
    url: C100_MIAM_NONEED,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest) =>
      isC100ApplicationValid(data as CaseWithId, req!)
        ? C100_CHECK_YOUR_ANSWER
        : C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  },
  {
    url: C100_MIAM_OTHER,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_OTHER, caseData),
  },
  {
    url: C100_MIAM_NO_ACCESS_MEDIATOR,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_NO_ACCESS_MEDIATOR, caseData),
  },
  {
    url: C100_MIAM_CHILD_PROTECTION,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_CHILD_PROTECTION, caseData),
  },
  {
    //50
    url: C100_MIAM_MIAM_DOMESTIC_ABUSE,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE, caseData),
  },
  {
    url: C100_MIAM_PROVIDING_DA_EVIDENCE,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_PROVIDING_DA_EVIDENCE, caseData),
  },
  {
    url: C100_MIAM_UPLOAD_DA_EVIDENCE,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_UPLOAD_DA_EVIDENCE, caseData),
  },
  {
    url: C100_MIAM_GENERAL_REASONS,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_GENERAL_REASONS, caseData),
  },
  {
    url: C100_MIAM_GET_MEDIATOR,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_GET_MEDIATOR,
  },
  {
    url: C100_MIAM_UPLOAD,
    postController: UploadDocumentController,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_UPLOAD_CONFIRMATION,
  },
  {
    url: C100_MIAM_UPLOAD_CONFIRMATION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest) =>
      isC100ApplicationValid(data as CaseWithId, req!) ? C100_CHECK_YOUR_ANSWER : C100_TYPE_ORDER_SELECT_COURT_ORDER,
  },
  {
    url: C100_MIAM_GET_DOC,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_GET_DOC,
  },
  {
    url: C100_MIAM_EXCEMPTION_SUMMARY,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest) =>
      isC100ApplicationValid(caseData as CaseWithId, req!)
        ? C100_CHECK_YOUR_ANSWER
        : MIAMNavigationController.getNextUrl(C100_MIAM_EXCEMPTION_SUMMARY, caseData),
  },
  {
    url: C100_HEARING_URGENCY_URGENT,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest): PageLink => {
      const hwnOrCya = isC100ApplicationValid(data as CaseWithId, req!)
        ? C100_CHECK_YOUR_ANSWER
        : C100_HEARING_WITHOUT_NOTICE_PART1;
      return data.hu_urgentHearingReasons === YesOrNo.YES ? C100_HEARING_URGENCY_URGENT_DETAILS : hwnOrCya;
    },
  },
  {
    url: C100_HEARING_URGENCY_URGENT_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest) =>
      isC100ApplicationValid(data as CaseWithId, req!) ? C100_CHECK_YOUR_ANSWER : C100_HEARING_WITHOUT_NOTICE_PART1,
  },
  {
    url: C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest): PageLink => {
      const tooOrCya = isC100ApplicationValid(data as CaseWithId, req!)
        ? C100_CHECK_YOUR_ANSWER
        : C100_TYPE_ORDER_SELECT_COURT_ORDER;
      return data.sq_writtenAgreement === YesOrNo.YES ? tooOrCya : C100_SCREENING_QUESTIONS_ALTERNATIVE_RESOLUTION;
    },
  },
  {
    url: C100_SCREENING_QUESTIONS_ALTERNATIVE_RESOLUTION,
    showInSection: Sections.C100,
    getNextStep: () => C100_SCREENING_QUESTIONS_ALTERNATIVE_ROUTES,
  },
  {
    url: C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.sq_legalRepresentation === YesOrNo.YES
        ? C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION
        : C100_SCREENING_QUESTIONS_COURT_PERMISSION,
  },
  {
    //70
    url: C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.sq_legalRepresentationApplication === YesOrNo.YES
        ? C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE
        : C100_SCREENING_QUESTIONS_COURT_PERMISSION,
  },
  {
    url: C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest) =>
      isC100ApplicationValid(data as CaseWithId, req!) ? C100_CHECK_YOUR_ANSWER : C100_MIAM_OTHER_PROCEEDINGS,
  },
  {
    url: C100_SCREENING_QUESTIONS_ALTERNATIVE_ROUTES,
    showInSection: Sections.C100,
    getNextStep: () => C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION,
  },
  {
    url: C100_SCREENING_QUESTIONS_PERMISSIONS_WHY,
    showInSection: Sections.C100,
    getNextStep: () => C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST,
  },
  {
    url: C100_SCREENING_QUESTIONS_COURT_PERMISSION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest): PageLink => {
      if (isC100ApplicationValid(data as CaseWithId, req!)) {
        return C100_CHECK_YOUR_ANSWER;
      }

      return data.sq_courtPermissionRequired === YesOrNo.YES
        ? C100_SCREENING_QUESTIONS_PERMISSIONS_WHY
        : C100_MIAM_OTHER_PROCEEDINGS;
    },
  },
  {
    url: C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE,
    showInSection: Sections.C100,
    getNextStep: () => C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    //80
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    postController: ApplicantCommonConfidentialityController,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
    showInSection: Sections.C100,
    postController: ApplicantCommonConfidentialityController,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
    showInSection: Sections.C100,
    postController: ApplicantCommonConfidentialityController,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_APPLICANT_ADDRESS_LOOKUP,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANT_ADDRESS_LOOKUP, caseData, req?.params),
  },
  {
    url: C100_APPLICANT_ADDRESS_SELECT,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANT_ADDRESS_SELECT, caseData, req?.params),
  },
  {
    url: C100_APPLICANT_ADDRESS_MANUAL,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANT_ADDRESS_MANUAL, caseData, req?.params),
  },
  {
    url: C100_CHILDERN_DETAILS_OTHER_CHILDREN,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.ocd_hasOtherChildren === YesOrNo.YES ? C100_CHILDERN_OTHER_CHILDREN_NAMES : C100_APPLICANT_ADD_APPLICANTS,
  },
  {
    url: C100_CHILDERN_OTHER_CHILDREN_NAMES,
    showInSection: Sections.C100,
    postController: AddPeoplePostContoller,
    getNextStep: caseData =>
      OtherChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_OTHER_CHILDREN_NAMES, caseData),
  },
  {
    //90
    url: C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_RESPONDENT_DETAILS_ADD,
    showInSection: Sections.C100,
    postController: AddPeoplePostContoller,
    getNextStep: caseData => RespondentsDetailsNavigationController.getNextUrl(C100_RESPONDENT_DETAILS_ADD, caseData),
  },
  {
    url: C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      RespondentsDetailsNavigationController.getNextUrl(
        C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      RespondentsDetailsNavigationController.getNextUrl(C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP, caseData, req?.params),
  },
  {
    url: C100_RESPONDENT_DETAILS_ADDRESS_SELECT,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      RespondentsDetailsNavigationController.getNextUrl(C100_RESPONDENT_DETAILS_ADDRESS_SELECT, caseData, req?.params),
  },
  {
    url: C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      RespondentsDetailsNavigationController.getNextUrl(C100_RESPONDENT_DETAILS_ADDRESS_MANUAL, caseData, req?.params),
  },
  {
    url: C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      RespondentsDetailsNavigationController.getNextUrl(C100_RESPONDENT_DETAILS_CONTACT_DETAILS, caseData, req?.params),
  },
  {
    url: C100_OTHER_PERSON_CHECK,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_CHECK, caseData, req),
  },
  {
    //100
    url: C100_OTHER_PERSON_DETAILS_ADD,
    showInSection: Sections.C100,
    postController: AddPeoplePostContoller,
    getNextStep: caseData =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADD, caseData),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS, caseData, req),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
    postController: LookupAndManualAddressPostController,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP, caseData, req),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT, caseData, req),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
    postController: LookupAndManualAddressPostController,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, caseData, req),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
        caseData,
        req
      ),
  },
  {
    url: C100_CHILDERN_MAINLY_LIVE_WITH,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_MAINLY_LIVE_WITH, caseData, req),
  },
  {
    url: C100_CHILDERN_LIVING_ARRANGEMENTS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_LIVING_ARRANGEMENTS, caseData, req),
  },
  {
    url: C100_APPLICANTS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANTS_PERSONAL_DETAILS, caseData, req?.params),
  },
  {
    url: C100_APPLICANT_RELATIONSHIP_TO_CHILD,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANT_RELATIONSHIP_TO_CHILD, caseData, req?.params),
  },
  {
    url: C100_APPLICANT_CONTACT_DETAIL,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANT_CONTACT_DETAIL, caseData, req?.params),
  },
  {
    //110
    url: C100_CONSENT_ORDER_UPLOAD,
    postController: UploadDocumentController,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONSENT_ORDER_UPLOAD_CONFIRMATION,
  },
  {
    url: C100_CONSENT_ORDER_UPLOAD_CONFIRMATION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>, req?: AppRequest<Partial<Case>>) =>
      isC100ApplicationValid(data as CaseWithId, req as AppRequest)
        ? C100_CHECK_YOUR_ANSWER
        : C100_HEARING_URGENCY_URGENT,
  },
  {
    url: C100_CHECK_YOUR_ANSWER,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHECK_YOUR_ANSWER,
  },
  {
    url: C100_APPLICANT_CONTACT_PREFERENCES,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ApplicantNavigationController.getNextUrl(C100_APPLICANT_CONTACT_PREFERENCES, caseData, req?.params),
  },
  {
    url: C100_WITHDRAW_CASE,
    showInSection: Sections.C100,
    getNextStep: caseData =>
      caseData?.withdrawApplication === YesOrNo.YES
        ? C100_WITHDRAW_CASE_CONFIRMATION
        : (applyParms(PARTY_TASKLIST, { partyType: 'applicant' }) as PageLink),
  },
  {
    url: C100_WITHDRAW_CASE_CONFIRMATION,
    showInSection: Sections.C100,
    getNextStep: () => '/',
  },
  {
    url: C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_CONFIDENTIALITY, caseData, req),
  },
];
