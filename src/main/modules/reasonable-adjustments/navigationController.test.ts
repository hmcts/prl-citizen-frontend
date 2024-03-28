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

  test('getNextUrl should return correct url when ra_disabilityRequirements has mulitple entries', () => {
    const req = mockRequest({
      session: {
        userCase: {
          ra_disabilityRequirements: ['helpTravellingMovingBuildingSupport', 'travellinghelp'],
        },
      },
    });
    req.originalUrl = '/applicant/reasonable-adjustments/needs-in-court';

    expect(controller.getNextUrl(req.session.userCase, req)).toBe('/respondent/reasonable-adjustments/needs-in-court');
  });
});
