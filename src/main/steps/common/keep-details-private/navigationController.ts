import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import {
  DETAILS_KNOWN,
  FETCH_CASE_DETAILS,
  PRIVATE_DETAILS_CONFIRMED,
  PRIVATE_DETAILS_NOT_CONFIRMED,
  PageLink,
  RESPOND_TO_APPLICATION,
  START_ALTERNATIVE,
} from '../../../steps/urls';
import { applyParms } from '../url-parser';

class KeepDetailsPrivateNavigationController {
  public getNextPageUrl(currentPageUrl: PageLink, caseData: Partial<CaseWithId>, req: AppRequest): PageLink {
    const partyType = getCasePartyType(caseData, req.session.user.id);
    let url;

    switch (currentPageUrl) {
      case DETAILS_KNOWN: {
        url = applyParms(START_ALTERNATIVE, { partyType }) as PageLink;
        break;
      }
      case START_ALTERNATIVE: {
        url =
          req.session.userCase?.startAlternative === YesOrNo.NO
            ? applyParms(PRIVATE_DETAILS_NOT_CONFIRMED, { partyType })
            : applyParms(PRIVATE_DETAILS_CONFIRMED, { partyType });
        break;
      }
      case PRIVATE_DETAILS_CONFIRMED:
      case PRIVATE_DETAILS_NOT_CONFIRMED: {
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

export default new KeepDetailsPrivateNavigationController();
