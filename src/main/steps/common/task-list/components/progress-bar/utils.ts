/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseType, SelectTypeOfOrderEnum } from './../../../../../app/case/definition';
import { languages as content } from './content';

export enum CaseProgressionStage {
  APPLICATION_SUBMITTED = 'applicationSubmitted',
  CAFCASS_SAFETY_CHECKS = 'cafcassSafetyChecks',
  RESPONSE_SUBMITTED = 'responseSubmitted',
  HEARING_AND_COURT_ORDERS = 'hearingAndCourtOrders',
  CASE_OPENED = 'caseOpened',
  FINAL_ORDER = 'finalOrder',
  ALL_FINAL_ORDERS_ISSUED = 'caseClosed',
}

const getLabel = (caseStage: CaseProgressionStage, caseType: CaseType, language: string): string =>
  content[language]?.[caseType]?.[caseStage]?.label;

const getAriaLabel = (caseStage: CaseProgressionStage, caseType: CaseType, language: string): string =>
  content[language]?.[caseType]?.[caseStage]?.ariaLabel;

export const isFinalOrderIssued = caseData => caseData.selectTypeOfOrder === SelectTypeOfOrderEnum.finl;

export const progressBarStage = {
  applicationSubmitted: {
    id: CaseProgressionStage.APPLICATION_SUBMITTED,
    label: getLabel.bind(null, CaseProgressionStage.APPLICATION_SUBMITTED),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.APPLICATION_SUBMITTED),
    isInProgress: () => false,
    isComplete: () => false,
  },
  cafcassSafetyChecks: {
    id: CaseProgressionStage.CAFCASS_SAFETY_CHECKS,
    label: getLabel.bind(null, CaseProgressionStage.CAFCASS_SAFETY_CHECKS),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.CAFCASS_SAFETY_CHECKS),
    isInProgress: () => false,
    isComplete: () => false,
  },
  responseSubmitted: {
    id: CaseProgressionStage.RESPONSE_SUBMITTED,
    label: getLabel.bind(null, CaseProgressionStage.RESPONSE_SUBMITTED),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.RESPONSE_SUBMITTED),
    isInProgress: () => false,
    isComplete: () => false,
  },
  hearingAndCourtOrders: {
    id: CaseProgressionStage.HEARING_AND_COURT_ORDERS,
    label: getLabel.bind(null, CaseProgressionStage.HEARING_AND_COURT_ORDERS),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.HEARING_AND_COURT_ORDERS),
    isInProgress: () => false,
    isComplete: () => false,
  },
  caseOpened: {
    id: CaseProgressionStage.CASE_OPENED,
    label: getLabel.bind(null, CaseProgressionStage.CASE_OPENED),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.CASE_OPENED),
    isInProgress: () => false,
    isComplete: () => false,
  },
  finalOrder: {
    id: CaseProgressionStage.FINAL_ORDER,
    label: getLabel.bind(null, CaseProgressionStage.FINAL_ORDER),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.FINAL_ORDER),
    isInProgress: () => false,
    isComplete: () => false,
  },
  caseClosed: {
    id: CaseProgressionStage.ALL_FINAL_ORDERS_ISSUED,
    label: getLabel.bind(null, CaseProgressionStage.ALL_FINAL_ORDERS_ISSUED),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.ALL_FINAL_ORDERS_ISSUED),
    isInProgress: () => false,
    isComplete: () => false,
  },
};
