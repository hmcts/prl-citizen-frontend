import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { CITIZEN_HOME_URL } from './urls';

import { getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = CITIZEN_HOME_URL;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe('/dashboard-v1');
    });

    // it('step with content', () => {
    //   mockReq.originalUrl = CITIZEN_HOME_URL;
    //   const data = {};
    //   stepsWithContentEdgecase
    //   expect(getNextStepUrl(mockReq, data)).toBe('/service-type');
    // });
  });
});
