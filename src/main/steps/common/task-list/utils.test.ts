import { CaseType, PartyType, State, YesOrNo } from '../../../app/case/definition';

import { getPartyName, isCaseWithdrawn } from './utils';

describe('testcase for partyname', () => {
  test('when party type c100-respondent', () => {
    const data = {
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
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.RESPONDENT;
    const userDetail = {
      accessToken: '1234',
      id: '12345',
      email: 'abc',
      givenName: 'John',
      familyName: 'Smith',
    };

    expect(getPartyName(data, party, userDetail)).toBe('undefined undefined');
  });
  test('when party type c100-applicant', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const userDetail = {
      accessToken: '1234',
      id: '12345',
      email: 'abc',
      givenName: 'John',
      familyName: 'Smith',
    };

    expect(getPartyName(data, party, userDetail)).toBe('John Smith');
  });
  test('when party type FL401-respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
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
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const userDetail = {
      accessToken: '1234',
      id: '12345',
      email: 'abc',
      givenName: 'John',
      familyName: 'Smith',
    };
    console.log('data is' + data);

    expect(getPartyName(data, party, userDetail)).toBe('John Smith');
  });
  test('when party type FL401-applicant', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      applicantsFL401: {
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
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.APPLICANT;
    const userDetail = {
      accessToken: '1234',
      id: '12345',
      email: 'abc',
      givenName: 'John',
      familyName: 'Smith',
    };
    console.log('data is' + data);

    expect(getPartyName(data, party, userDetail)).toBe('John Smith');
  });
  test('when party type unkown', () => {
    const data = undefined;
    const party = PartyType.CHILDREN;
    const userDetail = {
      accessToken: '1234',
      id: '12345',
      email: 'abc',
      givenName: 'John',
      familyName: 'Smith',
    };
    console.log('data is' + data);

    expect(getPartyName(data, party, userDetail)).toBe('John Smith');
  });
});
describe('testcase for isCaseWithdrawn', () => {
  test('withdrawn state', () => {
    const data = {
      id: '12',
      state: State.CASE_WITHDRAWN,
    };
    expect(isCaseWithdrawn(data)).toBe(true);
  });
  test('not yet withdrawn', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      orderCollection: [
        {
          id: '',
          value: {
            dateCreated: '',
            orderType: '',
            orderDocument: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            otherDetails: {
              createdBy: '',
              orderCreatedDate: '',
              orderMadeDate: '',
              orderRecipients: '',
            },
            orderTypeId: 'blankOrderOrDirectionsWithdraw',
            isWithdrawnRequestApproved: YesOrNo.NO,
            withdrawnRequestType: 'application',
          },
        },
      ],
    };
    expect(isCaseWithdrawn(data)).toBe(false);
  });
  test('when no case data', () => {
    const data = {};
    expect(isCaseWithdrawn(data)).toBe(false);
  });
});
