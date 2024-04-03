import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_ADDRESS_MANUAL,
  C100_APPLICANT_CONTACT_DETAIL,
  C100_CHILDERN_LIVE_WITH,
  C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS,
  C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
  PageLink,
} from '../../urls';
import { getNextPerson } from '../people/util';

import { C100UrlPartyType } from './definitions';

class C100AddressNavigationController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    let nextUrl = currentPageUrl;
    const partyType = params?.partyType;
    const partyId = params?.id;
    const otherPersonsDetails = caseData?.oprs_otherPersons as C100RebuildPartyDetails[];
    const childrenDetails = caseData?.cd_children as ChildrenDetails[];

    if (currentPageUrl === C100_ADDRESS_MANUAL) {
      if (partyType === C100UrlPartyType.APPLICANT) {
        nextUrl = applyParms(C100_APPLICANT_CONTACT_DETAIL, { applicantId: partyId }) as PageLink;
      } else if (partyType === C100UrlPartyType.RESPONDENT) {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_CONTACT_DETAILS, { respondentId: partyId }) as PageLink;
      } else {
        const nextPerson = getNextPerson(otherPersonsDetails, partyId);
        nextUrl = nextPerson
          ? (applyParms(C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS, {
              otherPersonId: nextPerson.id,
            }) as PageLink)
          : (applyParms(C100_CHILDERN_LIVE_WITH, { childId: childrenDetails[0].id }) as PageLink);
      }
    }

    return nextUrl;
  }
}

export default new C100AddressNavigationController();
