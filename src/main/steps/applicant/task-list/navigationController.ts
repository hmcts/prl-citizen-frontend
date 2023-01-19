/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import {
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DOCUMENTS_SUPPORT,
  PageLink,
  REASONABLE_ADJUSTMENTS,
  SAFETY_ARRANGEMENTS,
  SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  TRAVELLING_TO_COURT,
} from '../../urls';

class ApplicantReasonableAdjustmentsNavigationController {
  protected selectedPages;
  selectedPageUrls: PageLink[] = [];

  private pages: Record<string, Record<string, any>> = {
    ['docsformat']: {
      url: DOCUMENTS_SUPPORT,
      dataReference: 'applicantDocsSupportPage',
    },
    ['commhelp']: {
      url: COMMUNICATION_HELP,
      dataReference: 'applicantHelpCommunicationPage',
    },
    ['hearingsupport']: {
      url: COURT_HEARING_SUPPORT,
      dataReference: 'applicantCourtHearingPage',
    },
    ['hearingcomfort']: {
      url: COURT_HEARING_COMFORT,
      dataReference: 'applicantCourtComfortPage',
    },
    ['travellinghelp']: {
      url: TRAVELLING_TO_COURT,
      dataReference: 'applicantTravellingToCourtPage',
    },
    ['nosupport']: {
      url: SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
      dataReference: 'nosupportPage',
    },
  };

  private getNextPageUrl(currentPageUrl: PageLink): PageLink | null {
    let pageUrl: PageLink | null = null;
    const currentPageId = Object.keys(this.pages).find(pageId => this.pages[pageId].url === currentPageUrl);

    if (currentPageId) {
      const currentPageIndex: number = this.selectedPages.indexOf(currentPageId);

      if (currentPageIndex < this.selectedPages.length - 1) {
        pageUrl = this.pages[this.selectedPages[currentPageIndex + 1]].url;
      }
    }

    return pageUrl;
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>): PageLink {
    this.selectedPages = caseData.reasonableAdjustments;

    if (caseData.reasonableAdjustments?.includes('nosupport')) {
      return SAFETY_ARRANGEMENTS;
    }

    let url: PageLink;

    switch (currentPageUrl) {
      case REASONABLE_ADJUSTMENTS: {
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
          url = SAFETY_ARRANGEMENTS;
        }
        break;
      }
    }

    return url;
  }
}

export default new ApplicantReasonableAdjustmentsNavigationController();
