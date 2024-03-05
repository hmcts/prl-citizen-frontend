import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > communication-help > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['test'],
      },
      session: {
        userCase: {
          ra_communicationHelp: ['signlanguage', 'other'],
          ra_signLanguageInterpreter_subfield: 'test',
          ra_communicationHelpOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_communicationHelp).toStrictEqual([]);
    expect(req.session.userCase.ra_signLanguageInterpreter_subfield).toBe(undefined);
    expect(req.session.userCase.ra_communicationHelpOther_subfield).toBe(undefined);
  });

  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['commhelp'],
      },
      session: {
        userCase: {
          ra_communicationHelp: ['signlanguage', 'other'],
          ra_signLanguageInterpreter_subfield: 'test',
          ra_communicationHelpOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_communicationHelp).toStrictEqual(['signlanguage', 'other']);
    expect(req.session.userCase.ra_signLanguageInterpreter_subfield).toBe(undefined);
    expect(req.session.userCase.ra_communicationHelpOther_subfield).toBe(undefined);
  });
});
