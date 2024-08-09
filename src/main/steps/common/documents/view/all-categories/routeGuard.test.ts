import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../../app/case/CosApiClient';
import { HearingData } from '../../../../../app/case/case';

import { routeGuard } from './routeGuard';

const retrieveCaseAndHearingsMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseAndHearings');

describe('documents > view > all-documents > routeGuard', () => {
  test('should fetch and save data and call next', async () => {
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          id: '1234',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    retrieveCaseAndHearingsMock.mockResolvedValue({
      caseData: req.session.userCase,
      hearingData: {} as unknown as HearingData,
    });

    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should catch and throw new error', async () => {
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          id: '1234',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    retrieveCaseAndHearingsMock.mockRejectedValue({ status: '500' });

    await expect(routeGuard.get(req, res, next)).rejects.toThrow();
  });
});
