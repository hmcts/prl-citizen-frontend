/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { ProgressBarConfigType } from '../../definitions';

import { CaseType, SelectTypeOfOrderEnum, State } from './../../../../../app/case/definition';
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

export enum CaseCreationStage {
  CHILDREN_POSTCODE = 'childrenPostCode',
  SCREENING_SECTION = 'screeningSection',
  MIAM = 'miam',
  TYPE_OF_ORDER = 'typeOfOrder',
  OTHER_PROCEEDINGS = 'otherProceedings',
  URGENCY_AND_WITHOUT_NOTICE = 'urgencyAndWithoutNotice',
  PEOPLE = 'people',
  SAFETY_CONCERNS = 'safetyConcerns',
  INTERNATIONAL_ELEMENTS = 'internationalElements',
  REASONABLE_ADJUSTMENTS = 'reasonableAdjustments',
  HELP_WITH_FEES = 'helpWithFees',
  CONSENT_ORDER = 'consentOrder',
}

export const getLabel = (
  caseStage: CaseCreationStage | CaseProgressionStage,
  caseProgressionType: ProgressBarConfigType,
  language: string
): string => content[language]?.[caseProgressionType]?.[caseStage]?.label;

export const getAriaLabel = (
  caseStage: CaseCreationStage | CaseProgressionStage,
  caseProgressionType: ProgressBarConfigType,
  language: string
): string => content[language]?.[caseProgressionType]?.[caseStage]?.ariaLabel;

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

export const getProgressBarType = (caseData: CaseWithId, isC100TrainTrackEnabled: boolean): ProgressBarConfigType => {
  const caseType = caseData?.caseTypeOfApplication;
  let progressBarType: ProgressBarConfigType;

  if (!caseType || caseData?.state === State.CASE_DRAFT) {
    progressBarType = isC100TrainTrackEnabled
      ? ProgressBarConfigType.C100_CASE_CREATION
      : ProgressBarConfigType.C100_CASE_PROGRESSION;
  } else {
    progressBarType =
      caseType === CaseType.C100
        ? ProgressBarConfigType.C100_CASE_PROGRESSION
        : ProgressBarConfigType.FL401_CASE_PROGRESSION;
  }

  return progressBarType;
};

const getPreRenderData = (config, caseData: CaseWithId, userDetails: UserDetails) => {
  let preRenderData;
  if (_.isFunction(config.preRender)) {
    preRenderData = config.preRender(caseData, userDetails);
  }

  return preRenderData;
};

export const getIsInProgressStatus = (config, caseData: CaseWithId, userDetails: UserDetails) => {
  const preRenderData = getPreRenderData(config, caseData, userDetails);
  let isInProgress = false;

  if (_.isFunction(config.isInProgress)) {
    isInProgress = preRenderData
      ? config.isInProgress(caseData, userDetails, preRenderData)
      : config.isInProgress(caseData, userDetails);
  }

  return isInProgress;
};

export const getIsCompleteStatus = (config, caseData: CaseWithId, userDetails: UserDetails) => {
  const preRenderData = getPreRenderData(config, caseData, userDetails);
  let isComplete = false;

  if (_.isFunction(config.isComplete)) {
    isComplete = preRenderData
      ? config.isComplete(caseData, userDetails, preRenderData)
      : config.isComplete(caseData, userDetails);
  }

  return isComplete;
};
