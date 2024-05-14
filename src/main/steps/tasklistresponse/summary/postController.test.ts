import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import ResponseSummaryConfirmationPostController from './postController';

describe('ResponseSummaryConfirmationPostController', () => {
  const submitRespondentResponseMock = jest.spyOn(CosApiClient.prototype, 'submitRespondentResponse');
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
    submitRespondentResponseMock.mockResolvedValue(req.session.userCase);
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/summary-confirmation');
  });
});
