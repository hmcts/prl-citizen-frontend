import { CaseWithId } from '../../../app/case/case';
import { Applicant, SectionStatus } from '../../../app/case/definition';

export const getApplicantAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.allegationsOfHarmYesNo) {
    flag = true;
  }
  return flag;
};

export const getSupportYourNeedsDetails = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase?.languageRequirements?.length &&
    userCase?.reasonableAdjustments?.length &&
    userCase?.safetyArrangements?.length &&
    userCase?.attendingToCourt?.length
  ) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.TO_DO;
};

export const getApplicantPartyDetails = (userCase: Partial<CaseWithId>, userId: string): Applicant | undefined => {
  if (userCase.applicants) {
    for (const userapplicant of userCase.applicants) {
      if (userapplicant.value.user.idamId === userId) {
        return userapplicant;
      }
    }
  }
  return undefined;
};
