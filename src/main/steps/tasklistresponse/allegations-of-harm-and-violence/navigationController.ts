import { applyParms } from "../../../steps/common/url-parser";
import { Case } from "../../../app/case/case";
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from "../../../app/case/definition";
import { 
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PageLink, RESPONDENT_CHECK_ANSWERS_YES, 
  RESPONDENT_TASK_LIST_URL, 
  } from "../../../steps/urls";

class SafteyConcernsNavigationController {
  private concernsAbout: C1ASafteyConcernsAbout[] = [];
  private childConcerns: C1AAbuseTypes[] = [];
  private applicantConcerns: C1AAbuseTypes[] = [];

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    let nextUrl;

    this.concernsAbout = caseData?.c1A_safetyConernAbout as C1ASafteyConcernsAbout[];
    this.childConcerns = caseData?.c1A_concernAboutChild as C1AAbuseTypes[];
    this.applicantConcerns = caseData?.c1A_concernAboutApplicant as C1AAbuseTypes[];
    

    switch (currentPageUrl) {
      case RESPONDENT_CHECK_ANSWERS_YES: {
        nextUrl = this.getPageUrl(this.concernsAbout[0]);
        break;
      }
      
      case C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD: {
        nextUrl = this.getNextUrlSafetyConcernChild(
          this.getPageUrl(C1ASafteyConcernsAbout.CHILDREN, this.childConcerns[0])
        );

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
        // [C1AAbuseTypes.ABDUCTION]: {
        //   url: C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
        // },
        // [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE]: {
        //   url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
        // },
        // [C1AAbuseTypes.SOMETHING_ELSE]: {
        //   url: C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
        // },
      },
    },
    [C1ASafteyConcernsAbout.APPLICANT]: {
      dataReference: () => this.applicantConcerns,
      url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
      abuse: {
        [C1AAbuseTypes.PHYSICAL_ABUSE]: {
          url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, {
            abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
          }),
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
      url: RESPONDENT_TASK_LIST_URL,
    },
  };

}

  

  

  

  




export default new SafteyConcernsNavigationController();