import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('AWP RouteGuard', () => {
  const req = mockRequest({
    params: {
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

  test('Should render the page when the guard validation passes', async () => {
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should render the page if awpApplicationDetails already exists', async () => {
    req.session.applicationSettings = {
      awpApplicationDetails: {
        language: 'en',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
    };
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails', async () => {
    req.params.applicationType = 'C3';
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });

  test('Should not render the page if userCase not present', async () => {
    req.session.userCase = undefined;
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });
});
