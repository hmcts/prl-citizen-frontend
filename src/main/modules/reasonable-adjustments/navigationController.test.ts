import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../steps/urls';

import { ReasonableAdjustementsNavigationController } from './navigationController';

describe('RA > navigationController', () => {
  const controller = new ReasonableAdjustementsNavigationController();

  test('getNextUrl should return /error when no caseData', () => {
    expect(controller.getNextUrl(undefined, mockRequest())).toBe(REASONABLE_ADJUSTMENTS_ERROR);
  });

  test('getNextUrl should return current url for default case', () => {
    const req = mockRequest();
    req.originalUrl = '/currentPage';

    expect(controller.getNextUrl(req.session.userCase, req)).toBe('/currentPage');
  });
});
