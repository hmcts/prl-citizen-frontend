import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { C100OrderTypes } from '../../../../app/case/definition';

import {routeGuard} from './routeGuard';

describe('OrderDetails Route Guard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      query: {
        orderType: C100OrderTypes.CARE_ORDER,
      },
      session:{
        userCase:{
          courtProceedingsOrders:[C100OrderTypes.CARE_ORDER]
        }
      }
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next)
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails', async () => {
    const req = mockRequest({
      query: {
        orderType: C100OrderTypes.EMERGENCY_PROTECTION_ORDER,
      },
      session:{
        userCase:{
          courtProceedingsOrders:[C100OrderTypes.CARE_ORDER]
        }
      }
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith('error');
    expect(next).not.toHaveBeenCalled();
  });
});
