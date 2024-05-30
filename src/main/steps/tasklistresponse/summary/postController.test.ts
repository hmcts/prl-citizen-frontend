import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { PCQProvider } from '../../../modules/pcq';
import { PcqController } from '../../../modules/pcq/controller';

import ResponseSummaryConfirmationPostController from './postController';

describe('ResponseSummaryConfirmationPostController', () => {
  const pcqGetControllerMock = jest.spyOn(PcqController.prototype, 'launch');
  test('post', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase = {
      id: '12234567890',
      caseInvites: [
        {
          id: '1',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      caseTypeOfApplication: 'C100',
    };
    req.session.user = {
      id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
    };
    const partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: '',
          },
        },
      },
    ];
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(false));
    req.session.userCase.respondents = partyDetails;
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(pcqGetControllerMock).not.toHaveBeenCalled();
  });

  test('submit C7 Response', async () => {
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
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    req.session.userCase.respondents = partyDetails;
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(pcqGetControllerMock).toHaveBeenCalled();
  });
});
