import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('applicant > confidentiality > details know > route guard', () => {
  let req;
  let res;
  const next = jest.fn();
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean confidentiality data if details known is yes', async () => {
    req.body = {
      detailsKnown: 'Yes',
    };
    req.params.applicantId = '123';
    req.session.userCase = {
      appl_allApplicants: [{ id: '123', startAlternative: 'Yes', contactDetailsPrivateAlternative: ['address'] }],
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      appl_allApplicants: [{ id: '123' }],
    });
    expect(next).toHaveBeenCalled();
  });

  test('should clean confidentiality data if details known is no', async () => {
    req.body = {
      detailsKnown: 'No',
    };
    req.params.applicantId = '123';
    req.session.userCase = {
      appl_allApplicants: [{ id: '123', start: 'Yes', contactDetailsPrivate: ['address'] }],
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      appl_allApplicants: [{ id: '123' }],
    });
    expect(next).toHaveBeenCalled();
  });

  test('should not clean confidentiality data if details known is not present', async () => {
    req.body = {
      detailsKnown: undefined,
    };
    req.params.applicantId = '123';
    req.session.userCase = {
      appl_allApplicants: [{ id: '123', start: 'Yes', contactDetailsPrivate: ['address'] }],
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      appl_allApplicants: [{ id: '123', start: 'Yes', contactDetailsPrivate: ['address'] }],
    });
    expect(next).toHaveBeenCalled();
  });
});
