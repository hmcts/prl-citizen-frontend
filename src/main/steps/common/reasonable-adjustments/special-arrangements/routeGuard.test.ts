import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > special-arrangements > routeGuard', () => {
  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_specialArrangements: ['test'],
      },
      session: {
        userCase: {
          ra_specialArrangements: ['screens'],
          ra_specialArrangementsOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_specialArrangements).toStrictEqual(['screens']);
    expect(req.session.userCase.ra_specialArrangementsOther_subfield).toBe(undefined);
  });
});
