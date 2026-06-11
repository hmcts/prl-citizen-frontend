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

  test('should delete subfield from body when ra_assistanceRequirements is No', () => {
    const req = mockRequest({
      body: {
        ra_assistanceRequirements: YesOrNo.NO,
        ra_assistanceRequirements_subfield: 'test',
      },
      session: {
        userCase: {
          ra_assistanceRequirements_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.body.ra_assistanceRequirements_subfield).toBeUndefined();
    expect(req.session.userCase.ra_assistanceRequirements_subfield).toBeUndefined();
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  test('should not delete subfield from body when ra_assistanceRequirements is Yes', () => {
    const req = mockRequest({
      body: {
        ra_assistanceRequirements: YesOrNo.YES,
        ra_assistanceRequirements_subfield: 'test',
      },
      session: {
        userCase: {
          ra_assistanceRequirements_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.body.ra_assistanceRequirements_subfield).toBe('test');
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
