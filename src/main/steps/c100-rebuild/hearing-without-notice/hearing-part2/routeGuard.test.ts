import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe('c100 > hearing without notice > hearing part 2 > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean hearing without notice details and call next', async () => {
    req.body.hwn_doYouNeedAWithoutNoticeHearing = 'No';
    req.body.hwn_doYouNeedAWithoutNoticeHearing = 'No';
    req.session.userCase = {
      hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
      hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({});
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
