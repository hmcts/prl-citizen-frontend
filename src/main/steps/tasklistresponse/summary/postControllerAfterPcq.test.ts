import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { ResponseSummaryConfirmationPostController } from './postControllerAfterPcq';

describe('ResponseSummaryConfirmationPostController', () => {
  const submitRespondentResponseMock = jest.spyOn(CosApiClient.prototype, 'submitC7Response');
  test('post', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const partyDetails = [
      {
        id: '12234567890',
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
    req.session.userCase = {
      id: '12234567890',
      respondents: partyDetails,
      caseTypeOfApplication: 'C100',
      caseInvites: [
        {
          id: '1',
          value: {
            partyId: '12234567890',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '12234567890',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
    };
    req.session.user.id = '12234567890';
    submitRespondentResponseMock.mockResolvedValue(req.session.userCase);
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled;
  });
});
