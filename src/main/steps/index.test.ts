import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import {
  CITIZEN_HOME_URL,
  RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPOND_TO_APPLICATION,
} from './urls';

import { getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = CITIZEN_HOME_URL;
      mockReq.route.path = CITIZEN_HOME_URL;
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe('/dashboard');
    });

    it('redirects from keep details private confirmed to tasklistresponse', () => {
      mockReq.originalUrl = RESPONDENT_PRIVATE_DETAILS_CONFIRMED;
      mockReq.route.path = RESPONDENT_PRIVATE_DETAILS_CONFIRMED;
      mockReq.session.applicationSettings = { navfromRespondToApplication: true };
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(RESPOND_TO_APPLICATION);
    });

    it('redirects from keep details private not confirmed to tasklistresponse', () => {
      mockReq.originalUrl = RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED;
      mockReq.route.path = RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED;
      mockReq.session.applicationSettings = { navfromRespondToApplication: true };
      const data = {};
      expect(getNextStepUrl(mockReq, data)).toBe(RESPOND_TO_APPLICATION);
    });

    // it('step with content', () => {
    //   mockReq.originalUrl = CITIZEN_HOME_URL;
    //   const data = {};
    //   stepsWithContentEdgecase
    //   expect(getNextStepUrl(mockReq, data)).toBe('/service-type');
    // });
  });
});
