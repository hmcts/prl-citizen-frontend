import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import RARespondentPostController from './postController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('RA > review > postController', () => {
  const controller = new RARespondentPostController({});

  test('should map data and redirect when partyDetails present', async () => {
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          applicantsFL401: {
            firstName: '',
            lastName: '',
            response: {},
            address: {
              addressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
          },
          ra_typeOfHearing: 'ra_typeOfHearing',
          ra_noVideoAndPhoneHearing_subfield: 'ra_noVideoAndPhoneHearing_subfield',
          ra_specialArrangements: 'ra_specialArrangements',
          ra_specialArrangementsOther_subfield: 'ra_specialArrangementsOther_subfield',
          ra_languageNeeds: 'ra_languageNeeds',
          ra_needInterpreterInCertainLanguage_subfield: 'ra_needInterpreterInCertainLanguage_subfield',
          ra_disabilityRequirements: 'ra_disabilityRequirements',
          ra_documentInformation: 'ra_documentInformation',
          ra_specifiedColorDocuments_subfield: 'ra_specifiedColorDocuments_subfield',
          ra_largePrintDocuments_subfield: 'ra_largePrintDocuments_subfield',
          ra_documentHelpOther_subfield: 'ra_documentHelpOther_subfield',
          ra_communicationHelp: 'ra_communicationHelp',
          ra_signLanguageInterpreter_subfield: 'ra_signLanguageInterpreter_subfield',
          ra_communicationHelpOther_subfield: 'ra_communicationHelpOther_subfield',
          ra_supportCourt: 'ra_supportCourt',
          ra_supportWorkerCarer_subfield: 'ra_supportWorkerCarer_subfield',
          ra_friendFamilyMember_subfield: 'ra_friendFamilyMember_subfield',
          ra_therapyAnimal_subfield: 'ra_therapyAnimal_subfield',
          ra_supportCourtOther_subfield: 'ra_supportCourtOther_subfield',
          ra_feelComportable: 'ra_feelComportable',
          ra_appropriateLighting_subfield: 'ra_appropriateLighting_subfield',
          ra_feelComportableOther_subfield: 'ra_feelComportableOther_subfield',
          ra_travellingCourt: 'ra_travellingCourt',
          ra_parkingSpace_subfield: 'ra_parkingSpace_subfield',
          ra_differentTypeChair_subfield: 'ra_differentTypeChair_subfield',
          ra_travellingCourtOther_subfield: 'ra_travellingCourtOther_subfield',
        },
      },
    });
    const res = mockResponse();
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase).toEqual({
      applicantsFL401: {
        address: {
          AddressLine2: '',
          County: '',
          PostCode: '',
          PostTown: '',
          addressLine1: '',
        },
        firstName: '',
        lastName: '',
        response: {
          supportYouNeed: {
            attendingToCourt: 'ra_typeOfHearing',
            communicationSupportOther: 'ra_supportCourtOther_subfield',
            courtComfort: 'ra_feelComportable',
            courtHearing: 'ra_supportCourt',
            describeOtherNeed: 'ra_communicationHelpOther_subfield',
            differentChairDetails: 'ra_differentTypeChair_subfield',
            docsDetails: 'ra_specifiedColorDocuments_subfield',
            docsSupport: 'ra_documentInformation',
            familyProviderDetails: 'ra_friendFamilyMember_subfield',
            hearingDetails: 'ra_noVideoAndPhoneHearing_subfield',
            helpCommunication: 'ra_communicationHelp',
            languageDetails: 'ra_needInterpreterInCertainLanguage_subfield',
            languageRequirements: 'ra_languageNeeds',
            largePrintDetails: 'ra_largePrintDocuments_subfield',
            lightingDetails: 'ra_appropriateLighting_subfield',
            otherDetails: 'ra_documentHelpOther_subfield',
            otherProvideDetails: 'ra_feelComportableOther_subfield',
            parkingDetails: 'ra_parkingSpace_subfield',
            reasonableAdjustments: 'ra_disabilityRequirements',
            safetyArrangements: 'ra_specialArrangements',
            safetyArrangementsDetails: 'ra_specialArrangementsOther_subfield',
            signLanguageDetails: 'ra_signLanguageInterpreter_subfield',
            supportWorkerDetails: 'ra_supportWorkerCarer_subfield',
            therapyDetails: 'ra_therapyAnimal_subfield',
            travellingOtherDetails: 'ra_travellingCourtOther_subfield',
            travellingToCourt: 'ra_travellingCourt',
          },
        },
      },
      citizenUserAdditionalName: undefined,
      citizenUserAddress1: undefined,
      citizenUserAddress2: '',
      citizenUserAddressCountry: '',
      citizenUserAddressHistory: undefined,
      citizenUserAddressPostcode: '',
      citizenUserAddressTown: '',
      citizenUserDateOfBirth: {
        day: '',
        month: '',
        year: '',
      },
      citizenUserEmailAddress: undefined,
      citizenUserFirstNames: '',
      citizenUserFullName: '',
      citizenUserLastNames: '',
      citizenUserPhoneNumber: undefined,
      citizenUserPlaceOfBirth: undefined,
      citizenUserSafeToCall: '',
      citizenUserSelectAddress: '',
      isAtAddressLessThan5Years: undefined,
      ra_appropriateLighting_subfield: 'ra_appropriateLighting_subfield',
      ra_communicationHelp: 'ra_communicationHelp',
      ra_communicationHelpOther_subfield: 'ra_communicationHelpOther_subfield',
      ra_differentTypeChair_subfield: 'ra_differentTypeChair_subfield',
      ra_disabilityRequirements: 'ra_disabilityRequirements',
      ra_documentHelpOther_subfield: 'ra_documentHelpOther_subfield',
      ra_documentInformation: 'ra_documentInformation',
      ra_feelComportable: 'ra_feelComportable',
      ra_feelComportableOther_subfield: 'ra_feelComportableOther_subfield',
      ra_friendFamilyMember_subfield: 'ra_friendFamilyMember_subfield',
      ra_languageNeeds: 'ra_languageNeeds',
      ra_largePrintDocuments_subfield: 'ra_largePrintDocuments_subfield',
      ra_needInterpreterInCertainLanguage_subfield: 'ra_needInterpreterInCertainLanguage_subfield',
      ra_noVideoAndPhoneHearing_subfield: 'ra_noVideoAndPhoneHearing_subfield',
      ra_parkingSpace_subfield: 'ra_parkingSpace_subfield',
      ra_signLanguageInterpreter_subfield: 'ra_signLanguageInterpreter_subfield',
      ra_specialArrangements: 'ra_specialArrangements',
      ra_specialArrangementsOther_subfield: 'ra_specialArrangementsOther_subfield',
      ra_specifiedColorDocuments_subfield: 'ra_specifiedColorDocuments_subfield',
      ra_supportCourt: 'ra_supportCourt',
      ra_supportCourtOther_subfield: 'ra_supportCourtOther_subfield',
      ra_supportWorkerCarer_subfield: 'ra_supportWorkerCarer_subfield',
      ra_therapyAnimal_subfield: 'ra_therapyAnimal_subfield',
      ra_travellingCourt: 'ra_travellingCourt',
      ra_travellingCourtOther_subfield: 'ra_travellingCourtOther_subfield',
      ra_typeOfHearing: 'ra_typeOfHearing',
    });
  });

  test('should throw new error', async () => {
    jest.clearAllMocks();
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          applicantsFL401: {
            firstName: '',
            lastName: '',
            response: {},
            address: {
              addressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
          },
        },
      },
    });
    const res = mockResponse();
    updateCaserMock.mockRejectedValue(undefined);

    const expectedError = new Error('RA for respondent while submit response - Case could not be updated.');

    await expect(controller.post(req, res)).rejects.toThrow(expectedError);
  });
});
