import { PartyDetails } from '../../../../app/case/definition';
import { toApiDate } from '../../../../app/case/to-api-format';
//import { CaseWithId } from '../../../../app/case/case';
import type { AppRequest } from '../../../../app/controller/AppRequest';

export const setContactDetails = (partyDetails: PartyDetails, req: AppRequest): PartyDetails => {
  if (req.session.userCase.applicant1FirstNames) {
    partyDetails.firstName = req.session.userCase.applicant1FirstNames;
  }
  if (req.session.userCase.applicant1LastNames) {
    partyDetails.lastName = req.session.userCase.applicant1LastNames;
  }
  if (req.session.userCase.applicant1AdditionalName) {
    partyDetails.previousName = req.session.userCase.applicant1AdditionalName;
  }
  if (req.session.userCase.applicant1DateOfBirth) {
    partyDetails.dateOfBirth = toApiDate(req.session.userCase.applicant1DateOfBirth);
  }
  if (req.session.userCase.applicant1PlaceOfBirth) {
    partyDetails.placeOfBirth = req.session.userCase.applicant1PlaceOfBirth;
  }
  if (req.session.userCase.applicant1PhoneNumber) {
    partyDetails.phoneNumber = req.session.userCase.applicant1PhoneNumber;
  }
  if (req.session.userCase.applicant1EmailAddress) {
    partyDetails.email = req.session.userCase.applicant1EmailAddress;
  }

  return partyDetails;
};

// export const getKeepYourDetailsPrivate = (partyDetails: PartyDetails, req: AppRequest): Partial<CaseWithId> => {
//   req.session.userCase.detailsKnown = partyDetails.response.keepDetailsPrivate?.otherPeopleKnowYourContactDetails;
//   req.session.userCase.startAlternative = partyDetails.response.keepDetailsPrivate?.confidentiality;
//   const confidentialityList: string[] = [];
//   if (
//     partyDetails.response.keepDetailsPrivate?.confidentiality === YesOrNo.YES &&
//     partyDetails.response.keepDetailsPrivate.confidentialityList
//   ) {
//     partyDetails.response.keepDetailsPrivate.confidentialityList.forEach(element => {
//       confidentialityList.push(ConfidentialityList[element]);
//     });
//     req.session.userCase.contactDetailsPrivate = confidentialityList;
//   }

//   return req.session.userCase;
// };
