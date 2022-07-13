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

export const getConfirmOrEditYourContactDetails = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.confirmcontactdetails) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.confirmcontactdetails) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getSupportYourNeedsDetails = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase?.languageRequirements &&
    userCase?.languageDetails &&
    userCase?.reasonableAdjustments &&
    userCase?.helpCommunication &&
    userCase?.describeOtherNeed &&
    userCase?.courtHearing &&
    userCase?.communicationSupportOther &&
    userCase?.docsSupport &&
    userCase?.otherDetails
  ) {
    return SectionStatus.COMPLETED;
  }
  if (
    userCase?.languageRequirements ||
    userCase?.languageDetails ||
    userCase?.reasonableAdjustments ||
    userCase?.helpCommunication ||
    userCase?.describeOtherNeed ||
    userCase?.courtHearing ||
    userCase?.communicationSupportOther ||
    userCase?.docsSupport ||
    userCase?.otherDetails
  ) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};
