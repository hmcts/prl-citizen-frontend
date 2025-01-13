import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('tasklistresponse > routeGuard', () => {
  test('should set navfromRespondToApplication to true, save session and call next', () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    routeGuard.get(req, res, next);
    expect(req.session.applicationSettings).toEqual({ navfromRespondToApplication: true });
    expect(req.session.save).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
