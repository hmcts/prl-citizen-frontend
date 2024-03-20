import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { routeGuard } from './routeGuard';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
const retrieveCaseHearingsByCaseIddMock = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');

describe('common > documents > all-documents > routeGuard', () => {
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
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    retrieveCaseHearingsByCaseIddMock.mockResolvedValue(req.session.userCase);

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
    retrieveByCaseIdMock.mockRejectedValue({ status: '500' });

    await expect(routeGuard.get(req, res, next)).rejects.toThrow();
  });
});
