import { CaseWithId } from '../../../app/case/case';
import { Respondent } from '../../../app/case/definition';

export const getRespondentPartyDetailsCa = (userCase: Partial<CaseWithId>, userId: string): Respondent | undefined => {
  for (const respondent of userCase.respondents!) {
    if (respondent.value.user.idamId === userId) {
      return respondent;
    }
  }
  return undefined;
};
