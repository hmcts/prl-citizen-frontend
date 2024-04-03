import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails, YesOrNo } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_ADDRESS_LOOKUP,
  C100_CHILDERN_LIVE_WITH,
  C100_OTHER_PERSON_CHECK,
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD,
  PageLink,
} from '../../urls';
import { C100UrlPartyType } from '../address/definitions';
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
      case C100_OTHER_PERSON_CHECK: {
        const hasOtherPerson = caseData.oprs_otherPersonCheck === YesOrNo.YES;
        nextUrl = hasOtherPerson
          ? C100_OTHER_PERSON_DETAILS_ADD
          : applyParms(C100_CHILDERN_LIVE_WITH, { childId: this.childrenDetails[0].id });
        break;
      }
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
              childId: nextChild.id as ChildrenDetails['id'],
            })
          : applyParms(C100_ADDRESS_LOOKUP, {
              id: this.otherPersonId,
              partyType: C100UrlPartyType.OTHER_PERSON,
            });
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
