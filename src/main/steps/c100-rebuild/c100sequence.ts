import { Case, CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Sections, Step } from '../constants';
import {
  C100_CHILD_ADDRESS,
  C100_CONFIDENTIALITY_DETAILS_KNOW,
  C100_CONFIDENTIALITY_FEEDBACK,
  C100_CONFIDENTIALITY_FEEDBACK_NO,
  C100_CONFIDENTIALITY_START,
  C100_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_HEARING_WITHOUT_NOTICE_PART1,
  C100_HEARING_WITHOUT_NOTICE_PART2,
  C100_INTERNATIONAL_ELEMENTS_JURISDICTION,
  C100_INTERNATIONAL_ELEMENTS_PARENTS,
  C100_INTERNATIONAL_ELEMENTS_REQUEST,
  C100_INTERNATIONAL_ELEMENTS_START,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
  C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
  C100_REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
  C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
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

  /** @C1A Safety concerns */
  C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT,
  C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
  C100_DOCUMENT_SUBMISSION,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION,
  C100_C1A_SAFETY_CONCERNS_OTHER,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE,
  C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION,
  C100_C1A_CHILD_ABDUCTION_THREATS,
  C100_C1A_SAFETY_CONCERNS_NOFEEDBACK,

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
  C100_MIAM_NO_NEED_WITH_REASONS,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,

  /** Screening Questions */
  C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT,
  C100_SCREENING_QUESTIONS_ALTERNATIVE_RESOLUTION,
  C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION,
  C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION,
  C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST,
  C100_SCREENING_QUESTIONS_PERMISSIONS_WHY,
  C100_SCREENING_QUESTIONS_COURT_PERMISSION,
  C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE,
  C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED,

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

  /** @C100 Other children in people section */
  C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
  C100_CHILDERN_DETAILS_OTHER_CHILDREN,
  C100_CHILDERN_OTHER_CHILDREN_NAMES,

  /** Applicant Details */
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_CHECK,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
} from '../urls';

import PageStepConfigurator from './PageStepConfigurator';
import ChildrenDetailsNavigationController from './child-details/navigationController';
import OtherChildrenDetailsNavigationController from './child-details/other-children/navigationController';
import MIAMNavigationController from './miam/navigationController';
import OtherPersonsDetailsNavigationController from './other-person-details/navigationController';
import OtherProceedingsNavigationController from './other-proceedings/navigationController';
import { sanitizeOtherProceedingsQueryString } from './other-proceedings/util';
import SafteyConcernsNavigationController from './safety-concerns/navigationController';

