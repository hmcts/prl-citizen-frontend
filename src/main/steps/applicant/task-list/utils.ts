import { CaseWithId } from '../../../app/case/case';
import { Applicant } from '../../../app/case/definition';

export const getApplicantAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.allegationsOfHarmYesNo) {
    flag = true;
  }
  return flag;
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
