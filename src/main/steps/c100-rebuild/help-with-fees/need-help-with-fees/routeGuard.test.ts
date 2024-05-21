import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('c100ApplicationFees Route Guard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          miam_nonAttendanceReasons: ['domesticViolence', 'urgentHearing'],
        },
      },
    });
    const res = mockResponse();
    jest.mock('../../../../app/auth/service/get-service-auth-token', () => ({
      getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
    }));
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        feeAmount: '232',
        errorRetrievingResponse: '',
      },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase).toEqual({
      miam_nonAttendanceReasons: ['domesticViolence', 'urgentHearing'],
      c100ApplicationFees: '232',
    });
    expect(req.session.userCase.c100ApplicationFees).toBe('232');
    expect(next).toHaveBeenCalled();
  });
  test('Should render the page when the guard validation passes with out usercase', async () => {
    const req = mockRequest({
      session: {
        userCase: {},
      },
    });
    const res = mockResponse();
    jest.mock('../../../../app/auth/service/get-service-auth-token', () => ({
      getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
    }));
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        feeAmount: '232',
        errorRetrievingResponse: '',
      },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase).toEqual({
      c100ApplicationFees: '232',
    });
    expect(req.session.userCase.c100ApplicationFees).toBe('232');
    expect(next).toHaveBeenCalled();
  });

  test('Should render the page when the guard validation fails', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const oldUserCase = req.session.userCase;
    mockedAxios.get.mockRejectedValueOnce;
    req.locals.C100Api.updateCase.mockRejectedValue({
      message: 'MOCK_ERROR',
      response: { status: 500, data: 'Error' },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase).toEqual(oldUserCase);
    expect(next).toHaveBeenCalled();
  });
});
