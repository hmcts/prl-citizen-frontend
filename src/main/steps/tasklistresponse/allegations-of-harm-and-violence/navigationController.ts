import { Case } from '../../../app/case/case';
import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C1A_SAFETY_CONCERNS_ABDUCTION,
  PRL_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS,
  C1A_SAFETY_CONCERNS_ABDUCTION_THREATS,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
  PRL_C1A_SAFETY_CONCERNS_NOFEEDBACK,
  PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE,
  PageLink,
  RESPONDENT_CHECK_ANSWERS_YES,
  // RESPONDENT_TASK_LIST_URL,
} from '../../../steps/urls';

class SafteyConcernsNavigationController {
  private concernsAbout: PRL_C1ASafteyConcernsAbout[] = [];
  private childConcerns: PRL_C1AAbuseTypes[] = [];
  private respondentConcerns: PRL_C1AAbuseTypes[] = [];

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, unknown>): PageLink {
    let nextUrl;

    this.concernsAbout = caseData?.PRL_c1A_safetyConernAbout as PRL_C1ASafteyConcernsAbout[];
    this.childConcerns = caseData?.PRL_c1A_concernAboutChild as PRL_C1AAbuseTypes[];
    this.respondentConcerns = caseData?.PRL_c1A_concernAboutRespondent as PRL_C1AAbuseTypes[];

    switch (currentPageUrl) {
      case RESPONDENT_CHECK_ANSWERS_YES: {
        nextUrl = this.getPageUrl(this.concernsAbout[0]);
        break;
      }

      case PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD: {
        nextUrl = this.getNextUrlSafetyConcernChild(
          this.getPageUrl(PRL_C1ASafteyConcernsAbout.CHILDREN, this.childConcerns[0])
        );

        break;
      }

      case PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE:
      case C1A_SAFETY_CONCERNS_ABDUCTION_THREATS:
      case C1A_SAFETY_CONCERNS_ABDUCTION_PREVIOUS_ABDUCTIONS: {
        nextUrl = this.getNextUrlSafetyConcernAbduct(params, currentPageUrl);
        break;
      }

      case PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT: {
        nextUrl = this.getPageUrl(PRL_C1ASafteyConcernsAbout.RESPONDENT, this.respondentConcerns[0]);
        break;
      }
      case PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE: {
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
      params?.abuseType ??
      (currentPageUrl.includes(C1A_SAFETY_CONCERNS_ABDUCTION) ? PRL_C1AAbuseTypes.ABDUCTION : null);
    let returnUrl = this.getNextPageUrl(PRL_C1ASafteyConcernsAbout.CHILDREN, abuseType);

    //Flow-3
    if (this.checkForConcerns([PRL_C1ASafteyConcernsAbout.CHILDREN, PRL_C1ASafteyConcernsAbout.RESPONDENT])) {
      /*
    1. If there is no page left to navigate for child, then the next page url should be respondent abuse selection page.
    2. If the next page url is other concerns page, then the next page url should be respondent abuse selection page.
    */
      if (
        !returnUrl ||
        returnUrl === this.getPageUrl(PRL_C1ASafteyConcernsAbout.CHILDREN, PRL_C1AAbuseTypes.SOMETHING_ELSE)
      ) {
        returnUrl = this.getPageUrl(PRL_C1ASafteyConcernsAbout.RESPONDENT);
      }
    } else {
      //Flow-1 or Flow-2
      /*
    Flow-1 or Flow-2: If there is no page left to navigate for child, then the next page url should be other concerns page.
    Flow-2: If the next page url is respondent abuse selection page, then the next page url url should be other concerns page.
    */
      if (
        !returnUrl ||
        (this.checkForConcerns(PRL_C1ASafteyConcernsAbout.RESPONDENT, true) &&
          returnUrl === this.getPageUrl(PRL_C1ASafteyConcernsAbout.RESPONDENT))
      ) {
        returnUrl = this.getPageUrl(PRL_C1ASafteyConcernsAbout.OTHER);
      }
    }

    return returnUrl;
  }

  private getNextUrlSafetyConcernChild(returnUrl) {
    if (
      returnUrl === this.getPageUrl(PRL_C1ASafteyConcernsAbout.CHILDREN, PRL_C1AAbuseTypes.SOMETHING_ELSE) &&
      this.checkForConcerns([PRL_C1ASafteyConcernsAbout.CHILDREN, PRL_C1ASafteyConcernsAbout.RESPONDENT])
    ) {
      returnUrl = this.getPageUrl(PRL_C1ASafteyConcernsAbout.RESPONDENT);
    } else if (
      returnUrl === this.getPageUrl(PRL_C1ASafteyConcernsAbout.CHILDREN, PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE) &&
      this.checkForConcerns(PRL_C1ASafteyConcernsAbout.RESPONDENT, true)
    ) {
      returnUrl = this.getPageUrl(PRL_C1ASafteyConcernsAbout.OTHER);
    }

    return returnUrl;
  }

  private getNextUrlSafetyConcernReport(params) {
    /*
          Flow-2: If there is no page left to navigate for respondent, then the next page url should be child guidelines selection page.
          Flow-3: If there is no page left to navigate for respondent, then the next page url should be other concerns page.
          */
    const returnUrl =
      this.getNextPageUrl(PRL_C1ASafteyConcernsAbout.RESPONDENT, params?.abuseType) ??
      (this.checkForConcerns(PRL_C1ASafteyConcernsAbout.RESPONDENT, true)
        ? this.getPageUrl(PRL_C1ASafteyConcernsAbout.CHILDREN, undefined, 'guidelines')
        : this.getPageUrl(PRL_C1ASafteyConcernsAbout.OTHER));

    return returnUrl;
  }

  private getPageUrl(
    concernFor: PRL_C1ASafteyConcernsAbout,
    abuseType?: PRL_C1AAbuseTypes,
    other?: string
  ): PageLink | null {
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

  private checkForConcerns(
    concernFor: PRL_C1ASafteyConcernsAbout | PRL_C1ASafteyConcernsAbout[],
    isOnly?: boolean
  ): boolean {
    concernFor = Array.isArray(concernFor) ? concernFor : [concernFor];

    return concernFor.every(concern => {
      const hasConcern = this.concernsAbout.includes(concern);
      return isOnly ? this.concernsAbout.length === 1 && hasConcern : hasConcern;
    });
  }

  private getNextPageUrl(concernFor: PRL_C1ASafteyConcernsAbout, abuseType: PRL_C1AAbuseTypes | null): PageLink | null {
    let pageUrl: PageLink | null = null;

    const dataReference = this.pages[concernFor].dataReference();
    const currentPageIndex: number = dataReference.indexOf(abuseType);

    if (currentPageIndex >= 0 && currentPageIndex < dataReference.length - 1) {
      pageUrl = this.getPageUrl(concernFor, dataReference[currentPageIndex + 1]);
    }

    return pageUrl;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pages: Record<PRL_C1ASafteyConcernsAbout, Record<string, any>> = {
    [PRL_C1ASafteyConcernsAbout.CHILDREN]: {
      dataReference: () => this.childConcerns,
      url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
      abuse: {
        [PRL_C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.PHYSICAL_ABUSE }),
        },
        [PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [PRL_C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE }),
        },
        [PRL_C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.SEXUAL_ABUSE }),
        },
        [PRL_C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.FINANCIAL_ABUSE }),
        },
        [PRL_C1AAbuseTypes.ABDUCTION]: {
          url: PRL_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
        },
        [PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE]: {
          url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
        },
        [PRL_C1AAbuseTypes.SOMETHING_ELSE]: {
          url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
        },
      },
      guidelines: {
        url: PRL_C1A_SAFETY_CONCERNS_NOFEEDBACK,
      },
    },
    [PRL_C1ASafteyConcernsAbout.RESPONDENT]: {
      dataReference: () => this.respondentConcerns,
      url: PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
      abuse: {
        [PRL_C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.PHYSICAL_ABUSE,
          }),
        },
        [PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          }),
        },
        [PRL_C1AAbuseTypes.EMOTIONAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE,
          }),
        },
        [PRL_C1AAbuseTypes.SEXUAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.SEXUAL_ABUSE,
          }),
        },
        [PRL_C1AAbuseTypes.FINANCIAL_ABUSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.FINANCIAL_ABUSE,
          }),
        },
        [PRL_C1AAbuseTypes.SOMETHING_ELSE]: {
          url: applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, {
            abuseType: PRL_C1AAbuseTypes.SOMETHING_ELSE,
          }),
        },
      },
    },
    [PRL_C1ASafteyConcernsAbout.OTHER]: {
      url: PRL_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
    },
    applicant: {},
  };
}

export default new SafteyConcernsNavigationController();
