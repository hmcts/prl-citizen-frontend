import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, YesOrNo } from '../../../app/case/definition';

export const getCasePartyType = (caseData: Partial<CaseWithId>): PartyType => {
  const { caseTypeOfApplication: caseType, caseInvites, respondents, respondentsFL401 } = caseData;

  if (caseType === CaseType.C100) {
    return caseInvites?.find(invities => respondents?.find(respondent => respondent.id === invities.value.partyId))
      ? PartyType.RESPONDENT
      : PartyType.APPLICANT;
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
};
