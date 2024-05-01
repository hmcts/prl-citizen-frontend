import { CaseWithId } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import { Sections, Step } from '../constants';
import {
  DASHBOARD_URL,
  PARTY_TASKLIST,
  PIN_ACTIVATION_CASE_ACTIVATED_URL,
  PIN_ACTIVATION_ENTER_PIN_URL,
  PageLink,
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
];
