import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DASHBOARD_URL } from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('Should render the cookie page with privatelaw service content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(DASHBOARD_URL);
  });
});
