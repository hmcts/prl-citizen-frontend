import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe('c100 > screening questions > permissions why > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean permissions why subfields and call next', async () => {
    req.body.sq_permissionsWhy = [];
    req.session.userCase = {
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
      sq_doNotHaveParentalResponsibility_subfield: 'test',
      sq_courtOrderPrevent_subfield: 'test',
      sq_anotherReason_subfield: 'test',
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
