import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
    C100_OTHER_PERSON_DETAILS_ADD,
  PageLink,
} from '../../urls';

class OtherPersonsDetailsNavigationController {
  private otherPersonsDetails: C100RebuildPartyDetails[] | [] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.otherPersonsDetails = caseData?.cd_children as C100RebuildPartyDetails[];
    let nextUrl;

    switch (currentPageUrl) {
      case C100_OTHER_PERSON_DETAILS_ADD: {
        nextUrl = applyParms(C100_OTHER_PERSON_DETAILS_ADD, { otherPersonId : this.otherPersonsDetails[0].id });
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
