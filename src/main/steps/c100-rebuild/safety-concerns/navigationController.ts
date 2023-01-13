/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_C1A_CHILD_ABDUCTION_THREATS,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
  C100_C1A_SAFETY_CONCERNS_NOFEEDBACK,
  C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
  C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PageLink,
} from '../../urls';

/*
Navigation Flow Legends:
Flow-1: Only for children
Flow-2: Only for applicant
Flow-3: Both children & the applicant
*/
class SafteyConcernsNavigationController {
  private concernsAbout: C1ASafteyConcernsAbout[] = [];
  private childConcerns: C1AAbuseTypes[] = [];
  private applicantConcerns: C1AAbuseTypes[] = [];

  private pages: Record<C1ASafteyConcernsAbout, Record<string, any>> = {
    [C1ASafteyConcernsAbout.CHILDREN]: {
      dataReference: () => this.childConcerns,
      url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.FINANCIAL_ABUSE }),
        },
        [C1AAbuseTypes.ABDUCTION]: {
          url: C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
        },
        [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE]: {
          url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
        },
      },
      guidelines: {
        url: C100_C1A_SAFETY_CONCERNS_NOFEEDBACK,
      },
    },
    [C1ASafteyConcernsAbout.APPLICANT]: {
      dataReference: () => this.applicantConcerns,
      url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }),
        },
      },
    },
    [C1ASafteyConcernsAbout.OTHER]: {
      url: C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
    },
    respondent: {},
  };

  private getPageUrl(concernFor: C1ASafteyConcernsAbout, abuseType?: C1AAbuseTypes, other?: string): PageLink | null {
    const concern = this.pages?.[concernFor];
    let pageUrl = null;

    if (!abuseType && !other) {
      pageUrl = concern?.url ?? null;
    }

    if (abuseType) {
      pageUrl = concern.abuse?.[abuseType]?.url ?? null;
    }

    if (other) {
      pageUrl = concern?.[other]?.url ?? null;
    }

    return pageUrl;
  }

  private checkForConcerns(concernFor: C1ASafteyConcernsAbout | C1ASafteyConcernsAbout[], isOnly?: boolean): boolean {
    concernFor = Array.isArray(concernFor) ? concernFor : [concernFor];

    return concernFor.every(concern => {
      const hasConcern = this.concernsAbout.includes(concern);
      return isOnly ? this.concernsAbout.length === 1 && hasConcern : hasConcern;
    });
  }

  private getNextPageUrl(concernFor: C1ASafteyConcernsAbout, abuseType: C1AAbuseTypes | null): PageLink | null {
    let pageUrl: PageLink | null = null;

    const dataReference = this.pages[concernFor].dataReference();
    const currentPageIndex: number = dataReference.indexOf(abuseType);

    if (currentPageIndex >= 0 && currentPageIndex < dataReference.length - 1) {
      pageUrl = this.getPageUrl(concernFor, dataReference[currentPageIndex + 1]);
    }

    return pageUrl;
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    let nextUrl;

    this.concernsAbout = caseData?.c1A_safetyConernAbout as C1ASafteyConcernsAbout[];
    this.childConcerns = caseData?.c1A_concernAboutChild as C1AAbuseTypes[];
    this.applicantConcerns = caseData?.c1A_concernAboutApplicant as C1AAbuseTypes[];

    switch (currentPageUrl) {
      case C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT: {
        nextUrl = this.getPageUrl(this.concernsAbout[0]);
        break;
      }
      case C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD: {
        nextUrl = this.getNextUrlSafetyConcernChild(
          this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, this.childConcerns[0])
        );

        break;
      }
      case C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE:
      case C100_C1A_CHILD_ABDUCTION_THREATS:
      case C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS: {
        nextUrl = this.getNextUrlSafetyConcernAbduct(params, currentPageUrl);
        break;
      }
      case C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT: {
        nextUrl = this.getPageUrl(C1ASafteyConcernsAbout.APPLICANT, this.applicantConcerns[0]);
        break;
      }
      case C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE: {
        nextUrl = this.getNextUrlSafetyConcernReport(params);
        break;
      }
      default:
        nextUrl = currentPageUrl;
        break;
    }

    return nextUrl;
  }

  private getNextUrlSafetyConcernChild(returnUrl) {
    if (
      returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.SOMETHING_ELSE) &&
      this.checkForConcerns([C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT])
    ) {
      returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.APPLICANT);
    } else if (
      returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE) &&
      this.checkForConcerns(C1ASafteyConcernsAbout.APPLICANT, true)
    ) {
      returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.OTHER);
    }

    return returnUrl;
  }

  private getNextUrlSafetyConcernAbduct(params, currentPageUrl) {
    const abuseType =
      params?.abuseType ??
      (currentPageUrl.includes(C100_C1A_SAFETY_CONCERNS_ABDUCTION) ? C1AAbuseTypes.ABDUCTION : null);
    let returnUrl = this.getNextPageUrl(C1ASafteyConcernsAbout.CHILDREN, abuseType);

    //Flow-3
    if (this.checkForConcerns([C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT])) {
      /* 
    1. If there is no page left to navigate for child, then the next page url should be applicant abuse selection page.
    2. If the next page url is other concerns page, then the next page url should be applicant abuse selection page.
    */
      if (!returnUrl || returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.SOMETHING_ELSE)) {
        returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.APPLICANT);
      }
    } else {
      //Flow-1 or Flow-2
      /* 
    Flow-1 or Flow-2: If there is no page left to navigate for child, then the next page url should be other concerns page.
    Flow-2: If the next page url is applicant abuse selection page, then the next page url url should be other concerns page.
    */
      if (
        !returnUrl ||
        (this.checkForConcerns(C1ASafteyConcernsAbout.APPLICANT, true) &&
          returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.APPLICANT))
      ) {
        returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.OTHER);
      }
    }

    return returnUrl;
  }

  private getNextUrlSafetyConcernReport(params) {
    /* 
          Flow-2: If there is no page left to navigate for applicant, then the next page url should be child guidelines selection page.
          Flow-3: If there is no page left to navigate for applicant, then the next page url should be other concerns page.
          */
    const returnUrl =
      this.getNextPageUrl(C1ASafteyConcernsAbout.APPLICANT, params?.abuseType) ??
      (this.checkForConcerns(C1ASafteyConcernsAbout.APPLICANT, true)
        ? this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, undefined, 'guidelines')
        : this.getPageUrl(C1ASafteyConcernsAbout.OTHER));

    return returnUrl;
  }
}

export default new SafteyConcernsNavigationController();
