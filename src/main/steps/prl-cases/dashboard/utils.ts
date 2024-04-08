import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, YesOrNo } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';

export const getCasePartyType = (caseData: Partial<CaseWithId>, userId: string): PartyType => {
  const { caseTypeOfApplication: caseType, caseInvites, respondents, respondentsFL401 } = caseData;
  let partyType = PartyType.APPLICANT; //default to applicant for now to avoid undefined issues
  if (caseType === CaseType.C100) {
    if (
      caseInvites?.find(invities =>
        respondents?.find(
          respondent =>
            respondent.id === invities.value.partyId &&
            respondent.value.user.idamId === invities.value.invitedUserId &&
            respondent.value.user.idamId === userId
        )
      )
    ) {
      partyType = PartyType.RESPONDENT;
    }
  } else {
    return caseInvites?.find(
      invities =>
        invities.value.isApplicant === YesOrNo.NO &&
        invities.value.invitedUserId &&
        invities.value.invitedUserId === respondentsFL401?.user.idamId &&
        respondentsFL401?.user?.idamId === userId
    )
      ? PartyType.RESPONDENT
      : PartyType.APPLICANT;
  }
  return partyType;
};

export const getCurrentPartyId = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  partyType: PartyType
): string | undefined => {
  const { caseTypeOfApplication: caseType, caseInvites } = caseData;
  if (caseType === CaseType.C100) {
    return partyType === PartyType.RESPONDENT
      ? caseInvites?.find(invites =>
          caseData.respondents?.find(
            respondent => respondent.id === invites.value.partyId && userDetails.id === invites.value.invitedUserId
          )
        )?.value.partyId
      : caseInvites?.find(invites =>
          caseData.applicants?.find(
            applicant => applicant.id === invites.value.partyId && userDetails.id === invites.value.invitedUserId
          )
        )?.value.partyId;
  } else {
    return partyType === PartyType.RESPONDENT
      ? caseInvites?.find(
          invites =>
            invites.value.invitedUserId === caseData.respondentsFL401?.user.idamId &&
            caseData.respondentsFL401?.user?.idamId === userDetails.id
        )?.value.partyId
      : caseInvites?.find(
          invites =>
            invites.value.invitedUserId === caseData.applicantsFL401?.user.idamId &&
            caseData.applicantsFL401?.user?.idamId === userDetails.id
        )?.value.partyId;
  }
};
