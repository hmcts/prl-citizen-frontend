import { CaseWithId } from '../../../app/case/case';
import { PartyDetails, PreferredContact } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';

export const setContactPreferences = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  let applicantPreferredContact: PreferredContact;

  if (partyDetails.response && partyDetails.response?.applicantPreferredContact) {
    applicantPreferredContact = partyDetails.response?.applicantPreferredContact;
    applicantPreferredContact.email = req.session.userCase.applicantPreferredContact;
    applicantPreferredContact.phone = req.session.userCase.applicantPreferredContact;
  } else {
    partyDetails.response = {
      applicantPreferredContact: {
        phone: req.session.userCase.applicantPreferredContact!,
        email: req.session.userCase.applicantPreferredContact!,
      },
    };
  }
  return partyDetails;
};

export const getContactPreferences = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  req.session.userCase.applicantPreferredContact = partyDetails.response!.applicantPreferredContact as string;

  return req.session.userCase;
};
