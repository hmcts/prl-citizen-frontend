import { CaseWithId } from '../../../app/case/case';
import { SectionStatus } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};

export const getConfirmOrEditYourContactDetails = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.applicant1FullName && userCase?.applicant1DateOfBirth && userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.COMPLETED;
 }
  if (userCase?.applicant1FullName || userCase?.applicant1DateOfBirth || userCase?.applicant1PlaceOfBirth) {
     return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};

export const getMiamStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.miamStart && userCase?.miamWillingness) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.miamStart || userCase?.miamWillingness) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};
