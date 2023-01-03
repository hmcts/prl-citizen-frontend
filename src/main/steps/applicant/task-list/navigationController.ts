/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { ReasonableAdjustmentsEnum } from '../../../app/case/definition';
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
  UNABLE_TO_TAKE_COURT_PROCEEDINGS,
} from '../../urls';

class ApplicantReasonableAdjustmentsNavigationController {
  protected selectedPages;
  selectedPageUrls: PageLink[] = [];

  private pages: Record<ReasonableAdjustmentsEnum, Record<string, any>> = {
    [ReasonableAdjustmentsEnum.docsformat]: {
      url: DOCUMENTS_SUPPORT,
      dataReference: 'applicantDocsSupportPage',
    },
    [ReasonableAdjustmentsEnum.commhelp]: {
      url: COMMUNICATION_HELP,
      dataReference: 'applicantHelpCommunicationPage',
    },
    [ReasonableAdjustmentsEnum.hearingsupport]: {
      url: COURT_HEARING_SUPPORT,
      dataReference: 'applicantCourtHearingPage',
    },
    [ReasonableAdjustmentsEnum.hearingcomfort]: {
      url: COURT_HEARING_COMFORT,
      dataReference: 'applicantCourtComfortPage',
    },
    [ReasonableAdjustmentsEnum.travellinghelp]: {
      url: TRAVELLING_TO_COURT,
      dataReference: 'applicantTravellingToCourtPage',
    },
    [ReasonableAdjustmentsEnum.unabletotakecourtproceedings]: {
      url: UNABLE_TO_TAKE_COURT_PROCEEDINGS,
      dataReference: 'applicantUnableToTakeCourtProceedings',
    },
    [ReasonableAdjustmentsEnum.nosupport]: {
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

    if (caseData.reasonableAdjustments?.includes(ReasonableAdjustmentsEnum.nosupport)) {
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
