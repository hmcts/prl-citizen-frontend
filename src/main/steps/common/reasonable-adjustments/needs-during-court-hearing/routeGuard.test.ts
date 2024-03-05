import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > needs-during-court-hearing > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['test'],
      },
      session: {
        userCase: {
          ra_feelComportable: ['appropriatelighting', 'other'],
          ra_appropriateLighting_subfield: 'test',
          ra_feelComportableOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_feelComportable).toStrictEqual([]);
    expect(req.session.userCase.ra_appropriateLighting_subfield).toBe(undefined);
    expect(req.session.userCase.ra_feelComportableOther_subfield).toBe(undefined);
  });

  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['hearingcomfort'],
      },
      session: {
        userCase: {
          ra_feelComportable: ['appropriatelighting', 'other'],
          ra_appropriateLighting_subfield: 'test',
          ra_feelComportableOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_feelComportable).toStrictEqual(['appropriatelighting', 'other']);
    expect(req.session.userCase.ra_appropriateLighting_subfield).toBe(undefined);
    expect(req.session.userCase.ra_feelComportableOther_subfield).toBe(undefined);
  });
});
