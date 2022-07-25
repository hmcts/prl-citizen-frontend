import { CaseWithId } from '../../../app/case/case';
import { SectionStatus, YesOrNo } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConfirmOrEditYourContactDetails = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.applicant1FullName && userCase?.applicant1DateOfBirth && userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.applicant1FullName || userCase?.applicant1DateOfBirth || userCase?.applicant1PlaceOfBirth) {
  return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConsentToApplicationStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.doYouConsent && userCase?.applicationReceivedDate && userCase?.courtPermission) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.doYouConsent || userCase?.applicationReceivedDate || userCase?.courtPermission) {
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

export const getInternationalFactorsStatus = (userCase: CaseWithId): SectionStatus => {
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

export const getYourSafetyStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.safetyConcerns) {
    return SectionStatus.COMPLETED;
  }
  // if (userCase?.detailsKnown ) {
  //   return SectionStatus.IN_PROGRESS;
  // }
  return SectionStatus.TO_DO;
};
