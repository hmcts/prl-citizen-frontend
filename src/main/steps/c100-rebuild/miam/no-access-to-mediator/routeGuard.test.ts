import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('MIAM valid exempt reasons Route Guard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          miam_notAttendingReasons: 'canNotAccessMediator',
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
          miam_notAttendingReasons: 'applyingForWithoutNoticeHearing',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('error');
    expect(next).not.toHaveBeenCalled();
  });
});
