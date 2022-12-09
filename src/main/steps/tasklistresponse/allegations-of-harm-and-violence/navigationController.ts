import { Case } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C1A_SAFETY_ONCERNS_ABDUCTION,
  C1A_SAFETY_ONCERNS_ABDUCTION_CHILD_LOCATION,
  C1A_SAFETY_ONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS,
  C1A_SAFETY_ONCERNS_ABDUCTION_THREATS,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  PRL_C1A_SAFETY_CONCERNS_NOFEEDBACK,
  PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PageLink,
  RESPONDENT_CHECK_ANSWERS_YES,
  // RESPONDENT_TASK_LIST_URL,
} from '../../../steps/urls';

class SafteyConcernsNavigationController {
  private concernsAbout: C1ASafteyConcernsAbout[] = [];
  private childConcerns: C1AAbuseTypes[] = [];
  private respondentConcerns: C1AAbuseTypes[] = [];

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, unknown>): PageLink {
    let nextUrl;

    this.concernsAbout = caseData?.c1A_safetyConernAbout as C1ASafteyConcernsAbout[];
    this.childConcerns = caseData?.c1A_concernAboutChild as C1AAbuseTypes[];
    this.respondentConcerns = caseData?.c1A_concernAboutRespondent as C1AAbuseTypes[];

    switch (currentPageUrl) {
      case RESPONDENT_CHECK_ANSWERS_YES: {
        nextUrl = this.getPageUrl(this.concernsAbout[0]);
        break;
      }

      case PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD: {
        nextUrl = this.getNextUrlSafetyConcernChild(
          this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, this.childConcerns[0])
        );

        break;
      }

      case PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE:
      case C1A_SAFETY_ONCERNS_ABDUCTION_THREATS:
      case C1A_SAFETY_ONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS: {
        nextUrl = this.getNextUrlSafetyConcernAbduct(params, currentPageUrl);
        break;
      }

      case PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT: {
        nextUrl = this.getPageUrl(C1ASafteyConcernsAbout.RESPONDENT, this.respondentConcerns[0]);
        break;
      }
      case PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE: {
        nextUrl = this.getNextUrlSafetyConcernReport(params);
        break;
      }
      default:
        nextUrl = currentPageUrl;
        break;
    }

    return nextUrl;
  }

  private getNextUrlSafetyConcernAbduct(params, currentPageUrl) {
    const abuseType =
      params?.abuseType ?? (currentPageUrl.includes(C1A_SAFETY_ONCERNS_ABDUCTION) ? C1AAbuseTypes.ABDUCTION : null);
    let returnUrl = this.getNextPageUrl(C1ASafteyConcernsAbout.CHILDREN, abuseType);

    //Flow-3
    if (this.checkForConcerns([C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.RESPONDENT])) {
      /* 
    1. If there is no page left to navigate for child, then the next page url should be respondent abuse selection page.
    2. If the next page url is other concerns page, then the next page url should be respondent abuse selection page.
    */
      if (!returnUrl || returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.SOMETHING_ELSE)) {
        returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.RESPONDENT);
      }
    } else {
      //Flow-1 or Flow-2
      /* 
    Flow-1 or Flow-2: If there is no page left to navigate for child, then the next page url should be other concerns page.
    Flow-2: If the next page url is respondent abuse selection page, then the next page url url should be other concerns page.
    */
      if (
        !returnUrl ||
        (this.checkForConcerns(C1ASafteyConcernsAbout.RESPONDENT, true) &&
          returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.RESPONDENT))
      ) {
        returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.OTHER);
      }
    }

    return returnUrl;
  }

  private getNextUrlSafetyConcernChild(returnUrl) {
    if (
      returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.SOMETHING_ELSE) &&
      this.checkForConcerns([C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.RESPONDENT])
    ) {
      returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.RESPONDENT);
    } else if (
      returnUrl === this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE) &&
      this.checkForConcerns(C1ASafteyConcernsAbout.RESPONDENT, true)
    ) {
      returnUrl = this.getPageUrl(C1ASafteyConcernsAbout.OTHER);
    }

    return returnUrl;
  }

  private getNextUrlSafetyConcernReport(params) {
    /* 
          Flow-2: If there is no page left to navigate for respondent, then the next page url should be child guidelines selection page.
          Flow-3: If there is no page left to navigate for respondent, then the next page url should be other concerns page.
          */
    const returnUrl =
      this.getNextPageUrl(C1ASafteyConcernsAbout.RESPONDENT, params?.abuseType) ??
      (this.checkForConcerns(C1ASafteyConcernsAbout.RESPONDENT, true)
        ? this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, undefined, 'guidelines')
        : this.getPageUrl(C1ASafteyConcernsAbout.OTHER));

    return returnUrl;
  }

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pages: Record<C1ASafteyConcernsAbout, Record<string, any>> = {
    [C1ASafteyConcernsAbout.CHILDREN]: {
      dataReference: () => this.childConcerns,
      url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.FINANCIAL_ABUSE }),
        },
        [C1AAbuseTypes.ABDUCTION]: {
          url: C1A_SAFETY_ONCERNS_ABDUCTION_CHILD_LOCATION,
        },
        [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE]: {
          url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
        },
      },
      guidelines: {
        url: PRL_C1A_SAFETY_CONCERNS_NOFEEDBACK,
      },
    },
    [C1ASafteyConcernsAbout.RESPONDENT]: {
      dataReference: () => this.respondentConcerns,
      url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
          }),
        },
        [C1AAbuseTypes.SOMETHING_ELSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }),
        },
      },
    },
    [C1ASafteyConcernsAbout.OTHER]: {
      url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
    },
    applicant: {},
  };
}

export default new SafteyConcernsNavigationController();
