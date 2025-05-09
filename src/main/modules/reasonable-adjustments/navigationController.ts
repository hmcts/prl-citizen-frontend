/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { PartyType } from '../../app/case/definition';
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
  REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  REASONABLE_ADJUSTMENTS_COURT_NEEDS,
  REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT,
  REASONABLE_ADJUSTMENTS_ERROR,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS_REVIEW,
  REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING,
  REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW,
  REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS,
  REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
  REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING,
} from '../../steps/urls';

import { RALocalComponentC100SupportNeeds, RALocalComponentRespondentSupportNeeds, RARootContext } from './definitions';

export class ReasonableAdjustementsNavigationController {
  private page: Record<string, any> = {
    dataReference: 'ra_disabilityRequirements',
    pages: [
      {
        url: REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE,
        values: ['*'],
      },
      {
        url: REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT,
        values: [
          RALocalComponentC100SupportNeeds.DOCUMENTS_SUPPORT,
          RALocalComponentRespondentSupportNeeds.DOCUMENTS_SUPPORT,
        ],
      },
      {
        url: REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
        values: [
          RALocalComponentC100SupportNeeds.COMMUNICATION_HELP,
          RALocalComponentRespondentSupportNeeds.COMMUNICATION_HELP,
        ],
      },
      {
        url: REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING,
        values: [
          RALocalComponentC100SupportNeeds.COURT_HEARING_SUPPORT,
          RALocalComponentRespondentSupportNeeds.COURT_HEARING_SUPPORT,
        ],
      },
      {
        url: REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING,
        values: [
          RALocalComponentC100SupportNeeds.COURT_HEARING_COMFORT,
          RALocalComponentRespondentSupportNeeds.COURT_HEARING_COMFORT,
        ],
      },
      {
        url: REASONABLE_ADJUSTMENTS_COURT_NEEDS,
        values: [
          RALocalComponentC100SupportNeeds.TRAVELLING_TO_COURT,
          RALocalComponentRespondentSupportNeeds.TRAVELLING_TO_COURT,
        ],
      },
      {
        url: C100_CHECK_YOUR_ANSWER,
        values: [RALocalComponentC100SupportNeeds.NO_SUPPORT],
        isExitPage: (currentPageUrl: PageLink, caseData: CaseWithId, req: AppRequest): boolean =>
          currentPageUrl.startsWith(C100_URL) && isC100ApplicationValid(caseData, req),
      },
      {
        url: C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
        values: [RALocalComponentC100SupportNeeds.NO_SUPPORT],
        isExitPage: (currentPageUrl: PageLink): boolean => currentPageUrl.startsWith(C100_URL),
      },
      {
        url: REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW,
        values: [RALocalComponentRespondentSupportNeeds.NO_SUPPORT],
        isExitPage: (currentPageUrl: PageLink): boolean => currentPageUrl.includes(PartyType.RESPONDENT),
      },
    ],
  };

  private getNextPageUrl(
    currentPageUrl: PageLink,
    currentPage: PageLink,
    caseData: Partial<CaseWithId>,
    req: AppRequest
  ): PageLink {
    const pageConfig = this.page.pages.find(page => currentPage === parseUrl(page.url).url);
    let nextPageUrl = currentPageUrl;

    if (!pageConfig) {
      return nextPageUrl;
    }

    const dataRefValues = [...(caseData?.[this.page.dataReference]?.filter(val => !!val) ?? [])];
    let nextPageIndex = -1;

    if (pageConfig.values.includes('*')) {
      nextPageIndex = 0;
    } else {
      const currentPageIndex = _.findIndex(dataRefValues, value => pageConfig.values.includes(value));
      if (currentPageIndex >= 0 && currentPageIndex < dataRefValues.length - 1) {
        nextPageIndex = currentPageIndex + 1;
      }
    }

    nextPageUrl =
      nextPageIndex >= 0
        ? _.find(
            this.page.pages,
            page =>
              page.values.includes(dataRefValues[nextPageIndex]) &&
              (this.doesPageHaveFunction(page, currentPageUrl)
                ? page.isExitPage(currentPageUrl, caseData, req) === true
                : true)
          ).url
        : this.page.pages.find(page => {
            return _.isFunction(page.isExitPage) && page.isExitPage(currentPageUrl, caseData, req) === true;
          })?.url ?? currentPageUrl;

    return nextPageUrl;
  }

  private doesPageHaveFunction(page, currentPageUrl: string): boolean {
    return currentPageUrl.includes(C100_URL) ? _.isFunction(page.isExitPage) : false;
  }

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

    switch (currentPage) {
      case parseUrl(REASONABLE_ADJUSTMENTS_ATTENDING_COURT).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS, {
          root: isC100Journey ? RARootContext.C100_REBUILD : RARootContext.RESPONDENT,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS, {
          root: isC100Journey ? RARootContext.C100_REBUILD : RARootContext.RESPONDENT,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS).url: {
        nextUrl = applyParms(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE, {
          root: isC100Journey ? RARootContext.C100_REBUILD : RARootContext.RESPONDENT,
        });
        break;
      }
      case parseUrl(REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE).url:
      case parseUrl(REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT).url:
      case parseUrl(REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP).url:
      case parseUrl(REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING).url:
      case parseUrl(REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING).url:
      case parseUrl(REASONABLE_ADJUSTMENTS_COURT_NEEDS).url: {
        nextUrl = applyParms(this.getNextPageUrl(currentPageUrl, currentPage, caseData, req), {
          root: isC100Journey ? RARootContext.C100_REBUILD : RARootContext.RESPONDENT,
        });
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
