import { CaseWithId } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import { Sections, Step } from '../constants';
import {
  ACCESSIBILITY_STATEMENT,
  COOKIES_PAGE,
  DASHBOARD_URL,
  PARTY_TASKLIST,
  PIN_ACTIVATION_CASE_ACTIVATED_URL,
  PIN_ACTIVATION_ENTER_PIN_URL,
  PRIVACY_POLICY,
  PageLink,
  TERMS_AND_CONDITIONS,
  TESTING_SUPPORT,
  TESTING_SUPPORT_CREATE_DRAFT,
  TESTING_SUPPORT_DELETE_DRAFT,
} from '../urls';

import { getCasePartyType } from './dashboard/utils';

export const citizenSequence: Step[] = [
  {
    url: DASHBOARD_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => DASHBOARD_URL,
  },
  {
    url: PIN_ACTIVATION_ENTER_PIN_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PIN_ACTIVATION_CASE_ACTIVATED_URL,
  },
  {
    url: PIN_ACTIVATION_CASE_ACTIVATED_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: (caseData: Partial<CaseWithId>, req?: AppRequest): PageLink => {
      return applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req!.session.user.id) }) as PageLink;
    },
  },
  {
    url: COOKIES_PAGE,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => COOKIES_PAGE,
  },
  {
    url: PRIVACY_POLICY,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PRIVACY_POLICY,
  },
  {
    url: TERMS_AND_CONDITIONS,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => TERMS_AND_CONDITIONS,
  },
  {
    url: ACCESSIBILITY_STATEMENT,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => ACCESSIBILITY_STATEMENT,
  },
  {
    url: TESTING_SUPPORT,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => TESTING_SUPPORT,
  },
  {
    url: TESTING_SUPPORT_CREATE_DRAFT,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => TESTING_SUPPORT_CREATE_DRAFT,
  },
  {
    url: TESTING_SUPPORT_DELETE_DRAFT,
    subDir: '/',
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => TESTING_SUPPORT_DELETE_DRAFT,
  },
];
