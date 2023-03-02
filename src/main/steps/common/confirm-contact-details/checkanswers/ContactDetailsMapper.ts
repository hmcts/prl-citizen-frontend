/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../app/case/case';
import { PartyDetails, YesOrNo } from '../../../../app/case/definition';
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
  if (req.session.userCase.citizenUserSafeToCall) {
    if (partyDetails.response) {
      partyDetails.response.safeToCallOption = req.session.userCase.citizenUserSafeToCall;
    } else {
      partyDetails.response = {
        safeToCallOption: req.session.userCase.citizenUserSafeToCall,
      };
    }
  }
  let postalAddress;
  if (
    req.session.userCase.citizenUserAddress1 &&
    req.session.userCase.citizenUserAddressTown &&
    req.session.userCase.citizenUserAddressPostcode
  ) {
    postalAddress = {
      AddressLine1: req.session.userCase.citizenUserAddress1,
      AddressLine2: req.session.userCase.citizenUserAddress2,
      PostTown: req.session.userCase.citizenUserAddressTown,
      County: req.session.userCase.citizenUserAddressCounty,
      PostCode: req.session.userCase.citizenUserAddressPostcode,
    };
    partyDetails.address = postalAddress;
  }

  if (req.session.userCase.isAtAddressLessThan5Years) {
    partyDetails.isAtAddressLessThan5Years = req.session.userCase.isAtAddressLessThan5Years;
    if (
      req.session.userCase.isAtAddressLessThan5Years === YesOrNo.NO &&
      req.session.userCase.citizenUserAddressHistory
    ) {
      partyDetails.addressLivedLessThan5YearsDetails = req.session.userCase.citizenUserAddressHistory;
    } else {
      partyDetails.addressLivedLessThan5YearsDetails = '';
    }
  }

  return partyDetails;
};

export function getAddressDetails(partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> {
  if (partyDetails.address) {
    if (partyDetails.address.AddressLine1) {
      req.session.userCase.citizenUserAddress1 = partyDetails.address.AddressLine1;
    }
    if (partyDetails.address.AddressLine2) {
      req.session.userCase.citizenUserAddress2 = partyDetails.address.AddressLine2;
    }
    if (partyDetails.address.PostTown) {
      req.session.userCase.citizenUserAddressTown = partyDetails.address.PostTown;
    }
    if (partyDetails.address.County) {
      req.session.userCase.citizenUserAddressCounty = partyDetails.address.County;
    }
    if (partyDetails.address.PostCode) {
      req.session.userCase.citizenUserAddressPostcode = partyDetails.address.PostCode;
    }
  }
  if (partyDetails.addressLivedLessThan5YearsDetails) {
    req.session.userCase.citizenUserAddressHistory = partyDetails.addressLivedLessThan5YearsDetails;
  }

  return req.session.userCase;
}

export const getContactDetails = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
  clearSessionData(req);

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

  if (partyDetails.response && partyDetails.response.safeToCallOption) {
    req.session.userCase.citizenUserSafeToCall = partyDetails.response.safeToCallOption;
  }

  getAddressDetails(partyDetails, req);

  return req.session.userCase;
};

export function setAddressFields(req: AppRequest): Partial<CaseWithId> {
  if (
    !req.session.userCase.citizenUserAddress1 &&
    !req.session.userCase.citizenUserAddressTown &&
    !req.session.userCase.citizenUserAddressPostcode
  ) {
    req.session.userCase.citizenUserAddressText = '';
  } else {
    req.session.userCase.citizenUserAddressText = req.session.userCase.citizenUserAddress1 + ' ';
    if (req.session.userCase.citizenUserAddress2) {
      req.session.userCase.citizenUserAddressText =
        req.session.userCase.citizenUserAddressText + req.session.userCase.citizenUserAddress2 + ' ';
    }
    if (req.session.userCase.citizenUserAddressTown) {
      req.session.userCase.citizenUserAddressText =
        req.session.userCase.citizenUserAddressText + req.session.userCase.citizenUserAddressTown + ' ';
    }
    if (req.session.userCase.citizenUserAddressPostcode) {
      req.session.userCase.citizenUserAddressText =
        req.session.userCase.citizenUserAddressText + req.session.userCase.citizenUserAddressPostcode;
    }
  }
  if (YesOrNo.YES === req.session.userCase.isAtAddressLessThan5Years) {
    req.session.userCase.citizenUserAddressHistory = '';
  }

  return req.session.userCase;
}

