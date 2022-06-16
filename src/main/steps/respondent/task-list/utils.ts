import { CaseWithId } from '../../../app/case/case';
import { SectionStatus } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getMiamStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.miamStart && userCase?.miamWillingness) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.miamStart || userCase?.miamWillingness) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getCurrentOrOtherProceedingsStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.proceedingsStart && userCase?.proceedingsStartOrder && userCase?.emergencyOrderOptions 
        && userCase?.supervisionOrderOption && userCase?.careOrderOptions 
        && userCase?.childAbductionOrderOption && userCase?.caOrderOption && userCase?.financialOrderOption
        && userCase?.nonmolestationOrderOption && userCase?.occupationalOrderOptions && userCase?.marraigeOrderOptions
        && userCase?.restrainingOrderOptions && userCase?.injuctiveOrderOptions && userCase?.underTakingOrderOptions) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.proceedingsStart || userCase?.proceedingsStartOrder || userCase?.supervisionOrderOption 
    || userCase?.supervisionOrderOption || userCase?.careOrderOptions 
    || userCase?.childAbductionOrderOption || userCase?.caOrderOption || userCase?.financialOrderOption
    || userCase?.nonmolestationOrderOption || userCase?.occupationalOrderOptions || userCase?.marraigeOrderOptions
    || userCase?.restrainingOrderOptions || userCase?.injuctiveOrderOptions || userCase?.underTakingOrderOptions) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};
