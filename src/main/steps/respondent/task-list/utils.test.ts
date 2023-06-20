import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseDate, CaseWithId } from '../../../app/case/case';
import { CaseType, SectionStatus, State, YesOrNo } from '../../../app/case/definition';

import {
  getCheckAllegationOfHarmStatus,
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getFinalApplicationStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getRespondentAllegationsOfHarmAndViolence,
  getRespondentPartyDetailsCa,
  getRespondentResponseToRequestForChildArrangements,
  getRespondentSupportYourNeedsDetails,
  getUploadDocuments,
  getViewAllDocuments,
  getViewAllHearingsFromTheCourt,
  getViewAllOrdersFromTheCourt,
  getViewAllOrdersFromTheCourtAllDocuments,
  getYourApplication,
  getYourSafetyStatus,
  isApplicationResponded,
} from './utils';

const userCase: CaseWithId = {
  id: '123',
  state: State.Submitted,
  serviceType: '',
};

const userCase2 = {
  id: '12',
  state: State.CASE_SUBMITTED_PAID,
  citizenResponseC7DocumentList: [
    {
      id: 'string',
      value: {
        partyName: 'string',
        createdBy: '1',
        dateCreated: new Date(),
        citizenDocument: {
          document_url: 'string',
          document_filename: 'string',
          document_binary_url: 'string',
          document_hash: 'string',
        },
      },
    },
  ],
  respondents: [
    {
      id: '1',
      value: {
        email: 'abc',
        gender: 'male',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
        dxNumber: '123',
        landline: '987654321',
        lastName: 'string',
        firstName: 'string',
        dateOfBirth: 'string',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: 'string',
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
          citizenFlags: {
            isApplicationViewed: YesOrNo.YES,
            isAllegationOfHarmViewed: YesOrNo.YES,
          },
          consent: {
            consentToTheApplication: YesOrNo.NO,
            applicationReceivedDate: '01-01-2022',
            permissionFromCourt: 'string',
          },
        },
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
    },
  ],
  caseTypeOfApplication: CaseType.C100,
};

const data = {
  ...userCase2,
  orderCollection: [
    {
      id: 'string',
      value: {
        dateCreated: 'string',
        orderType: 'string',
        orderDocument: {
          document_url: 'string',
          document_binary_url: 'string',
          document_filename: 'string',
        },
        otherDetails: {
          createdBy: 'string',
          orderCreatedDate: 'string',
          orderMadeDate: 'string',
          orderRecipients: 'string',
        },
      },
    },
  ],
};

