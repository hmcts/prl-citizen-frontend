/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../app/case/case';
import { UserDetails } from '../../../app/controller/AppRequest';

import { CaseType, PartyType, State, YesOrNo } from './../../../app/case/definition';

export const getPartyName = (
  caseData: Partial<CaseWithId> | undefined,
  partyType: PartyType,
  userDetails: UserDetails
): string => {
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

export const isCaseWithdrawn = (caseData: Partial<CaseWithId>): boolean => {
  if (!caseData) {
    return false;
  }

  if (caseData?.orderCollection) {
    return !!caseData.orderCollection.find(
      order =>
        order.value?.orderTypeId === 'blankOrderOrDirectionsWithdraw' &&
        order.value?.withdrawnRequestType === 'Withdrawn application' &&
        order.value.isWithdrawnRequestApproved === YesOrNo.YES
    );
  } else {
    return [State.CASE_WITHDRAWN].includes(caseData.state!);
  }
};

export const isCaseLinked = (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean =>
  caseData && !!caseData.applicants?.find(applicant => applicant.value.user.idamId === userDetails.id);

export const isCaseClosed = (caseData: Partial<CaseWithId>): boolean =>
  caseData && [State.CASE_WITHDRAWN, State.CASE_CLOSED].includes(caseData.state!);

export const isDraftCase = (caseData: Partial<CaseWithId>): boolean => caseData && caseData.state! === State.CASE_DRAFT;
