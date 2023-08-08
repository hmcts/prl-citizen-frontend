import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { DASHBOARD_URL } from './urls';

import { getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = DASHBOARD_URL;
      mockReq.route.path = DASHBOARD_URL;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe('/dashboard');
    });
  });
});
