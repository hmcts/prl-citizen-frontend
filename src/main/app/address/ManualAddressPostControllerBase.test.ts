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
  test('ManualAddressPostControllerBase', async () => {
    req.body.citizenUserManualAddress1 = 'aaaa';
    req.body.citizenUserManualAddressTown = 'aaaa';
    req.body.citizenUserManualAddressPostcode = 'NE65LA';
    await controller.post(req, res);
    expect(req.session.userCase.citizenUserAddress1).toEqual('aaaa');
  });
});
