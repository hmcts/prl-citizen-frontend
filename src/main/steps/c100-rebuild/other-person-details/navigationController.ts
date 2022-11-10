import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
  C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  PageLink,
} from '../../urls';
import { getNextPerson } from '../people/util';

class OtherPersonsDetailsNavigationController {
  private otherPersonsDetails: C100RebuildPartyDetails[] | [] = [];
  private childrenDetails: ChildrenDetails[] | [] = [];
  private childId: ChildrenDetails['id'] = '';
  private otherPersonId: C100RebuildPartyDetails['id'] = '';

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
        const nextChild = getNextPerson(this.childrenDetails, this.childId);
        nextUrl = nextChild
          ? applyParms(C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD, {
              otherPersonId: this.otherPersonId,
              childId: nextChild?.id,
            })
          : applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP, {
              otherPersonId: this.otherPersonId,
            });
        break;
      }
      case C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP: {
        nextUrl = applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT, { otherPersonId: this.otherPersonId });
        break;
      }
      case C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT: {
        nextUrl = applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL, { otherPersonId: this.otherPersonId });
        break;
      }
      case C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL: {
        const nextPerson = getNextPerson(this.otherPersonsDetails, this.otherPersonId);
        nextUrl = nextPerson
          ? applyParms(C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS, { otherPersonId: nextPerson.id })
          : C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS;
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
