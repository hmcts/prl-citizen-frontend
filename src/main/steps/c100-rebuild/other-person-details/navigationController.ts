import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL,
  C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  PageLink,
} from '../../urls';

class OtherPersonsDetailsNavigationController {
  private otherPersonsDetails: C100RebuildPartyDetails[] | [] = [];

  private otherPersonId: C100RebuildPartyDetails['id'] = '';

  private getNextPerson(): C100RebuildPartyDetails | null {
    const personIndex = this.otherPersonsDetails.findIndex(person => person.id === this.otherPersonId);
    return personIndex >= 0 && personIndex < this.otherPersonsDetails.length - 1
      ? this.otherPersonsDetails[personIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.otherPersonsDetails = caseData?.oprs_otherPersons as C100RebuildPartyDetails[];
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
        nextUrl = applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP, { otherPersonId: this.otherPersonId });
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
        const nextPerson = this.getNextPerson();
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
