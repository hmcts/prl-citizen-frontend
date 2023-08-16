import { Case } from '../../app/case/case';
import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD,
  APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
  APPLICATION_WITHIN_PROCEEDINGS_URGENT_REQUEST,
  PageLink,
} from '../../steps/urls';

class ApplicationWithinProceedingsNavigationController {
  protected selectedPages;
  selectedPageUrls: PageLink[] = [];

  public getNextUrl(currentPageUrl: PageLink, caseData: Partial<Case>, req: AppRequest): PageLink {
    let url: PageLink;
    const applicationType = req?.params.applicationType as AWPApplicationType;
    const applicationReason = req?.params.applicationReason as AWPApplicationReason;
    const applicationFee = req?.session.applicationSettings?.awpSelectedApplicationDetails.applicationFee;

    switch (currentPageUrl) {
      case APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION: {
        url = this.getUploadApplicationNextStep(
          caseData.awp_completedForm,
          applicationType,
          applicationReason,
          applicationFee
        );
        break;
      }
      case APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST: {
        url = this.getAgreementForRequestNextStep(
          caseData.awp_agreementForRequest,
          applicationType,
          applicationReason,
          applicationFee
        );
        break;
      }
      case APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS: {
        url = this.getSupportingDocumentsNextStep(
          caseData.awp_hasSupportingDocuments,
          applicationType,
          applicationReason
        );
        break;
      }
      default:
        url = currentPageUrl;
        break;
    }
    return url;
  }

  private getUploadApplicationNextStep = (completedForm, applicationType, applicationReason, applicationFee) => {
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
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            applicationType,
            applicationReason,
          }) as PageLink);

    const yesNextStep = applicationType === AWPApplicationType.C2 ? c2ApplicationNextStep : otherApplicationNextStep;
    const noNextStep = applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM, {
      applicationType,
      applicationReason,
    }) as PageLink;

    return completedForm === YesOrNo.NO ? noNextStep : yesNextStep;
  };

  private getAgreementForRequestNextStep = (
    agreementForRequest,
    applicationType,
    applicationReason,
    applicationFee
  ) => {
    const delayOrCancelStep =
      applicationFee === '£0'
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            applicationType,
            applicationReason,
          }) as PageLink);

    const otherC2NextStep =
      agreementForRequest === YesOrNo.YES
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

  private getSupportingDocumentsNextStep = (supportingDocuments, applicationType, applicationReason) => {
    const noNextStep =
      applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS, {
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_URGENT_REQUEST, {
            applicationType,
            applicationReason,
          }) as PageLink);

    const yesNextStep = applyParms(APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD, {
      applicationType,
      applicationReason,
    }) as PageLink;

    return supportingDocuments === YesOrNo.YES ? yesNextStep : noNextStep;
  };
}

export default new ApplicationWithinProceedingsNavigationController();
