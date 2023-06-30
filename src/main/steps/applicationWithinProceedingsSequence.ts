import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../app/case/definition';

import { applyParms } from './common/url-parser';
import { Sections, Step } from './constants';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM,
  APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
  DASHBOARD_URL,
  PageLink,
} from './urls';

export const applicationWithinProceedingsSequence: Step[] = [
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: () => '/',
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) => getUploadApplicationNextStep(caseData, req),
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) => getAgreementForRequestNextStep(caseData, req),
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (userCase, req) =>
      userCase.awp_need_hwf === YesOrNo.YES
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE, {
            applicationType: req?.params.applicationType as AWPApplicationType,
            applicationReason: req?.params.applicationReason as AWPApplicationReason,
          }) as PageLink)
        : DASHBOARD_URL,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (userCase, req) =>
      userCase.awp_have_hwfReference === YesOrNo.NO
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF, {
            applicationType: req?.params.applicationType as AWPApplicationType,
            applicationReason: req?.params.applicationReason as AWPApplicationReason,
          }) as PageLink)
        : DASHBOARD_URL,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (_userCase, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
];

const getUploadApplicationNextStep = (caseData, req) => {
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

const getAgreementForRequestNextStep = (caseData, req) => {
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
      : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST, {
          applicationType,
          applicationReason,
        }) as PageLink);

  return applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE ? delayOrCancelStep : otherC2NextStep;
};
