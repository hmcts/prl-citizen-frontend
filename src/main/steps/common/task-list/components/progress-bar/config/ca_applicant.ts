/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { ProgressBarProps } from '../../../../../../steps/common/task-list/definitions';
import { doesCaseHaveId, isCaseClosed } from '../../../../../../steps/common/task-list/utils';
import { progressBarStage } from '../utils';

export const getCAApplicantConfig = (): ProgressBarProps[] => {
  return [
    {
      ...progressBarStage.applicationSubmitted,
      isComplete: (caseData: Partial<CaseWithId>) =>
        caseData &&
        doesCaseHaveId(caseData) &&
        ![
          State.CASE_DRAFT,
          State.CASE_SUBMITTED_NOT_PAID,
          State.CASE_SUBMITTED_PAID,
          State.CASE_ISSUED_TO_LOCAL_COURT,
          State.CASE_GATE_KEEPING,
        ].includes(caseData.state!),
      isInProgress: (caseData: Partial<CaseWithId>) =>
        caseData && doesCaseHaveId(caseData) && caseData.state !== State.CASE_DRAFT,
    },
    progressBarStage.cafcassSafetyChecks,
    progressBarStage.responseSubmitted,
    progressBarStage.hearingAndCourtOrders,

    {
      ...progressBarStage.caseClosed,
      isComplete: isCaseClosed,
    },
  ];
};
