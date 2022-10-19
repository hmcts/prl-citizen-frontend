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

  test('Should not render the page when the guard validation fails', async () => {
    const req = mockRequest({
      params: {
        childId: 'junk-id',
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
});
