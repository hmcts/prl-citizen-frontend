/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../../app/case/case';

import { CaseType, PartyType, State } from './../../../../../app/case/definition';
import { languages as content } from './content';

enum CaseProgressionStage {
  APPLICATION_SUBMITTED = 'applicationSubmitted',
  CAFCASS_SAFETY_CHECKS = 'cafcassSafetyChecks',
  RESPONSE_SUBMITTED = 'responseSubmitted',
  HEARING_AND_COURT_ORDERS = 'hearingAndCourtOrders',
  CASE_OPENED = 'caseOpened',
  FINAL_ORDER = 'finalOrder',
  CASE_CLOSED = 'caseClosed',
}

const getLabel = (caseStage: CaseProgressionStage, caseType: CaseType, language: string): string =>
  content[language]?.[caseType]?.[caseStage]?.label;

const getAriaLabel = (caseStage: CaseProgressionStage, caseType: CaseType, language: string): string =>
  content[language]?.[caseType]?.[caseStage]?.ariaLabel;

const progressBarStage = {
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
    id: CaseProgressionStage.CASE_CLOSED,
    label: getLabel.bind(null, CaseProgressionStage.CASE_CLOSED),
    ariaLabel: getAriaLabel.bind(null, CaseProgressionStage.CASE_CLOSED),
    isInProgress: () => false,
    isComplete: () => false,
  },
};

const progressBarConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: [
      {
        ...progressBarStage.applicationSubmitted,
        isComplete: (caseData: Partial<CaseWithId>) => {
          return caseData
            ? ![State.AwaitingSubmissionToHmcts, State.SUBMITTED_NOT_PAID, State.SUBMITTED_PAID,State.Withdrawn].includes(
                caseData.state!
              )
            : false;
        },
        isInProgress: (caseData: Partial<CaseWithId>) => {
          return caseData ? !(State.AwaitingSubmissionToHmcts === caseData.state!) : false;
        },
      },
      progressBarStage.cafcassSafetyChecks,
      progressBarStage.responseSubmitted,
      progressBarStage.hearingAndCourtOrders,
      {
      ...progressBarStage.caseClosed,
      isComplete: (caseData: Partial<CaseWithId>) => {
        return caseData ? !(State.Withdrawn ===caseData.state!): false;
      },
      }
    ],
    [PartyType.RESPONDENT]: [
      {
        ...progressBarStage.applicationSubmitted,
        isComplete: () => true,
      },
      progressBarStage.cafcassSafetyChecks,
      progressBarStage.responseSubmitted,
      progressBarStage.hearingAndCourtOrders,
      progressBarStage.caseClosed,
    ],
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: [
      progressBarStage.caseOpened,
      progressBarStage.hearingAndCourtOrders,
      progressBarStage.finalOrder,
      progressBarStage.caseClosed,
    ],
    [PartyType.RESPONDENT]: [
      progressBarStage.caseOpened,
      progressBarStage.hearingAndCourtOrders,
      progressBarStage.finalOrder,
      progressBarStage.caseClosed,
    ],
  },
};

export const getProgressBarConfig = (
  caseData: Partial<CaseWithId>,
  partyType: PartyType,
  language: string
): Record<string, any>[] => {
  let caseType = caseData?.caseTypeOfApplication;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return progressBarConfig[caseType!][partyType].map(config => {
    const isInProgress = config.isInProgress(caseData);
    const isComplete = config.isComplete(caseData);
    let ariaLabel = `${config.ariaLabel(caseType, language)} `;
    let statusBarClassName: string;

    if (isComplete) {
      ariaLabel += content[language]['complete'];
      statusBarClassName = 'stage--completed';
    } else if (isInProgress) {
      ariaLabel += content[language]['inProgress'];
      statusBarClassName = 'stage--active';
    } else {
      ariaLabel += content[language]['notStarted'];
      statusBarClassName = '';
    }

    return {
      label: config.label(caseType, language),
      ariaLabel,
      statusBarClassName,
    };
  });
};
