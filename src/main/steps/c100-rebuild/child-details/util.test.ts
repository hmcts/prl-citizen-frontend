import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { ChildrenDetails } from '../../../app/case/definition';

import { getChildDetails, getDataShape, transformFormData, updateChildDetails } from './util';

const dummyRequest = mockRequest({
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
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
    },
  },
});

describe('Add Children util', () => {
  test('getDataShape for add children details should return appropriate fields', async () => {
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
          sex: '',
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

  test('getChildDetails for child should return appropriate child details if the childId is valid', async () => {
    expect(getChildDetails(dummyRequest.session.userCase.cd_children, dummyRequest.params.childId)).toEqual(
      expect.objectContaining({
        firstName: 'Bob',
        lastName: 'Silly',
      })
    );
  });

  test('updateChildDetails for child should update the child details in the session the childId is valid', async () => {
    const childDetails = getChildDetails(dummyRequest.session.userCase.cd_children, dummyRequest.params.childId);
    const dataToUpdate = {
      ...childDetails,
      firstName: 'Bob1',
    };

    expect(updateChildDetails(dummyRequest.session.userCase.cd_children, dataToUpdate as ChildrenDetails)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: 'Bob1',
          lastName: 'Silly',
        }),
      ])
    );
  });

  test('transformFormData should return appropriate data field', async () => {
    expect(transformFormData('childMatters', { needsResolution: ['whoChildLiveWith'], junk: 'dummy' })).toEqual(
      expect.objectContaining({
        needsResolution: ['whoChildLiveWith'],
      })
    );
    expect(
      transformFormData('personalDetails', {
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
});