export const C100Sequence: Step[] = [
  {
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.detailsKnown === YesOrNo.YES ? C100_CONFIDENTIALITY_START_ALTERNATIVE : C100_CONFIDENTIALITY_START,
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
    url: C100_CONFIDENTIALITY_START,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.start === YesOrNo.YES ? C100_CONFIDENTIALITY_FEEDBACK : C100_CONFIDENTIALITY_FEEDBACK_NO,
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
    getNextStep: () => C100_REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
    showInSection: Sections.C100,
    getNextStep: () => C100_REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
    showInSection: Sections.C100,
    getNextStep: () => C100_REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
    showInSection: Sections.C100,
    getNextStep: () => C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      PageStepConfigurator.deriveSteps(
        C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
        data?.ra_disabilityRequirements
      );
      const nextPage = PageStepConfigurator.getNextPage(C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS);
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const nextPage = PageStepConfigurator.getNextPage(
        C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
        C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
        data?.ra_disabilityRequirements
      );
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const nextPage = PageStepConfigurator.getNextPage(
        C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
        C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
        data?.ra_disabilityRequirements
      );
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const nextPage = PageStepConfigurator.getNextPage(
        C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
        C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
        data?.ra_disabilityRequirements
      );
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const nextPage = PageStepConfigurator.getNextPage(
        C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
        C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
        data?.ra_disabilityRequirements
      );
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
  },
  {
    url: C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const nextPage = PageStepConfigurator.getNextPage(
        C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
        C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
        data?.ra_disabilityRequirements
      );
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
  },
  {
    url: C100_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: () => C100_HEARING_WITHOUT_NOTICE_PART1,
  },
  {
    url: C100_HEARING_WITHOUT_NOTICE_PART1,
    showInSection: Sections.C100,
    getNextStep: () => C100_HEARING_WITHOUT_NOTICE_PART2,
  },
  {
    url: C100_HEARING_WITHOUT_NOTICE_PART2,
    showInSection: Sections.C100,
    getNextStep: () => C100_TYPE_ORDER_SELECT_COURT_ORDER,
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
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_START,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.needHelpWithFees === YesOrNo.YES ? C100_HELP_WITH_FEES_FEES_APPLIED : C100_HELP_WITH_FEES_HWF_GUIDANCE,
  },
  {
    url: C100_HELP_WITH_FEES_FEES_APPLIED,
    showInSection: Sections.C100,
    getNextStep: () => C100_HELP_WITH_FEES_HWF_GUIDANCE,
  },
  {
    url: C100_HELP_WITH_FEES_HWF_GUIDANCE,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_CHILDERN_DETAILS_ADD,
    showInSection: Sections.C100,
    getNextStep: caseData => ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_ADD, caseData),
  },
  {
    url: C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, caseData, req?.params),
  },
  {
    url: C100_CHILDERN_DETAILS_CHILD_MATTERS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_CHILD_MATTERS, caseData, req?.params),
  },
  {
    url: C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
        caseData,
        req?.params
      ),
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
    getNextStep: () => C100_OTHER_PROCEEDINGS_DETAILS,
  },
  {
    url: C100_OTHER_PROCEEDINGS_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData: Partial<Case>): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(C100_OTHER_PROCEEDINGS_DETAILS, caseData);
    },
  },
  {
    url: C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
    showInSection: Sections.C100,
    sanitizeQueryString: sanitizeOtherProceedingsQueryString,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(
        C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
        caseData,
        req!.query
      );
    },
  },
  {
    url: C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
    showInSection: Sections.C100,
    sanitizeQueryString: sanitizeOtherProceedingsQueryString,
    getNextStep: (caseData: Partial<Case>, req?: AppRequest): PageLink => {
      return OtherProceedingsNavigationController.getNextUrl(
        C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
        caseData,
        req!.query
      );
    },
  },
  {
    url: C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
    showInSection: Sections.C100,
    sanitizeQueryString: sanitizeOtherProceedingsQueryString,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT, caseData, req?.params),
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.c1A_haveSafetyConcerns === YesOrNo.YES
        ? C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT
        : C100_INTERNATIONAL_ELEMENTS_START,
  },
  {
    url: C100_CHILD_ADDRESS,
    showInSection: Sections.C100,
    getNextStep: () => C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT,
  },
  {
    url: C100_DOCUMENT_SUBMISSION,
    showInSection: Sections.C100,
    getNextStep: () => C100_DOCUMENT_SUBMISSION,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
  },
  {
    url: C100_MIAM_MEDIATOR_DOCUMENT,
    showInSection: Sections.C100,
    getNextStep: data => (data.miam_haveDocSigned === YesOrNo.YES ? C100_MIAM_UPLOAD : C100_MIAM_GET_DOC),
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, req?.params),
  },
  {
    url: C100_MIAM_OTHER_PROCEEDINGS,
    showInSection: Sections.C100,
    getNextStep: data => (data.miam_otherProceedings === YesOrNo.YES ? C100_MIAM_NONEED : C100_MIAM_INFO),
  },
  {
    url: C100_MIAM_ATTENDANCE,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_attendance === YesOrNo.YES ? C100_MIAM_MEDIATOR_DOCUMENT : C100_MIAM_MEDIATOR_CONFIRMAION,
  },
  {
    url: C100_MIAM_MEDIATOR_CONFIRMAION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_mediatorDocument === YesOrNo.YES ? C100_MIAM_MEDIATOR_DOCUMENT : C100_MIAM_VALID_REASON,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
        caseData,
        req?.params
      ),
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
    getNextStep: () => C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  },
  {
    url: C100_MIAM_OTHER,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_OTHER, caseData),
  },
  {
    url: C100_MIAM_CHILD_PROTECTION,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_CHILD_PROTECTION, caseData),
  },
  {
    url: C100_MIAM_MIAM_DOMESTIC_ABUSE,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE, caseData),
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
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_UPLOAD_CONFIRMATION,
  },
  {
    url: C100_MIAM_UPLOAD_CONFIRMATION,
    showInSection: Sections.C100,
    getNextStep: () => C100_TYPE_ORDER_SELECT_COURT_ORDER,
  },
  {
    url: C100_MIAM_GET_DOC,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_GET_DOC,
  },
  {
    url: C100_MIAM_NO_NEED_WITH_REASONS,
    showInSection: Sections.C100,
    getNextStep: caseData => MIAMNavigationController.getNextUrl(C100_MIAM_NO_NEED_WITH_REASONS, caseData),
  },
  {
    url: C100_HEARING_URGENCY_URGENT,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.hu_urgentHearingReasons === YesOrNo.YES
        ? C100_HEARING_URGENCY_URGENT_DETAILS
        : C100_HEARING_WITHOUT_NOTICE_PART1,
  },
  {
    url: C100_HEARING_URGENCY_URGENT_DETAILS,
    showInSection: Sections.C100,
    getNextStep: () => C100_HEARING_WITHOUT_NOTICE_PART1,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_OTHER,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_CHILD_ABDUCTION_THREATS,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_OTHER,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      SafteyConcernsNavigationController.getNextUrl(
        C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.c1A_passportOffice === YesOrNo.YES
        ? C100_C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT
        : C100_C1A_CHILD_ABDUCTION_THREATS,
  },
  {
    url: C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.sq_writtenAgreement === YesOrNo.YES
        ? C100_TYPE_ORDER_SELECT_COURT_ORDER
        : C100_SCREENING_QUESTIONS_ALTERNATIVE_RESOLUTION,
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
    getNextStep: () => C100_MIAM_OTHER_PROCEEDINGS,
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
    url: C100_C1A_CHILD_ABDUCTION_THREATS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      caseData.c1A_childAbductedBefore === YesOrNo.YES
        ? C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS
        : SafteyConcernsNavigationController.getNextUrl(C100_C1A_CHILD_ABDUCTION_THREATS, caseData, req?.params),
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_NOFEEDBACK,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  },
  {
    url: C100_SCREENING_QUESTIONS_COURT_PERMISSION,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.sq_courtPermissionRequired === YesOrNo.YES
        ? C100_SCREENING_QUESTIONS_PERMISSIONS_WHY
        : C100_MIAM_OTHER_PROCEEDINGS,
  },
  {
    url: C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE,
    showInSection: Sections.C100,
    getNextStep: () => C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED,
    showInSection: Sections.C100,
    getNextStep: () => C100_INTERNATIONAL_ELEMENTS_START,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.detailsKnown === YesOrNo.YES
        ? C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE
        : C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.start === YesOrNo.YES
        ? C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK
        : C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
  },
  {
    url: C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.startAlternative === YesOrNo.YES
        ? C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK
        : C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
  },
  {
    url: C100_APPLICANT_ADDRESS_LOOKUP,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADDRESS_SELECT,
  },
  {
    url: C100_APPLICANT_ADDRESS_SELECT,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADDRESS_MANUAL,
  },
  {
    url: C100_APPLICANT_ADDRESS_MANUAL,
    showInSection: Sections.C100,
    getNextStep: () => C100_APPLICANT_ADDRESS_LOOKUP,
  },
  {
    url: C100_CHILDERN_DETAILS_OTHER_CHILDREN,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.cd_hasOtherChildren === YesOrNo.YES ? C100_CHILDERN_OTHER_CHILDREN_NAMES : C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_CHILDERN_OTHER_CHILDREN_NAMES,
    showInSection: Sections.C100,
    getNextStep: caseData =>
      OtherChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_OTHER_CHILDREN_NAMES, caseData),
  },
  {
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
    url: C100_OTHER_PERSON_CHECK,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.oprs_otherPersonCheck === YesOrNo.YES
        ? C100_OTHER_PERSON_DETAILS_ADD
        : C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADD,
    showInSection: Sections.C100,
    getNextStep: caseData =>
      OtherPersonsDetailsNavigationController.getNextUrl(C100_OTHER_PERSON_DETAILS_ADD, caseData),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
        caseData,
        req?.params
      ),
  },
  {
    url: C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
    showInSection: Sections.C100,
    getNextStep: (caseData, req) =>
      OtherPersonsDetailsNavigationController.getNextUrl(
        C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
        caseData,
        req?.params
      ),
  },
];
