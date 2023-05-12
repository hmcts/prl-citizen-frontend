import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import { fromApiDate } from '../../../app/case/from-api-format';

export function populateSummaryData(
  userCase: Partial<import('../../../app/case/case').CaseWithId> | undefined,
  userIdamId: string | undefined
): void {
  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (userIdamId === respondent.value.user.idamId) {
      /* Keep detais private */
      userCase.detailsKnown = respondent.value.response.keepDetailsPrivate?.otherPeopleKnowYourContactDetails;
      userCase.startAlternative = respondent.value.response.keepDetailsPrivate?.confidentiality;
      userCase.contactDetailsPrivate = respondent.value.response.keepDetailsPrivate?.confidentialityList;
      /** consent to application */
      if (respondent?.value?.response?.consent?.consentToTheApplication === YesOrNo.NO) {
        userCase.doYouConsent = YesOrNo.NO;
        userCase.reasonForNotConsenting = respondent?.value?.response?.consent.noConsentReason;
      } else {
        userCase.doYouConsent = YesOrNo.YES;
        userCase.reasonForNotConsenting = '';
      }
      if (respondent?.value?.response?.consent?.permissionFromCourt === YesOrNo.NO) {
        userCase.courtPermission = YesOrNo.NO;
        userCase.courtOrderDetails = '';
      } else {
        userCase.courtPermission = YesOrNo.YES;
        userCase.courtOrderDetails = respondent?.value?.response?.consent?.courtOrderDetails;
      }
      userCase.applicationReceivedDate = fromApiDate(respondent?.value?.response?.consent?.applicationReceivedDate);

      /** Miam */
      if (respondent?.value?.response?.miam?.attendedMiam === YesOrNo.YES) {
        userCase.miamStart = YesOrNo.YES;
        userCase.miamWillingness = YesOrNo.NO;
        userCase.miamNotWillingExplnation = '';
      } else if (respondent?.value?.response?.miam?.attendedMiam === YesOrNo.NO) {
        if (respondent?.value?.response?.miam?.willingToAttendMiam === YesOrNo.YES) {
          userCase.miamStart = YesOrNo.NO;
          userCase.miamWillingness = YesOrNo.YES;
          userCase.miamNotWillingExplnation = '';
        } else if (respondent?.value?.response?.miam?.willingToAttendMiam === YesOrNo.NO) {
          userCase.miamStart = YesOrNo.NO;
          userCase.miamWillingness = YesOrNo.NO;
          userCase.miamNotWillingExplnation = respondent?.value?.response?.miam?.reasonNotAttendingMiam;
        }
      }

      /** International Elements */

      if (respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.NO) {
        userCase.start = YesOrNo.NO;
        userCase.iFactorsStartProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.YES) {
        userCase.start = YesOrNo.YES;
        userCase.iFactorsStartProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.childrenLiveOutsideOfEnWlDetails;
      }
      if (respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO) {
        userCase.parents = YesOrNo.NO;
        userCase.iFactorsParentsProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES) {
        userCase.parents = YesOrNo.YES;
        userCase.iFactorsParentsProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.parentsAnyOneLiveOutsideEnWlDetails;
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.NO) {
        userCase.jurisdiction = YesOrNo.NO;
        userCase.iFactorsJurisdictionProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.YES) {
        userCase.jurisdiction = YesOrNo.YES;
        userCase.iFactorsJurisdictionProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.anotherPersonOrderOutsideEnWlDetails;
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformation === YesOrNo.NO) {
        userCase.request = YesOrNo.NO;
        userCase.iFactorsRequestProvideDetails = '';
      }
      if (respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformation === YesOrNo.YES) {
        userCase.request = YesOrNo.YES;
        userCase.iFactorsRequestProvideDetails =
          respondent?.value?.response?.citizenInternationalElements?.anotherCountryAskedInformationDetaails;
      }

      /** Confirm your details*/
      if (respondent?.value?.firstName) {
        userCase.citizenUserFirstNames = respondent?.value?.firstName;
      }
      if (respondent?.value?.lastName) {
        userCase.citizenUserLastNames = respondent?.value?.lastName;
      }
      if (!userCase.citizenUserFirstNames || !userCase.citizenUserLastNames) {
        userCase.citizenUserFullName = '';
      } else {
        userCase.citizenUserFullName = userCase.citizenUserFirstNames + ' ' + userCase.citizenUserLastNames;
      }
      if (respondent?.value?.placeOfBirth) {
        userCase.citizenUserPlaceOfBirth = respondent?.value?.placeOfBirth;
      }
      if (respondent?.value?.dateOfBirth) {
        userCase.citizenUserDateOfBirth = fromApiDate(respondent?.value?.dateOfBirth);
      }
      if (respondent?.value?.phoneNumber) {
        userCase.citizenUserPhoneNumber = respondent?.value?.phoneNumber;
      }
      if (respondent?.value?.email) {
        userCase.citizenUserEmailAddress = respondent?.value?.email;
      }

      if (!userCase.citizenUserPlaceOfBirth) {
        userCase.citizenUserPlaceOfBirthText = '';
      } else {
        userCase.citizenUserPlaceOfBirthText = userCase.citizenUserPlaceOfBirth;
      }
      if (!userCase.citizenUserDateOfBirth) {
        userCase.citizenUserDateOfBirthText = '';
      } else {
        userCase.citizenUserDateOfBirthText = getFormattedDate(userCase.citizenUserDateOfBirth);
      }
      if (!userCase.citizenUserPhoneNumber) {
        userCase.citizenUserPhoneNumberText = '';
      } else {
        userCase.citizenUserPhoneNumberText = userCase.citizenUserPhoneNumber;
      }
      if (!userCase.citizenUserEmailAddress) {
        userCase.citizenUserEmailAddressText = '';
      } else {
        userCase.citizenUserEmailAddressText = userCase.citizenUserEmailAddress;
      }

      if (respondent?.value.address) {
        if (respondent?.value.address.AddressLine1) {
          userCase.citizenUserAddress1 = respondent?.value.address.AddressLine1;
        }
        if (respondent?.value.address.AddressLine2) {
          userCase.citizenUserAddress2 = respondent?.value.address.AddressLine2;
        }
        if (respondent?.value.address.PostTown) {
          userCase.citizenUserAddressTown = respondent?.value.address.PostTown;
        }
        if (respondent?.value.address.County) {
          userCase.citizenUserAddressCounty = respondent?.value.address.County;
        }
        if (respondent?.value.address.PostCode) {
          userCase.citizenUserAddressPostcode = respondent?.value.address.PostCode;
        }
      }
      if (respondent?.value.addressLivedLessThan5YearsDetails) {
        userCase.citizenUserAddressHistory = respondent?.value.addressLivedLessThan5YearsDetails;
      }

      if (!userCase.citizenUserAddress1 && !userCase.citizenUserAddressTown && !userCase.citizenUserAddressPostcode) {
        userCase.citizenUserAddressText = '';
      } else {
        userCase.citizenUserAddressText = userCase.citizenUserAddress1 + ' ';
        if (userCase.citizenUserAddress2) {
          userCase.citizenUserAddressText = userCase.citizenUserAddressText + userCase.citizenUserAddress2 + ' ';
        }
        if (userCase.citizenUserAddressTown) {
          userCase.citizenUserAddressText = userCase.citizenUserAddressText + userCase.citizenUserAddressTown + ' ';
        }
        if (userCase.citizenUserAddressPostcode) {
          userCase.citizenUserAddressText = userCase.citizenUserAddressText + userCase.citizenUserAddressPostcode;
        }
      }
      if (YesOrNo.YES === userCase.isAtAddressLessThan5Years) {
        userCase.citizenUserAddressHistory = '';
      }
    }
  });
}
