/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { SelectTypeOfOrderEnum, State } from '../../../../../../app/case/definition';
import { ProgressBarProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseClosed } from '../../../utils';
import { progressBarStage } from '../utils';

export const getDAConfig = (): ProgressBarProps[] => {
  return [
    { ...progressBarStage.caseOpened, isComplete: () => true },
    {
      ...progressBarStage.hearingAndCourtOrders,
      isInProgress: (userCase: Partial<CaseWithId>) =>
        userCase &&
        !!(
          userCase.orderCollection ||
          [State.DECISION_OUTCOME, State.PREPARE_FOR_HEARING_CONDUCT_HEARING].includes(userCase.state!)
        ),
      isComplete: (userCase: Partial<CaseWithId>) => userCase.selectTypeOfOrder === SelectTypeOfOrderEnum.finl,
    },
    {
      ...progressBarStage.finalOrder,
      isComplete: (userCase: Partial<CaseWithId>) => userCase.selectTypeOfOrder === SelectTypeOfOrderEnum.finl,
    },
    {
      ...progressBarStage.caseClosed,
      isComplete: isCaseClosed,
    },
  ];
};
