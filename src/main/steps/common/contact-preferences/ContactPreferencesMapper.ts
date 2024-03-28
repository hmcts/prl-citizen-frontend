/* eslint-disable @typescript-eslint/no-unused-vars*/
import { CaseWithId } from '../../../app/case/case';
import { PartyDetails } from '../../../app/case/definition';

export const prepareContactPreferenceRequest = (
  userCase: CaseWithId
): Record<string, PartyDetails['contactPreferences']> => {
  return {
    contactPreferences: userCase.preferredModeOfContact,
  };
};

export const mapContactPreference = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  return {
    preferredModeOfContact: partyDetails?.contactPreferences,
  };
};
