import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../app/case/definition';

import { routeGuard } from './routeGuard';

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
    routeGuard.get(req, res, next);
    expect(req.session.userCase).not.toContain('applicationPayOnline');
    expect(req.session.userCase).not.toContain('legalRepresentativeForProceedings');
    expect(req.session.userCase).not.toContain('legalRepresentativeForApplication');
    expect(next).toHaveBeenCalled();
  });

  test('Should load the page without deleting screening journey related data from session when userCase is not available', async () => {
    const req = mockRequest({
      session: {
        userCase: undefined,
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
