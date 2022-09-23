import { CaseWithId } from '../../../../app/case/case';
import { PartyDetails } from '../../../../app/case/definition';
import { fromApiDate } from '../../../../app/case/from-api-format';
import { toApiDate } from '../../../../app/case/to-api-format';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { getFormattedDate } from '../../../common/summary/utils';

export const setContactDetails = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  if (req.session.userCase.citizenUserFirstNames) {
    partyDetails.firstName = req.session.userCase.citizenUserFirstNames;
  }
  if (req.session.userCase.citizenUserLastNames) {
    partyDetails.lastName = req.session.userCase.citizenUserLastNames;
  }
  if (req.session.userCase.citizenUserAdditionalName) {
    partyDetails.previousName = req.session.userCase.citizenUserAdditionalName;
  }
  if (req.session.userCase.citizenUserDateOfBirth) {
    partyDetails.dateOfBirth = toApiDate(req.session.userCase.citizenUserDateOfBirth);
  }
  if (req.session.userCase.citizenUserPlaceOfBirth) {
    partyDetails.placeOfBirth = req.session.userCase.citizenUserPlaceOfBirth;
  }
  if (req.session.userCase.citizenUserPhoneNumber) {
    partyDetails.phoneNumber = req.session.userCase.citizenUserPhoneNumber;
  }
  if (req.session.userCase.citizenUserEmailAddress) {
    partyDetails.email = req.session.userCase.citizenUserEmailAddress;
  }

  return partyDetails;
};

export const getContactDetails = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  if (partyDetails.firstName) {
    req.session.userCase.citizenUserFirstNames = partyDetails.firstName;
  }
  if (partyDetails.lastName) {
    req.session.userCase.citizenUserLastNames = partyDetails.lastName;
  }
  if (!req.session.userCase.citizenUserFirstNames || !req.session.userCase.citizenUserLastNames) {
    req.session.userCase.citizenUserFullName = '';
  } else {
    req.session.userCase.citizenUserFullName =
      req.session.userCase.citizenUserFirstNames + ' ' + req.session.userCase.citizenUserLastNames;
  }
  if (partyDetails.placeOfBirth) {
    req.session.userCase.citizenUserPlaceOfBirth = partyDetails.placeOfBirth;
  }
  if (partyDetails.dateOfBirth) {
    req.session.userCase.citizenUserDateOfBirth = fromApiDate(partyDetails.dateOfBirth);
  }
  if (partyDetails.phoneNumber) {
    req.session.userCase.citizenUserPhoneNumber = partyDetails.phoneNumber;
  }
  if (partyDetails.email) {
    req.session.userCase.citizenUserEmailAddress = partyDetails.email;
  }
  return req.session.userCase;
};

export const setTextFields = (req: AppRequest): Partial<CaseWithId> => {
  if (!req.session.userCase.citizenUserPlaceOfBirth) {
    req.session.userCase.citizenUserPlaceOfBirthText = '';
  } else {
    req.session.userCase.citizenUserPlaceOfBirthText = req.session.userCase.citizenUserPlaceOfBirth;
  }
  if (!req.session.userCase.citizenUserDateOfBirth) {
    req.session.userCase.citizenUserDateOfBirthText = '';
  } else {
    req.session.userCase.citizenUserDateOfBirthText = getFormattedDate(req.session.userCase.citizenUserDateOfBirth);
  }
  if (!req.session.userCase.citizenUserPhoneNumber) {
    req.session.userCase.citizenUserPhoneNumberText = '';
  } else {
    req.session.userCase.citizenUserPhoneNumberText = req.session.userCase.citizenUserPhoneNumber;
  }
  if (!req.session.userCase.citizenUserEmailAddress) {
    req.session.userCase.citizenUserEmailAddressText = '';
  } else {
    req.session.userCase.citizenUserEmailAddressText = req.session.userCase.citizenUserEmailAddress;
  }

  return req.session.userCase;
};
