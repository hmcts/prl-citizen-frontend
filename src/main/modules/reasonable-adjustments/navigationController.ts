/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { PartyType } from '../../app/case/definition';
import { applyParms, parseUrl } from '../../steps/common/url-parser';
import {
  C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
  C100_URL,
  PageLink,
  REASONABLE_ADJUSTMENTS_ATTENDING_COURT,
  REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP,
  REASONABLE_ADJUSTMENTS_COURT_NEEDS,
  REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT,
  REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS,
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

  private getNextPageUrl(currentPageUrl: PageLink, currentPage: PageLink, caseData: Partial<CaseWithId>): PageLink {
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
        ? _.find(this.page.pages, page => page.values.includes(dataRefValues[nextPageIndex])).url
        : this.page.pages.find(page => {
            return _.isFunction(page.isExitPage) && page.isExitPage(currentPageUrl) === true;
          })?.url ?? currentPageUrl;

    return nextPageUrl;
  }

  public getNextUrl(caseData: Partial<CaseWithId> | undefined, currentPageUrl: PageLink | undefined): PageLink {
    let nextUrl;

    if (!caseData || !currentPageUrl) {
      return (nextUrl = '/error');
    }

    const isC100Journey = currentPageUrl.startsWith(C100_URL);
    const currentPageUrlParts = currentPageUrl.split('/');
    currentPageUrlParts.splice(1, 1).unshift('');
    const currentPage = currentPageUrlParts.join('/') as PageLink;

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
        nextUrl = applyParms(this.getNextPageUrl(currentPageUrl, currentPage, caseData), {
          root: isC100Journey ? RARootContext.C100_REBUILD : RARootContext.RESPONDENT,
        });
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
