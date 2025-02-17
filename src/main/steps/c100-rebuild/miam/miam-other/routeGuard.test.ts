import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('MIAM valid exempt reasons Route Guard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          miam_nonAttendanceReasons: ['domesticViolence', 'validExemption'],
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
      session: {
        userCase: {
          miam_nonAttendanceReasons: ['urgentHearing'],
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('error');
    expect(next).not.toHaveBeenCalled();
  });

  test('post should clean miam no mediator reasons if not attending reasons is not can not access mediator', async () => {
    const req = mockRequest({
      body: {
        miam_notAttendingReasons: 'under18',
      },
      session: {
        userCase: {
          miam_noMediatorReasons: 'noAppointmentAvailable',
          miam_noAppointmentAvailableDetails: 'test',
          miam_unableToAttainDueToDisablityDetails: 'test',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({});
    expect(req.session.save).toHaveBeenCalled();
  });
});
