import { progressBarC100, progressBarFl401 } from '../../../main/steps/common/models/progressBarItems';
import { CaseWithId } from '../../app/case/case';
import { SelectTypeOfOrderEnum, YesOrNo } from '../../app/case/definition';

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
    active: false,
    completed: false,
  };

  const responseSubmitted = {
    title: progressBarC100.responseSubmitted.title,
    ariaLabel: progressBarC100.responseSubmitted.ariaLabel,
    active: true,
    completed: cafcassSafetyChecks.completed && !true,
  };

  const hearingAndCourtOrders = {
    title: progressBarC100.hearingAndCourtOrders.title,
    ariaLabel: progressBarC100.hearingAndCourtOrders.ariaLabel,
    active: false,
    completed: responseSubmitted.completed && !true,
  };

  const caseOpened = {
    title: progressBarFl401.caseOpened.title,
    ariaLabel: progressBarFl401.caseOpened.ariaLabel,
    active: true,
    completed: false,
  };

  const finalOrder = {
    title: progressBarFl401.finalOrder.title,
    ariaLabel: progressBarFl401.finalOrder.ariaLabel,
    active: isFinalOrderActive(userCase),
    completed: false,
  };

  const caseClosed = {
    title: progressBarC100.caseClosed.title,
    ariaLabel: progressBarC100.caseClosed.ariaLabel,
    active: iscaseClosedActive(userCase),
    completed: false,
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

const isFinalOrderActive = (userCase: Partial<CaseWithId>) => {
  console.log(JSON.stringify(userCase.selectTypeOfOrder));
  if (userCase.selectTypeOfOrder === SelectTypeOfOrderEnum.finl) {
    return true;
  }
  return false;
};

const iscaseClosedActive = (userCase: Partial<CaseWithId>) => {
  console.log(JSON.stringify(userCase.doesOrderClosesCase));
  if (userCase.doesOrderClosesCase === YesOrNo.YES) {
    return true;
  }
  return false;
};

export { buildProgressBarStages };
