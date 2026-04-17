/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { PartyType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { isC100ApplicationValid } from '../../steps/c100-rebuild/utils';
import { applyParms, parseUrl } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import {
  C100_CHECK_YOUR_ANSWER,
  C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
  C100_URL,
  PageLink,
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH,
  REASONABLE_ADJUSTMENTS_ERROR,
  REASONABLE_ADJUSTMENTS_INTERMEDIARY,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS_REVIEW,
  REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW,
  REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
} from '../../steps/urls';

import { RARootContext } from './definitions';

export class ReasonableAdjustementsNavigationController {
  private page: Record<string, any> = {
    dataReference: 'ra_disabilityRequirements',
    pages: [
      {
        url: C100_CHECK_YOUR_ANSWER,
        values: [YesOrNo.NO],
        isExitPage: (currentPageUrl: PageLink, caseData: CaseWithId, req: AppRequest): boolean =>
          currentPageUrl.startsWith(C100_URL) && isC100ApplicationValid(caseData, req),
      },
      {
        url: C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
        values: [YesOrNo.NO, YesOrNo.YES],
        isExitPage: (currentPageUrl: PageLink): boolean => currentPageUrl.startsWith(C100_URL),
      },
      {
        url: REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW,
        values: [YesOrNo.NO, YesOrNo.YES],
        isExitPage: (currentPageUrl: PageLink): boolean => currentPageUrl.includes(PartyType.RESPONDENT),
      },
    ],
  };

  public getNextUrl(caseData: Partial<CaseWithId> | undefined, req: AppRequest | undefined): PageLink {
    let nextUrl;
    const currentPageUrl = req?.originalUrl as PageLink;

    if (!caseData || !currentPageUrl || !req?.session.user) {
      return (nextUrl = REASONABLE_ADJUSTMENTS_ERROR);
    }

    const partyType = getCasePartyType(caseData, req.session.user.id);
    const isC100Journey = currentPageUrl.startsWith(C100_URL);
    const currentPageUrlParts = currentPageUrl.split('/');
    currentPageUrlParts.splice(1, 1).unshift('');
    const currentPage = parseUrl(currentPageUrlParts.join('/')).url as PageLink;
    const rootContext = isC100Journey ? RARootContext.C100_REBUILD : RARootContext.RESPONDENT;

    switch (currentPage) {
      case parseUrl(REASONABLE_ADJUSTMENTS_ATTENDING_COURT).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS, {
          root: rootContext,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, {
          root: rootContext,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_INTERMEDIARY, {
          root: rootContext,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_INTERMEDIARY).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE, {
          root: rootContext,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE).url: {
        const exitPage = this.page.pages.find(page => {
          return _.isFunction(page.isExitPage) && page.isExitPage(currentPageUrl, caseData, req) === true;
        });
        nextUrl = exitPage ? applyParms(exitPage.url, { root: rootContext }) : currentPageUrl;
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS).url: {
        nextUrl = caseData?.ra_languageReqAndSpecialArrangements
          ? applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS_REVIEW, {
              partyType,
            })
          : REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH;
        break;
      }
      default:
        nextUrl = currentPageUrl;
        break;
    }

    if (!nextUrl) {
      nextUrl = currentPageUrl;
    }

    return nextUrl;
  }
}

export const RANavigationController = new ReasonableAdjustementsNavigationController();
