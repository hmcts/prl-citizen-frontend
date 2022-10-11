import { C100_START } from '../../../../main/steps/urls';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { LandingPageController } from './landingPageController';

jest.mock('axios');
let req, res;

describe('LandingPageController', () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    req.locals.C100Api.createCase.mockClear();
  });

  test('Should create case when CreateCase API gives success response and navigate to start page', async () => {
    req.locals.C100Api.createCase.mockResolvedValue({
      id: '1234567890',
    });

    const controller = new LandingPageController();

    await controller.get(req, res);

    expect(req.session.userCase).toHaveProperty('caseId', '1234567890');
    expect(res.redirect).toHaveBeenCalledWith(C100_START);
  });

  test('Should fail in creating a case when CreateCase API gives error response and not navigate', async () => {
    req.locals.C100Api.createCase.mockRejectedValue(new Error('error'));

    const controller = new LandingPageController();

    await controller.get(req, res);

    expect(req.session.userCase).not.toHaveProperty('caseId');
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
