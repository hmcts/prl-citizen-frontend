import _ from 'lodash';

import { applyParms } from '../../steps/common/url-parser';
import { Sections, Step } from '../../steps/constants';
import {
  FETCH_CASE_DETAILS,
  PageLink,
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
  REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  REASONABLE_ADJUSTMENTS_COURT_NEEDS,
  REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT,
  REASONABLE_ADJUSTMENTS_ERROR,
  REASONABLE_ADJUSTMENTS_INTRO,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS_REVIEW,
  REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING,
  REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW,
  REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_SUCCESS_CONFIRMATION,
  REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
  REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING,
  RESPOND_TO_APPLICATION,
} from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustementsSequence {
  getSequence(): Step[] {
    return [
      {
        url: REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_COURT_NEEDS,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW,
        showInSection: Sections.RA,
        getNextStep: () => RESPOND_TO_APPLICATION,
      },
      {
        url: REASONABLE_ADJUSTMENTS_INTRO,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) =>
          applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS, {
            partyType: _.get(req, 'params.partyType', ''),
          }) as PageLink,
      },
      {
        url: REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS,
        showInSection: Sections.RA,
        getNextStep: (caseData, req) => RAProvider.navigationController.getNextUrl(caseData, req),
      },
      {
        url: REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS_REVIEW,
        showInSection: Sections.RA,
        getNextStep: () => REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
      },
      {
        url: REASONABLE_ADJUSTMENTS_SUCCESS_CONFIRMATION,
        showInSection: Sections.RA,
        getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData.id! }) as PageLink,
      },
      {
        url: REASONABLE_ADJUSTMENTS_ERROR,
        showInSection: Sections.RA,
        getNextStep: caseData => applyParms(FETCH_CASE_DETAILS, { caseId: caseData.id! }) as PageLink,
      },
    ];
  }
}

export const RASequence = new ReasonableAdjustementsSequence();
