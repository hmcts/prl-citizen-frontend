import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_OTHER_PERSON_CHECK,
  C100_RESPONDENT_DETAILS_ADD,
  C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP,
  C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
  C100_RESPONDENT_DETAILS_ADDRESS_SELECT,
  C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
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
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_PERSONAL_DETAILS, {
          respondentId: this.respondentsDetails[0].id,
          childId: this.childrenDetails[0].id,
        });
        break;
      }
      case C100_RESPONDENT_DETAILS_PERSONAL_DETAILS: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD, {
          respondentId: this.respondentId,
          childId: this.childrenDetails[0].id,
        });
        break;
      }
      case C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD: {
        const nextChild = this.getNextChild();
        nextUrl = nextChild
          ? applyParms(C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD, {
              respondentId: this.respondentId,
              childId: nextChild?.id,
            })
          : applyParms(C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP, {
              respondentId: this.respondentId,
            });
        break;
      }
      case C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_ADDRESS_SELECT, {
          respondentId: this.respondentId,
        });
        break;
      }
      case C100_RESPONDENT_DETAILS_ADDRESS_SELECT: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_ADDRESS_MANUAL, {
          respondentId: this.respondentId,
        });
        break;
      }
      case C100_RESPONDENT_DETAILS_ADDRESS_MANUAL: {
        nextUrl = applyParms(C100_RESPONDENT_DETAILS_CONTACT_DETAILS, {
          respondentId: this.respondentId,
        });
        break;
      }
      case C100_RESPONDENT_DETAILS_CONTACT_DETAILS: {
        const nextRespondent = this.getNextRespondent();
        nextUrl = nextRespondent
          ? applyParms(C100_RESPONDENT_DETAILS_PERSONAL_DETAILS, { respondentId: nextRespondent?.id })
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

export default new RespondentsDetailsNavigationController();
