import { progressBarC100, progressBarFl401 } from '../../../main/steps/common/models/progressBarItems';
import { CaseWithId } from '../../app/case/case';
import { SelectTypeOfOrderEnum, State } from '../../app/case/definition';

const buildProgressBarStages = (userCase: Partial<CaseWithId>): object => {
  const applicationSubmitted = {
    title: progressBarC100.applicationSubmitted.title,
    ariaLabel: progressBarC100.applicationSubmitted.ariaLabel,
    active: true,
    completed: true,
  };

  const cafcassSafetyChecks = {
    title: progressBarC100.cafcassSafetyChecks.title,
    ariaLabel: progressBarC100.cafcassSafetyChecks.ariaLabel,
    active: true,
    completed: false,
  };

  const responseSubmitted = {
    title: progressBarC100.responseSubmitted.title,
    ariaLabel: progressBarC100.responseSubmitted.ariaLabel,
    active: isResponseSubmitted(userCase),
    completed: cafcassSafetyChecks.completed && !true,
  };

  const hearingAndCourtOrders = {
    title: progressBarC100.hearingAndCourtOrders.title,
    ariaLabel: progressBarC100.hearingAndCourtOrders.ariaLabel,
    active: isHearingOrderActive(userCase),
    completed: isFinalOrderIssued(userCase),
  };

  const caseOpened = {
    title: progressBarFl401.caseOpened.title,
    ariaLabel: progressBarFl401.caseOpened.ariaLabel,
    active: true,
    completed: true,
  };

  const finalOrder = {
    title: progressBarFl401.finalOrder.title,
    ariaLabel: progressBarFl401.finalOrder.ariaLabel,
    active: false,
    completed: isFinalOrderIssued(userCase),
  };

  const caseClosed = {
    title: progressBarC100.caseClosed.title,
    ariaLabel: progressBarC100.caseClosed.ariaLabel,
    active: false,
    completed: isFinalOrderIssued(userCase),
  };

  const progressBarC100Stages = [
    applicationSubmitted,
    cafcassSafetyChecks,
    responseSubmitted,
    hearingAndCourtOrders,
    caseClosed,
  ];

  const progressBarFl401Stages = [caseOpened, hearingAndCourtOrders, finalOrder, caseClosed];

  const progressBarStages = userCase.caseTypeOfApplication === 'C100' ? progressBarC100Stages : progressBarFl401Stages;
  return progressBarStages;
};

const isFinalOrderIssued = (userCase: Partial<CaseWithId>) => {
  if (userCase.selectTypeOfOrder === SelectTypeOfOrderEnum.finl) {
    return true;
  }
  return false;
};

const isHearingOrderActive = (userCase: Partial<CaseWithId>) => {
  if (
    userCase.orderCollection ||
    userCase.state === State.DECISION_OUTCOME ||
    userCase.state === State.PREPARE_FOR_HEARING_CONDUCT_HEARING
  ) {
    return true;
  }
  return false;
};

const isResponseSubmitted = (userCase: Partial<CaseWithId>) => {
  if (userCase.citizenResponseC7DocumentList) {
    return true;
  }
  return false;
};

export { buildProgressBarStages };
