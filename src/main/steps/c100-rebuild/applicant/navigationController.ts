import { Case } from '../../../app/case/case';
import { C100Applicant, ChildrenDetails } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import { C100_APPLICANT_ADD_APPLICANTS, C100_APPLICANT_RELATIONSHIP_TO_CHILD, PageLink } from '../../urls';

class ApplicantDetailsNavigationController {
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
    this.applicantId = params?.applicantId;
    this.childId = params?.childId;
    let nextUrl;

    switch (currentPageUrl) {
      case C100_APPLICANT_RELATIONSHIP_TO_CHILD: {
        const nextChild = this.getNextChild();
        const nextApplicant = this.getNextApplicant();

        nextUrl = nextChild
          ? applyParms(C100_APPLICANT_RELATIONSHIP_TO_CHILD, {
              applicantId: this.applicantId as string,
              childId: nextChild?.id,
            })
          : nextApplicant
          ? applyParms(C100_APPLICANT_RELATIONSHIP_TO_CHILD, {
              applicantId: nextApplicant?.id as string,
              childId: this.childrenDetails[0].id,
            })
          : C100_APPLICANT_ADD_APPLICANTS;
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

export default new ApplicantDetailsNavigationController();
