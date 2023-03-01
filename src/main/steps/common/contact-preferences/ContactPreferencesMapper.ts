/* eslint-disable @typescript-eslint/no-unused-vars*/
import { CaseWithId } from '../../../app/case/case';
import { PartyDetails } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setContactPreferences = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  console.log('from setContactPreferences - req', req.session.userCase.applicantPreferredContact);
  console.log('partyDetails.response?.applicantPreferredContact ->', partyDetails.response?.applicantPreferredContact);

  console.log('req.body.applicantPreferredContact =>', req.body.applicantPreferredContact);

  if (partyDetails?.response && partyDetails?.contactPreferences) {
    partyDetails.contactPreferences = req.body.applicantPreferredContact!;
    partyDetails.response = {
      contactPreferences: req.body.applicantPreferredContact!,
    };
    console.log('partyDetails.response -> ', partyDetails.response);
  }

  console.log('partyDetails =>', partyDetails);
  return partyDetails;
};

export const getContactPreferences = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  console.log('partyDetails.contactPreferences', partyDetails.contactPreferences);
  // req.session.userCase.applicantPreferredContact = partyDetails.response.contactPreferences;
  req.session.userCase.applicantPreferredContact = partyDetails.contactPreferences;
  req.session.userCase.applicantPreferredContact = partyDetails.response.contactPreferences;
  console.log('req from getContactPreferences ->', req.session.userCase);

  console.log('partyDetails from getContactPreferences ->->->', partyDetails);
  // return req.session.userCase;
  return partyDetails;
};
