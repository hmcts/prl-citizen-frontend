/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Case,
  Miam_noMediatorReasons,
  Miam_notAttendingReasons,
  Miam_previousAttendance,
} from '../../../app/case/case';
import { DomesticAbuseExemptions, MiamNonAttendReason, YesOrNo } from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_HEARING_URGENCY_URGENT,
  C100_MIAM_CHILD_PROTECTION,
  C100_MIAM_GENERAL_REASONS,
  C100_MIAM_GET_MEDIATOR,
  C100_MIAM_MIAM_DOMESTIC_ABUSE,
  C100_MIAM_NO_ACCESS_MEDIATOR,
  C100_MIAM_NO_NEED_WITH_REASONS,
  C100_MIAM_OTHER,
  C100_MIAM_PREVIOUS_ATTENDANCE,
  C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR,
  C100_MIAM_PROVIDING_DA_EVIDENCE,
  C100_MIAM_UPLOAD_DA_EVIDENCE,
  C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING,
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
      case C100_MIAM_OTHER: {
        url =
          caseData.miam_notAttendingReasons === Miam_notAttendingReasons.canNotAccessMediator
            ? C100_MIAM_NO_ACCESS_MEDIATOR
            : this.checkForAnyValidReason(caseData)
            ? C100_MIAM_NO_NEED_WITH_REASONS
            : C100_MIAM_GET_MEDIATOR;
        break;
      }
      case C100_MIAM_NO_ACCESS_MEDIATOR: {
        url =
          caseData.miam_noMediatorReasons === Miam_noMediatorReasons.none
            ? C100_MIAM_GET_MEDIATOR
            : C100_MIAM_NO_NEED_WITH_REASONS;
        break;
      }
      case C100_MIAM_PREVIOUS_ATTENDANCE: {
        if (caseData.miam_previousAttendance === Miam_previousAttendance.fourMonthsPriorAttended) {
          url = applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING) as PageLink;
        } else if (caseData.miam_previousAttendance === Miam_previousAttendance.miamExamptionApplied) {
          url = C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR;
        } else {
          url =
            this.getNextPageUrl(C100_MIAM_PREVIOUS_ATTENDANCE) ||
            (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
        }
        break;
      }
      case C100_MIAM_PREVIOUS_MIAM_ATTENDANCE_OR_NCDR: {
        if (caseData.miam_haveDocSignedByMediatorForPrevAttendance === YesOrNo.YES) {
          url = applyParms(C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING) as PageLink;
        } else {
          url =
            this.getNextPageUrl(C100_MIAM_PREVIOUS_ATTENDANCE) ||
            (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
        }
        break;
      }
      case C100_MIAM_UPLOAD_EVIDENCE_FOR_ATTENDING: {
        url =
          this.getNextPageUrl(C100_MIAM_PREVIOUS_ATTENDANCE) ??
          (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
        break;
      }
      case C100_MIAM_MIAM_DOMESTIC_ABUSE: {
        if (!caseData.miam_domesticAbuse?.includes(DomesticAbuseExemptions.NONE)) {
          url = applyParms(C100_MIAM_PROVIDING_DA_EVIDENCE) as PageLink;
        } else {
          url =
            this.getNextPageUrl(currentPageUrl) ??
            (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
        }
        break;
      }
      case C100_MIAM_PROVIDING_DA_EVIDENCE: {
        if (caseData.miam_canProvideDomesticAbuseEvidence === YesOrNo.YES) {
          url = applyParms(C100_MIAM_UPLOAD_DA_EVIDENCE) as PageLink;
        } else {
          url =
            this.getNextPageUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE) ??
            (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
        }
        break;
      }
      case C100_MIAM_UPLOAD_DA_EVIDENCE: {
        url =
          this.getNextPageUrl(C100_MIAM_MIAM_DOMESTIC_ABUSE) ??
          (this.checkForAnyValidReason(caseData) ? C100_MIAM_NO_NEED_WITH_REASONS : C100_MIAM_GET_MEDIATOR);
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
