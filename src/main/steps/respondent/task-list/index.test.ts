import { CaseWithId } from '../../../app/case/case';
import { CaseType, State } from '../../../app/case/definition';

import { getRespondent, getRespondentName } from './index';

const c100Case = {
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
        response: {
          citizenFlags: {
            isResponseInitiated: 'Yes',
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

describe('task-list > content', () => {
  test('should return respondent firstname and lastname', () => {
    expect(getRespondentName(getRespondent(c100Case as unknown as Partial<CaseWithId>, '12345'))).toBe('John Smith');
  });

  test('should return respondentFL401 firstname and lastname', () => {
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

    expect(getRespondentName(getRespondent(data as unknown as Partial<CaseWithId>, '12345'))).toBe('John Smith');
  });
});
