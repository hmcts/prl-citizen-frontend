import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > support-for-court-hearing > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['test'],
      },
      session: {
        userCase: {
          ra_supportCourt: ['assistance'],
          ra_supportWorkerCarer_subfield: 'test',
          ra_friendFamilyMember_subfield: 'test',
          ra_therapyAnimal_subfield: 'test',
          ra_supportCourtOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_supportCourt).toStrictEqual([]);
    expect(req.session.userCase.ra_supportWorkerCarer_subfield).toBe(undefined);
    expect(req.session.userCase.ra_friendFamilyMember_subfield).toBe(undefined);
    expect(req.session.userCase.ra_therapyAnimal_subfield).toBe(undefined);
    expect(req.session.userCase.ra_supportCourtOther_subfield).toBe(undefined);
  });

  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['hearingsupport'],
      },
      session: {
        userCase: {
          ra_supportCourt: ['assistance'],
          ra_supportWorkerCarer_subfield: 'test',
          ra_friendFamilyMember_subfield: 'test',
          ra_therapyAnimal_subfield: 'test',
          ra_supportCourtOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_supportCourt).toStrictEqual(['assistance']);
    expect(req.session.userCase.ra_supportWorkerCarer_subfield).toBe(undefined);
    expect(req.session.userCase.ra_friendFamilyMember_subfield).toBe(undefined);
    expect(req.session.userCase.ra_therapyAnimal_subfield).toBe(undefined);
    expect(req.session.userCase.ra_supportCourtOther_subfield).toBe(undefined);
  });
});
