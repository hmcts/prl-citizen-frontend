import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../app/auth/user/oidc';
import { CaseWithId } from '../../../app/case/case';
import BreadcrumbController from '../../common/breadcrumb/BreadcrumbController';

import DashboardGetController from './DashboardGetController';

describe('DashboardGetController', () => {
  const getCaseDetailsMock = jest.spyOn(oidc, 'getCaseDetails');
  const controller = new DashboardGetController();
  const req = mockRequest();
  const res = mockResponse();
  req.session.reload = jest.fn(done => done());

  jest.spyOn(controller, 'get');
  jest.spyOn(BreadcrumbController, 'enable').mockResolvedValue();
  getCaseDetailsMock.mockResolvedValue(req.session.userCase);

  test('Should able to render the view', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = { id: '1234' } as unknown as CaseWithId;
    getCaseDetailsMock.mockResolvedValue([response]);
    await controller.get(req, res);
    expect(req.session.userCase).toBe(undefined);
    expect(req.session.save).toHaveBeenCalled();
    expect(controller.get).toHaveBeenCalledWith(req, res);
  });
});
