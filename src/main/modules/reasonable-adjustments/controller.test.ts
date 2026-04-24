/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { RAController } from './controller';

describe('ReasonableAdjustementsController', () => {
  test('handleBackNavigation should redirect correctly', () => {
    const req = mockRequest({
      session: {
        applicationSettings: {
          navfromRespondToApplication: true,
        },
      },
    });
    const res = mockResponse();
    RAController.handleBackNavigation(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/start');
  });
});
