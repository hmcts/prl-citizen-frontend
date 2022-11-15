import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { TermsAndConditionsGetController } from './get';

describe('TermsAndConditionsGetController', () => {
  const controller = new TermsAndConditionsGetController();

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest({
      additionalData: {
        req: mockRequest(),
      },
    });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });
});
