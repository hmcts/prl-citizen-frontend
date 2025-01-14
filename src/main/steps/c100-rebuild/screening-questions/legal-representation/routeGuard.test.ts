import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe('c100 > screening questions > legal representation > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean permission fields and call next when legal representation is yes', async () => {
    req.body.sq_legalRepresentation = 'Yes';
    req.session.userCase = {
      sq_legalRepresentationApplication: 'Yes',
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      sq_legalRepresentationApplication: 'Yes',
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should clean permission fields and call next when legal representation is no', async () => {
    req.body.sq_legalRepresentation = 'No';
    req.session.userCase = {
      sq_legalRepresentationApplication: 'Yes',
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({});
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
