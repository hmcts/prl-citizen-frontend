import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import {
  CHOOSE_CONTACT_PREFERENCE,
  CONTACT_PREFERENCE_CONFIRMATION,
  PageLink,
  RESPONDENT_TASK_LIST_URL,
  RESPOND_TO_APPLICATION,
  REVIEW_CONTACT_PREFERENCE,
  TASK_LIST_APPLICANT_URL,
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
        const respondentUrl = req.session.applicationSettings?.navfromRespondToApplication
          ? RESPOND_TO_APPLICATION
          : RESPONDENT_TASK_LIST_URL;
        url = partyType === PartyType.APPLICANT ? TASK_LIST_APPLICANT_URL : respondentUrl;
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
