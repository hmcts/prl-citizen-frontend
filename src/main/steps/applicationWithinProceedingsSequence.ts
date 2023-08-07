import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../app/case/definition';

import ApplicationWithinProceedingsNavigationController from './application-within-proceedings/navigationController';
import { applyParms } from './common/url-parser';
import { Sections, Step } from './constants';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_APPLICATION_SUBMITTED,
  APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER,
  APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
  APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD,
  APPLICATION_WITHIN_PROCEEDINGS_DOWNLOAD_FORM,
  APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  APPLICATION_WITHIN_PROCEEDINGS_PAY_AND_SUBMIT,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
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
    getNextStep: (caseData, req) =>
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
        caseData,
        req!
      ),
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
    url: APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      ApplicationWithinProceedingsNavigationController.getNextUrl(
        APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
        caseData,
        req!
      ),
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_INFORM_OTHER_PARTIES,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      caseData.awp_need_hwf === YesOrNo.YES
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE, {
            applicationType: req?.params.applicationType as AWPApplicationType,
            applicationReason: req?.params.applicationReason as AWPApplicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            applicationType: req?.params.applicationType as AWPApplicationType,
            applicationReason: req?.params.applicationReason as AWPApplicationReason,
          }) as PageLink),
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      caseData.awp_have_hwfReference === YesOrNo.NO
        ? (applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF, {
            applicationType: req?.params.applicationType as AWPApplicationType,
            applicationReason: req?.params.applicationReason as AWPApplicationReason,
          }) as PageLink)
        : (applyParms(APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD, {
            applicationType: req?.params.applicationType as AWPApplicationType,
            applicationReason: req?.params.applicationReason as AWPApplicationReason,
          }) as PageLink),
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_DOCUMENT_UPLOAD,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: () => '/',
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_APPLICATION_SUBMITTED, {
    url: APPLICATION_WITHIN_PROCEEDINGS_PAY_AND_SUBMIT,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
  {
    url: APPLICATION_WITHIN_PROCEEDINGS_APPLICATION_SUBMITTED,
    showInSection: Sections.ApplicationWithinProceedings,
    getNextStep: (caseData, req) =>
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
  },
];
