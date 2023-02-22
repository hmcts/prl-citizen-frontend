/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../app/case/case';
import { UserDetails } from '../../../app/controller/AppRequest';

import { CaseType, PartyType } from './../../../app/case/definition';

export const getPartyName = (caseData: Partial<CaseWithId>, partyType: PartyType, userDetails: UserDetails): string => {
  let partyDetails: Record<string, any> | undefined;

  if (caseData) {
    if (caseData.caseTypeOfApplication === CaseType.C100) {
      if (partyType === PartyType.APPLICANT) {
        partyDetails = { firstName: userDetails.givenName, lastName: userDetails.familyName };
      } else {
        partyDetails = caseData?.respondents?.find(party => party.value.user.idamId === userDetails.id);
      }
    } else {
      partyDetails = caseData?.[partyType === PartyType.APPLICANT ? 'applicantsFL401' : 'respondentsFL401'];
    }
  } else {
    partyDetails = { firstName: userDetails.givenName, lastName: userDetails.familyName };
  }

  return partyDetails ? `${partyDetails.firstName} ${partyDetails.lastName}` : '';
};
