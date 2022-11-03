import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_OTHER_PERSON_CHECK,
  C100_OTHER_PERSON_DETAILS_ADD,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  PageLink,
} from '../../urls';

class OtherPersonsDetailsNavigationController {
  private otherPersonsDetails: C100RebuildPartyDetails[] | [] = [];

  private otherPersonId: C100RebuildPartyDetails['id'] = '';

  private getNextOtherPerson(): C100RebuildPartyDetails | null {
    const otherPersonIndex = this.otherPersonsDetails.findIndex(otherPerson => otherPerson.id === this.otherPersonId);
    return otherPersonIndex >= 0 && otherPersonIndex < this.otherPersonsDetails.length - 1
      ? this.otherPersonsDetails[otherPersonIndex + 1]
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
        // TODO: Need a next screen
        const nextOtherPerson = this.getNextOtherPerson();
        console.log('NEXT PERSON IS ==>', nextOtherPerson);
        nextUrl = nextOtherPerson
          ? applyParms(C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS, { otherPersonId: nextOtherPerson.id })
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
