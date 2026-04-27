import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('RA > support-during-your-case > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {},
      session: {
        userCase: {},
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  test('should delete subfield from body when ra_disabilityRequirements is No', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: YesOrNo.NO,
        ra_disabilityRequirements_subfield: 'test',
      },
      session: {
        userCase: {
          ra_disabilityRequirements_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.body.ra_disabilityRequirements_subfield).toBeUndefined();
    expect(req.session.userCase.ra_disabilityRequirements_subfield).toBeUndefined();
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  test('should not delete subfield from body when ra_disabilityRequirements is Yes', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: YesOrNo.YES,
        ra_disabilityRequirements_subfield: 'test',
      },
      session: {
        userCase: {
          ra_disabilityRequirements_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.body.ra_disabilityRequirements_subfield).toBe('test');
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
