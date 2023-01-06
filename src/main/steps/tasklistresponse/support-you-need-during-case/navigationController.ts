/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { ReasonableAdjustments } from '../../../app/case/definition';
import {
  C7_COMMUNICATION_HELP,
  C7_COURT_HEARING_COMFORT,
  C7_COURT_HEARING_SUPPORT,
  C7_DOCUMENTS_SUPPORT,
  C7_REASONABLE_ADJUSTMENTS,
  C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  C7_TRAVELLING_TO_COURT,
  PageLink,
} from '../../urls';

class ReasonableAdjustmentsNavigationController {
  protected selectedPages;
  selectedPageUrls: PageLink[] = [];

  private pages: Record<ReasonableAdjustments, Record<string, any>> = {
    [ReasonableAdjustments.DOCUMENTS_SUPPORT]: {
      url: C7_DOCUMENTS_SUPPORT,
      dataReference: 'respondentDocsSupportPage',
    },
    [ReasonableAdjustments.COMMUNICATION_HELP]: {
      url: C7_COMMUNICATION_HELP,
      dataReference: 'respondentHelpCommunicationPage',
    },
    [ReasonableAdjustments.COURT_HEARING_SUPPORT]: {
      url: C7_COURT_HEARING_SUPPORT,
      dataReference: 'respondentCourtHearingPage',
    },
    [ReasonableAdjustments.COURT_HEARING_COMFORT]: {
      url: C7_COURT_HEARING_COMFORT,
      dataReference: 'respondentCourtComfortPage',
    },
    [ReasonableAdjustments.TRAVELLING_TO_COURT]: {
      url: C7_TRAVELLING_TO_COURT,
      dataReference: 'respondentTravellingToCourtPage',
    },
    [ReasonableAdjustments.NO_NEED_OF_SUPPORT]: {
      url: C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
      dataReference: 'nosupportPage',
    },
  };

  private getNextPageUrl(currentPageUrl: PageLink): PageLink | null {
    let pageUrl: PageLink | null = null;
    const currentPageId = Object.keys(this.pages).find(
      pageId => this.pages[pageId].url === currentPageUrl
    ) as ReasonableAdjustments;

    if (currentPageId) {
      const currentPageIndex: number = this.selectedPages.indexOf(currentPageId);

      if (currentPageIndex < this.selectedPages.length - 1) {
        pageUrl = this.pages[this.selectedPages[currentPageIndex + 1]].url;
      }
    }

    return pageUrl;
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>): PageLink {
    this.selectedPages = caseData.respondentReasonableAdjustments;

    let url: PageLink;

    switch (currentPageUrl) {
      case C7_REASONABLE_ADJUSTMENTS: {
        this.selectedPageUrls = [];
        url = this.pages[this.selectedPages[0]].url;
        this.selectedPageUrls.push(url);

        break;
      }
      default: {
        let pageUrl: PageLink | null = null;
        pageUrl = this.getNextPageUrl(currentPageUrl);
        if (pageUrl !== null) {
          url = pageUrl;
          this.selectedPageUrls.push(url);
        } else {
          url = C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY;
        }
        break;
      }
    }

    return url;
  }
}

export default new ReasonableAdjustmentsNavigationController();
