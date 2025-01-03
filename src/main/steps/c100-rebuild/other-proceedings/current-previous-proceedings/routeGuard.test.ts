import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe('c100 > other proceedings > current previous proceedings > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean current and previous proceedings and call next', async () => {
    req.body.op_childrenInvolvedCourtCase = 'No';
    req.body.op_courtOrderProtection = 'No';
    req.session.userCase = {
      op_courtProceedingsOrders: ['careOrders', 'emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
      op_otherProceedings: {
        order: {
          careOrders: [
            {
              orderCopy: '',
            },
            {
              orderCopy: 'Yes',
            },
            {
              orderCopy: 'No',
            },
            {
              orderCopy: 'Yes',
              orderDocument: {
                id: 'doc1',
              },
            },
          ],
          emergencyProtectionOrders: [
            {
              orderCopy: '',
            },
          ],
          otherOrders: [
            {
              orderCopy: 'Yes',
            },
          ],
          supervisionOrders: [
            {
              orderCopy: '',
            },
          ],
        },
      },
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({});
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
