import { Case, CaseWithId } from '../../../app/case/case';
import { ChildrenDetails, RootContext, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { isC100ApplicationValid } from '../../c100-rebuild/utils';
import { applyParms } from '../../common/url-parser';
import {
  C100_CHECK_YOUR_ANSWER,
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_FURTHER_INFORMATION,
  C100_CHILDERN_LIVING_ARRANGEMENTS,
  C100_CHILDERN_MAINLY_LIVE_WITH,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  PageLink,
} from '../../urls';
import { getNextPerson } from '../people/util';

class ChildrenDetailsNavigationController {
  private childrenDetails: ChildrenDetails[] | [] = [];

  private childId: ChildrenDetails['id'] = '';

  public getNextUrl(
    currentPageUrl: PageLink,
    caseData: Partial<Case>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>,
    req?: AppRequest
  ): PageLink {
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.childId = params?.childId;
    let nextUrl;

    switch (currentPageUrl) {
      case C100_CHILDERN_DETAILS_ADD: {
        nextUrl = applyParms(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, { childId: this.childrenDetails[0].id });
        break;
      }
      case C100_CHILDERN_DETAILS_PERSONAL_DETAILS: {
        nextUrl = applyParms(C100_CHILDERN_DETAILS_CHILD_MATTERS, { childId: this.childId });
        break;
      }
      case C100_CHILDERN_DETAILS_CHILD_MATTERS: {
        nextUrl = applyParms(C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY, { childId: this.childId });
        break;
      }
      case C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY: {
        const nextChild = getNextPerson(this.childrenDetails, this.childId);
        nextUrl = nextChild
          ? applyParms(C100_CHILDERN_DETAILS_PERSONAL_DETAILS, { childId: nextChild.id as ChildrenDetails['id'] })
          : C100_CHILDERN_FURTHER_INFORMATION;
        break;
      }
      case C100_CHILDERN_MAINLY_LIVE_WITH: {
        nextUrl = applyParms(C100_CHILDERN_LIVING_ARRANGEMENTS, { childId: this.childId });
        break;
      }
      case C100_CHILDERN_LIVING_ARRANGEMENTS: {
        const nextChild = getNextPerson(this.childrenDetails, this.childId);

        if (nextChild) {
          nextUrl = applyParms(C100_CHILDERN_MAINLY_LIVE_WITH, { childId: nextChild.id as ChildrenDetails['id'] });
        } else if (isC100ApplicationValid(caseData as CaseWithId, req!)) {
          nextUrl = C100_CHECK_YOUR_ANSWER;
        } else if (caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES) {
          nextUrl = applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { root: RootContext.C100_REBUILD }) as PageLink;
        } else {
          nextUrl = C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS;
        }
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

export default new ChildrenDetailsNavigationController();
