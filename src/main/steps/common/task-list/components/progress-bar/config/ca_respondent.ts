/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { State } from '../../../../../../app/case/definition';
import { getPartyDetails } from '../../../../../../steps/tasklistresponse/utils';
import { isFinalOrderIssued, progressBarStage } from '../utils';

export const CA_RESPONDENT = [
  {
    ...progressBarStage.applicationSubmitted,
    isComplete: () => true,
  },
  progressBarStage.cafcassSafetyChecks,
  {
    ...progressBarStage.responseSubmitted,
    isInProgress: (caseData, userDetails) => {
      const respondent = getPartyDetails(caseData, userDetails.id);
      if (respondent?.response.citizenFlags?.isResponseInitiated) {
        return true;
      }
    },
    isComplete: (caseData, userDetails) =>
      caseData.citizenResponseC7DocumentList?.find(doc => doc.value.createdBy === userDetails.id) !== undefined,
  },
  {
    ...progressBarStage.hearingAndCourtOrders,
    isInProgress: caseData =>
      caseData.orderCollection ||
      caseData.state === State.DECISION_OUTCOME ||
      caseData.state === State.PREPARE_FOR_HEARING_CONDUCT_HEARING,
    isComplete: isFinalOrderIssued,
  },
  {
    ...progressBarStage.caseClosed,
    isComplete: caseData => caseData.state === State.ALL_FINAL_ORDERS_ISSUED,
  },
];
