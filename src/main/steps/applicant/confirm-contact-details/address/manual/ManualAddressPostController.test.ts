import ManualAddressPostControllerBase from '../../../../../app/address/ManualAddressPostControllerBase';

import ManualAddressPostController from './ManualAddressPostController';

describe('applicant1 > address > manual > ManualAddressPostController', () => {
  let controller;

  beforeEach(() => {
    controller = new ManualAddressPostController({});
  });

  test('should extend ManualAddressPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(ManualAddressPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe('APPLICANT');
  });
});
