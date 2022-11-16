/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { ApplicantReasonableAdjustments } from '../../../app/case/definition';
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

  private pages: Record<ApplicantReasonableAdjustments, Record<string, any>> = {
    [ApplicantReasonableAdjustments.DOCUMENTS_SUPPORT]: {
      url: DOCUMENTS_SUPPORT,
      dataReference: 'applicantDocsSupportPage',
    },
    [ApplicantReasonableAdjustments.COMMUNICATION_HELP]: {
      url: COMMUNICATION_HELP,
      dataReference: 'applicantHelpCommunicationPage',
    },
    [ApplicantReasonableAdjustments.COURT_HEARING_SUPPORT]: {
      url: COURT_HEARING_SUPPORT,
      dataReference: 'applicantCourtHearingPage',
    },
    [ApplicantReasonableAdjustments.COURT_HEARING_COMFORT]: {
      url: COURT_HEARING_COMFORT,
      dataReference: 'applicantCourtComfortPage',
    },
    [ApplicantReasonableAdjustments.TRAVELLING_TO_COURT]: {
      url: TRAVELLING_TO_COURT,
      dataReference: 'applicantTravellingToCourtPage',
    },
    [ApplicantReasonableAdjustments.UNABLE_TO_TAKE_COURT_PROCEEDINGS]: {
      url: UNABLE_TO_TAKE_COURT_PROCEEDINGS,
      dataReference: 'applicantUnableToTakeCourtProceedings',
    },
    [ApplicantReasonableAdjustments.NO_NEED_OF_SUPPORT]: {
      url: SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
      dataReference: 'nosupportPage',
    },
  };

  private getNextPageUrl(currentPageUrl: PageLink): PageLink | null {
    let pageUrl: PageLink | null = null;
    const currentPageId = Object.keys(this.pages).find(
      pageId => this.pages[pageId].url === currentPageUrl
    ) as ApplicantReasonableAdjustments;

    if (currentPageId) {
      const currentPageIndex: number = this.selectedPages.indexOf(currentPageId);

      if (currentPageIndex < this.selectedPages.length - 1) {
        pageUrl = this.pages[this.selectedPages[currentPageIndex + 1]].url;
      }
      console.log('applicant currentPageId==>' + currentPageId);
      console.log('applicant currentPageIndex==>' + currentPageIndex);
      console.log('applicant pageUrl==>' + pageUrl);
    }

    return pageUrl;
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>): PageLink {
    this.selectedPages = caseData.reasonableAdjustments;
    console.log('selectedPages==>' + this.selectedPages);
    let url: PageLink;

    switch (currentPageUrl) {
      case REASONABLE_ADJUSTMENTS: {
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
          console.log('applicant selectedPageUrls==1===>' + this.selectedPageUrls);
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
