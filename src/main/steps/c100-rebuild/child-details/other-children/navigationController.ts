import { Case } from '../../../../app/case/case';
import { OtherChildrenDetails } from '../../../../app/case/definition';
import { applyParms } from '../../../common/url-parser';
import {
  C100_APPLICANT_ADD_APPLICANTS,
  C100_CHILDERN_OTHER_CHILDREN_NAMES,
  C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
  PageLink,
} from '../../../urls';
import { getNextPerson } from '../../people/util';

class OtherChildrenDetailsNavigationController {
  private otherChildrenDetails: OtherChildrenDetails[] | [] = [];

  private childId: OtherChildrenDetails['id'] = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.otherChildrenDetails = caseData?.ocd_otherChildren as OtherChildrenDetails[];
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
        const nextChild = getNextPerson(this.otherChildrenDetails, this.childId);
        nextUrl = nextChild
          ? applyParms(C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS, { childId: nextChild.id })
          : C100_APPLICANT_ADD_APPLICANTS;
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
