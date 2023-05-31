import { Respondent, State, applicantContactPreferencesEnum } from '../../../app/case/definition';

import {
  mapSupportYouNeedDetails,
  prepareSupportYouNeedDuringCaseRequest,
} from './SupportYouNeedDuringYourCaseService';

describe('prepareRequest', () => {
  test('prepareRequest is a function', () => {
    const mockCaseWithId = {
      attendingToCourt: ['nohearings'],
      hearingDetails: 'Details of hearing',
      helpCommunication: ['signlanguage', 'other'],
      describeOtherNeed: 'Description of other need',
      describeSignLanguageDetails: 'Details of sign language need',
      courtComfort: ['appropriatelighting'],
      lightingProvideDetails: 'Details of lighting provision',
      otherProvideDetails: 'Details of other comfort provision',
      courtHearing: ['supportworker', 'animal'],
      supportWorkerDetails: 'Details of support worker',
      therapyDetails: 'Details of animal therapy',
      familyProviderDetails: 'Details of family member support',
      communicationSupportOther: 'Details of other communication support',
      docsSupport: ['docsDetails'],
      docsDetails: 'Details of document support',
      largePrintDetails: 'Details of large print support',
      otherDetails: 'Details of other document support',
      languageRequirements: ['languageinterpreter'],
      languageDetails: 'Details of language interpreter need',
      reasonableAdjustments: ['docsformat', 'commhelp'],
      safetyArrangements: ['other'],
      safetyArrangementsDetails: 'Details of safety arrangement',
      travellingToCourt: ['parkingspace', 'other'],
      parkingDetails: 'Details of parking need',
      differentChairDetails: 'Details of chair need',
      travellingOtherDetails: 'Details of other travelling need',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    console.log('result ->', result);
    console.log('casewithID ->', mockCaseWithId);
    expect(typeof prepareSupportYouNeedDuringCaseRequest).toBe('function');
    expect(typeof result).toBe('object');
  });

  test('should remove docsDetails field if docsSupport Array does not include "docsDetails" value', () => {
    const mockCaseWithId = {
      docsSupport: ['test'],
      docsDetails: 'Details of documents',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.docsDetails).toBeUndefined();
  });

  test('should remove hearingDetails field if attendingToCourt Array does not include "nohearings" value', () => {
    const mockCaseWithId = {
      attendingToCourt: ['physicalhearings'],
      hearingDetails: 'Details of hearing',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.hearingDetails).toBeUndefined();
  });

  test('should remove signLanguageDetails field if helpCommunication Array does not include "signlanguage" value', () => {
    const mockCaseWithId = {
      helpCommunication: ['test'],
      signLanguageDetails: 'Details of sign language',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.signLanguageDetails).toBeUndefined();
  });

  test('should remove describeOtherNeed Array if helpCommunication Array does not include "other" value', () => {
    const mockCaseWithId = {
      helpCommunication: ['test'],
      describeOtherNeed: 'Details of other needs',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.describeOtherNeed).toBeUndefined();
  });

  test('should remove signLanguageDetails field if reasonableAdjustments Array does not include "commhelp" value', () => {
    const mockCaseWithId = {
      reasonableAdjustments: ['something'],
      signLanguageDetails: 'Details of sign language',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.signLanguageDetails).toBeUndefined();
  });

  test('should remove languageDetails field if languageRequirements Array does not include "languageinterpreter" value', () => {
    const mockCaseWithId = {
      languageRequirements: ['lipreading'],
      languageDetails: 'Details of lip reading need',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.languageDetails).toBeUndefined();
  });

  test('should remove safetyArrangementsDetails field if safetyArrangements Array does not include "other" value', () => {
    const mockCaseWithId = {
      safetyArrangements: ['nothing'],
      safetyArrangementsDetails: 'Details of safety arrangements',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.safetyArrangementsDetails).toBeUndefined();
  });

  test('should remove supportWorkerDetails field if courtHearing Array does not include "supportworker" value', () => {
    const mockCaseWithId = {
      courtHearing: ['test'],
      supportWorkerDetails: 'Details of support Worker',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.supportWorkerDetails).toBeUndefined();
  });

  test('should remove lightingProvideDetails field if courtComfort Array does not include "appropriatelighting" value', () => {
    const mockCaseWithId = {
      courtComfort: ['test'],
      lightingProvideDetails: 'Details of providing lighting',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.lightingProvideDetails).toBeUndefined();
  });

  test('should remove parkingDetails field if travellingToCourt Array does not include "parkingspace" value', () => {
    const mockCaseWithId = {
      travellingToCourt: ['test'],
      parkingDetails: 'Details of parking space',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.parkingDetails).toBeUndefined();
  });

  test('should remove differentChairDetails field if travellingToCourt Array does not include "differentchair" value', () => {
    const mockCaseWithId = {
      travellingToCourt: ['test value here'],
      differentChairDetails: 'Details of different chair request',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.differentChairDetails).toBeUndefined();
  });

  test('should remove travellingOtherDetails field if travellingToCourt Array does not include "other" value', () => {
    const mockCaseWithId = {
      travellingToCourt: ['test value here'],
      travellingOtherDetails: 'Details of other travelling request',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.travellingOtherDetails).toBeUndefined();
  });

  test('should remove docsDetails, largePrintDetails, and otherDetails fields if reasonableAdjustments Array does not include "docsformat" value', () => {
    const mockCaseWithId = {
      reasonableAdjustments: ['commhelp'],
      docsDetails: 'Details of document support',
      largePrintDetails: 'Details of large print support',
      otherDetails: 'Details of other document support',
    };

    const result = prepareSupportYouNeedDuringCaseRequest({
      id: '',
      state: State.Holding,
      ...mockCaseWithId,
    });

    expect(result.docsDetails).toBeUndefined();
    expect(result.largePrintDetails).toBeUndefined();
    expect(result.otherDetails).toBeUndefined();
  });
});

describe('mapSupportYouNeedDetails', () => {
  test('mapSupportYouNeedDetails returns an empty object if respondent argument does not have a value property', () => {
    const respondent = {} as Respondent;
    const result = mapSupportYouNeedDetails(respondent.value);
    expect(result).toEqual({});
  });

  test("mapSupportYouNeedDetails returns an object with properties that match the respondent's supportYouNeed properties", () => {
    const respondent: Respondent = {
      id: '',
      value: {
        email: 'test@email.com',
        gender: '',
        address: {
          AddressLine1: 'test',
          AddressLine2: 'test',
          PostTown: 'test',
          County: 'test',
          PostCode: 'test',
        },
        dxNumber: '',
        landline: '',
        lastName: '',
        firstName: 'test',
        dateOfBirth: '',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: '',
        previousName: '',
        solicitorOrg: {
          OrganisationID: '',
          OrganisationName: '',
        },
        sendSignUpLink: '',
        solicitorEmail: '',
        isAddressUnknown: '',
        solicitorAddress: {
          County: '',
          Country: '',
          PostCode: '',
          PostTown: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
        },
        isDateOfBirthKnown: '',
        solicitorReference: '',
        solicitorTelephone: '',
        isPlaceOfBirthKnown: '',
        isDateOfBirthUnknown: '',
        isAddressConfidential: '',
        isCurrentAddressKnown: '',
        relationshipToChildren: '',
        representativeLastName: '',
        representativeFirstName: '',
        canYouProvidePhoneNumber: '',
        canYouProvideEmailAddress: '',
        isAtAddressLessThan5Years: '',
        isPhoneNumberConfidential: '',
        isEmailAddressConfidential: '',
        respondentLivedWithApplicant: '',
        doTheyHaveLegalRepresentation: '',
        addressLivedLessThan5YearsDetails: '',
        otherPersonRelationshipToChildren: [''],
        isAtAddressLessThan5YearsWithDontKnow: '',
        response: {
          supportYouNeed: {
            helpCommunication: ['signlanguage', 'other'],
            describeOtherNeed: 'test description',
            courtComfort: ['appropriatelighting'],
            otherProvideDetails: 'other details',
            courtHearing: ['supportworker', 'animal'],
            communicationSupportOther: 'Details of other communication support',
            docsSupport: ['docsDetails'],
            otherDetails: 'other details',
            languageRequirements: ['languageinterpreter'],
            signLanguageDetails: 'test description',
            reasonableAdjustments: ['docsformat', 'commhelp'],
            safetyArrangements: ['other'],
            safetyArrangementsDetails: 'test description',
            travellingToCourt: ['parkingspace', 'other'],
            travellingOtherDetails: 'test details',
            attendingToCourt: ['nohearings'],
            hearingDetails: 'test details',
            lightingProvideDetails: 'test details',
            supportWorkerDetails: 'test details',
            familyProviderDetails: 'test details',
            therapyDetails: 'test details',
            docsDetails: 'test details',
            largePrintDetails: 'test details',
            parkingDetails: 'test details',
            differentChairDetails: 'test details',
          },
        },
        user: {
          email: 'test@email.com',
          idamId: '',
        },
        contactPreferences: applicantContactPreferencesEnum.DIGITAL,
      },
    };

    const expectedResult = {
      helpCommunication: ['signlanguage', 'other'],
      describeOtherNeed: 'test description',
      courtComfort: ['appropriatelighting'],
      otherProvideDetails: 'other details',
      courtHearing: ['supportworker', 'animal'],
      communicationSupportOther: 'Details of other communication support',
      docsSupport: ['docsDetails'],
      otherDetails: 'other details',
      languageRequirements: ['languageinterpreter'],
      languageDetails: undefined,
      describeSignLanguageDetails: undefined,
      reasonableAdjustments: ['docsformat', 'commhelp'],
      safetyArrangements: ['other'],
      safetyArrangementsDetails: 'test description',
      signLanguageDetails: 'test description',
      travellingToCourt: ['parkingspace', 'other'],
      travellingOtherDetails: 'test details',
      attendingToCourt: ['nohearings'],
      hearingDetails: 'test details',
      lightingProvideDetails: undefined,
      supportWorkerDetails: 'test details',
      familyProviderDetails: 'test details',
      therapyDetails: 'test details',
      docsDetails: 'test details',
      largePrintDetails: 'test details',
      parkingDetails: 'test details',
      differentChairDetails: 'test details',
    };

    const result = mapSupportYouNeedDetails(respondent.value);
    expect(result).toEqual(expectedResult);
  });
});
