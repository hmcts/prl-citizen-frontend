import { Case } from '../../app/case/case';
import { AWPApplicationReason, AWPApplicationType, PartyType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER,
  APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
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
    const partyType = req?.params.partyType as PartyType;
    const applicationType = req?.params.applicationType as AWPApplicationType;
    const applicationReason = req?.params.applicationReason as AWPApplicationReason;
    const applicationFee = req?.session.applicationSettings?.awpSelectedApplicationDetails.applicationFeeAmount;

    switch (currentPageUrl) {
      case APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION: {
        url = this.getUploadApplicationNextStep(
          partyType,
          caseData.awp_completedForm,
          applicationType,
          applicationReason,
          applicationFee
        );
        break;
      }
      case APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST: {
        url = this.getAgreementForRequestNextStep(
          partyType,
          caseData.awp_agreementForRequest,
          applicationType,
          applicationReason,
          applicationFee
        );
        break;
      }
      case APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENTS: {
        url = this.getSupportingDocumentsNextStep(
          partyType,
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

  private getUploadApplicationNextStep = (
    partyType,
    completedForm,
    applicationType,
    applicationReason,
    applicationFee
  ) => {
    const c2ApplicationNextStep =
      applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink);

    const otherApplicationNextStep =
      parseInt(applicationFee) === 0
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink);

    const yesNextStep = applicationType === AWPApplicationType.C2 ? c2ApplicationNextStep : otherApplicationNextStep;
    const noNextStep = applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM, {
      partyType,
      applicationType,
      applicationReason,
    }) as PageLink;

    return completedForm === YesOrNo.NO ? noNextStep : yesNextStep;
  };

  private getAgreementForRequestNextStep = (
    partyType,
    agreementForRequest,
    applicationType,
    applicationReason,
    applicationFee
  ) => {
    const delayOrCancelStep =
      parseInt(applicationFee) === 0
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink);

    const otherC2NextStep =
      agreementForRequest === YesOrNo.YES
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink);

    return applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE ? delayOrCancelStep : otherC2NextStep;
  };

  private getSupportingDocumentsNextStep = (partyType, supportingDocuments, applicationType, applicationReason) => {
    const noNextStep =
      applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_URGENT_REQUEST, {
            partyType,
            applicationType,
            applicationReason,
          }) as PageLink);

    const yesNextStep = applyParms(APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD, {
      partyType,
      applicationType,
      applicationReason,
    }) as PageLink;

    return supportingDocuments === YesOrNo.YES ? yesNextStep : noNextStep;
  };
}

export default new ApplicationWithinProceedingsNavigationController();
