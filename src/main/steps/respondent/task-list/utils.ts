import { CaseWithId } from '../../../app/case/case';
import {
  SectionStatus,
} from '../../../app/case/definition';

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
  if (userCase?.confirmcontactdetails) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.confirmcontactdetails) {
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

export const getInternationalFactorsStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.start && userCase?.parents && userCase?.jurisdiction && userCase?.request ) {
    return SectionStatus.COMPLETED;
  }
  console.log(userCase?.start + "****** " + userCase?.parents + "****** " + userCase?.request + "******" + userCase?.jurisdiction);
  console.log(userCase?.iFactorsStartProvideDetails + "****** " + userCase?.iFactorsJurisdictionProvideDetails + "****** " + userCase?.iFactorsParentsProvideDetails + "******" + userCase?.iFactorsRequestProvideDetails);
  
  if (userCase?.start || userCase?.parents || userCase?.request || userCase?.jurisdiction) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};
