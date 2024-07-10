import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > needs-in-court > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['test'],
      },
      session: {
        userCase: {
          ra_travellingCourt: ['parkingspace', 'differentchair', 'other'],
          ra_parkingSpace_subfield: 'test',
          ra_differentTypeChair_subfield: 'test',
          ra_travellingCourtOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_travellingCourt).toStrictEqual(['parkingspace', 'differentchair', 'other']);
    expect(req.session.userCase.ra_parkingSpace_subfield).toBe(undefined);
    expect(req.session.userCase.ra_differentTypeChair_subfield).toBe(undefined);
    expect(req.session.userCase.ra_travellingCourtOther_subfield).toBe(undefined);
  });

  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['travellinghelp'],
      },
      session: {
        userCase: {
          ra_travellingCourt: ['parkingspace', 'differentchair', 'other'],
          ra_parkingSpace_subfield: 'test',
          ra_differentTypeChair_subfield: 'test',
          ra_travellingCourtOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_travellingCourt).toStrictEqual(['parkingspace', 'differentchair', 'other']);
    expect(req.session.userCase.ra_parkingSpace_subfield).toBe(undefined);
    expect(req.session.userCase.ra_differentTypeChair_subfield).toBe(undefined);
    expect(req.session.userCase.ra_travellingCourtOther_subfield).toBe(undefined);
  });
});
