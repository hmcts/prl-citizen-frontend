import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('complete-your-application-guidance RouteGuard', () => {
  test('Should delete all the forking journey related data from session when the page loads', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          applicationPayOnline: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(req.session.userCase).not.toContain('applicationPayOnline');
    expect(next).toHaveBeenCalled();
  });
});
