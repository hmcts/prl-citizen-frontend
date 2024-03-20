/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../app/case/case';
import { AppRequest, UserDetails } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../../../steps/tasklistresponse/utils';
import { PARTY_TASKLIST, PageLink, RESPONDENT_TASK_LIST_URL, RESPOND_TO_APPLICATION } from '../../../steps/urls';
import { applyParms } from '../url-parser';

import { CaseType, PartyDetails, PartyType, State, YesOrNo } from './../../../app/case/definition';

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
        partyDetails = caseData?.respondents?.find(party => party.value.user.idamId === userDetails.id)?.value;
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
  !!(caseData && caseData?.applicants?.find(applicant => applicant.value.user.idamId === userDetails.id));

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

export const isApplicationResponded = (userCase: Partial<CaseWithId>, userId: string): boolean => {
  if (userCase?.citizenResponseC7DocumentList?.length) {
    return !!userCase.respondents?.find(respondent => {
      if (respondent.value.user.idamId === userId) {
        return userCase.citizenResponseC7DocumentList!.find(
          responseDocument => responseDocument.value.createdBy === respondent.id
        );
      }
    });
  }

  return false;
};

// temporary, remove after fl401 tasklist refactored
export const keepDetailsPrivateNav = (caseData: Partial<CaseWithId>, req: AppRequest): PageLink => {
  const respondentTaskListUrl =
    caseData.caseTypeOfApplication === CaseType.C100
      ? (applyParms(`${PARTY_TASKLIST}`, { partyType: PartyType.RESPONDENT }) as PageLink)
      : RESPONDENT_TASK_LIST_URL;
  return req?.session.applicationSettings?.navfromRespondToApplication ? RESPOND_TO_APPLICATION : respondentTaskListUrl;
};

export const isCafcassServed = (caseData: Partial<CaseWithId>): boolean => {
  let lengthOfServedApplicationDetailsList = 0;
  lengthOfServedApplicationDetailsList = caseData.finalServedApplicationDetailsList?.length as number;
  if (
    lengthOfServedApplicationDetailsList >= 1 &&
    caseData.finalServedApplicationDetailsList?.[
      lengthOfServedApplicationDetailsList - 1
    ].value.emailNotificationDetails?.find(i => i.value?.servedParty === 'cafcass')
  ) {
    /* casfcass serverd code may need to to revisited once SOA cafcass (English court is in place)*/
    return true;
  }
  return false;
};

export const isCafcassCymruServed = (caseData: Partial<CaseWithId>): boolean => {
  let lengthOfServedApplicationDetailsList = 0;
  lengthOfServedApplicationDetailsList = caseData.finalServedApplicationDetailsList?.length as number;
  if (
    lengthOfServedApplicationDetailsList >= 1 &&
    caseData.finalServedApplicationDetailsList?.[
      lengthOfServedApplicationDetailsList - 1
    ].value.emailNotificationDetails?.find(i => i.value?.servedParty === 'Cafcass cymru')
  ) {
    return true;
  }
  return false;
};
