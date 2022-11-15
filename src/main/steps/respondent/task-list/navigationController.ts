/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { ReasonableAdjustments } from '../../../app/case/definition';
import {
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_REASONABLE_ADJUSTMENTS,
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  CA_DA_TRAVELLING_TO_COURT,
  PageLink,
} from '../../urls';

class ReasonableAdjustmentsNavigationController {
  //protected selectedPages: ReasonableAdjustments[] = [];
  protected selectedPages;
  selectedPageUrls: PageLink[] = [];

  private pages: Record<ReasonableAdjustments, Record<string, any>> = {
    [ReasonableAdjustments.DOCUMENTS_SUPPORT]: {
      url: CA_DA_DOCUMENTS_SUPPORT,
      dataReference: 'respondentDocsSupportPage',
    },
    [ReasonableAdjustments.COMMUNICATION_HELP]: {
      url: CA_DA_COMMUNICATION_HELP,
      dataReference: 'respondentHelpCommunicationPage',
    },
    [ReasonableAdjustments.COURT_HEARING_SUPPORT]: {
      url: CA_DA_COURT_HEARING_SUPPORT,
      dataReference: 'respondentCourtHearingPage',
    },
    [ReasonableAdjustments.COURT_HEARING_COMFORT]: {
      url: CA_DA_COURT_HEARING_COMFORT,
      dataReference: 'respondentCourtComfortPage',
    },
    [ReasonableAdjustments.TRAVELLING_TO_COURT]: {
      url: CA_DA_TRAVELLING_TO_COURT,
      dataReference: 'respondentTravellingToCourtPage',
    },
    [ReasonableAdjustments.NO_NEED_OF_SUPPORT]: {
      url: CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
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
      console.log('currentPageId==>' + currentPageId);
      console.log('currentPageIndex==>' + currentPageIndex);
      console.log('pageUrl==>' + pageUrl);
    }

    return pageUrl;
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>): PageLink {
    //this.selectedPages = caseData.reasonableAdjustmentsPages as ReasonableAdjustments[];

    this.selectedPages = caseData.respondentReasonableAdjustments;
    console.log('selectedPages==>' + this.selectedPages);
    let url: PageLink;

    switch (currentPageUrl) {
      case CA_DA_REASONABLE_ADJUSTMENTS: {
        this.selectedPageUrls = [];
        url = this.pages[this.selectedPages[0]].url;
        this.selectedPageUrls.push(url);
        console.log('first url====>' + url);
        break;
      }
      default: {
        let pageUrl: PageLink | null = null;
        pageUrl = this.getNextPageUrl(currentPageUrl);
        if (pageUrl !== null) {
          url = pageUrl;
          this.selectedPageUrls.push(url);
          console.log('selectedPageUrls==1===>' + this.selectedPageUrls);
        } else {
          // get the selected pages list
          // remove the data (req.session.userCase) from not selected pages
          // navigate to summary page
          url = CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY;
        }
        //url = this.getNextPageUrl(currentPageUrl) || CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY;
        break;
      }
    }

    return url;
  }
}

export default new ReasonableAdjustmentsNavigationController();
