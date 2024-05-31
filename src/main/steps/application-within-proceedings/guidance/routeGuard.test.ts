import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FeeDetailsResponse } from '../../../app/case/definition';

import { routeGuard } from './routeGuard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('AWP RouteGuard', () => {
  let req;
  let feeDetails;

  beforeEach(() => {
    req = mockRequest({
      params: {
        partyType: 'applicant',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          id: '1234',
          caseTypeOfApplication: 'FL401',
          caseInvites: [],
          respondents: '',
          respondentsFL401: '',
        },
        user: {
          id: '1234',
        },
      },
    });
    feeDetails = {
      feeAmount: 167,
      feeAmountText: '167',
      feeType: 'MOCK_FEE_TYPE',
    };
  });

  test('Should render the page when the guard validation passes', async () => {
    const res = mockResponse();
    const next = jest.fn();
    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);
    await routeGuard.get(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.session.userCase.awpFeeDetails).toEqual({
      feeAmount: 167,
      feeAmountText: '£167',
      feeType: 'MOCK_FEE_TYPE',
    });
  });

  test('Should render the page if awpSelectedApplicationDetails and awpFeeDetails already exist', async () => {
    req.session.applicationSettings = {
      awpSelectedApplicationDetails: {
        language: 'en',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
        applicationFeeAmount: 167,
      },
    };
    req.session.userCase.awpFeeDetails = {
      feeAmount: 167,
      feeAmountText: '£167',
      feeType: 'MOCK_FEE_TYPE',
    };

    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('Should fetch fee details and render the page if awpSelectedApplicationDetails exists and awpFeeDetails does not', async () => {
    req.session.applicationSettings = {
      awpSelectedApplicationDetails: {
        language: 'en',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
        applicationFeeAmount: undefined,
      },
    };
    req.session.userCase.awpFeeDetails = undefined;

    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('Should redirect to original url if error with fetching fee details', async () => {
    req.session.applicationSettings = {
      awpSelectedApplicationDetails: {
        language: 'en',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
        applicationFeeAmount: undefined,
      },
    };
    req.session.userCase.awpFeeDetails = undefined;
    req.originalUrl = '/applicant/application-within-proceedings/list-of-applications/1';

    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);
    const res = mockResponse();
    const next = jest.fn();
    req.session.save = undefined;

    await routeGuard.get(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/applicant/application-within-proceedings/list-of-applications/1');
    expect(next).not.toHaveBeenCalled();
  });

  test('Should render the page when the guard validation fails', async () => {
    req.params.applicationType = 'C3';
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should redirect to original url when error happens', async () => {
    req.session.save = undefined;
    req.originalUrl = '/applicant/application-within-proceedings/list-of-applications/1';
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/application-within-proceedings/list-of-applications/1');
    expect(next).not.toHaveBeenCalled();
  });
});
