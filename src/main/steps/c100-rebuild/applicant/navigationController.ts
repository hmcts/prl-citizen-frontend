import { Case } from '../../../app/case/case';
import { C100Applicant, ChildrenDetails, YesOrNo } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_APPLICANTS_PERSONAL_DETAILS,
  C100_APPLICANT_ADDRESS_LOOKUP,
  C100_APPLICANT_ADDRESS_MANUAL,
  C100_APPLICANT_ADDRESS_SELECT,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
  C100_APPLICANT_CONTACT_DETAIL,
  C100_APPLICANT_RELATIONSHIP_TO_CHILD,
  C100_RESPONDENT_DETAILS_ADD,
  PageLink,
} from '../../urls';
import { getPartyDetails } from '../people/util';

class ApplicantNavigationController {
  private applicantDetails: C100Applicant[] | [] = [];
  private childrenDetails: ChildrenDetails[] | [] = [];
  private childId: ChildrenDetails['id'] = '';
  private applicantId: C100Applicant['id'] = '';

  private getNextChild(): ChildrenDetails | null {
    const childIndex = this.childrenDetails.findIndex(child => child.id === this.childId);
    return childIndex >= 0 && childIndex < this.childrenDetails.length - 1
      ? this.childrenDetails[childIndex + 1]
      : null;
  }

  private getNextApplicant(): C100Applicant | null {
    const applicantIndex = this.applicantDetails.findIndex(applicant => applicant.id === this.applicantId);
    return applicantIndex >= 0 && applicantIndex < this.applicantDetails.length - 1
      ? this.applicantDetails[applicantIndex + 1]
      : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.applicantDetails = caseData?.appl_allApplicants as C100Applicant[];
    this.childrenDetails = caseData?.cd_children as ChildrenDetails[];
    this.applicantId = params?.applicantId as string;
    this.childId = params?.childId;
    let nextUrl;

    switch (currentPageUrl) {
      case C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW: {
        const applicantData = getPartyDetails(this.applicantId, this.applicantDetails) as C100Applicant;

        nextUrl = applyParms(
          applicantData.detailsKnown === YesOrNo.YES
            ? C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START
            : C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
          { applicantId: this.applicantId }
        );
        break;
      }
      case C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START:
      case C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE: {
        const applicantData = getPartyDetails(this.applicantId, this.applicantDetails) as C100Applicant;
        const dataReference =
          currentPageUrl === C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START ? 'start' : 'startAlternative';

        nextUrl = applyParms(
          applicantData[dataReference] === YesOrNo.YES
            ? C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK
            : C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
          { applicantId: this.applicantId }
        );
        break;
      }
      case C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK:
      case C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO: {
        nextUrl = applyParms(C100_APPLICANTS_PERSONAL_DETAILS, {
          applicantId: this.applicantId,
        });
        break;
      }
      case C100_APPLICANTS_PERSONAL_DETAILS: {
        nextUrl = applyParms(C100_APPLICANT_RELATIONSHIP_TO_CHILD, {
          applicantId: this.applicantId,
          childId: this.childrenDetails[0].id,
        });
        break;
      }
      case C100_APPLICANT_RELATIONSHIP_TO_CHILD: {
        const nextChild = this.getNextChild();
        nextUrl = nextChild
          ? applyParms(C100_APPLICANT_RELATIONSHIP_TO_CHILD, {
              applicantId: this.applicantId,
              childId: nextChild?.id,
            })
          : applyParms(C100_APPLICANT_ADDRESS_LOOKUP, {
              applicantId: this.applicantId,
            });
        break;
      }
      case C100_APPLICANT_ADDRESS_LOOKUP: {
        nextUrl = applyParms(C100_APPLICANT_ADDRESS_SELECT, {
          applicantId: this.applicantId,
        });
        break;
      }
      case C100_APPLICANT_ADDRESS_SELECT: {
        nextUrl = applyParms(C100_APPLICANT_ADDRESS_MANUAL, {
          applicantId: this.applicantId,
        });
        break;
      }
      case C100_APPLICANT_ADDRESS_MANUAL: {
        nextUrl = applyParms(C100_APPLICANT_CONTACT_DETAIL, {
          applicantId: this.applicantId,
        });
        break;
      }
      case C100_APPLICANT_CONTACT_DETAIL: {
        const nextApplicant = this.getNextApplicant();

        nextUrl = nextApplicant
          ? applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, {
              applicantId: nextApplicant.id!,
            })
          : C100_RESPONDENT_DETAILS_ADD;
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

export default new ApplicantNavigationController();
