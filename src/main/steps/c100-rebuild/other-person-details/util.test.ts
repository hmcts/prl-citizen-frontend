import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C100RebuildPartyDetails } from '../../../app/case/definition';

import { getDataShape, getOtherPersonDetails, updateOtherPersonDetails } from './util';

const dummyRequest = mockRequest({
  params: {
    otherPersonId: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
  },
  session: {
    userCase: {
      oprs_otherPersons: [
        {
          id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1999',
              month: '09',
              day: '09',
            },
            gender: 'Male',
            otherGenderDetails: '',
            isNameChanged: 'dontKnow',
          },
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
          isNameChanged: '',
        },
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
