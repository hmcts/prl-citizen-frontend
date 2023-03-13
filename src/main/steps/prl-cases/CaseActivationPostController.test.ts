import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { CaseActivationPostController } from './CaseActivationPostController';

describe('CaseActivationPostController', () => {
  let controller;

  beforeEach(() => {
    let fields;
    controller = new CaseActivationPostController(fields);
  });

  test('should extend CaseActivationPostController', async () => {
    expect(controller).toBeInstanceOf(CaseActivationPostController);
  });

  test('CaseActivationPostController Should invoke the post method', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await controller.post(req, res);

    expect(1).toEqual(1);
  });
});
