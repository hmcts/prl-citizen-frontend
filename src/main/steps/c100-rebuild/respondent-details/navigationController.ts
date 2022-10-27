import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import { C100_RESPONDENT_DETAILS_ADD, PageLink } from '../../urls';

class RespondentsDetailsNavigationController {
  private respondentsDetails: C100RebuildPartyDetails[] | [] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.respondentsDetails = caseData?.oprs_otherPersons as C100RebuildPartyDetails[];
    let nextUrl;

    switch (currentPageUrl) {
      case C100_RESPONDENT_DETAILS_ADD: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_ADD, { otherPersonId: this.respondentsDetails[0].id });
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

export default new RespondentsDetailsNavigationController();
