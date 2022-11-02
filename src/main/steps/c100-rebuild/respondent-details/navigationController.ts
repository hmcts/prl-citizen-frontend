import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_RESPONDENT_DETAILS_ADD,
  C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
  C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
  PageLink,
} from '../../urls';

class RespondentsDetailsNavigationController {
  private respondentsDetails: C100RebuildPartyDetails[] | [] = [];
  private childrenDetails: ChildrenDetails[] | [] = [];
  private childId: ChildrenDetails['id'] = '';
  private respondentId: C100RebuildPartyDetails['id'] = '';

  private getNextChild(): ChildrenDetails | null {
    const childIndex = this.childrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.childrenDetails.length - 1
      ? this.childrenDetails[childIndex + 1]
      : null;
  }

  private getNextRespondent(): C100RebuildPartyDetails | null {
    const respondentIndex = this.respondentsDetails.findIndex(respondent => respondent.id === this.respondentId);
    return respondentIndex >= 0 && respondentIndex < this.respondentsDetails.length - 1
      ? this.respondentsDetails[respondentIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.respondentsDetails = caseData?.resp_Respondents as C100RebuildPartyDetails[];
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.respondentId = params?.respondentId;
    this.childId = params?.childId;
    let nextUrl;

    switch (currentPageUrl) {
      case C100_RESPONDENT_DETAILS_ADD: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD, {
          respondentId: this.respondentsDetails[0].id,
          childId: this.childrenDetails[0].id,
        });
        break;
      }
      case C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD: {
        const nextChild = this.getNextChild();
        const nextRespondent = this.getNextRespondent();

        nextUrl = nextChild
          ? applyParms(C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD, {
              respondentId: this.respondentId,
              childId: nextChild?.id,
            })
          : nextRespondent
          ? applyParms(C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD, {
              respondentId: nextRespondent?.id,
              childId: this.childrenDetails[0].id,
            })
          : C100_RESPONDENT_DETAILS_ADD;
        break;
      }
      case C100_RESPONDENT_DETAILS_PERSONAL_DETAILS: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_PERSONAL_DETAILS, { respondentId: this.respondentId });
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
