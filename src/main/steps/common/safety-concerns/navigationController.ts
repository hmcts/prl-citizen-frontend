/* eslint-disable @typescript-eslint/no-explicit-any */

import { Case } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, RootContext } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_URL,
  C1A_CHILD_ABDUCTION_THREATS,
  C1A_SAFETY_CONCERNS_ABDUCTION,
  C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF,
  C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
  C1A_SAFETY_CONCERNS_NOFEEDBACK,
  C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
  C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE,
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
  private respondentConcerns: C1AAbuseTypes[] = [];

  private pages: Record<C1ASafteyConcernsAbout, Record<string, any>> = {
    [C1ASafteyConcernsAbout.CHILDREN]: {
      dataReference: () => this.childConcerns,
      url: C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.FINANCIAL_ABUSE }),
        },
        [C1AAbuseTypes.ABDUCTION]: {
          url: applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION, {}) as PageLink,
        },
        [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, {}) as PageLink,
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, {}) as PageLink,
        },
      },
      guidelines: {
        url: applyParms(C1A_SAFETY_CONCERNS_NOFEEDBACK, {}) as PageLink,
      },
    },
    [C1ASafteyConcernsAbout.APPLICANT]: {
      dataReference: () => this.applicantConcerns,
      url: applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, {}) as PageLink,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { abuseType: C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }),
        },
      },
    },
    [C1ASafteyConcernsAbout.OTHER]: {
      url: applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, {}) as PageLink,
    },
    [C1ASafteyConcernsAbout.RESPONDENT]: {
      dataReference: () => this.respondentConcerns,
      url: C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.SEXUAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
            abuseType: C1AAbuseTypes.SOMETHING_ELSE,
          }),
        },
      },
    },
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

  public getNextUrl(
    currentPageUrl: PageLink,
    caseData: Partial<Case>,
    req?: AppRequest,
    params?: Record<string, any>
  ): PageLink {
    let nextUrl;

    this.concernsAbout = caseData?.c1A_safetyConernAbout as C1ASafteyConcernsAbout[];
    this.childConcerns = caseData?.c1A_concernAboutChild as C1AAbuseTypes[];
    this.applicantConcerns = caseData?.c1A_concernAboutApplicant as C1AAbuseTypes[];
    this.respondentConcerns = caseData?.c1A_concernAboutRespondent as C1AAbuseTypes[];
    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);
    switch (currentPageUrl) {
      case applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }): {
        nextUrl = this.getPageUrl(this.concernsAbout[0]);
        break;
      }
      case applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }): {
        nextUrl = this.getNextUrlSafetyConcernChild(
          this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, this.childConcerns[0])
        );

        break;
      }
      case applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }):
      case applyParms(C1A_CHILD_ABDUCTION_THREATS, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }):
      case applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }): {
        nextUrl = this.getNextUrlSafetyConcernAbduct(params, currentPageUrl);
        break;
      }
      case applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }): {
        nextUrl = C100rebuildJourney
          ? this.getPageUrl(C1ASafteyConcernsAbout.APPLICANT, this.applicantConcerns[0])
          : this.getPageUrl(C1ASafteyConcernsAbout.RESPONDENT, this.respondentConcerns[0]);
        break;
      }
      case applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
      }): {
        nextUrl = this.getNextUrlSafetyConcernReport(params);
        break;
      }
      default:
        nextUrl = currentPageUrl;
        break;
    }

    return applyParms(nextUrl, {
      root: C100rebuildJourney ? RootContext.C100_REBUILD : RootContext.RESPONDENT,
    }) as PageLink;
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
      params?.abuseType ?? (currentPageUrl.includes(C1A_SAFETY_CONCERNS_ABDUCTION) ? C1AAbuseTypes.ABDUCTION : null);
    let returnUrl = this.getNextPageUrl(C1ASafteyConcernsAbout.CHILDREN, abuseType);
    const yourself =
      params.root === RootContext.C100_REBUILD ? C1ASafteyConcernsAbout.APPLICANT : C1ASafteyConcernsAbout.RESPONDENT;
    //Flow-3
    if (this.checkForConcerns([C1ASafteyConcernsAbout.CHILDREN, yourself])) {
      /* 
    1. If there is no page left to navigate for child, then the next page url should be applicant abuse selection page.
    2. If the next page url is other concerns page, then the next page url should be applicant abuse selection page.
    */
      if (!returnUrl || returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.SOMETHING_ELSE)) {
        returnUrl = this.getPageUrl(
          params.root === RootContext.C100_REBUILD
            ? C1ASafteyConcernsAbout.APPLICANT
            : C1ASafteyConcernsAbout.RESPONDENT
        );
      }
    } else {
      //Flow-1 or Flow-2
      /* 
    Flow-1 or Flow-2: If there is no page left to navigate for child, then the next page url should be other concerns page.
    Flow-2: If the next page url is applicant abuse selection page, then the next page url url should be other concerns page.
    */
      if (
        !returnUrl ||
        (this.checkForConcerns(
          params.root === RootContext.C100_REBUILD
            ? C1ASafteyConcernsAbout.APPLICANT
            : C1ASafteyConcernsAbout.RESPONDENT,
          true
        ) &&
          returnUrl ===
            this.getPageUrl(
              params.root === RootContext.C100_REBUILD
                ? C1ASafteyConcernsAbout.APPLICANT
                : C1ASafteyConcernsAbout.RESPONDENT
            ))
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
      this.getNextPageUrl(
        params?.root === RootContext.C100_REBUILD
          ? C1ASafteyConcernsAbout.APPLICANT
          : C1ASafteyConcernsAbout.RESPONDENT,
        params?.abuseType
      ) ??
      (this.checkForConcerns(
        params?.root === RootContext.C100_REBUILD
          ? C1ASafteyConcernsAbout.APPLICANT
          : C1ASafteyConcernsAbout.RESPONDENT,
        true
      )
        ? this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, undefined, 'guidelines')
        : this.getPageUrl(C1ASafteyConcernsAbout.OTHER));

    return returnUrl;
  }
}

export default new SafteyConcernsNavigationController();
