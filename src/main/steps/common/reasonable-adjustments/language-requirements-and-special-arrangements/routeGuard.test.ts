import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > intro > routeGuard', () => {
  test('should call next after saving session', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    const mockNext = jest.fn();

    await routeGuard.get(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should redirect to error page if session save throws', async () => {
    const req = mockRequest({});
    req.session.save = jest.fn().mockImplementationOnce(() => {
      throw new Error('session save failed');
    });
    const res = mockResponse();
    const mockNext = jest.fn();

    await routeGuard.get(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith('/reasonable-adjustments/error');
  });
});
