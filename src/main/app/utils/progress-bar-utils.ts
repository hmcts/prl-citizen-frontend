import {
  progressBarC100,
  progressBarCyC100,
  progressBarCyFl401,
  progressBarFl401,
} from '../../../main/steps/common/models/progressBarItems';
import { CaseWithId } from '../../app/case/case';
import { SelectTypeOfOrderEnum, State } from '../../app/case/definition';

const buildProgressBarStages = (userCase: Partial<CaseWithId>, lang: string): object => {
  const isEng = lang === 'en';
  const applicationSubmitted = {
    title: isEng ? progressBarC100.applicationSubmitted.title : progressBarCyC100.applicationSubmitted.title,
    ariaLabel: isEng
      ? progressBarC100.applicationSubmitted.ariaLabel
      : progressBarCyC100.applicationSubmitted.ariaLabel,
    active: true,
    completed: true,
  };

  const cafcassSafetyChecks = {
    title: isEng ? progressBarC100.cafcassSafetyChecks.title : progressBarCyC100.cafcassSafetyChecks.title,
    ariaLabel: isEng ? progressBarC100.cafcassSafetyChecks.ariaLabel : progressBarCyC100.cafcassSafetyChecks.ariaLabel,
    active: false,
    completed: false,
  };

  const responseSubmitted = {
    title: isEng ? progressBarC100.responseSubmitted.title : progressBarCyC100.responseSubmitted.title,
    ariaLabel: isEng ? progressBarC100.responseSubmitted.ariaLabel : progressBarCyC100.responseSubmitted.ariaLabel,
    active: false,
    completed: false,
  };

  const hearingAndCourtOrders = {
    title: isEng ? progressBarC100.hearingAndCourtOrders.title : progressBarCyC100.hearingAndCourtOrders.title,
    ariaLabel: isEng
      ? progressBarC100.hearingAndCourtOrders.ariaLabel
      : progressBarCyC100.hearingAndCourtOrders.ariaLabel,
    active: isHearingOrderActive(userCase),
    completed: isFinalOrderIssued(userCase),
  };

  const caseOpened = {
    title: isEng ? progressBarFl401.caseOpened.title : progressBarCyFl401.caseOpened.title,
    ariaLabel: isEng ? progressBarFl401.caseOpened.ariaLabel : progressBarCyFl401.caseOpened.ariaLabel,
    active: false,
    completed: true,
  };

  const finalOrder = {
    title: isEng ? progressBarFl401.finalOrder.title : progressBarCyFl401.finalOrder.title,
    ariaLabel: isEng ? progressBarFl401.finalOrder.ariaLabel : progressBarCyFl401.finalOrder.ariaLabel,
    active: false,
    completed: isFinalOrderIssued(userCase),
  };

  const caseClosed = {
    title: isEng ? progressBarC100.caseClosed.title : progressBarCyC100.caseClosed.title,
    ariaLabel: isEng ? progressBarC100.caseClosed.ariaLabel : progressBarCyC100.caseClosed.ariaLabel,
    active: false,
    completed: isAllFinalOrderIssued(userCase),
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
const isAllFinalOrderIssued = (userCase: Partial<CaseWithId>) => {
  if (userCase.state === State.ALL_FINAL_ORDERS_ISSUED) {
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

export { buildProgressBarStages };
