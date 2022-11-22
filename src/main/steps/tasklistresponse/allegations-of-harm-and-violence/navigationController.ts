import { Case } from "../../../app/case/case";
import { C1ASafteyConcernsAbout } from "../../../app/case/definition";
import { PageLink, RESPONDENT_CHECK_ANSWERS_YES, RESPONDENT_ONLY_CHILD_CONCERN, RESPONDENT_ONLY_SELF_CONCERN, RESPONDENT_TASK_LIST_URL } from "../../../steps/urls";

class SafteyConcernsNavigationController {
  private concernsAbout: C1ASafteyConcernsAbout[] = [];

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    let nextUrl;

    this.concernsAbout = caseData?.c1A_safetyConernAbout as C1ASafteyConcernsAbout[];
    

    switch (currentPageUrl) {
      case RESPONDENT_CHECK_ANSWERS_YES: {
        nextUrl = this.getPageUrl(this.concernsAbout[0]);
        break;
      }
      
      default:
        nextUrl = currentPageUrl;
        break;
    }

    return nextUrl;
  }

  private getPageUrl(concernFor: C1ASafteyConcernsAbout): PageLink | null {
    const concern = this.pages?.[concernFor];
    
    let pageUrl = concern?.url ?? null;

    return pageUrl;
  }


  private pages: Record<C1ASafteyConcernsAbout, Record<string, any>> = {
    [C1ASafteyConcernsAbout.CHILDREN]: {
      url: RESPONDENT_ONLY_CHILD_CONCERN,
      
    },
    [C1ASafteyConcernsAbout.APPLICANT]: {
      url: RESPONDENT_ONLY_SELF_CONCERN,
    },
    [C1ASafteyConcernsAbout.OTHER]: {
      url: RESPONDENT_TASK_LIST_URL,
    },
  };
}



export default new SafteyConcernsNavigationController();