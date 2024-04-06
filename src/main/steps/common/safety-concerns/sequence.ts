import _ from 'lodash';

import { applyParms } from '../url-parser';
import { Sections, Step } from '../../constants';
import { C100_INTERNATIONAL_ELEMENTS_START, C100_URL, C1A_CHILD_ABDUCTION_THREATS, C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION, C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT, C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE, C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION, C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY, C1A_SAFETY_CONCERNS_CONCERN_ABOUT, C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, C1A_SAFETY_CONCERNS_NOFEEDBACK, C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION, C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED, C1A_SAFETY_CONCERNS_OTHER, C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, C1A_SAFETY_CONCERNS_REVIEW, PageLink, RESPOND_TO_APPLICATION } from '../../urls';
import { RootContext, YesOrNo } from '../../../app/case/definition';
import SafteyConcernsNavigationController from './navigationController'

export class AOHSequence {
  getSequence(): Step[] {
    return [
      {  
        url: C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return SafteyConcernsNavigationController.getNextUrl(C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.C100_REBUILD }) as PageLink : applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.RESPONDENT }) as PageLink,
           caseData, req, req?.params)
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY,
        showInSection: Sections.C100,
        getNextStep: (data, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          if (data.c1A_haveSafetyConcerns === YesOrNo.NO) {
            return C100rebuildJourney ?C100_INTERNATIONAL_ELEMENTS_START:applyParms(C1A_SAFETY_CONCERNS_REVIEW, { root: RootContext.RESPONDENT })as PageLink
          } else return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>
        {
        const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
         return SafteyConcernsNavigationController.getNextUrl(C100rebuildJourney?
            applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink
            :applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.RESPONDENT }) as PageLink,
            caseData,
            req,
            req?.params
          )
        },
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>{
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return SafteyConcernsNavigationController.getNextUrl(
            C100rebuildJourney?applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.C100_REBUILD }) as PageLink
            :applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.RESPONDENT }) as PageLink,
            caseData,
            req,
            req?.params
          )
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>{
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return SafteyConcernsNavigationController.getNextUrl(C100rebuildJourney?applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink
          :applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.RESPONDENT }) as PageLink
            , caseData,req, req?.params)
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>{
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return SafteyConcernsNavigationController.getNextUrl(C100rebuildJourney?
            applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink
            :applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.RESPONDENT }) as PageLink,
            caseData,
            req,
            req?.params
          )
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_OTHER, { root: RootContext.C100_REBUILD }) as PageLink : applyParms(C1A_SAFETY_CONCERNS_OTHER, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_OTHER,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) =>{
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return SafteyConcernsNavigationController.getNextUrl(
            C100rebuildJourney?applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, { root: RootContext.C100_REBUILD }) as PageLink:applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, { root: RootContext.RESPONDENT }) as PageLink,
            caseData,
            req,
            req?.params
          )
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE,
        showInSection: Sections.C100,
        getNextStep: (data, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          if (data.c1A_passportOffice === YesOrNo.YES) {
            return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT, { root: RootContext.C100_REBUILD }) as PageLink
              : applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT, { root: RootContext.RESPONDENT }) as PageLink
          } else
            return C100rebuildJourney ? applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.C100_REBUILD }) as PageLink
              : applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_CHILD_ABDUCTION_THREATS,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          if (caseData.c1A_childAbductedBefore === YesOrNo.YES) {
            return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, { root: RootContext.C100_REBUILD }) as PageLink
              : applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, { root: RootContext.RESPONDENT }) as PageLink
          } else return SafteyConcernsNavigationController.getNextUrl(C100rebuildJourney ?
            applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.C100_REBUILD }) as PageLink
              : applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.RESPONDENT }) as PageLink
            , caseData,req, req?.params)
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_NOFEEDBACK,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
          return C100rebuildJourney ? applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink
            : applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.RESPONDENT }) as PageLink
        }
      },
      {
        url: C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return req?.originalUrl?.startsWith(C100_URL)?C100_INTERNATIONAL_ELEMENTS_START:applyParms(C1A_SAFETY_CONCERNS_REVIEW, { root: RootContext.RESPONDENT })as PageLink},
      },
      {
        url: C1A_SAFETY_CONCERNS_REVIEW,
        showInSection: Sections.C100,
        getNextStep: () => RESPOND_TO_APPLICATION,
      },
    ]

  }
}

export const AohSequence = new AOHSequence();
