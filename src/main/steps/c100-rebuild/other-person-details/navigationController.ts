import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_OTHER_PERSON_CHECK,
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
  PageLink,
} from '../../urls';

class OtherPersonsDetailsNavigationController {
  private otherPersonsDetails: C100RebuildPartyDetails[] | [] = [];
  private childrenDetails: ChildrenDetails[] | [] = [];
  private childId: ChildrenDetails['id'] = '';

  private otherPersonId: C100RebuildPartyDetails['id'] = '';

  private getNextOtherPerson(): C100RebuildPartyDetails | null {
    const otherPersonIndex = this.otherPersonsDetails.findIndex(otherPerson => otherPerson.id === this.otherPersonId);
    return otherPersonIndex >= 0 && otherPersonIndex < this.otherPersonsDetails.length - 1
      ? this.otherPersonsDetails[otherPersonIndex + 1]
      : null;
  }

  private getNextChild(): ChildrenDetails | null {
    const childIndex = this.childrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.childrenDetails.length - 1
      ? this.childrenDetails[childIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.otherPersonsDetails = caseData?.oprs_otherPersons as C100RebuildPartyDetails[];
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.childId = params?.childId;
    this.otherPersonId = params?.otherPersonId;
    let nextUrl;

    switch (currentPageUrl) {
      case C100_OTHER_PERSON_DETAILS_ADD: {
        nextUrl = applyParms(C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS, {
          otherPersonId: this.otherPersonsDetails[0].id,
        });
        break;
      }
      case C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS: {
        nextUrl = applyParms(C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD, {
          otherPersonId: this.otherPersonId,
          childId: this.childrenDetails[0].id,
        });

        break;
      }
      case C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD: {
        const nextChild = this.getNextChild();
        const nextOtherPerson = this.getNextOtherPerson();

        nextUrl = nextChild
          ? applyParms(C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD, {
              otherPersonId: this.otherPersonId,
              childId: nextChild?.id,
            })
          : nextOtherPerson
          ? applyParms(C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS, {
              otherPersonId: nextOtherPerson.id,
            })
          : C100_OTHER_PERSON_CHECK;
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

export default new OtherPersonsDetailsNavigationController();
