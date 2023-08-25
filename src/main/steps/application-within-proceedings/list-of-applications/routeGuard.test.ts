import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('AWP list of applications RouteGuard', () => {
  let req;

  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          id: '1234',
          caseTypeOfApplication: 'FL401',
          caseInvites: [],
          respondents: '',
          respondentsFL401: '',
        },
        user: {
          id: '1234',
        },
      },
    });
  });

  test('Should render the page and save session when the guard validation passes', async () => {
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
  });

  test('Should redirect to dashboard if userCase does not exist', async () => {
    req.session.userCase = undefined;
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

  test('Should redirect to error page if an error is thrown', async () => {
    req.session.save = undefined;
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
  });
});
