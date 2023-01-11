import { CaseWithId } from '../../../app/case/case';
import { Applicant, SectionStatus } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let status = SectionStatus.TO_DO;
  let keepDetailsPrivate;
  if (userCase?.caseTypeOfApplication === 'C100') {
    userCase?.applicants?.forEach((applicant: Applicant) => {
      if (applicant?.value.user?.idamId === userIdamId) {
        keepDetailsPrivate = applicant?.value?.response?.keepDetailsPrivate;
      }
    });
  } else {
    keepDetailsPrivate = userCase?.applicantsFL401?.response?.keepDetailsPrivate;
  }
  if (keepDetailsPrivate?.confidentiality && keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = SectionStatus.COMPLETED;
  } else if (keepDetailsPrivate?.confidentiality || keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = SectionStatus.IN_PROGRESS;
  }
  return status;
};

export const getConfirmOrEditYourContactDetails = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  const status = SectionStatus.TO_DO;
  let resp;
  if (userCase?.caseTypeOfApplication === 'C100') {
    userCase?.respondents?.forEach((applicant: Applicant) => {
      if (applicant?.value.user?.idamId === userIdamId) {
        resp = applicant?.value;
      }
    });
  } else {
    resp = userCase?.applicantsFL401;
  }

  if (resp?.firstName && resp?.lastName && resp?.dateOfBirth && resp?.placeOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (resp?.firstName || resp?.lastName || resp?.dateOfBirth || resp?.placeOfBirth) {
    return SectionStatus.IN_PROGRESS;
  }
  return status;
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

export const getUploadDocuments = (): SectionStatus => {
  return SectionStatus.TO_DO;
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

export const getApplicantPartyDetails = (userCase: Partial<CaseWithId>, userId: string): Applicant | undefined => {
  for (const userapplicant of userCase.applicants!) {
    if (userapplicant.value.user.idamId === userId) {
      return userapplicant;
    }
  }
  return undefined;
};
