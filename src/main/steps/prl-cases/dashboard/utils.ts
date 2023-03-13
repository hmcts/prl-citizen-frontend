import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, YesOrNo } from '../../../app/case/definition';

export const getCasePartyType = (caseData: Partial<CaseWithId>, idamId: string): PartyType => {
  const { caseTypeOfApplication: caseType, caseInvites, respondents, respondentsFL401 } = caseData;
  let partyType = PartyType.APPLICANT; //default to applicant for now to avoid undefined issues
  if (caseType === CaseType.C100) {
    if (
      caseInvites?.find(invities =>
        respondents?.find(
          respondent =>
            respondent.id === invities.value.partyId &&
            respondent.value.user.idamId === invities.value.invitedUserId &&
            respondent.value.user.idamId === idamId
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
        invities.value.invitedUserId === respondentsFL401?.user.idamId
    )
      ? PartyType.RESPONDENT
      : PartyType.APPLICANT;
  }
  return partyType;
};
