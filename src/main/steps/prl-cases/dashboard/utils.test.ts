import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, State, YesOrNo } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';

import { getCasePartyType, getCurrentPartyId } from './utils';

describe('testcase for partytype', () => {
  test('when party type c100-applicant', () => {
    const data = {
      id: '12',
      state: State.Submitted,
      caseTypeOfApplication: CaseType.C100,
      caseInvites: [
        {
          id: '123',
          value: {
            partyId: '',
            caseInviteEmail: '',
            accessCode: '',
            invitedUserId: '',
            expiryDate: '',
            isApplicant: YesOrNo.YES,
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
            lastName: 'Smith',
            firstName: 'John',
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
            response: {},
            user: {
              email: 'abc',
              idamId: '12345',
            },
          },
        },
      ],
      respondentsFL401: {
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
        lastName: 'Smith',
        firstName: 'John',
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
        response: {},
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
    };
    const idamId = '1234';

    expect(getCasePartyType(data, idamId)).toBe('applicant');
  });
  test('when party type c100-respondent', () => {
    const data = {
      id: '12',
      state: State.Submitted,
      caseTypeOfApplication: CaseType.C100,
      caseInvites: [
        {
          id: '123',
          value: {
            partyId: '1',
            caseInviteEmail: '',
            accessCode: '',
            invitedUserId: '1234',
            expiryDate: '',
            isApplicant: YesOrNo.YES,
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
            lastName: 'Smith',
            firstName: 'John',
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
            response: {},
            user: {
              email: 'abc',
              idamId: '1234',
            },
          },
        },
      ],
      respondentsFL401: {
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
        lastName: 'Smith',
        firstName: 'John',
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
        response: {},
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
    };
    const idamId = '1234';

    expect(getCasePartyType(data, idamId)).toBe('respondent');
  });
  test('when party type FL401-respondent', () => {
    const data = {
      id: '12',
      state: State.Submitted,
      caseTypeOfApplication: CaseType.FL401,
      caseInvites: [
        {
          id: '123',
          value: {
            partyId: '',
            caseInviteEmail: '',
            accessCode: '',
            invitedUserId: '12345',
            expiryDate: '',
            isApplicant: YesOrNo.NO,
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
            lastName: 'Smith',
            firstName: 'John',
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
            response: {},
            user: {
              email: 'abc',
              idamId: '12345',
            },
          },
        },
      ],
      respondentsFL401: {
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
        lastName: 'Smith',
        firstName: 'John',
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
        response: {},
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
    };
    const idamId = '12345';

    expect(getCasePartyType(data, idamId)).toBe('respondent');
  });
  test('when party type FL401-applicant', () => {
    const data = {
      id: '12',
      state: State.Submitted,
      caseTypeOfApplication: CaseType.FL401,
      caseInvites: [
        {
          id: '123',
          value: {
            partyId: '',
            caseInviteEmail: '',
            accessCode: '',
            invitedUserId: '1234',
            expiryDate: '',
            isApplicant: YesOrNo.NO,
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
            lastName: 'Smith',
            firstName: 'John',
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
            response: {},
            user: {
              email: 'abc',
              idamId: '12345',
            },
          },
        },
      ],
      respondentsFL401: {
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
        lastName: 'Smith',
        firstName: 'John',
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
        response: {},
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
    };
    const idamId = '12345';

    expect(getCasePartyType(data, idamId)).toBe('applicant');
  });

  describe('getCurrentPartyId', () => {
    test('should return correct partyId for CA respondent', () => {
      const data = {
        id: '123',
        state: State.Submitted,
        caseTypeOfApplication: CaseType.C100,
        caseInvites: [
          {
            id: '123',
            value: {
              partyId: '123',
              caseInviteEmail: '',
              accessCode: '',
              invitedUserId: '123',
              expiryDate: '',
            },
          },
        ],
        respondents: [
          {
            id: '123',
            value: {
              user: {
                email: 'abc',
                idamId: '123',
              },
            },
          },
        ],
      } as unknown as Partial<CaseWithId>;
      const userDetails = { id: '123' } as UserDetails;

      expect(getCurrentPartyId(data, userDetails, 'respondent' as PartyType)).toBe('123');
    });

    test('should return correct partyId for CA applicant', () => {
      const data = {
        id: '123',
        state: State.Submitted,
        caseTypeOfApplication: CaseType.C100,
        caseInvites: [
          {
            id: '123',
            value: {
              partyId: '123',
              caseInviteEmail: '',
              accessCode: '',
              invitedUserId: '123',
              expiryDate: '',
            },
          },
        ],
        applicants: [
          {
            id: '123',
            value: {
              user: {
                email: 'abc',
                idamId: '123',
              },
            },
          },
        ],
      } as unknown as Partial<CaseWithId>;
      const userDetails = { id: '123' } as UserDetails;

      expect(getCurrentPartyId(data, userDetails, 'applicant' as PartyType)).toBe('123');
    });

    test('should return correct partyId for DA respondent', () => {
      const data = {
        id: '123',
        state: State.Submitted,
        caseTypeOfApplication: CaseType.FL401,
        caseInvites: [
          {
            id: '123',
            value: {
              partyId: '123',
              caseInviteEmail: '',
              accessCode: '',
              invitedUserId: '123',
              expiryDate: '',
            },
          },
        ],
        respondentsFL401: {
          user: {
            email: 'abc',
            idamId: '123',
          },
        },
      } as unknown as Partial<CaseWithId>;
      const userDetails = { id: '123' } as UserDetails;

      expect(getCurrentPartyId(data, userDetails, 'respondent' as PartyType)).toBe('123');
    });

    test('should return correct partyId for DA applicant', () => {
      const data = {
        id: '123',
        state: State.Submitted,
        caseTypeOfApplication: CaseType.FL401,
        caseInvites: [
          {
            id: '123',
            value: {
              partyId: '123',
              caseInviteEmail: '',
              accessCode: '',
              invitedUserId: '123',
              expiryDate: '',
            },
          },
        ],
        applicantsFL401: {
          user: {
            email: 'abc',
            idamId: '123',
          },
        },
      } as unknown as Partial<CaseWithId>;
      const userDetails = { id: '123' } as UserDetails;

      expect(getCurrentPartyId(data, userDetails, 'applicant' as PartyType)).toBe('123');
    });
  });
});
