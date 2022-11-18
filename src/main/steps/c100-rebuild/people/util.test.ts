import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { ChildrenDetails, PartyType } from '../../../app/case/definition';

import {
  PartyDetailsVariant,
  getDataShape,
  getNextPerson,
  getPartyDetails,
  transformAddPeople,
  transformPartyDetails,
  updatePartyDetails,
} from './util';

const mockReq = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'test',
          },
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7925324',
          firstName: 'Sam',
          lastName: 'Daniel',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: '',
          },
        },
      ],
    },
  },
});

describe('people util', () => {
  test('getDataShape for children should return appropriate fields', async () => {
    expect(getDataShape(PartyType.CHILDREN)).toEqual(
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
        },
        childMatters: {
          needsResolution: [],
        },
        parentialResponsibility: {
          statement: '',
        },
      })
    );
  });

  test('getDataShape for other children should return appropriate fields', async () => {
    expect(getDataShape(PartyType.CHILDREN)).toEqual(
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
        },
      })
    );
  });

  test('getPartyDetails for child should return appropriate child details if the childId is valid', async () => {
    expect(getPartyDetails(mockReq.params.childId, mockReq.session.userCase.cd_children)).toEqual(
      expect.objectContaining({
        firstName: 'Bob',
        lastName: 'Silly',
      })
    );
  });

  test('getPartyDetails for child should return null if the childId is not valid', async () => {
    expect(getPartyDetails('invalid-id', mockReq.session.userCase.cd_children)).toEqual(null);
  });

  test('updatePartyDetails for child should update the child details in the session the childId is valid', async () => {
    const childDetails = getPartyDetails(mockReq.params.childId, mockReq.session.userCase.cd_children);
    const dataToUpdate = {
      ...childDetails,
      firstName: 'Bob1',
    };

    expect(updatePartyDetails(dataToUpdate as ChildrenDetails, mockReq.session.userCase.cd_children)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: 'Bob1',
          lastName: 'Silly',
        }),
      ])
    );
  });

  test('getNextPerson for child should return the next child details in the current childId is valid', async () => {
    expect(getNextPerson(mockReq.session.userCase.cd_children, mockReq.params.childId)).toEqual(
      expect.objectContaining({
        firstName: 'Sam',
        lastName: 'Daniel',
      })
    );
  });

  test('transformPartyDetails should return appropriate data fields', async () => {
    expect(
      transformPartyDetails(PartyType.CHILDREN, PartyDetailsVariant.CHILD_MATTERS, {
        needsResolution: ['whoChildLiveWith'],
        junk: 'junk',
      })
    ).toEqual(
      expect.objectContaining({
        needsResolution: ['whoChildLiveWith'],
      })
    );
    expect(
      transformPartyDetails(PartyType.CHILDREN, PartyDetailsVariant.PERSONAL_DETAILS, {
        dateOfBirth: {
          year: '1987',
          month: '12',
          day: '12',
        },
        isDateOfBirthUnknown: 'No',
        approxDateOfBirth: {
          year: '1987',
          month: '12',
          day: '12',
        },
      })
    ).toEqual(
      expect.objectContaining({
        dateOfBirth: {
          year: '1987',
          month: '12',
          day: '12',
        },
        isDateOfBirthUnknown: 'No',
        approxDateOfBirth: {
          year: '',
          month: '',
          day: '',
        },
      })
    );
  });

  test('transformAddPeople should return appropriate data fields', async () => {
    const transformedData = transformAddPeople(
      PartyType.CHILDREN,
      { 'firstName-1': 'Dan', 'lastName-1': 'Roberts', 'firstName-2': 'Sam', 'lastName-2': 'Daniel' },
      mockReq.session.userCase.cd_children
    );

    expect(transformedData[0]).toEqual(
      expect.objectContaining({
        firstName: 'Dan',
        lastName: 'Roberts',
      })
    );
  });
});
