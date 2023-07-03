import { Case } from '../../app/case/case';
import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
  PageLink,
} from '../../steps/urls';

class ApplicationWithinProceedingsNavigationController {
  protected selectedPages;
  selectedPageUrls: PageLink[] = [];

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, req: AppRequest): PageLink {
    let url: PageLink;

    switch (currentPageUrl) {
      case APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION: {
        url = this.getUploadApplicationNextStep(caseData, req);
        break;
      }
      case APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST: {
        url = this.getAgreementForRequestNextStep(caseData, req);
        break;
      }
      default:
        url = currentPageUrl;
        break;
    }
    return url;
  }

  private getUploadApplicationNextStep = (caseData, req) => {
    const applicationType = req?.params.applicationType as AWPApplicationType;
    const applicationReason = req?.params.applicationReason as AWPApplicationReason;
    const applicationFee = req?.session.applicationSettings.awpSelectedApplicationDetails.applicationFee;

    const c2ApplicationNextStep =
      applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST, {
            applicationType,
            applicationReason,
          }) as PageLink);

    const otherApplicationNextStep =
      applicationFee === '£0'
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            applicationType,
            applicationReason,
          }) as PageLink);

    const yesNextStep = applicationType === AWPApplicationType.C2 ? c2ApplicationNextStep : otherApplicationNextStep;
    const noNextStep = applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM, {
      applicationType: req?.params.applicationType as AWPApplicationType,
      applicationReason: req?.params.applicationReason as AWPApplicationReason,
    }) as PageLink;

    return caseData.awp_completedForm === YesOrNo.NO ? noNextStep : yesNextStep;
  };

  private getAgreementForRequestNextStep = (caseData, req) => {
    const applicationType = req?.params.applicationType as AWPApplicationType;
    const applicationReason = req?.params.applicationReason as AWPApplicationReason;
    const applicationFee = req?.session.applicationSettings.awpSelectedApplicationDetails.applicationFee;

    const delayOrCancelStep =
      applicationFee === '£0'
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            applicationType,
            applicationReason,
          }) as PageLink);

    const otherC2NextStep =
      caseData.awp_agreementForRequest === YesOrNo.YES
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES, {
            applicationType,
            applicationReason,
          }) as PageLink);

    return applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE ? delayOrCancelStep : otherC2NextStep;
  };
}

export default new ApplicationWithinProceedingsNavigationController();
