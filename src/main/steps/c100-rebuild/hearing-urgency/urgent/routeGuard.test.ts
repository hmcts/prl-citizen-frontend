import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe('c100 > hearing urgency > urgent > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean hearing urgency details and call next', async () => {
    req.body.hu_urgentHearingReasons = 'No';
    req.session.userCase = {
      hu_reasonOfUrgentHearing: ['riskOfSafety', 'riskOfChildAbduction'],
      hu_otherRiskDetails: 'test',
      hu_timeOfHearingDetails: 'Yes',
      hu_hearingWithNext48HrsDetails: 'Yes',
      hu_hearingWithNext48HrsMsg: 'Yes',
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({});
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
