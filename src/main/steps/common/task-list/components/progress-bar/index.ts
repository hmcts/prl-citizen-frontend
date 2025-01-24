import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { ProgressBarConfigType, ProgressBarProps } from '../../definitions';

import { CaseType, PartyType } from './../../../../../app/case/definition';
import { ProgressBarConfig } from './config';
import { languages as content } from './content';
import { getProgressBarType } from './utils';

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
        let preRenderData: any;
        let isInProgress = false;
        let isComplete = false;

        if (_.isFunction(config.preRender)) {
          preRenderData = config.preRender(caseData, userDetails);
        }

        if (_.isFunction(config.isInProgress)) {
          isInProgress = preRenderData
            ? config.isInProgress(caseData, userDetails, preRenderData)
            : config.isInProgress(caseData, userDetails);
        }

        if (_.isFunction(config.isComplete)) {
          isComplete = preRenderData
            ? config.isComplete(caseData, userDetails, preRenderData)
            : config.isComplete(caseData, userDetails);
        }

        let ariaLabel = _.isFunction(config.ariaLabel) ? `${config.ariaLabel(caseType, language)} ` : '';
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
      }

      return null;
    })
    .filter(config => config !== null);
};
