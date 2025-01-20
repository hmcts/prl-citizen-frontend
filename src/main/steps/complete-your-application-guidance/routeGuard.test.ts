import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../app/case/definition';

import { routeGuard } from './routeGuard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('complete-your-application-guidance RouteGuard', () => {
  test('Should delete all the screening journey related data from session when the page loads', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          applicationPayOnline: YesOrNo.YES,
          legalRepresentativeForProceedings: YesOrNo.YES,
          legalRepresentativeForApplication: YesOrNo.NO,
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        feeAmount: '232',
        errorRetrievingResponse: '',
      },
    });
    await routeGuard.get(req, res, next);
    expect(req.session.userCase).not.toContain('applicationPayOnline');
    expect(req.session.userCase).not.toContain('legalRepresentativeForProceedings');
    expect(req.session.userCase).not.toContain('legalRepresentativeForApplication');
    expect(req.session.userCase.c100ApplicationFees).toBe('232');
    expect(next).toHaveBeenCalled();
  });

  test('Should load the page without deleting screening journey related data from session when userCase is not available', async () => {
    const req = mockRequest({
      session: {
        userCase: undefined,
      },
    });
    const res = mockResponse();
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        feeAmount: '232',
        errorRetrievingResponse: '',
      },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase.c100ApplicationFees).toBe('232');
    expect(next).toHaveBeenCalled();
  });

  test('Should not set fee amount when errorRetrievingResponse present', async () => {
    const req = mockRequest({
      session: {
        userCase: undefined,
      },
    });
    const res = mockResponse();
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        feeAmount: undefined,
        errorRetrievingResponse: 'Error',
      },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase).toBe(undefined);
    expect(next).toHaveBeenCalled();
  });

  test('Should call next when api throws error', async () => {
    const req = mockRequest({
      session: {
        userCase: undefined,
      },
    });
    const res = mockResponse();
    mockedAxios.get.mockRejectedValueOnce({
      data: {
        feeAmount: undefined,
        errorRetrievingResponse: 'Error',
      },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase).toBe(undefined);
    expect(next).toHaveBeenCalled();
  });

  test('Post should delete c100ApplicationFees', async () => {
    const req = mockRequest({ session: { userCase: { c100ApplicationFees: '232' } } });
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.post(req, res, next);
    expect(req.session.userCase.c100ApplicationFees).toBe(undefined);
    expect(next).toHaveBeenCalled();
  });
});
