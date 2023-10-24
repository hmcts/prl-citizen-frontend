/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import progressConfig from './config/index';
import { languages as content } from './content';

export const progressBarConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: progressConfig.CA_APPLICANT,
    [PartyType.RESPONDENT]: progressConfig.CA_RESPONDENT,
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: progressConfig.DA_APPLICANT_RESPONDENT,
    [PartyType.RESPONDENT]: progressConfig.DA_APPLICANT_RESPONDENT,
  },
};
export const getProgressBarConfig = (
  caseData: Partial<CaseWithId>,
  partyType: PartyType,
  language: string,
  userDetails: UserDetails
): Record<string, any>[] => {
  let caseType = caseData?.caseTypeOfApplication;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return progressBarConfig[caseType!][partyType].map(config => {
    const isInProgress = config.isInProgress(caseData, userDetails);
    const isComplete = config.isComplete(caseData, userDetails);
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
