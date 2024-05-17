import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import ResponseSummaryConfirmationPostController from './postController';

describe('ResponseSummaryConfirmationPostController', () => {
  test('post', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.id = '12234567890';
    const partyDetails = [
      {
        id: '1',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          user: {
            idamId: '12234567890',
            email: '',
          },
        },
      },
    ];
    req.session.userCase.respondents = partyDetails;
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(req.session.save).not.toHaveBeenCalled();
  });
});