describe('utils', () => {
  describe('getConfirmOrEditYourContactDetails', () => {
    const date: CaseDate = {
      year: 'string',
      month: 'string',
      day: 'string',
    };
    test.each([
      {
        data1: {
          ...mockUserCase,
          citizenUserFullName: undefined,
          citizenUserDateOfBirth: undefined,
          citizenUserPlaceOfBirth: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data1: {
          ...mockUserCase,
          citizenUserFullName: 'Test',
          citizenUserDateOfBirth: date,
          citizenUserPlaceOfBirth: 'date',
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data1: {
          ...mockUserCase,
          citizenUserFullName: 'Test',
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data1, expected }) => {
      expect(getConfirmOrEditYourContactDetails({ ...userCase, ...data1 }, '123456')).toBe(expected);
      expect(getConfirmOrEditYourContactDetails({ ...userCase2, ...data1 }, '12345')).toBe(SectionStatus.COMPLETED);
      expect(getConfirmOrEditYourContactDetails(userCase, '123456')).toBe(SectionStatus.TO_DO);
    });
  });

  test('getConsentToApplicationStatus', () => {
    const data1 = {
      id: '12',
      respondents: [
        {
          id: '1',
          value: {
            email: 'abc',
            gender: 'male',
            address: {
              AddressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
            dxNumber: '123',
            landline: '987654321',
            lastName: 'string',
            firstName: 'string',
            dateOfBirth: 'string',
            otherGender: '',
            phoneNumber: '',
            placeOfBirth: 'string',
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
              consent: {
                consentToTheApplication: YesOrNo.NO,
              },
            },
            user: {
              email: 'abc',
              idamId: '12345',
            },
          },
        },
      ],
    };

    expect(getConsentToApplicationStatus(userCase, '123456')).toBe(SectionStatus.TO_DO);
    expect(getConsentToApplicationStatus(userCase2, '12345')).toBe(SectionStatus.COMPLETED);
    expect(getConsentToApplicationStatus(data1, '12345')).toBe(SectionStatus.IN_PROGRESS);
  });

  describe('getCurrentOrOtherProceedingsStatus', () => {
    test.each([
      {
        data1: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.NO,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data1: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.YES,
          proceedingsStartOrder: YesOrNo.YES,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data1: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.YES,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data1: {
          ...mockUserCase,
          proceedingsStart: undefined,
          proceedingsStartOrder: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
    ])('should return correct status %#', ({ data1, expected }) => {
      expect(getCurrentOrOtherProceedingsStatus({ ...userCase, ...data1 })).toBe(expected);
    });
  });
  describe('getInternationalFactorsStatus', () => {
    test.each([
      {
        data1: {
          ...mockUserCase,
          start: undefined,
          parents: undefined,
          jurisdiction: undefined,
          request: undefined,
          iFactorsJurisdictionProvideDetails: undefined,
          iFactorsParentsProvideDetails: undefined,
          iFactorsRequestProvideDetails: undefined,
          iFactorsStartProvideDetails: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data1: {
          ...mockUserCase,
          start: YesOrNo.NO,
          parents: YesOrNo.NO,
          jurisdiction: YesOrNo.NO,
          request: YesOrNo.NO,
          iFactorsJurisdictionProvideDetails: undefined,
          iFactorsParentsProvideDetails: undefined,
          iFactorsRequestProvideDetails: undefined,
          iFactorsStartProvideDetails: undefined,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data1: {
          ...mockUserCase,
          start: undefined,
          parents: YesOrNo.NO,
          jurisdiction: undefined,
          request: YesOrNo.NO,
          iFactorsJurisdictionProvideDetails: undefined,
          iFactorsParentsProvideDetails: undefined,
          iFactorsRequestProvideDetails: undefined,
          iFactorsStartProvideDetails: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data1, expected }) => {
      expect(getInternationalFactorsStatus({ ...userCase, ...data1 })).toBe(expected);
    });
  });

  test('getKeepYourDetailsPrivateStatus', () => {
    const data1 = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      respondents: [
        {
          id: '1',
          value: {
            email: 'abc',
            gender: 'male',
            address: {
              AddressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
            dxNumber: '123',
            landline: '987654321',
            lastName: 'string',
            firstName: 'string',
            dateOfBirth: 'string',
            otherGender: '',
            phoneNumber: '',
            placeOfBirth: 'string',
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
              keepDetailsPrivate: {
                otherPeopleKnowYourContactDetails: '',
                confidentiality: 'Yes',
                confidentialityList: [],
              },
            },
            user: {
              email: 'abc',
              idamId: '12345',
            },
          },
        },
      ],
      caseTypeOfApplication: CaseType.C100,
    };
    expect(getKeepYourDetailsPrivateStatus(userCase, '12345')).toBe(SectionStatus.TO_DO);
    expect(getKeepYourDetailsPrivateStatus(data1, '12345')).toBe(SectionStatus.COMPLETED);
  });

  describe('getMiamStatus', () => {
    test.each([
      {
        data1: {
          ...mockUserCase,
          miamStart: undefined,
          miamWillingness: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data1: {
          ...mockUserCase,
          miamStart: 'undefined',
          miamWillingness: 'undefined',
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data1: {
          ...mockUserCase,
          miamStart: 'undefined',
          miamWillingness: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data1, expected }) => {
      expect(getMiamStatus({ ...userCase, ...data1 })).toBe(expected);
    });
  });
  describe('getYourSafetyStatus', () => {
    test.each([
      {
        data1: {
          ...mockUserCase,
          safetyConcerns: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data1: {
          ...mockUserCase,
          safetyConcerns: 'undefined',
        },
        expected: SectionStatus.COMPLETED,
      },
    ])('should return correct status %#', async ({ data1, expected }) => {
      expect(getYourSafetyStatus({ ...userCase, ...data1 })).toBe(expected);
    });
  });
});

test('should return correct status of court hearings', () => {
  expect(
    getViewAllHearingsFromTheCourt({
      ...mockUserCase,
      hearingCollection: [
        {
          prev: [
            {
              date: 'string',
              time: 'string',
              typeOfHearing: 'string',
              courtName: 'string',
              courtAddress: 'string',
              hearingOutcome: 'string',
            },
          ],
          next: {
            date: 'string',
            time: 'string',
            typeOfHearing: 'string',
            courtName: 'string',
            courtAddress: 'string',
            hearingOutcome: 'string',
          },
        },
      ],
    })
  ).toBe(SectionStatus.READY_TO_VIEW);
  expect(getViewAllHearingsFromTheCourt({ ...mockUserCase, hearingCollection: [] })).toBe(SectionStatus.TO_DO);
});

test('should return correct status of get view all docs', () => {
  expect(getViewAllDocuments()).toBe(SectionStatus.READY_TO_VIEW);
});

test('should return correct status of get upload docs', () => {
  expect(getUploadDocuments()).toBe(SectionStatus.TO_DO);
});

test('getViewAllOrdersFromTheCourt', () => {
  expect(getViewAllOrdersFromTheCourt(data)).toBe(SectionStatus.READY_TO_VIEW);
  expect(getViewAllOrdersFromTheCourt(userCase2)).toBe(SectionStatus.NOT_AVAILABLE_YET);
});

test('getViewAllOrdersFromTheCourtAllDocuments', () => {
  expect(getViewAllOrdersFromTheCourtAllDocuments(data)).toBe(true);
});

test('getRespondentResponseToRequestForChildArrangements', () => {
  expect(getRespondentResponseToRequestForChildArrangements(data)).toBe(true);
});

test('getRespondentAllegationsOfHarmAndViolence', () => {
  expect(getRespondentAllegationsOfHarmAndViolence(data)).toBe(true);
});

describe('getFinalApplicationStatus', () => {
  test.each([
    {
      data1: {
        ...mockUserCase,
      },
      expected: SectionStatus.NOT_AVAILABLE_YET,
    },
    {
      data1: {
        ...mockUserCase,
        finalDocument: {
          document_url: 'string',
          document_filename: 'string',
          document_binary_url: 'string',
        },
      },
      expected: SectionStatus.VIEW,
    },
  ])('should return correct status %#', async ({ data1, expected }) => {
    expect(getFinalApplicationStatus({ ...userCase2, ...data1 }, '12345')).toBe(expected);
  });
});

describe('getCheckAllegationOfHarmStatus', () => {
  test.each([
    {
      data1: {
        ...mockUserCase,
      },
      expected: SectionStatus.NOT_AVAILABLE_YET,
    },
    {
      data1: {
        ...mockUserCase,
        c1ADocument: {
          document_url: 'string',
          document_filename: 'string',
          document_binary_url: 'string',
        },
      },
      expected: SectionStatus.VIEW,
    },
  ])('should return correct status %#', async ({ data1, expected }) => {
    expect(getCheckAllegationOfHarmStatus({ ...userCase2, ...data1 }, '12345')).toBe(expected);
  });
});

describe('getRespondentSupportYourNeedsDetails', () => {
  test.each([
    {
      data1: {
        ...mockUserCase,
        attendingToCourt: ['test'],
        languageRequirements: ['test'],
        safetyArrangements: ['test'],
        reasonableAdjustments: ['test'],
        docsSupport: ['test'],
        helpCommunication: ['test'],
        courtHearing: ['test'],
        courtComfort: ['test'],
        travellingToCourt: ['test'],
      },
      expected: SectionStatus.COMPLETED,
    },
    {
      data1: {
        ...mockUserCase,
        attendingToCourt: ['test'],
      },
      expected: SectionStatus.IN_PROGRESS,
    },
    {
      data1: {
        ...mockUserCase,
      },
      expected: SectionStatus.TO_DO,
    },
  ])('should return correct status %#', async ({ data1, expected }) => {
    expect(getRespondentSupportYourNeedsDetails({ ...userCase2, ...data1 })).toBe(expected);
  });
});

test('getRespondentPartyDetailsCa', () => {
  expect(getRespondentPartyDetailsCa(userCase2, '123456')).toBe(undefined);
  expect(getRespondentPartyDetailsCa(userCase2, '12345')).toBe(userCase2.respondents[0]);
});

test('isApplicationResponded', () => {
  expect(isApplicationResponded(userCase2, '12345')).toBe(true);
  expect(isApplicationResponded(userCase, '12345')).toBe(false);
});

test('getYourApplication', () => {
  expect(getYourApplication()).toBe(SectionStatus.DOWNLOAD);
});
