import { Case } from '../../../../app/case/case';
import { OtherChildrenDetails } from '../../../../app/case/definition';
import { applyParms } from '../../../common/url-parser';
import {
  C100_CHILDERN_OTHER_CHILDREN_NAMES,
  C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
  C100_CONFIDENTIALITY_DETAILS_KNOW,
  PageLink,
} from '../../../urls';

class OtherChildrenDetailsNavigationController {
  private otherChildrenDetails: OtherChildrenDetails[] | [] = [];

  private childId: OtherChildrenDetails['id'] = '';

  private getOtherChild(): OtherChildrenDetails | null {
    const childIndex = this.otherChildrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.otherChildrenDetails.length - 1
      ? this.otherChildrenDetails[childIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.otherChildrenDetails = caseData?.cd_otherChildren as OtherChildrenDetails[];
    this.childId = params?.childId;
    let nextUrl;

    switch (currentPageUrl) {
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

export default new OtherChildrenDetailsNavigationController();
