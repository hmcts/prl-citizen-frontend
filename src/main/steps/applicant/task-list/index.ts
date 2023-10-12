import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyDetails } from '../../../app/case/definition';

import { getApplicantPartyDetails } from './utils';

export const getApplicant = (userCase: Partial<CaseWithId>, userId: string): PartyDetails | undefined => {
  if (userCase && userCase.caseTypeOfApplication === CaseType.C100) {
    const applicant = getApplicantPartyDetails(userCase, userId);
    return applicant?.value;
  } else {
    return userCase?.applicantsFL401;
  }
};

export const getApplicantName = (applicant: PartyDetails | undefined): string => {
  return applicant ? applicant.firstName + ' ' + applicant.lastName : '';
};
