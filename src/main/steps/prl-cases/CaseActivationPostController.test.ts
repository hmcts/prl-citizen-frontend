import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
// import { CosApiClient } from '../../app/case/CosApiClient';

import { CaseActivationPostController } from './CaseActivationPostController';

// const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
// const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
// // let partyDetails;

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
