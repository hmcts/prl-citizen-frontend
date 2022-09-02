import { CaseWithId } from '../../../app/case/case';
import { SectionStatus, YesOrNo } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConfirmOrEditYourContactDetails = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.applicant1FullName && userCase?.applicant1DateOfBirth && userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.applicant1FullName || userCase?.applicant1DateOfBirth || userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConsentToApplicationStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.doYouConsent && userCase?.applicationReceivedDate && userCase?.courtPermission) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.doYouConsent || userCase?.applicationReceivedDate || userCase?.courtPermission) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getMiamStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.miamStart && userCase?.miamWillingness) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.miamStart || userCase?.miamWillingness) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getInternationalFactorsStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (
    ((userCase?.start === YesOrNo.YES && userCase?.iFactorsStartProvideDetails) || userCase?.start === YesOrNo.NO) &&
    ((userCase?.parents === YesOrNo.YES && userCase?.iFactorsParentsProvideDetails) ||
      userCase?.parents === YesOrNo.NO) &&
    ((userCase?.jurisdiction === YesOrNo.YES && userCase?.iFactorsJurisdictionProvideDetails) ||
      userCase?.jurisdiction === YesOrNo.NO) &&
    ((userCase?.request === YesOrNo.YES && userCase?.iFactorsRequestProvideDetails) || userCase?.request === YesOrNo.NO)
  ) {
    return SectionStatus.COMPLETED;
  }

  if (userCase?.start || userCase?.parents || userCase?.request || userCase?.jurisdiction) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getViewAllOrdersFromTheCourt = (userCase: CaseWithId): SectionStatus => {
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    return SectionStatus.READY_TO_VIEW;
  }
  return SectionStatus.NOT_AVAILABLE_YET;
};

export const getViewAllOrdersFromTheCourtAllDocuments = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};

export const getRespondentResponseToRequestForChildArrangements = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};

export const getRespondentAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};

export const getViewAllDocuments = (userCase: CaseWithId): SectionStatus => {
  console.log(userCase);
  return SectionStatus.READY_TO_VIEW;
};

export const getCurrentOrOtherProceedingsStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (
    userCase?.proceedingsStart &&
    userCase?.proceedingsStartOrder &&
    userCase?.emergencyOrderOptions &&
    userCase?.supervisionOrderOption &&
    userCase?.careOrderOptions &&
    userCase?.childAbductionOrderOption &&
    userCase?.caOrderOption &&
    userCase?.financialOrderOption &&
    userCase?.nonmolestationOrderOption &&
    userCase?.occupationalOrderOptions &&
    userCase?.marraigeOrderOptions &&
    userCase?.restrainingOrderOptions &&
    userCase?.injuctiveOrderOptions &&
    userCase?.underTakingOrderOptions
  ) {
    return SectionStatus.COMPLETED;
  }
  if (
    userCase?.proceedingsStart ||
    userCase?.proceedingsStartOrder ||
    userCase?.supervisionOrderOption ||
    userCase?.supervisionOrderOption ||
    userCase?.careOrderOptions ||
    userCase?.childAbductionOrderOption ||
    userCase?.caOrderOption ||
    userCase?.financialOrderOption ||
    userCase?.nonmolestationOrderOption ||
    userCase?.occupationalOrderOptions ||
    userCase?.marraigeOrderOptions ||
    userCase?.restrainingOrderOptions ||
    userCase?.injuctiveOrderOptions ||
    userCase?.underTakingOrderOptions
  ) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};
export const getYourSafetyStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.safetyConcerns) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.TO_DO;
};
