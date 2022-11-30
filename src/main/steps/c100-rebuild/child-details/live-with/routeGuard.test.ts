import { peopleMockRequest } from '../../../../../test/unit/mocks/mocked-requests/people-mock';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('Add children RouteGuard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(peopleMockRequest, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails > no Id', async () => {
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(
      {
        ...peopleMockRequest,
        params: {
          ...peopleMockRequest.params,
          childId: null,
        },
      },
      res,
      next
    );
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails > Id not found', async () => {
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(
      {
        ...peopleMockRequest,
        params: {
          ...peopleMockRequest.params,
          childId: 'junk-id',
        },
      },
      res,
      next
    );
    expect(res.redirect).not.toHaveBeenCalledWith('error');
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });
});
