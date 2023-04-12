/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { PartyDetails, YesOrNo } from '../../../../app/case/definition';
import { fromApiDate } from '../../../../app/case/from-api-format';
import { toApiDate } from '../../../../app/case/to-api-format';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { getFormattedDate } from '../../../common/summary/utils';

// export const setContactDetails = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
//   if (req.session.userCase.citizenUserFirstNames) {
//     partyDetails.firstName = req.session.userCase.citizenUserFirstNames;
//   }
//   if (req.session.userCase.citizenUserLastNames) {
//     partyDetails.lastName = req.session.userCase.citizenUserLastNames;
//   }
//   if (req.session.userCase.citizenUserAdditionalName) {
//     partyDetails.previousName = req.session.userCase.citizenUserAdditionalName;
//   }
//   if (req.session.userCase.citizenUserDateOfBirth) {
//     partyDetails.dateOfBirth = toApiDate(req.session.userCase.citizenUserDateOfBirth);
//   }
//   if (req.session.userCase.citizenUserPlaceOfBirth) {
//     partyDetails.placeOfBirth = req.session.userCase.citizenUserPlaceOfBirth;
//   }
//   if (req.session.userCase.citizenUserPhoneNumber) {
//     partyDetails.phoneNumber = req.session.userCase.citizenUserPhoneNumber;
//   }
//   if (req.session.userCase.citizenUserEmailAddress) {
//     partyDetails.email = req.session.userCase.citizenUserEmailAddress;
//   }
//   if (req.session.userCase.citizenUserSafeToCall) {
//     if (partyDetails.response) {
//       partyDetails.response.safeToCallOption = req.session.userCase.citizenUserSafeToCall;
//     } else {
//       partyDetails.response = {
//         safeToCallOption: req.session.userCase.citizenUserSafeToCall,
//       };
//     }
//   }
//   let postalAddress;
//   if (
//     req.session.userCase.citizenUserAddress1 &&
//     req.session.userCase.citizenUserAddressTown &&
//     req.session.userCase.citizenUserAddressPostcode
//   ) {
//     postalAddress = {
//       AddressLine1: req.session.userCase.citizenUserAddress1,
//       AddressLine2: req.session.userCase.citizenUserAddress2,
//       PostTown: req.session.userCase.citizenUserAddressTown,
//       County: req.session.userCase.citizenUserAddressCounty,
//       PostCode: req.session.userCase.citizenUserAddressPostcode,
//     };
//     partyDetails.address = postalAddress;
//   }

//   if (req.session.userCase.isAtAddressLessThan5Years) {
//     partyDetails.isAtAddressLessThan5Years = req.session.userCase.isAtAddressLessThan5Years;
//     if (
//       req.session.userCase.isAtAddressLessThan5Years === YesOrNo.NO &&
//       req.session.userCase.citizenUserAddressHistory
//     ) {
//       partyDetails.addressLivedLessThan5YearsDetails = req.session.userCase.citizenUserAddressHistory;
//     } else {
//       //delete req.session.userCase.citizenUserAddressHistory
//       partyDetails.addressLivedLessThan5YearsDetails = '';
//     }
//   }
//   return partyDetails;
// };
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
  } = userCase;

  Object.assign(request, {
    lastName: citizenUserLastNames,
    firstName: citizenUserFirstNames,
    dateOfBirth: toApiDate(citizenUserDateOfBirth),
    phoneNumber: citizenUserPhoneNumber,
    placeOfBirth: citizenUserPlaceOfBirth,
    // previousName: !citizenUserAdditionalName ?? "",
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
  });
  //data clean up

  if (!request.response!.safeToCallOption) {
    delete request.response!.safeToCallOption;
  }
  if (isAtAddressLessThan5Years === YesOrNo.YES) {
    request.addressLivedLessThan5YearsDetails = '';
  }
  return request;
};
export const mapRequest = (partyDetails: PartyDetails): Partial<CaseWithId> => {
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
    ...rest
  } = partyDetails;
  let fullName = ' ';
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
    citizenUserSafeToCall: !response?.safeToCallOption ? '' : response?.safeToCallOption,

    isAtAddressLessThan5Years,
    citizenUserAddressHistory: addressLivedLessThan5YearsDetails,

    citizenUserAddress1: address.AddressLine1,
    citizenUserAddress2: address.AddressLine2,
    citizenUserAddressTown: address.PostTown,
    citizenUserAddressCounty: address.County,
    citizenUserAddressPostcode: address.PostCode,
    ...rest,
  });
  if (isAtAddressLessThan5Years === YesOrNo.YES) {
    delete contactDetail.citizenUserAddressHistory;
  }
  return contactDetail;
};

// export function getAddressDetails(partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> {
//   if (partyDetails.address) {
//     if (partyDetails.address.AddressLine1) {
//       req.session.userCase.citizenUserAddress1 = partyDetails.address.AddressLine1;
//     }
//     if (partyDetails.address.AddressLine2) {
//       req.session.userCase.citizenUserAddress2 = partyDetails.address.AddressLine2;
//     }
//     if (partyDetails.address.PostTown) {
//       req.session.userCase.citizenUserAddressTown = partyDetails.address.PostTown;
//     }
//     if (partyDetails.address.County) {
//       req.session.userCase.citizenUserAddressCounty = partyDetails.address.County;
//     }
//     if (partyDetails.address.PostCode) {
//       req.session.userCase.citizenUserAddressPostcode = partyDetails.address.PostCode;
//     }
//   }
//   if(partyDetails.isAtAddressLessThan5Years){
//     req.session.userCase.isAtAddressLessThan5Years=partyDetails.isAtAddressLessThan5Years;
//   }
//   if (partyDetails.addressLivedLessThan5YearsDetails) {
//     req.session.userCase.citizenUserAddressHistory = partyDetails.addressLivedLessThan5YearsDetails;
//   }

