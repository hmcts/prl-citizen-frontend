import { Case } from '../../../app/case/case';
import { ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_FURTHER_INFORMATION,
  C100_CHILDERN_LIVE_WITH,
  PageLink,
} from '../../urls';

import { getNextChild } from './util';

class ChildrenDetailsNavigationController {
  private childrenDetails: ChildrenDetails[] | [] = [];

  private childId: ChildrenDetails['id'] = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.childId = params?.childId;
    let nextUrl;

    switch (currentPageUrl) {
      case C100_CHILDERN_DETAILS_ADD: {
        nextUrl = applyParms(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, { childId: this.childrenDetails[0].id });
        break;
      }
      case C100_CHILDERN_DETAILS_PERSONAL_DETAILS: {
        nextUrl = applyParms(C100_CHILDERN_DETAILS_CHILD_MATTERS, { childId: this.childId });
        break;
      }
      case C100_CHILDERN_DETAILS_CHILD_MATTERS: {
        nextUrl = applyParms(C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY, { childId: this.childId });
        break;
      }
      case C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY: {
        const nextChild = getNextChild(this.childrenDetails, this.childId);
        nextUrl = nextChild
          ? applyParms(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, { childId: nextChild.id })
          : C100_CHILDERN_FURTHER_INFORMATION;
        break;
      }
      case C100_CHILDERN_LIVE_WITH: {
        const nextChild = getNextChild(this.childrenDetails, this.childId);
        nextUrl = nextChild
          ? applyParms(C100_CHILDERN_LIVE_WITH, { childId: nextChild.id })
          : C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE;
        break;
      }
      default: {
        nextUrl = currentPageUrl;
        break;
      }
    }

    return nextUrl;
  }
}

export default new ChildrenDetailsNavigationController();
