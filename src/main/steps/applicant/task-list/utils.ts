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
  if (userCase?.applicant1FullName && userCase?.applicant1DateOfBirth && userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.applicant1FullName || userCase?.applicant1DateOfBirth || userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getYourApplication = (): SectionStatus => {
  return SectionStatus.DOWNLOAD;
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

export const getViewAllDocuments = (): SectionStatus => {
  return SectionStatus.READY_TO_VIEW;
};

export const getApplicantViewAllOrdersFromTheCourtAllDocuments = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};
export const getApplicantResponseToRequestForChildArrangements = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.childrenKnownToLocalAuthority) {
    flag = true;
  }
  return flag;
};
export const getApplicantAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.allegationsOfHarmYesNo) {
    flag = true;
  }
  return flag;
};

export const getSupportYourNeedsDetails = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase?.languageRequirements &&
    userCase?.reasonableAdjustments &&
    userCase?.helpCommunication &&
    userCase?.courtHearing &&
    userCase?.docsSupport &&
    userCase?.courtComfort &&
    userCase?.safetyArrangements &&
    userCase?.travellingToCourt &&
    userCase?.unableForCourtProceedings
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
    userCase?.otherDetails ||
    userCase?.courtComfort ||
    userCase?.otherProvideDetails ||
    userCase?.safetyArrangements ||
    userCase?.safetyArrangementsDetails ||
    userCase?.travellingToCourt ||
    userCase?.travellingOtherDetails ||
    userCase?.unableForCourtProceedings ||
    userCase?.courtProceedingProvideDetails
  ) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

// export const getOrderDetailsStatus = (userCase: CaseWithId): SectionStatus => {
//   if (userCase.orderCollection && userCase.orderCollection.length > 0) {
//     return SectionStatus.READY_TO_VIEW;
//   } else {
//     return SectionStatus.NOT_AVAILABLE_YET;
//   }
// };
