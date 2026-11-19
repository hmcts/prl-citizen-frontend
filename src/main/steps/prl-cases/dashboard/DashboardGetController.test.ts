import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../app/auth/user/oidc';
import { CaseWithId } from '../../../app/case/case';
import { GetController } from '../../../app/controller/GetController';
import { RAProvider } from '../../../modules/reasonable-adjustments';
import BreadcrumbController from '../../common/breadcrumb/BreadcrumbController';

import DashboardGetController from './DashboardGetController';

describe('DashboardGetController', () => {
  const getCaseDetailsMock = jest.spyOn(oidc, 'getCaseDetails');
  const baseGetMock = jest.spyOn(GetController.prototype, 'get').mockResolvedValue();
  const controller = new DashboardGetController();
  let req;
  let res;

  jest.spyOn(controller, 'get');
  jest.spyOn(BreadcrumbController, 'enable').mockResolvedValue();
  jest.spyOn(RAProvider, 'resetData').mockResolvedValue();

  beforeEach(() => {
    jest.clearAllMocks();
    req = mockRequest();
    res = mockResponse();
    req.session.userCaseList = [];
    getCaseDetailsMock.mockReset().mockResolvedValue([]);
  });

  test('Should able to render the view', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = { id: '1234' } as unknown as CaseWithId;
    getCaseDetailsMock.mockResolvedValue([response]);
    await controller.get(req, res);
    expect(req.session.userCase).toBe(undefined);
    expect(req.session.save).toHaveBeenCalled();
    expect(controller.get).toHaveBeenCalledWith(req, res);
  });

  test('Shows the blocked activation message once on the dashboard', async () => {
    req.session.caseActivationBlocked = true;

    await controller.get(req, res);

    expect(res.locals.showActivationBlockedMessage).toBe(true);
    expect(req.session.caseActivationBlocked).toBeUndefined();
    expect(req.session.save).toHaveBeenCalled();
    expect(baseGetMock).toHaveBeenCalledWith(req, res);

    await controller.get(req, res);

    expect(res.locals.showActivationBlockedMessage).toBe(false);
  });

  test('Does not show a blocked activation message on a normal dashboard visit', async () => {
    await controller.get(req, res);

    expect(res.locals.showActivationBlockedMessage).toBe(false);
  });

  test('Keeps the message visible when fetching the case list fails', async () => {
    req.session.caseActivationBlocked = true;
    getCaseDetailsMock.mockRejectedValueOnce(new Error('Case list unavailable'));

    await controller.get(req, res);

    expect(res.locals.showActivationBlockedMessage).toBe(true);
    expect(req.session.caseActivationBlocked).toBeUndefined();
    expect(baseGetMock).toHaveBeenCalledWith(req, res);
  });
});
