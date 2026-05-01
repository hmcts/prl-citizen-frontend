import { Case } from '../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails, YesOrNo } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_OTHER_PERSON_CHECK,
  C100_RESPONDENT_DETAILS_ADD,
  C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP,
  C100_RESPONDENT_DETAILS_ADDRESS_MANUAL,
  C100_RESPONDENT_DETAILS_ADDRESS_SELECT,
  C100_RESPONDENT_DETAILS_CONFIDENTIALITY_START_ALTERNATIVE,
  C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK,
  C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK_NO,
  C100_RESPONDENT_DETAILS_CONTACT_DETAILS,
  C100_RESPONDENT_DETAILS_PERSONAL_DETAILS,
  C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD,
  PageLink,
} from '../../urls';
import { getNextPerson, getPartyDetails } from '../people/util';

class RespondentsDetailsNavigationController {
  private respondentsDetails: C100RebuildPartyDetails[] | [] = [];
  private childrenDetails: ChildrenDetails[] | [] = [];
  private childId: ChildrenDetails['id'] = '';
  private respondentId: C100RebuildPartyDetails['id'] = '';

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
        const nextChild = getNextPerson(this.childrenDetails, this.childId);
        nextUrl = nextChild
          ? applyParms(C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD, {
              respondentId: this.respondentId,
              childId: nextChild.id as ChildrenDetails['id'],
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
        const currentRespondent = this.respondentsDetails.find(p => p.id === this.respondentId);
        const currentRespondentHasContactDetails =
          currentRespondent?.contactDetails?.donKnowEmailAddress !== YesOrNo.YES ||
          currentRespondent?.contactDetails?.donKnowTelephoneNumber !== YesOrNo.YES;

        if (currentRespondent && currentRespondentHasContactDetails) {
          nextUrl = applyParms(C100_RESPONDENT_DETAILS_CONFIDENTIALITY_START_ALTERNATIVE, {
            respondentId: this.respondentId,
          });
        } else {
          const nextRespondent = getNextPerson(this.respondentsDetails, this.respondentId);
          nextUrl = nextRespondent
            ? applyParms(C100_RESPONDENT_DETAILS_PERSONAL_DETAILS, {
                respondentId: nextRespondent?.id as C100RebuildPartyDetails['id'],
              })
            : C100_OTHER_PERSON_CHECK;
        }
        break;
      }
      case C100_RESPONDENT_DETAILS_CONFIDENTIALITY_START_ALTERNATIVE: {
        const respondentData = getPartyDetails(
          this.respondentId,
          this.respondentsDetails
        ) as C100RebuildPartyDetails | null;

        if (!respondentData) {
          // defensively fail early so you see an informative error instead of surprising behaviour
          throw new Error(`Respondent not found: ${this.respondentId}`);
        }

        const isConfidential = 
          respondentData.isRespondentAddressConfidential === YesOrNo.YES ||
          respondentData.isResponentTelephoneNumberConfidential === YesOrNo.YES ||
          respondentData.isRespondentEmailAddressConfidential === YesOrNo.YES;

        nextUrl =
          isConfidential
            ? applyParms(C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK, { respondentId: this.respondentId })
            : applyParms(C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK_NO, { respondentId: this.respondentId });
        break;
      }
      case C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK:
      case C100_RESPONDENT_DETAILS_CONFIDENTIALITY_FEEDBACK_NO: {
        const nextRespondent = getNextPerson(this.respondentsDetails, this.respondentId);
        nextUrl = nextRespondent
          ? applyParms(C100_RESPONDENT_DETAILS_PERSONAL_DETAILS, {
              respondentId: nextRespondent?.id as C100RebuildPartyDetails['id'],
            })
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
