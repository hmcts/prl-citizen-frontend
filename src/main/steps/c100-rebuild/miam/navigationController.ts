/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { MiamNonAttendReason } from '../../../app/case/definition';
import {
  C100_HEARING_URGENCY_URGENT,
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_GENERAL_REASONS,
  C100_MIAM_GET_MEDIATOR,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_NO_NEED_WITH_REASONS,
  C100_MIAM_OTHER,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_URGENCY,
  C100_TYPE_ORDER_SELECT_COURT_ORDER,
  PageLink,
} from '../../urls';

class MIAMNavigationController {
  protected selectedPages: MiamNonAttendReason[] = [];

  private pages: Record<MiamNonAttendReason, Record<string, any>> = {
    [MiamNonAttendReason.DOMESTIC]: {
      url: C100_MIAM_MIAM_DOMESTIC_ABUSE,
      dataReference: 'miam_domesticAbuse',
    },
    [MiamNonAttendReason.CHILD_PROTECTION]: {
      url: C100_MIAM_CHILD_PROTECTION,
      dataReference: 'miam_childProtectionEvidence',
    },
    [MiamNonAttendReason.URGENT]: {
      url: C100_MIAM_URGENCY,
      dataReference: 'miam_urgency',
    },
    [MiamNonAttendReason.PREV_MIAM]: {
      url: C100_MIAM_PREVIOUS_ATTENDANCE,
      dataReference: 'miam_previousAttendance',
    },
    [MiamNonAttendReason.EXEMPT]: {
      url: C100_MIAM_OTHER,
      dataReference: 'miam_notAttendingReasons',
    },
    [MiamNonAttendReason.NONE]: {
      url: C100_MIAM_GET_MEDIATOR,
    },
  };

  private getNextPageUrl(currentPageUrl: PageLink): PageLink | null {
    let pageUrl: PageLink | null = null;
    const currentPageId = Object.keys(this.pages).find(
      pageId => this.pages[pageId].url === currentPageUrl
    ) as MiamNonAttendReason;

    if (currentPageId) {
      const currentPageIndex: number = this.selectedPages.indexOf(currentPageId);

      if (currentPageIndex < this.selectedPages.length - 1) {
        pageUrl = this.pages[this.selectedPages[currentPageIndex + 1]].url;
      }
    }
    return pageUrl;
  }

  public checkForAnyValidReason(caseData: Partial<Case>, page?: MiamNonAttendReason): boolean {
    if (page && !caseData?.miam_nonAttendanceReasons?.includes(page)) {
      return false;
    }

    const pages = page ? [page] : caseData?.miam_nonAttendanceReasons;

    return (
      pages?.some(pageId => {
        const dataReference = this.pages[pageId]?.dataReference;
        return dataReference && caseData[dataReference] ? !caseData[dataReference].includes('none') : false;
      }) ?? false
    );
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>): PageLink {
    this.selectedPages = caseData.miam_nonAttendanceReasons as MiamNonAttendReason[];
    let url: PageLink;

    switch (currentPageUrl) {
      case C100_MIAM_GENERAL_REASONS: {
        url = this.pages[this.selectedPages[0]].url;
        break;
      }
      case C100_MIAM_NO_NEED_WITH_REASONS: {
        url = this.checkForAnyValidReason(caseData, MiamNonAttendReason.URGENT)
          ? C100_HEARING_URGENCY_URGENT
          : C100_TYPE_ORDER_SELECT_COURT_ORDER;
        break;
      }
      default: {
        url =
          this.getNextPageUrl(currentPageUrl) ||
          (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
        break;
      }
    }

    return url;
  }
}

export default new MIAMNavigationController();
