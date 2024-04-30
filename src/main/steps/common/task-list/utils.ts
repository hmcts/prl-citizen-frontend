/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { AppRequest, UserDetails } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../../../steps/tasklistresponse/utils';
import { FETCH_CASE_DETAILS, PageLink, RESPOND_TO_APPLICATION } from '../../../steps/urls';
import { DocumentCategory } from '../documents/definitions';
import { applyParms } from '../url-parser';

import {
  CaseType,
  PartyDetails,
  PartyType,
  Respondent,
  ServedParty,
  State,
  YesOrNo,
} from './../../../app/case/definition';

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

export const isCaseLinked = (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
  const partyDetails = getPartyDetails(caseData as CaseWithId, userDetails.id);

  return !!(partyDetails && partyDetails.user.idamId === userDetails.id);
};

export const isCaseClosed = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData && [State.CASE_WITHDRAWN, State.CASE_CLOSED].includes(caseData.state!));

export const isDraftCase = (caseData: Partial<CaseWithId>): boolean => {
  return !!(caseData && caseData.state! === State.CASE_DRAFT);
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

// temporary, remove after fl401 tasklist refactored
export const keepDetailsPrivateNav = (caseData: Partial<CaseWithId>, req: AppRequest): PageLink => {
  return req?.session.applicationSettings?.navfromRespondToApplication
    ? RESPOND_TO_APPLICATION
    : (applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData.id }) as PageLink);
};

export const isCafcassServed = (caseData: Partial<CaseWithId>): boolean => caseData?.isCafcassServed === YesOrNo.YES;

export const isCafcassCymruServed = (caseData: Partial<CaseWithId>): boolean => {
  if (
    caseData.finalServedApplicationDetailsList?.length &&
    caseData.finalServedApplicationDetailsList.find(list =>
      list.value.emailNotificationDetails?.find(i => i.value?.servedParty === ServedParty.CYMRU)
    )
  ) {
    return true;
  }
  return false;
};

export const hasResponseBeenReviewed = (caseData: Partial<CaseWithId>, respondent: Respondent): boolean => {
  return !!(
    caseData.citizenDocuments &&
    caseData.citizenDocuments.length &&
    caseData.citizenDocuments.find(
      document =>
        (document.partyId === respondent.id || document.solicitorRepresentedPartyId === respondent.id) &&
        document.categoryId === DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION
    )
  );
};
