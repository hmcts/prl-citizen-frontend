import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { routeGuard } from './routeGuard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const fetchAWPFeeCodeDetailsMock = jest.spyOn(CosApiClient.prototype, 'fetchAWPFeeCodeDetails');

describe('AWP help with fees RouteGuard', () => {
  let req;

  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'request-more-time',
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
    fetchAWPFeeCodeDetailsMock.mockResolvedValue(req.session.userCase);
  });

  test('Should fetch fee and render page for agreement for request', async () => {
    req.session.userCase.awp_agreementForRequest = 'Yes';
    req.session.userCase.awp_informOtherParties = 'Yes';
    req.session.userCase.awp_cancelDelayHearing = 'Yes';

    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(
      '/applicant/application-within-proceedings/C2/request-more-time/document-upload'
    );
  });

  test('Should redirect to error page if an error is thrown', async () => {
    req.session = undefined;
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
  });
});
