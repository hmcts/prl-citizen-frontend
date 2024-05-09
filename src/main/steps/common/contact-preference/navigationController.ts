import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import {
  CHOOSE_CONTACT_PREFERENCE,
  CONTACT_PREFERENCE_CONFIRMATION,
  FETCH_CASE_DETAILS,
  PageLink,
  RESPOND_TO_APPLICATION,
  REVIEW_CONTACT_PREFERENCE,
} from '../../../steps/urls';
import { applyParms } from '../url-parser';

class ContactPreferenceNavigationController {
  public getNextPageUrl(currentPageUrl: PageLink, caseData: Partial<CaseWithId>, req: AppRequest) {
    const partyType = getCasePartyType(caseData, req.session.user.id);
    let url;

    switch (currentPageUrl) {
      case CHOOSE_CONTACT_PREFERENCE: {
        url = applyParms(REVIEW_CONTACT_PREFERENCE, { partyType }) as PageLink;
        break;
      }
      case REVIEW_CONTACT_PREFERENCE: {
        url = applyParms(CONTACT_PREFERENCE_CONFIRMATION, { partyType }) as PageLink;
        break;
      }
      case CONTACT_PREFERENCE_CONFIRMATION: {
        url = req.session.applicationSettings?.navfromRespondToApplication
          ? RESPOND_TO_APPLICATION
          : applyParms(FETCH_CASE_DETAILS, { caseId: req.session.userCase.id });
        break;
      }
      default: {
        url = currentPageUrl;
        break;
      }
    }
    return url;
  }
}

export default new ContactPreferenceNavigationController();
