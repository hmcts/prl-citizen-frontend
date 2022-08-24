/* eslint-disable sort-imports */
import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  C100_CONFIDENTIALITY_DETAILS_KNOW,
  C100_CONFIDENTIALITY_FEEDBACK,
  C100_CONFIDENTIALITY_FEEDBACK_NO,
  C100_CONFIDENTIALITY_START,
  C100_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_INTERNATIONAL_ELEMENTS_JURISDICTION,
  C100_INTERNATIONAL_ELEMENTS_PARENTS,
  C100_INTERNATIONAL_ELEMENTS_REQUEST,
  C100_INTERNATIONAL_ELEMENTS_START,
  C100_REASONABLE_ADJUSTMENTS_ATTENDING_COURT,

  /** @C100_child */
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_FURTHER_INFORMATION,
  C100_REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  C100_REASONABLE_ADJUSTMENTS_DISABILITY_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION,
  C100_REASONABLE_ADJUSTMENTS_FEEL_COMFORTABLE,
  C100_REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  C100_REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT,
  C100_REASONABLE_ADJUSTMENTS_TRAVELLING_COURT,
  C100_TYPE_ORDER_SELECT_COURT_ORDER,
  C100_TYPE_ORDER_SHORT_STATEMENT,
  PageLink,
} from '../urls';

import PageStepConfigurator from './PageStepConfigurator';

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
        data?.disabilityRequirements
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
        data?.disabilityRequirements
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
        data?.disabilityRequirements
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
        data?.disabilityRequirements
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
        data?.disabilityRequirements
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
        data?.disabilityRequirements
      );
      return nextPage?.url || C100_CONFIDENTIALITY_DETAILS_KNOW;
    },
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
    getNextStep: () => C100_TYPE_ORDER_SELECT_COURT_ORDER,
  },
  {
    url: C100_TYPE_ORDER_SELECT_COURT_ORDER,
    showInSection: Sections.C100,
    getNextStep: () => C100_TYPE_ORDER_SHORT_STATEMENT,
  },
  {
    url: C100_TYPE_ORDER_SHORT_STATEMENT,
    showInSection: Sections.C100,
    getNextStep: () => C100_CONFIDENTIALITY_DETAILS_KNOW,
  },
];
