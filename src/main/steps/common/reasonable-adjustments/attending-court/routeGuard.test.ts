import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > attending-court > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_typeOfHearing: ['phonehearings'],
      },
      session: {
        userCase: {
          ra_typeOfHearing: ['phonehearings'],
          ra_noVideoAndPhoneHearing_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_noVideoAndPhoneHearing_subfield).toBe(undefined);
  });
});
