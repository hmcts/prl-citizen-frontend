import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { ContactUsGetController } from './get';

describe('ContactUsGetController', () => {
  const controller = new ContactUsGetController();

  test('Should render the contact us page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalled;
  });
});
