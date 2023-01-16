import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { PRL_C1AAbuseTypes } from '../../../../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('C1A Saftey Concers child report abuse RouteGuard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      params: {
        abuseType: PRL_C1AAbuseTypes.FINANCIAL_ABUSE,
      },
      session: {
        userCase: {
          PRL_c1A_concernAboutChild: [PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE, PRL_C1AAbuseTypes.FINANCIAL_ABUSE],
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails', async () => {
    const req = mockRequest({
      params: {
        abuseType: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE,
      },
      session: {
        userCase: {
          PRL_c1A_concernAboutChild: [PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE, PRL_C1AAbuseTypes.FINANCIAL_ABUSE],
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });
});
