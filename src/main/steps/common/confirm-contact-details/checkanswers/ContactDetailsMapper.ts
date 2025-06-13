/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

import { CaseWithId } from '../../../../app/case/case';
import { ContactPreference, PartyDetails, YesOrNo } from '../../../../app/case/definition';
import { fromApiDate } from '../../../../app/case/from-api-format';
import { toApiDate } from '../../../../app/case/to-api-format';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { getFormattedDate } from '../../../common/summary/utils';

export const prepareRequest = (userCase: CaseWithId): Partial<PartyDetails> => {
  const request: Partial<PartyDetails> = {};

  const {
    citizenUserFirstNames,
    citizenUserLastNames,
    citizenUserAdditionalName,
    citizenUserDateOfBirth,
    citizenUserPlaceOfBirth,
    citizenUserPhoneNumber,
    citizenUserEmailAddress,
    citizenUserSafeToCall,
    citizenUserAddress1,
    citizenUserAddress2,
    citizenUserAddressTown,
    citizenUserAddressCounty,
    citizenUserAddressPostcode,
    isAtAddressLessThan5Years,
    citizenUserAddressHistory,
    isCitizenLivingInRefuge,
    refugeDocument,
  } = userCase;

  Object.assign(request, {
    lastName: citizenUserLastNames,
    firstName: citizenUserFirstNames,
    dateOfBirth: toApiDate(citizenUserDateOfBirth),
    phoneNumber: citizenUserPhoneNumber,
    placeOfBirth: citizenUserPlaceOfBirth,
    previousName: citizenUserAdditionalName,
    email: citizenUserEmailAddress,
    response: {
      safeToCallOption: citizenUserSafeToCall,
    },
    isAtAddressLessThan5Years,
    addressLivedLessThan5YearsDetails: citizenUserAddressHistory,
    address: {
      AddressLine1: citizenUserAddress1,
      AddressLine2: citizenUserAddress2,
      PostTown: citizenUserAddressTown,
      County: citizenUserAddressCounty,
      PostCode: citizenUserAddressPostcode,
    },
    liveInRefuge: isCitizenLivingInRefuge,
    refugeConfidentialityC8Form: refugeDocument,
  });
  //data clean up

  if (isAtAddressLessThan5Years === YesOrNo.NO) {
    request.addressLivedLessThan5YearsDetails = '';
  }

  if (isCitizenLivingInRefuge === YesOrNo.NO) {
    request.refugeConfidentialityC8Form = null;
  }

  if (userCase.partyContactPreference) {
    if (userCase.partyContactPreference === ContactPreference.EMAIL && !request?.email?.trim()) {
      request.contactPreferences = null;
    }
    if (userCase.partyContactPreference === ContactPreference.POST && !request?.address?.AddressLine1?.trim()) {
      request.contactPreferences = null;
    }
  }

  return request;
};
export const mapConfirmContactDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const contactDetail: Partial<CaseWithId> = {};
  const {
    lastName,
    firstName,
    dateOfBirth,
    phoneNumber,
    placeOfBirth,
    previousName,
    email,
    response,
    isAtAddressLessThan5Years,
    addressLivedLessThan5YearsDetails,
    address,
    liveInRefuge,
    refugeConfidentialityC8Form,
    ...rest
  } = partyDetails;
  let fullName;
  if (!firstName || !lastName) {
    fullName = '';
  } else {
    fullName = firstName + ' ' + lastName;
  }
  Object.assign(contactDetail, {
    citizenUserLastNames: lastName,
    citizenUserFirstNames: firstName,
    citizenUserFullName: fullName,
    citizenUserDateOfBirth: fromApiDate(dateOfBirth),
    citizenUserPhoneNumber: phoneNumber,
    citizenUserPlaceOfBirth: placeOfBirth,
    citizenUserAdditionalName: previousName,
    citizenUserEmailAddress: email,
    citizenUserSelectAddress: '',
    citizenUserSafeToCall: response?.safeToCallOption ?? '',
    isAtAddressLessThan5Years,
    citizenUserAddressHistory: addressLivedLessThan5YearsDetails,

    citizenUserAddress1: address.AddressLine1,
    citizenUserAddress2: address.AddressLine2,
    citizenUserAddressTown: address.PostTown,
    citizenUserAddressCounty: address.County,
    citizenUserAddressPostcode: address.PostCode,
    isCitizenLivingInRefuge: liveInRefuge,
    refugeDocument: refugeConfidentialityC8Form,
    ...rest,
  });
  if (isAtAddressLessThan5Years === YesOrNo.NO) {
    delete contactDetail.citizenUserAddressHistory;
  }
  if (liveInRefuge === YesOrNo.NO) {
    delete contactDetail.refugeDocument;
  }
  return contactDetail;
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

  if (req.session.userCase.isAtAddressLessThan5Years === YesOrNo.NO) {
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
  if (!req.session.userCase.isCitizenLivingInRefuge) {
    req.session.userCase.citizenUserLivingInRefugeText = '';
  } else {
    req.session.userCase.citizenUserLivingInRefugeText = req.session.userCase.isCitizenLivingInRefuge;
  }

  req.session.userCase.refugeDocumentText = !_.isEmpty(req.session.userCase.refugeDocument)
    ? req.session.userCase.refugeDocument.document_filename
    : '';

  if (req.session.userCase.isCitizenLivingInRefuge === YesOrNo.NO) {
    delete req.session.userCase.refugeDocument;
    delete req.session.userCase.refugeDocumentText;
  }

  setAddressFields(req);
  return req.session.userCase;
};
