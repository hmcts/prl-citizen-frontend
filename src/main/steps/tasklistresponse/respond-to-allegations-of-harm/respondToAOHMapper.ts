/* eslint-disable @typescript-eslint/no-unused-vars*/
import { CaseWithId } from '../../../app/case/case';
import { PartyDetails } from '../../../app/case/definition';

export const prepareRespondToAOHRequest = (userCase: CaseWithId): Partial<PartyDetails['response']> => {
  return {
    responseToAllegationsOfHarmYesOrNoResponse: userCase.aoh_wishToRespond,
    respondentResponseToAllegationOfHarm: userCase.aoh_responseToAllegations,
  };
};

export const mapResponseToAOH = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  return {
    aoh_wishToRespond: partyDetails.response.responseToAllegationsOfHarmYesOrNoResponse,
    aoh_responseToAllegations: partyDetails?.response?.respondentResponseToAllegationOfHarm ?? '',
  };
};
