import { CaseWithId } from '../../../app/case/case';

import { Respondent } from '../../../app/case/definition';

export const getRespondentPartyDetailsCa = (userCase: Partial<CaseWithId>, userId: string): Respondent | undefined => {
  for (let i = 0; i < userCase.respondents!.length; i++) {
    if (userCase.respondents![i].value.user.idamId === userId) {
      return userCase.respondents![i];
    }
  }
  return undefined;
};
