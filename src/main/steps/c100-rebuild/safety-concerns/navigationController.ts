/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_C1A_SAFETY_CONCERNS_ABDUCTION,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
  C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
  C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PageLink,
} from '../../urls';

class SafteyConcernsNavigationController {
  private concernsAbout: string[] = [];
  private childConcerns: C1AAbuseTypes[] = [];

  private pages: Record<C1ASafteyConcernsAbout, Record<string, any>> = {
    [C1ASafteyConcernsAbout.CHILDREN]: {
      url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
      dataReference: () => this.childConcerns,
      [C1AAbuseTypes.PHYSICAL_ABUSE]: {
        url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE }),
      },
      [C1AAbuseTypes.PSYCHOLOGICAL_ABUSE]: {
        url: applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE }),
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
    [C1ASafteyConcernsAbout.APPLICANT]: {
      url: C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
    },
  };

  private getNextPageUrl(abuseType: C1AAbuseTypes | null, concernFor: C1ASafteyConcernsAbout): PageLink | null {
    let pageUrl: PageLink | null = null;
    const dataReference = this.pages[concernFor].dataReference();
    const currentPageIndex: number = dataReference.indexOf(abuseType);

    if (currentPageIndex >= 0 && currentPageIndex < dataReference.length - 1) {
      pageUrl = this.pages[concernFor][dataReference[currentPageIndex + 1]].url;
    }

    return pageUrl;
  }

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.concernsAbout = caseData?.c1A_safetyConernAbout as string[];
    this.childConcerns = caseData?.c1A_concernAboutChild as C1AAbuseTypes[];

    let nextUrl;

    switch (currentPageUrl) {
      case C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT: {
        nextUrl = this.pages[this.concernsAbout[0]].url;
        break;
      }
      case C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD: {
        nextUrl = this.pages[C1ASafteyConcernsAbout.CHILDREN][this.childConcerns[0]].url;
        break;
      }
      case C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE:
      case C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS: {
        const abuseType =
          params?.abuseType ??
          (currentPageUrl.includes(C100_C1A_SAFETY_CONCERNS_ABDUCTION) ? C1AAbuseTypes.ABDUCTION : null);

        nextUrl =
          this.getNextPageUrl(abuseType, C1ASafteyConcernsAbout.CHILDREN) ??
          this.pages[C1ASafteyConcernsAbout.CHILDREN][C1AAbuseTypes.SOMETHING_ELSE].url;
        break;
      }
      default:
        nextUrl = currentPageUrl;
        break;
    }

    return nextUrl;
  }
}

export default new SafteyConcernsNavigationController();