export const setTextFields = (req: AppRequest): Partial<CaseWithId> => {
  if (req.session.userCase.citizenUserFirstNames && req.session.userCase.citizenUserLastNames) {
    req.session.userCase.citizenUserFullName =
      req.session.userCase.citizenUserFirstNames + ' ' + req.session.userCase.citizenUserLastNames;
  }
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
  setAddressFields(req);
  return req.session.userCase;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setAddressFieldsForApplicant(foundApplicant, req) {
  const { address } = foundApplicant;
  let applicantAddress = '';
  address['AddressLine1'] !== null ? (applicantAddress += address['AddressLine1'] + ', ') : '';
  req.session.userCase.citizenUserAddress1 = address['AddressLine1'];
  address['AddressLine2'] !== null ? (applicantAddress += address['AddressLine2'] + ', ') : '';
  req.session.userCase.citizenUserAddress2 = address['AddressLine2'];

  address['AddressLine3'] !== null ? (applicantAddress += address['AddressLine3'] + ', ') : '';
  address['County'] !== null ? (applicantAddress += address['County'] + ', ') : '';
  req.session.userCase.citizenUserAddressCounty = address['County'];
  address['PostTown'] !== null ? (applicantAddress += address['PostTown'] + ', ') : '';
  req.session.userCase.citizenUserAddressPostcode = address['PostTown'];
  address['Country'] !== null ? (applicantAddress += address['Country'] + ', ') : '';
  //req.session.userCase.citizenUserAddressPostcode = address['PostTown'];
  address['PostCode'] !== null ? (applicantAddress += address['PostCode'] + '.') : '';
  req.session.userCase.citizenUserAddressPostcode = address['PostCode'];

  if (foundApplicant['isAtAddressLessThan5Years'] === YesOrNo.YES) {
    req.session.userCase.citizenUserAddressHistory = '';
  } else {
    req.session.userCase.citizenUserAddressHistory = foundApplicant['addressLivedLessThan5YearsDetails'];
  }
  req.session.userCase.isAtAddressLessThan5Years = foundApplicant['isAtAddressLessThan5Years'];
  req.session.userCase.citizenUserAddressText = applicantAddress;
  return req.session.userCase;
}

export const setTextFieldsForApplicant = (req: AppRequest): Partial<CaseWithId> => {
  const foundApplicant = req.session.userCase?.applicants?.filter(
    applicant => applicant.value.user.idamId === req.session.user.id
  )?.[0]?.value;
  if (foundApplicant) {
    if (foundApplicant.firstName && foundApplicant.lastName) {
      req.session.userCase.citizenUserFullName = foundApplicant.firstName + ' ' + foundApplicant.lastName;
      req.session.userCase.citizenUserFirstNames = foundApplicant.firstName;
      req.session.userCase.citizenUserLastNames = foundApplicant.lastName;
    }
    if (foundApplicant.placeOfBirth) {
      req.session.userCase.citizenUserPlaceOfBirthText = foundApplicant.placeOfBirth;
      req.session.userCase.citizenUserPlaceOfBirth = foundApplicant.placeOfBirth;
    }
    if (foundApplicant.dateOfBirth) {
      const parsedDate = foundApplicant['dateOfBirth'].split('-');
      const date = new Date(Number(parsedDate[0]), Number(parsedDate[1]), Number(parsedDate[2]));
      req.session.userCase.citizenUserDateOfBirthText = date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      req.session.userCase.citizenUserDateOfBirth = {
        year: parsedDate[0],
        month: parsedDate[1],
        day: parsedDate[2],
      };
    }
    if (foundApplicant.phoneNumber) {
      req.session.userCase.citizenUserPhoneNumberText = foundApplicant.phoneNumber;
      req.session.userCase.citizenUserPhoneNumber = foundApplicant.phoneNumber;
    }
    if (foundApplicant.email) {
      req.session.userCase.citizenUserEmailAddressText = foundApplicant.email;
      req.session.userCase.citizenUserEmailAddress = foundApplicant.email;
    }

    setAddressFieldsForApplicant(foundApplicant, req);
  }
  return req.session.userCase;
};

function clearSessionData(req: AppRequest) {
  req.session.userCase.citizenUserFirstNames = '';
  req.session.userCase.citizenUserLastNames = '';
  req.session.userCase.citizenUserPlaceOfBirth = '';
  req.session.userCase.citizenUserDateOfBirth = undefined;
  req.session.userCase.citizenUserPhoneNumber = '';
  req.session.userCase.citizenUserEmailAddress = '';
  req.session.userCase.citizenUserAddress1 = '';
  req.session.userCase.citizenUserAddress2 = '';
  req.session.userCase.citizenUserAddressTown = '';
  req.session.userCase.citizenUserAddressCounty = '';
  req.session.userCase.citizenUserAddressPostcode = '';
  req.session.userCase.citizenUserSelectAddress = '';
  req.session.userCase.isAtAddressLessThan5Years = '';
  req.session.userCase.citizenUserAddressHistory = '';
  req.session.userCase.citizenUserSafeToCall = '';
}
