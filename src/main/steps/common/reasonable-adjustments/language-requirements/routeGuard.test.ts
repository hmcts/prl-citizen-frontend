import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > language-requirements > routeGuard', () => {
  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_languageNeeds: ['test'],
      },
      session: {
        userCase: {
          ra_languageNeeds: ['ra_languageNeeds', 'other'],
          ra_needInterpreterInCertainLanguage_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_languageNeeds).toStrictEqual(['ra_languageNeeds', 'other']);
    expect(req.session.userCase.ra_needInterpreterInCertainLanguage_subfield).toBe(undefined);
  });
});
