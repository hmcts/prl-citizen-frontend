import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../../../app/case/case';
import { Applicant, CaseType, PartyType, Respondent, State, YesOrNo } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';

import { getPartyName, hasRespondentRespondedToC7Application, isC7ResponseReviewed, isCaseWithdrawn } from './utils';

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

    expect(getPartyName(data as unknown as Partial<CaseWithId>, party, userDetail)).toBe('John Smith');
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

  test('when party type c100-applicant and ids match', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      caseTypeOfApplication: CaseType.C100,
      applicants: [
        {
          value: {
            firstName: 'First',
            lastName: 'Last',
            user: {
              idamId: '12345',
            },
          },
        } as unknown as Applicant,
      ],
    };
    const party = PartyType.APPLICANT;
    const userDetail = {
      accessToken: '1234',
      id: '12345',
      email: 'abc',
      givenName: 'John',
      familyName: 'Smith',
    };

    expect(getPartyName(data, party, userDetail)).toBe('First Last');
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

    expect(getPartyName(data as unknown as Partial<CaseWithId>, party, userDetail)).toBe('John Smith');
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

    expect(getPartyName(data as unknown as Partial<CaseWithId>, party, userDetail)).toBe('John Smith');
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
            orderDocumentWelsh: {
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
    const data = mockRequest({ userCase: {} });
    expect(isCaseWithdrawn(data)).toBe(false);
  });
});

describe('hasRespondentRespondedToC7Application', () => {
  test('should return true when respondent has submitted response', () => {
    const userCase = {
      caseTypeOfApplication: 'C100',
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              c7ResponseSubmitted: 'Yes',
            },
          },
        },
      ],
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'Yes',
          },
        },
      ],
    } as unknown as CaseWithId;
    expect(hasRespondentRespondedToC7Application(userCase, { id: '1234' } as unknown as UserDetails)).toBe(true);
  });

  test('should return false when C7 response has not been submitted', () => {
    const userCase = {
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              c7ResponseSubmitted: 'No',
            },
          },
        },
      ],
    } as unknown as CaseWithId;
    expect(hasRespondentRespondedToC7Application(userCase, { id: '1234' } as unknown as UserDetails)).toBe(false);
  });
});

describe('isC7ResponseReviewed', () => {
  test('should return true if respondent submitted response document is present', () => {
    expect(
      isC7ResponseReviewed(
        {
          respondentDocuments: [
            {
              partyId: '1',
              partyName: null,
              partyType: 'respondent',
              categoryId: 'respondentApplication',
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: '2024-03-11T16:24:33.122506',
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'respondentApplication',
                document_creation_date: '2024-03-11T16:24:33.122506',
              },
              documentWelsh: null,
            },
          ],
        } as unknown as CaseWithId,
        {
          id: '1',
          value: {
            user: {
              idamId: '1',
            },
          },
        } as Respondent
      )
    ).toBe(true);
  });

  test('should return true if solicitor submitted response document is present', () => {
    expect(
      isC7ResponseReviewed(
        {
          respondentDocuments: [
            {
              partyId: null,
              partyName: null,
              solicitorRepresentedPartyId: '1',
              solicitorRepresentedPartyName: 'test',
              partyType: 'respondent',
              categoryId: 'respondentApplication',
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: '2024-03-11T16:24:33.122506',
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'respondentApplication',
                document_creation_date: '2024-03-11T16:24:33.122506',
              },
              documentWelsh: null,
            },
          ],
        } as unknown as CaseWithId,
        {
          id: '1',
          value: {
            user: {
              idamId: '1',
            },
          },
        } as Respondent
      )
    ).toBe(true);
  });

  test('should return false if response document is not present', () => {
    expect(
      isC7ResponseReviewed(
        {
          citizenDocuments: [
            {
              partyId: '1',
              partyName: null,
              partyType: 'respondent',
              categoryId: 'positionStatements',
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: '2024-03-11T16:24:33.122506',
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements',
                document_creation_date: '2024-03-11T16:24:33.122506',
              },
              documentWelsh: null,
            },
          ],
        } as unknown as CaseWithId,
        {
          id: '1',
          value: {
            user: {
              idamId: '1',
            },
          },
        } as Respondent
      )
    ).toBe(false);
  });
});
