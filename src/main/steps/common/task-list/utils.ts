/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { UserDetails } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../../../steps/tasklistresponse/utils';

import { CaseType, PartyDetails, PartyType, Respondent, State, YesOrNo } from './../../../app/case/definition';
import { findC7ResponseDocument } from './components/notification-banner/utils';

export const getPartyName = (
  caseData: Partial<CaseWithId> | undefined,
  partyType: PartyType,
  userDetails: UserDetails
): string => {
  let partyDetails: Record<string, any> | undefined;

  if (caseData) {
    if (caseData.caseTypeOfApplication === CaseType.C100) {
      if (partyType === PartyType.APPLICANT) {
        partyDetails = caseData?.applicants?.find(party => party.value.user.idamId === userDetails.id) ?? {
          firstName: userDetails.givenName,
          lastName: userDetails.familyName,
        };
      } else {
        partyDetails = caseData?.respondents?.find(party => party.value.user.idamId === userDetails.id)?.value;
      }
    } else {
      partyDetails = caseData?.[partyType === PartyType.APPLICANT ? 'applicantsFL401' : 'respondentsFL401'];
    }
  } else {
    partyDetails = { firstName: userDetails.givenName, lastName: userDetails.familyName };
  }

  if (partyDetails?.value) {
    partyDetails = partyDetails.value;
  }

  return partyDetails ? `${partyDetails.firstName} ${partyDetails.lastName}` : '';
};

export const isCaseWithdrawn = (caseData: CaseWithId): boolean => {
  if (!caseData) {
    return false;
  }
    return [State.CASE_WITHDRAWN].includes(caseData.state!);
};

export const isCaseLinked = (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
  const partyDetails = getPartyDetails(caseData as CaseWithId, userDetails.id);

  return !!(partyDetails && partyDetails.user.idamId === userDetails.id);
};

export const isCaseClosed = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData && [State.CASE_WITHDRAWN, State.ALL_FINAL_ORDERS_ISSUED].includes(caseData.state!));

export const isDraftCase = (caseData: Partial<CaseWithId>): boolean => {
  return caseData?.state === State.CASE_DRAFT;
};

export const isRepresentedBySolicotor = (caseData: CaseWithId, userId: UserDetails['id']): boolean => {
  return checkPartyRepresentedBySolicitor(getPartyDetails(caseData, userId));
};

export const checkPartyRepresentedBySolicitor = (partyDetails: PartyDetails | undefined): boolean => {
  return partyDetails?.user?.solicitorRepresented === YesOrNo.YES;
};

export const hasRespondentRespondedToC7Application = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails
): boolean => {
  return isC7ResponseSubmitted(getPartyDetails(caseData as CaseWithId, userDetails.id));
};

export const isC7ResponseSubmitted = (respondent: PartyDetails | undefined): boolean => {
  return _.get(respondent, 'response.c7ResponseSubmitted', YesOrNo.NO) === YesOrNo.YES;
};

export const isC7ResponseReviewed = (caseData: Partial<CaseWithId>, respondent: Respondent): boolean => {
  return !!findC7ResponseDocument(caseData as CaseWithId, respondent);
};
