import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { C100OrderTypes } from '../../../../app/case/definition';

import {routeGuard} from './routeGuard';

describe('OrderDetails Route Guard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      session:{
        userCase:{
          otherProceedings:{
            order:{
            "careOrders": [
              {
                "orderDetail": "",
                "caseNo": "",
                "orderDate": {
                  "year": "",
                  "month": "",
                  "day": ""
                },
                "currentOrder": "",
                "orderEndDate": {
                  "year": "",
                  "month": "",
                  "day": ""
                },
                "orderCopy": "Yes",
                "orderDocument": {
                  "id": "cb9204d3-d75a-464a-bec6-5a2c2b269daa",
                  "url": "http://dm-store-aat.service.core-compute-aat.internal/documents/cb9204d3-d75a-464a-bec6-5a2c2b269daa",
                  "filename": "applicant__care_order__16092022.xlsx",
                  "binaryUrl": "http://dm-store-aat.service.core-compute-aat.internal/documents/cb9204d3-d75a-464a-bec6-5a2c2b269daa/binary"
                }
              }
            ]
          }
          }
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
