import _ from 'lodash';

import { applyParms } from '../url-parser';
import { Sections, Step } from '../../constants';
import { C100_INTERNATIONAL_ELEMENTS_START, C1A_CHILD_ABDUCTION_THREATS, C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION, C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT, C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE, C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION, C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT, C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY, C1A_SAFETY_CONCERNS_CONCERN_ABOUT, C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, C1A_SAFETY_CONCERNS_NOFEEDBACK, C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION, C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED, C1A_SAFETY_CONCERNS_OTHER, C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, PageLink } from '../../urls';
import { RootContext, YesOrNo } from '../../../app/case/definition';
import  SafteyConcernsNavigationController  from './navigationController'

export class AOHSequence {
  getSequence(): Step[] {
    return [
      {
        url: C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          SafteyConcernsNavigationController.getNextUrl(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, caseData, req?.params),
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
        showInSection: Sections.C100,
        getNextStep: data =>
          data.c1A_haveSafetyConcerns === YesOrNo.YES
            ? applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT,{root:RootContext.C100_REBUILD})as PageLink
            : C100_INTERNATIONAL_ELEMENTS_START,
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          SafteyConcernsNavigationController.getNextUrl(
            C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
            caseData,
            req?.params
          ),
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,{root:RootContext.C100_REBUILD})as PageLink
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          SafteyConcernsNavigationController.getNextUrl(
            C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
            caseData,
            req?.params
          ),
      },
      {
        url: C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          SafteyConcernsNavigationController.getNextUrl(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, req?.params),
      },
      {
        url: C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          SafteyConcernsNavigationController.getNextUrl(
            C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
            caseData,
            req?.params
          ),
      },
      {
        url: C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_OTHER,{root:RootContext.C100_REBUILD})as PageLink,
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION,{root:RootContext.C100_REBUILD})as PageLink
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_CHILD_ABDUCTION_THREATS,{root:RootContext.C100_REBUILD})as PageLink,
      },
      {
        url: C1A_SAFETY_CONCERNS_OTHER,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION,{root:RootContext.C100_REBUILD}) as PageLink,
      },
      {
        url: C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          SafteyConcernsNavigationController.getNextUrl(
            C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
            caseData,
            req?.params
          ),
      },
      {
        url: C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED,{root:RootContext.C100_REBUILD})as PageLink,
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE,{root:RootContext.C100_REBUILD})as PageLink,
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE,
        showInSection: Sections.C100,
        getNextStep: data =>
          data.c1A_passportOffice === YesOrNo.YES
            ? applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT,{root:RootContext.C100_REBUILD})as PageLink
            : applyParms(C1A_CHILD_ABDUCTION_THREATS,{root:RootContext.C100_REBUILD})as PageLink,
      },
      {
        url: C1A_CHILD_ABDUCTION_THREATS,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
          caseData.c1A_childAbductedBefore === YesOrNo.YES
            ? applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,{root:RootContext.C100_REBUILD})as PageLink
            : SafteyConcernsNavigationController.getNextUrl(C1A_CHILD_ABDUCTION_THREATS, caseData, req?.params),
      },
      {
        url: C1A_SAFETY_CONCERNS_NOFEEDBACK,
        showInSection: Sections.C100,
        getNextStep: () => applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,{root:RootContext.C100_REBUILD})as PageLink,
      },
      {
        url: C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED,
        showInSection: Sections.C100,
        getNextStep: () => C100_INTERNATIONAL_ELEMENTS_START,
      },
    ]

}
}

export const AohSequence = new AOHSequence();
