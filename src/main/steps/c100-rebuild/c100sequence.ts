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
  C100_DOCUMENT_SUBMISSION,
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
  PageLink,
  C100_MIAM_UPLOAD,
} from '../urls';

import PageStepConfigurator from './PageStepConfigurator';
import OtherProceedingsNavigationController from './other-proceedings/navigationController';
import { sanitizeOtherProceedingsQueryString } from './other-proceedings/util';

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
    getNextStep: () => C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  },
  {
    url: C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHILDERN_DETAILS_CHILD_MATTERS,
  },
  {
    url: C100_CHILDERN_DETAILS_CHILD_MATTERS,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  },
  {
    url: C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHILDERN_FURTHER_INFORMATION,
  },
  {
    url: C100_CHILDERN_FURTHER_INFORMATION,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
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
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.c1A_haveSafetyConcerns === YesOrNo.YES ? C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT : C100_CONFIDENTIALITY_START,
  },
  {
    url: C100_CHILD_ADDRESS,
    showInSection: Sections.C100,
    getNextStep: () => C100_CHILD_ADDRESS,
  },
  {
    url: C100_DOCUMENT_SUBMISSION,
    showInSection: Sections.C100,
    getNextStep: () => C100_DOCUMENT_SUBMISSION,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
  },
  {
    url: C100_MIAM_MEDIATOR_DOCUMENT,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.miam_haveDocSigned === YesOrNo.YES ? C100_CONFIDENTIALITY_DETAILS_KNOW : C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  },
  {
    url: C100_MIAM_OTHER_PROCEEDINGS,
    showInSection: Sections.C100,
    getNextStep: data =>
      data.miam_otherProceedings === YesOrNo.YES
        ? C100_CONFIDENTIALITY_DETAILS_KNOW
        : C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_MIAM_ATTENDANCE,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_attendance === YesOrNo.YES ? C100_MIAM_ATTENDANCE : C100_CONFIDENTIALITY_START,
  },
  {
    url: C100_MIAM_MEDIATOR_CONFIRMAION,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_MEDIATOR_CONFIRMAION,
  },
  {
    url: C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
    showInSection: Sections.C100,
    getNextStep: () => C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  },
  {
    url: C100_MIAM_URGENCY,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_URGENCY,
  },
  {
    url: C100_MIAM_PREVIOUS_ATTENDANCE,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_PREVIOUS_ATTENDANCE,
  },
  {
    url: C100_MIAM_INFO,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_MIAM_VALID_REASON,
    showInSection: Sections.C100,
    getNextStep: (data: Partial<Case>) =>
      data.miam_validReason === YesOrNo.YES ? C100_MIAM_VALID_REASON : C100_CONFIDENTIALITY_START,
  },
  {
    url: C100_MIAM_NONEED,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_NONEED,
  },
  {
    url: C100_MIAM_OTHER,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_MIAM_CHILD_PROTECTION,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_MIAM_MIAM_DOMESTIC_ABUSE,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
  {
    url: C100_MIAM_GENERAL_REASONS,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_GENERAL_REASONS,
  },
 {
    url: C100_MIAM_UPLOAD,
    showInSection: Sections.C100,
    getNextStep: () => C100_MIAM_UPLOAD,
  },
];
