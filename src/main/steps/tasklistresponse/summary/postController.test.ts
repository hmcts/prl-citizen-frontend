/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { PCQProvider } from '../../../modules/pcq';
import { PcqController } from '../../../modules/pcq/controller';

import ResponseSummaryConfirmationPostController from './postController';

describe('ResponseSummaryConfirmationPostController', () => {
  const submitC7ResponseMock = jest.spyOn(CosApiClient.prototype, 'submitC7Response');
  const pcqLaunchMock = jest.spyOn(PcqController.prototype, 'launch');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('post (skips PCQ when disabled)', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase = {
      id: 'case-id',
      caseInvites: [],
      caseTypeOfApplication: 'C100',
    } as any;
    req.session.user = { id: 'user-id' } as any;

    // stub client so it never throws (though we won't reach it)
    submitC7ResponseMock.mockResolvedValue({} as any);
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockResolvedValueOnce(false);

    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);

    expect(pcqLaunchMock).not.toHaveBeenCalled();
  });

  test('submit C7 Response (fires PCQ when enabled)', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase = {
      id: 'case-id',
      caseInvites: [],
      caseTypeOfApplication: 'C100',
    } as any;
    req.session.user = { id: 'user-id', accessToken: 'token' } as any;

    // stub client so it never throws
    submitC7ResponseMock.mockResolvedValue({} as any);
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockResolvedValueOnce(true);
    jest.spyOn(PCQProvider, 'getReturnUrl').mockReturnValueOnce('/pcq');

    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);

    expect(pcqLaunchMock).toHaveBeenCalled();
  });

  test('submit C7 Response should map data and redirect', async () => {
    const req = mockRequest({});
    const res = mockResponse();

    req.session.save = jest.fn(cb => cb());

    req.session.user = { id: '12234567890', accessToken: 'token' } as any;

    req.session.userCase = {
      id: '12234567890',
      state: {},
      caseTypeOfApplication: 'C100',
      caseInvites: [{ id: '12234567890', value: { invitedUserId: '12234567890', partyId: '12234567890' } }],
      respondents: [
        {
          id: '12234567890',
          value: {
            firstName: '',
            lastName: '',
            email: '',
            address: {
              addressLine1: '',
              addressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
            user: { idamId: '12234567890', email: '', pcqId: '1234' },
            phoneNumber: '1234',
            dateOfBirth: '1/1/2020',
          },
        },
      ],
      user: { idamId: '12234567890', email: '', pcqId: '1234' },
    } as any;

    jest.spyOn(PCQProvider, 'isComponentEnabled').mockResolvedValueOnce(false);

    submitC7ResponseMock.mockResolvedValue(req.session.userCase);

    const controller = new ResponseSummaryConfirmationPostController({});
    submitC7ResponseMock.mockReturnValueOnce(req.session.userCase);
    await controller.post(req, res);
    // flush the microtask queue so session.save callback has run
    // because the implementation has an async calling an async with no wait
    // when we fix that we can take this out
    await new Promise<void>(resolve => setImmediate(resolve));

    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase).toMatchObject({
      id: '12234567890',
      caseTypeOfApplication: 'C100',
      caseInvites: expect.any(Array),
      respondents: expect.any(Array),
      user: expect.objectContaining({ idamId: '12234567890', pcqId: '1234' }),
    });
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/summary-confirmation');
  });
});
