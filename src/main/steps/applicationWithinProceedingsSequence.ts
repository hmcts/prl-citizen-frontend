import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../app/case/definition';

import { applyParms } from './common/url-parser';
import { Sections, Step } from './constants';
import {
  APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_APPLY_FOR_HWF,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
  DASHBOARD_URL,
  PageLink,
} from './urls';

export const applicationWithinProceedingsSequence: Step[] = [
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
      applyParms(APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION, {
        applicationType: req?.params.applicationType as AWPApplicationType,
        applicationReason: req?.params.applicationReason as AWPApplicationReason,
      }) as PageLink,
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
