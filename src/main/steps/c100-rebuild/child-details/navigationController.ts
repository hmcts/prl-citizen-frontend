import { Case } from '../../../app/case/case';
import { ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_FURTHER_INFORMATION,
  C100_CHILDERN_OTHER_CHILDREN_NAMES,
  C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
  C100_CONFIDENTIALITY_DETAILS_KNOW,
  PageLink,
} from '../../urls';

class ChildrenDetailsNavigationController {
  private childrenDetails: ChildrenDetails[] | [] = [];

  private otherChildrenDetails: ChildrenDetails[] | [] = [];

  private childId: ChildrenDetails['id'] = '';

  private getNextChild(): ChildrenDetails | null {
    const childIndex = this.childrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.childrenDetails.length - 1
      ? this.childrenDetails[childIndex + 1]
      : null;
  }

  private getOtherChild(): ChildrenDetails | null {
    const childIndex = this.otherChildrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.otherChildrenDetails.length - 1
      ? this.otherChildrenDetails[childIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.otherChildrenDetails = caseData?.cd_otherChildren as ChildrenDetails[];
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
        const nextChild = this.getNextChild();
        nextUrl = nextChild
          ? applyParms(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, { childId: nextChild.id })
          : C100_CHILDERN_FURTHER_INFORMATION;
        break;
      }
      case C100_CHILDERN_OTHER_CHILDREN_NAMES: {
        nextUrl = applyParms(C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS, {
          childId: this.otherChildrenDetails[0].id,
        });
        break;
      }
      case C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS: {
        const nextChild = this.getOtherChild();
        nextUrl = nextChild
          ? applyParms(C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS, { childId: nextChild.id })
          : C100_CONFIDENTIALITY_DETAILS_KNOW;
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
