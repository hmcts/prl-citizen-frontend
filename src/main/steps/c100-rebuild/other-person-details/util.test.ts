import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C100RebuildPartyDetails } from '../../../app/case/definition';

import { getDataShape, getOtherPersonDetails, updateOtherPersonDetails } from './util';

const dummyRequest = mockRequest({
  params: {
    otherPersonId: '1031eeb1-e55a-4989-8ab9-b2be33f1d9bd',
  },
  session: {
    userCase: {
      oprs_otherPersons: [
        {
          id: '1031eeb1-e55a-4989-8ab9-b2be33f1d9bd',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            repondentDetials: '',
            resPreviousName: '',
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
            respondentPlaceOfBirth: '',
            respondentPlaceOfBirthUnknown: 'No',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
            selectedAddress: 2,
            addressHistory: 'Yes',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [],
          },
          contactDetails: {
            donKnowEmailAddress: 'No',
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: 'No',
          },
          otherPersonAddress: {
            AddressLine1: '',
            AddressLine2: '',
            AddressLine3: '',
            PostTown: '',
            County: '',
            PostCode: '',
            Country: '',
          },
          addressUnknown: 'No',
          otherPersonAddressIndex: 0,
        },
      ],
    },
  },
});

describe('Add other Person util', () => {
  test('getDataShape for add other Person details should return appropriate fields', async () => {
    expect(getDataShape()).toEqual(
      expect.objectContaining({
        firstName: '',
        lastName: '',
        personalDetails: {
          repondentDetials: '',
          resPreviousName: '',
          dateOfBirth: {
            day: '',
            month: '',
            year: '',
          },
          isDateOfBirthUnknown: '',
          approxDateOfBirth: {
            day: '',
            month: '',
            year: '',
          },
          gender: '',
          otherGenderDetails: '',
          respondentPlaceOfBirth: '',
          respondentPlaceOfBirthUnknown: 'No',
        },
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
          selectedAddress: 2,
          addressHistory: 'Yes',
          provideDetailsOfPreviousAddresses: '',
        },
        relationshipDetails: {
          relationshipToChildren: [],
        },
        contactDetails: {
          donKnowEmailAddress: 'No',
          emailAddress: '',
          telephoneNumber: '',
          donKnowTelephoneNumber: 'No',
        },
        otherPersonAddress: {
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
          PostTown: '',
          County: '',
          PostCode: '',
          Country: '',
        },
        addressUnknown: 'No',
        otherPersonAddressIndex: 0,
      })
    );
  });

  test('getOtherPersonDetails for child should return appropriate child details if the otherPersonId is valid', async () => {
    expect(
      getOtherPersonDetails(dummyRequest.session.userCase.oprs_otherPersons, dummyRequest.params.otherPersonId)
    ).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      })
    );
  });

  test('updateOtherPersonDetails for other person should update the person details in the session the otherPersonId is valid', async () => {
    const otherPersonDetails = getOtherPersonDetails(
      dummyRequest.session.userCase.oprs_otherPersons,
      dummyRequest.params.otherPersonId
    );
    const dataToUpdate = {
      ...otherPersonDetails,
      firstName: 'Jane',
    };

    expect(
      updateOtherPersonDetails(dummyRequest.session.userCase.oprs_otherPersons, dataToUpdate as C100RebuildPartyDetails)
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: 'Jane',
          lastName: 'Doe',
        }),
      ])
    );
  });
});
