import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyDetails } from '../../../app/case/definition';

import { getRespondentPartyDetailsCa } from './utils';

export const getRespondent = (userCase: Partial<CaseWithId>, userId: string): PartyDetails | undefined => {
  if (userCase && userCase.caseTypeOfApplication === CaseType.C100) {
    const respondent = getRespondentPartyDetailsCa(userCase, userId);
    return respondent?.value;
  } else {
    return userCase?.respondentsFL401;
  }
};

export const getRespondentName = (respondent: PartyDetails | undefined): string => {
  return respondent ? respondent.firstName + ' ' + respondent.lastName : '';
};
