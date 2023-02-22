import { CaseWithId } from '../../../app/case/case';
import { PartyDetails, applicantContactPreferencesEnum } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setContactPreferences = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  let applicantPreferredContact: applicantContactPreferencesEnum;

  if (partyDetails.response && partyDetails.response?.applicantPreferredContact) {
    applicantPreferredContact = partyDetails.response?.applicantPreferredContact;
    console.log('applicantPreferredContact =>=>=>', applicantPreferredContact);
    applicantPreferredContact = req.session.userCase.applicantPreferredContact!;
  } else {
    partyDetails.response = {
      applicantPreferredContact: req.session.userCase.applicantPreferredContact!,
    };
  }
  console.log('partyDetails =>', partyDetails);
  return partyDetails;
};

export const getContactPreferences = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  req.session.userCase.applicantPreferredContact = partyDetails.response!.applicantPreferredContact;

  return req.session.userCase;
};
