import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../case/case';

import ManualAddressPostControllerBase from './ManualAddressPostControllerBase';

describe('ManualAddressPostControllerBase', () => {
  //let fields;
  let controller;
  let req;
  let res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    controller = new ManualAddressPostControllerBase({}, FieldPrefix.APPLICANT1);
  });

  test('Should redirect to same page on error', async () => {
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/confirm-contact-details/address/manual');
  });
});
