import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import {
  FETCH_CASE_DETAILS,
  PageLink,
  REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  REMOVE_LEGAL_REPRESENTATIVE_START,
} from '../../../steps/urls';
import { applyParms } from '../url-parser';

class RemoveLegalRepresentativeNavigationController {
  public getNextPageUrl(currentPageUrl: PageLink, caseData: Partial<CaseWithId>, req: AppRequest): PageLink {
    const partyType = getCasePartyType(caseData, req.session.user.id);
    let url;

    switch (currentPageUrl) {
      case REMOVE_LEGAL_REPRESENTATIVE_START: {
        url = applyParms(REMOVE_LEGAL_REPRESENTATIVE_CONFIRM, { partyType }) as PageLink;
        break;
      }
      case REMOVE_LEGAL_REPRESENTATIVE_CONFIRM: {
        url = applyParms(FETCH_CASE_DETAILS, { caseId: req.session.userCase.id });
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

export default new RemoveLegalRepresentativeNavigationController();
