import { CaseWithId } from '../../../app/case/case';
import {
  SectionStatus, YesOrNo,
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
  
  if (((userCase?.start == YesOrNo.YES && userCase?.iFactorsStartProvideDetails) || userCase?.start == YesOrNo.NO) 
  && ((userCase?.parents == YesOrNo.YES && userCase?.iFactorsParentsProvideDetails) || userCase?.parents == YesOrNo.NO)  
  && ((userCase?.jurisdiction == YesOrNo.YES && userCase?.iFactorsJurisdictionProvideDetails) || userCase?.jurisdiction == YesOrNo.NO)
  && ((userCase?.request == YesOrNo.YES && userCase?.iFactorsRequestProvideDetails) || userCase?.request == YesOrNo.NO)) {
    return SectionStatus.COMPLETED;
  }
  
  if (userCase?.start || userCase?.parents || userCase?.request || userCase?.jurisdiction) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.NOT_STARTED;
};
