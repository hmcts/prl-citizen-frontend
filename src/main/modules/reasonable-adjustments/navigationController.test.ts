import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { ReasonableAdjustementsNavigationController } from './navigationController';

describe('RA > navigationController', () => {
  const controller = new ReasonableAdjustementsNavigationController();

  test('getNextUrl should return /error when no caseData', () => {
    expect(controller.getNextUrl(undefined, '/currentPage')).toBe('/error');
  });

  test('getNextUrl should return current url for default case', () => {
    const req = mockRequest();
    expect(controller.getNextUrl(req, '/currentPage')).toBe('/currentPage');
  });
});
