import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

const dummyData = {
  cd_children: [
    {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
      firstName: 'a',
      lastName: 'b',
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
  cd_otherChildren: [
    {
      id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
      firstName: 'a',
      lastName: 'b',
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
};

describe('Add children RouteGuard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925474',
      },
      session: {
        userCase: {
          ...dummyData,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails > no Id', async () => {
    const req = mockRequest({
      params: {
        childId: null,
      },
      session: {
        userCase: {
          ...dummyData,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails > Id not found', async () => {
    const req = mockRequest({
      params: {
        childId: '7a9092e3-69e0-43d6-9334-b63f6351b7c1',
      },
      session: {
        userCase: {
          ...dummyData,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).not.toBeCalledWith('error');
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });
});
