import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import ReasonableAdjustmentsConfirmationPostController from './postController';

describe('RA > confirmation > postController', () => {
  const controller = new ReasonableAdjustmentsConfirmationPostController({});

  test('should redirect to correct url when onlyContinue not present', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.originalUrl = '/c100-rebuild/reasonable-adjustments/confirmation';

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/reasonable-adjustments/confirmation');
  });

  test('should redirect to correct url when onlyContinue is present', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body.onlyContinue = 'onlyContinue';

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/task-list/applicant');
  });
});
