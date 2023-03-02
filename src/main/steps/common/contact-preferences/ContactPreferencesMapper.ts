/* eslint-disable @typescript-eslint/no-unused-vars*/
import { CaseWithId } from '../../../app/case/case';
import { PartyDetails } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setContactPreferences = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  if (partyDetails?.response && partyDetails?.contactPreferences) {
    partyDetails.contactPreferences = req.body.applicantPreferredContact!;
    partyDetails.response = {
      contactPreferences: req.body.applicantPreferredContact!,
    };
  }
  return partyDetails;
};

export const getContactPreferences = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  req.session.userCase.applicantPreferredContact = partyDetails.contactPreferences;
  req.session.userCase.applicantPreferredContact = partyDetails.response.contactPreferences;

  return partyDetails;
};
