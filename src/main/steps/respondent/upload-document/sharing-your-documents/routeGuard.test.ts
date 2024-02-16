import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('sharing-the-documents routeGuard', () => {
  const userCase = {
    id: '1234',
    haveReasonForDocNotToBeShared: 'No',
    reasonsToNotSeeTheDocument: ['test reason'],
    reasonsToRestrictDocument: 'test reason restrict document',
  };

  test('should delete data when haveReasonForDocNotToBeShared is no', async () => {
    const req = mockRequest({
      userCase,
    });
    const res = mockResponse();
    const next = jest.fn();
    req.session.save = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.save).toHaveBeenCalledWith(next);
    expect(req.session.userCase.reasonsToRestrictDocument).toBeUndefined();
    expect(req.session.userCase.reasonsToNotSeeTheDocument).toStrictEqual([]);
  });

  test('should not delete data when haveReasonForDocNotToBeShared is yes', async () => {
    userCase.haveReasonForDocNotToBeShared = 'Yes';
    const req = mockRequest({
      userCase,
    });
    const res = mockResponse();
    const next = jest.fn();
    req.session.save = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.save).not.toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual(userCase);
    expect(next).toHaveBeenCalled();
  });
});
