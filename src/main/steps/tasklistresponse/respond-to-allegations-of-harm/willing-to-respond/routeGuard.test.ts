import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('tasklistresponse > respond-to-allegations-of-harm > willing-to-respond > routeGuard', () => {
  test('post should delete response to allegations and redirect if aoh_wishToRespond is no', async () => {
    const req = mockRequest({
      body: { aoh_wishToRespond: 'No' },
      session: { userCase: { aoh_responseToAllegations: 'test data' } },
    });
    const res = mockResponse();
    const next = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.userCase.aoh_responseToAllegations).toBe(undefined);
    expect(req.session.save).toHaveBeenCalledWith(next);
  });

  test('post should call next if aoh_wishToRespond is not no', async () => {
    const req = mockRequest({
      body: { aoh_wishToRespond: 'Yes' },
      session: { userCase: { aoh_responseToAllegations: 'test data' } },
    });
    const res = mockResponse();
    const next = jest.fn();

    await routeGuard.post(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
