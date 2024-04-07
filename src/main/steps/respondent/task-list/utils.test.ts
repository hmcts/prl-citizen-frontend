import { CaseType, State, YesOrNo } from '../../../app/case/definition';

import { getRespondentPartyDetailsCa } from './utils';

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

describe('utils', () => {
  test('getRespondentPartyDetailsCa', () => {
    expect(getRespondentPartyDetailsCa(userCase2, '123456')).toBe(undefined);
    expect(getRespondentPartyDetailsCa(userCase2, '12345')).toBe(userCase2.respondents[0]);
  });
});
