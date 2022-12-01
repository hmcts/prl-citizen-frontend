import AddressLookupPostControllerBase from '../../../../../app/address/AddressLookupPostControllerBase';

import AddressLookupPostController from './AddressLookupPostController';

describe('applicant1 > address > lookup > AddressLookupPostController', () => {
  let controller;

  beforeEach(() => {
    controller = new AddressLookupPostController({});
  });

  test('should extend AddressLookupPostControllerBase', async () => {
    expect(controller).toBeInstanceOf(AddressLookupPostControllerBase);
  });

  test('should call super constructor with correct params', async () => {
    expect(controller.fieldPrefix).toBe('respondent');
  });
});
