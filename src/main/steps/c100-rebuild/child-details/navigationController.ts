import { Case } from '../../../app/case/case';
import { ChildrenDetails } from '../../../app/case/definition';
import {
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_FURTHER_INFORMATION,
  PageLink,
} from '../../urls';

class ChildrenDetailsNavigationController {
  private childrenDetails: ChildrenDetails[] | [] = [];

  private childId: ChildrenDetails['id'] = '';

  private getNextChild(): ChildrenDetails | null {
    const childIndex = this.childrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.childrenDetails.length - 1
      ? this.childrenDetails[childIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.childId = params?.childId;
    let nextUrl: PageLink;

    switch (currentPageUrl) {
      case C100_CHILDERN_DETAILS_ADD: {
        nextUrl = `${this.extractUrl(C100_CHILDERN_DETAILS_PERSONAL_DETAILS)}/${this.childrenDetails[0].id}`;
        break;
      }
      case C100_CHILDERN_DETAILS_PERSONAL_DETAILS: {
        nextUrl = `${this.extractUrl(C100_CHILDERN_DETAILS_CHILD_MATTERS)}/${this.childId}`;
        break;
      }
      case C100_CHILDERN_DETAILS_CHILD_MATTERS: {
        nextUrl = `${this.extractUrl(C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY)}/${this.childId}`;
        break;
      }
      case C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY: {
        const nextChild = this.getNextChild();
        nextUrl = nextChild
          ? `${this.extractUrl(C100_CHILDERN_DETAILS_PERSONAL_DETAILS)}/${nextChild.id}`
          : C100_CHILDERN_FURTHER_INFORMATION;
        break;
      }
      default: {
        nextUrl = currentPageUrl;
        break;
      }
    }

    return nextUrl;
  }

  private extractUrl(pageUrl: PageLink): PageLink {
    return pageUrl.split('/:')[0] as PageLink;
  }
}

export default new ChildrenDetailsNavigationController();
