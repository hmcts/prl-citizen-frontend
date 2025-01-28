import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { ProgressBarConfigType, ProgressBarProps } from '../../definitions';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import { ProgressBarConfig } from './config';
import { languages as content } from './content';
import { getIsCompleteStatus, getIsInProgressStatus, getProgressBarType } from './utils';

export const getProgressBarConfig = (
  caseData: CaseWithId,
  partyType: PartyType,
  language: string,
  userDetails: UserDetails
): ProgressBarProps[] => {
  const progressBarType = getProgressBarType(caseData);
  const progressBarConfig = ProgressBarConfig?.[progressBarType]?.[partyType];
  const progressBarItems = _.isFunction(progressBarConfig) ? progressBarConfig(caseData, userDetails) : [];
  const caseType =
    (caseData?.caseTypeOfApplication as CaseType) ?? progressBarType === ProgressBarConfigType.C100_CASE_CREATION
      ? ProgressBarConfigType.C100_CASE_CREATION
      : CaseType.C100;

  return progressBarItems
    .map(config => {
      if (!config.show || (_.isFunction(config.show) && config.show(caseData, userDetails))) {
        let ariaLabel = _.isFunction(config.ariaLabel) ? `${config.ariaLabel(caseType, language)} ` : '';
        let statusBarClassName: string;

        if (getIsCompleteStatus(config, caseData, userDetails)) {
          ariaLabel += content[language]['complete'];
          statusBarClassName = 'stage--completed';
        } else if (getIsInProgressStatus(config, caseData, userDetails)) {
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
      }

      return null;
    })
    .filter(config => config !== null);
};