//   return req.session.userCase;
// }

// export const getContactDetails = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
//   clearSessionData(req);

//   if (partyDetails.firstName) {
//     req.session.userCase.citizenUserFirstNames = partyDetails.firstName;
//   }
//   if (partyDetails.lastName) {
//     req.session.userCase.citizenUserLastNames = partyDetails.lastName;
//   }
//   if (!req.session.userCase.citizenUserFirstNames || !req.session.userCase.citizenUserLastNames) {
//     req.session.userCase.citizenUserFullName = '';
//   } else {
//     req.session.userCase.citizenUserFullName =
//       req.session.userCase.citizenUserFirstNames + ' ' + req.session.userCase.citizenUserLastNames;
//   }
//   if (partyDetails.placeOfBirth) {
//     req.session.userCase.citizenUserPlaceOfBirth = partyDetails.placeOfBirth;
//   }
//   if (partyDetails.dateOfBirth) {
//     req.session.userCase.citizenUserDateOfBirth = fromApiDate(partyDetails.dateOfBirth);
//   }
//   if (partyDetails.phoneNumber) {
//     req.session.userCase.citizenUserPhoneNumber = partyDetails.phoneNumber;
//   }
//   if (partyDetails.email) {
//     req.session.userCase.citizenUserEmailAddress = partyDetails.email;
//   }
//   if (partyDetails.response && partyDetails.response.safeToCallOption) {
//     req.session.userCase.citizenUserSafeToCall = partyDetails.response.safeToCallOption;
//   }

//   getAddressDetails(partyDetails, req);

//   return req.session.userCase;
// };

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
  if (req.session.userCase.isAtAddressLessThan5Years === YesOrNo.YES) {
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

// function clearSessionData(req: AppRequest) {
//   req.session.userCase.citizenUserFirstNames = '';
//   req.session.userCase.citizenUserLastNames = '';
//   req.session.userCase.citizenUserPlaceOfBirth = '';
//   req.session.userCase.citizenUserDateOfBirth = undefined;
//   req.session.userCase.citizenUserPhoneNumber = '';
//   req.session.userCase.citizenUserEmailAddress = '';
//   req.session.userCase.citizenUserAddress1 = '';
//   req.session.userCase.citizenUserAddress2 = '';
//   req.session.userCase.citizenUserAddressTown = '';
//   req.session.userCase.citizenUserAddressCounty = '';
//   req.session.userCase.citizenUserAddressPostcode = '';
//   req.session.userCase.citizenUserSelectAddress = '';
//   req.session.userCase.isAtAddressLessThan5Years = '';
//   req.session.userCase.citizenUserAddressHistory = '';
//   req.session.userCase.citizenUserSafeToCall = '';
// }
// export const mapText = (req: AppRequest):Partial<CaseWithId> => {
//   let detail = {};
//   let {
//     citizenUserFirstNames,
//     citizenUserLastNames,
//     citizenUserDateOfBirth,
//     citizenUserPlaceOfBirth,
//     citizenUserPhoneNumber,
//     citizenUserEmailAddress,
//     citizenUserAddress1,
//     citizenUserAddress2,
//     citizenUserAddressTown,
//     citizenUserAddressPostcode,
//     isAtAddressLessThan5Years,
//     citizenUserAddressHistory,
//     ...rest
//   } = req.session.userCase;
//   let fullName= "" ;
//   if (!citizenUserFirstNames || !citizenUserLastNames) {
//     fullName = '';
//   } else {
//     fullName =citizenUserLastNames+ " "+citizenUserLastNames

//   }
//   let citizenUserAddressText=""
//   if(!req.session.userCase.citizenUserAddress1 &&
//     !req.session.userCase.citizenUserAddressTown &&
//     !req.session.userCase.citizenUserAddressPostcode){
//       citizenUserAddressText=""
//     }else{
//      citizenUserAddressText = citizenUserAddress1 + ' ';
//     if (citizenUserAddress2) {
//       citizenUserAddressText =
//         citizenUserAddressText + citizenUserAddress2 + ' ';
//     }
//     if (citizenUserAddressTown) {
//       citizenUserAddressText =
//         citizenUserAddressText + citizenUserAddressTown + ' ';
//     }
//     if (citizenUserAddressPostcode) {
//       citizenUserAddressText =
//         citizenUserAddressText + citizenUserAddressPostcode;
//     }
//   }
//   if (YesOrNo.YES === isAtAddressLessThan5Years) {
//     citizenUserAddressHistory = '';
//   }

//   Object.assign(detail,
//     {
//    citizenUserFullName: fullName,
//    citizenUserDateOfBirth:(!citizenUserDateOfBirth?"":getFormattedDate(citizenUserDateOfBirth)),
//    citizenUserPhoneNumber:(!citizenUserPhoneNumber?"":citizenUserPhoneNumber),
//    citizenUserPlaceOfBirth:(!citizenUserPlaceOfBirth?"":citizenUserPlaceOfBirth),
//    citizenUserEmailAddress:(!citizenUserEmailAddress?"":citizenUserEmailAddress),
//    citizenUserAddressText:citizenUserAddressText,
//    isAtAddressLessThan5Years:isAtAddressLessThan5Years,
//    citizenUserAddressHistory:citizenUserAddressHistory,
//    ...rest
//   });

//   return detail;
// }
