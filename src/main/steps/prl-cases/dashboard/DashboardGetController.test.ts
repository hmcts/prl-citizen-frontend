import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../app/auth/user/oidc';
import { RAProvider } from '../../../modules/reasonable-adjustments';
import BreadcrumbController from '../../common/breadcrumb/BreadcrumbController';

import DashboardGetController from './DashboardGetController';

describe('DashboardGetController', () => {
  const getCaseDetailsMock = jest.spyOn(oidc, 'getCaseDetails');
  const controller = new DashboardGetController();
  const req = mockRequest({ session: { save: () => req.session } });
  const res = mockResponse();

  jest.spyOn(controller, 'get');
  jest.spyOn(BreadcrumbController, 'enable').mockResolvedValue();
  jest.spyOn(RAProvider, 'resetData').mockResolvedValue();
  getCaseDetailsMock.mockResolvedValue(req.session.userCase);

  test('Should able to render the view', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    await controller.get(req, res);
    expect(req.session.userCaseList).toEqual(
      expect.objectContaining({
        id: '1234',
      })
    );
    expect(controller.get).toHaveBeenCalledWith(req, res);
  });
});
